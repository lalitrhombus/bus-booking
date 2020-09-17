import BaseControllerClass from '../../../common/baseApiController';
import dbService from '../../services/db.service';

export class UserController extends BaseControllerClass {
  constructor() {
    super('User');
  }

  async create(req, res, next) {
    try {
      const body = {
        ...req.body,
        userName: `${req.body.name}${Math.floor(
          Math.random() * Math.floor(1000)
        )}`,
        createdBy: res?.locals?.auth?._id,
        updatedBy: res?.locals?.auth?._id,
      };
      const data = await dbService.create(this.modelName, { ...body });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
export default new UserController();
