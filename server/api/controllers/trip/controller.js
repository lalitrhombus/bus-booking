import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';
import { TRIP_STATUS } from '../../../common/config';

export class UserController extends BaseControllerClass {
  constructor() {
    super('Trip');
    this.details = this.details.bind(this);
  }

  async details(req, res, next) {
    try {
      const data = await dbService
        .findOne(
          this.modelName,
          {
            id: req.params.id,
          },
          {
            _id: 0,
            __v: 0,
          }
        )
        .populate('vehicle');

      const details = {};
      details.bookedSeatCount = data.bookedSeats.length;
      details.bookedSeatList = [];
      details.passengerList = data.bookedSeats.map((seat) => {
        details.bookedSeatList.push(seat.id);
        return {
          ...seat.passengerDetails,
          seatId: seat.id,
        };
      });

      details.totalSeatCount = data.vehicle.seats.length;
      details.emptySeatList = [];
      details.totalSeatList = data.vehicle.seats.map((seat) => {
        if (!details.bookedSeatList.find((seatId) => seatId === seat.id)) {
          details.emptySeatList.push(seat.id);
        }
        return seat.id;
      });

      res.json(details);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const vehicleData = await dbService.findOne('Vehicle', {
        id: req.body.vehicleId,
      });

      const body = {
        ...req.body,
        vehicle: vehicleData._id,
        status: TRIP_STATUS.CREATED,
        createdBy: res.locals.auth._id,
        updatedBy: res.locals.auth._id,
      };
      const data = await dbService.create(this.modelName, { ...body });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
export default new UserController();
