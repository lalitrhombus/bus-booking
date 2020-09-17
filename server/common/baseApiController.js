import dbService from '../api/services/db.service';

class BaseControllerClass {
  constructor(modelName) {
    this.modelName = modelName;
    this.all = this.all.bind(this);
    this.byId = this.byId.bind(this);
    this.create = this.create.bind(this);
  }

  async all(req, res, next) {
    try {
      const data = await dbService.findAll(this.modelName, { _id: 0, __v: 0 });
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async byId(req, res, next) {
    try {
      const data = await dbService.findOne(
        this.modelName,
        {
          id: req.params.id,
        },
        {
          _id: 0,
          __v: 0,
        }
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const data = await dbService.create(
        this.modelName,
        {
          ...req.body,
          createdBy: res.locals.auth.id,
          updatedBy: res.locals.auth.id,
        },
        {
          _id: 0,
          __v: 0,
        }
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
export default BaseControllerClass;
