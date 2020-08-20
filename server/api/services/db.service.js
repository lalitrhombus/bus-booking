let models = require('../../model');

class Database {
  constructor() {}

  all(collection) {
    return models[collection].find();
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  // insert() {
  //   const record = {
  //     id: this._counter,
  //     name,
  //   };

  //   this._counter += 1;
  //   this._data.push(record);

  //   return Promise.resolve(record);
  // }
}

export default new Database();
