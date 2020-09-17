import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';

export class BookingController extends BaseControllerClass {
  constructor() {
    super('Booking');
  }

  async create(req, res, next) {
    try {
      // check if the seat is booked or seat number is correct of bus id is correct

      const data = await dbService.findOne('Vehicle', {
        id: req.body.vehicle,
      });

      if (!data) {
        return res
          .status(404)
          .send({ message: 'vehicle is full or not available..' });
      }

      console.log(data);

      // transform Seat and bookedSeat
      data._tSeats = {};
      data.seats.forEach((seat) => {
        data._tSeats[seat.name] = seat;
      });
      data._tbookedSeats = {};
      data?.bookedSeats?.forEach((seat) => {
        data._tbookedSeats[seat.name] = seat;
      });

      // check if seat is booked
      let isSeatAvailable = true;
      req.body.seats.forEach((seetToBeBooked) => {
        if (data._tbookedSeats[seetToBeBooked]) {
          isSeatAvailable = false;
        }
        if (!data._tSeats[seetToBeBooked]) {
          isSeatAvailable = false;
        }
      });

      if (!isSeatAvailable) {
        return res
          .status(404)
          .send({ message: 'Either seat is booked or not available' });
      }

      const bookingData = await dbService.create('Booking', { ...req.body });

      // update vehicle for booked seats
      await dbService.update(
        'Vehicle',
        {
          id: data.id,
        },
        {}
      );

      res.json({
        bookingData,
      });
    } catch (err) {
      next(err);
    }
  }
}
export default new BookingController();
