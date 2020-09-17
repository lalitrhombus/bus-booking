import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';

export class BookingController extends BaseControllerClass {
  constructor() {
    super('Booking');
  }

  async create(req, res, next) {
    try {
      // check if the seat is booked or seat number is correct of bus id is correct

      const tripData = await dbService
        .findOne('Trip', {
          id: req.body.tripId,
        })
        .populate('vehicle');

      if (!tripData) {
        console.error('trip is not present');
        await dbService.create('Booking', {
          ...req.body,
          trip: tripData._id,
          status: 'FAILED',
          details: 'Vehicle not found',
          bookingDate: new Date(),
        });
        return res
          .status(404)
          .send({ message: 'vehicle is full or not available.' });
      }

      // check if seat is available

      // for data from bookedSeat
      tripData._bookedSeat = {};
      tripData.bookedSeats.forEach((seat) => {
        tripData._bookedSeat[seat.id] = seat;
      });

      // format data from vehicle
      tripData.vehicle._seats = {};
      tripData.vehicle.seats.forEach((seat) => {
        tripData.vehicle._seats[seat.id] = seat;
      });

      let isSeatsAvailable = true;

      // check if its available in bookedSeat or in vehicle
      req.body.seats.every((seat) => {
        if (tripData._bookedSeat[seat]) {
          console.error('seat is already booked');
          isSeatsAvailable = false;
        }
        if (!tripData.vehicle._seats[seat]) {
          console.error('seat not present in vehicle');
          isSeatsAvailable = false;
        }
        return isSeatsAvailable;
      });

      if (!isSeatsAvailable) {
        await dbService.create('Booking', {
          ...req.body,
          trip: tripData._id,
          status: 'FAILED',
          details: 'Preffered seat not available',
          bookingDate: new Date(),
        });
        return res
          .status(404)
          .send({ message: 'vehicle is full or not available..' });
      }

      const dataForTrip = [];
      req.body.seats.forEach((seat, i) => {
        dataForTrip.push({
          id: seat,
          passengerDetails: req.body.passengerDetails[i],
        });
      });

      const tripInsertData = await dbService.update(
        'Trip',
        { _id: tripData._id },
        { bookedSeats: dataForTrip, updatedBy: res.locals.auth._id }
      );

      if (!tripInsertData) {
        return res
          .status(404)
          .send({ message: 'vehicle is full or not available...' });
      }

      const bookingData = await dbService.create('Booking', {
        ...req.body,
        trip: tripData._id,
        status: 'CONFIRMED',
        bookingDate: new Date(),
      });

      res.json(bookingData);
    } catch (err) {
      next(err);
    }
  }
}
export default new BookingController();
