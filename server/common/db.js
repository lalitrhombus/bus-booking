const mongoose = require('mongoose');
import l from './logger';
let dbInstance;

const getDBInstance = async () => {
  try {
    // return connection if exist
    if (dbInstance) {
      l.debug(`Connection already Exists.. ${dbInstance.connection.host}`);
      return dbInstance;
    }

    dbInstance = await mongoose.connect(process.env.MONGO_DB_SERVER_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    l.debug(`Database Connection success.. ${dbInstance.connection.host}`);

    return dbInstance;
  } catch (err) {
    // TODO: add a retry machanish here, or may be an alternative source of data
    l.error(err);
    return null;
  }
};

export { dbInstance, getDBInstance };
