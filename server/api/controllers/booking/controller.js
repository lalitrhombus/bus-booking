import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';

export class BookingController extends BaseControllerClass {
  constructor() {
    super('Booking');
  }

  async create(req, res, next) {
    try {

      // check if the seat is booked or seat number is correct of bus id is correct



      const data = await dbService.create(this.modelName, { ...req.body });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
export default new BookingController();
