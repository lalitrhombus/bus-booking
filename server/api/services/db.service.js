let models = require('../../model');

class Database {
  constructor() {}

  findAll(collection) {
    return models[collection].find();
  }

  findOne(collection, condition) {
    return models[collection].findOne({ ...condition });
  }

  create(collection, data) {
    try {
      return models[collection].create({ ...data });
    } catch (err) {
      return err;
    }
  }

  update(collection, condition, data) {
    models = require('../../model');
    return models[collection].update({ ...condition }, { ...data });
  }
}

export default new Database();
