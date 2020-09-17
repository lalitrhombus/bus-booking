let models = require('../../model');

class Database {
  constructor() {}

  findAll(collection, options) {
    return models[collection].find({}, options);
  }

  findOne(collection, condition, options) {
    return models[collection].findOne({ ...condition }, options);
  }

  create(collection, data, options) {
    try {
      return models[collection].create({ ...data }, options);
    } catch (err) {
      return err;
    }
  }

  update(collection, condition, data, options) {
    return models[collection].update({ ...condition }, { ...data }, options);
  }
}

export default new Database();
