import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';

export class VehicleController extends BaseControllerClass {
  constructor() {
    super('Vehicle');
  }

  async create(req, res, next) {
    try {
      const body = {
        ...req.body,
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
export default new VehicleController();
