import l from './common/logger';
import jwt from 'jsonwebtoken';

function logErrors(err, req, res, next) {
  l.error(err);
  next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).send({ error: err.message });
}

import vehicleRouter from './api/controllers/vehicle/router';
import userRouter from './api/controllers/user/router';
import bookingRouter from './api/controllers/booking/router';
import authRouter from './api/controllers/auth/router';

function authMiddleware(req, res, next) {
  try {
    let authHeader = req.headers.authorization.replace('Bearer ', '');

    if (!authHeader) {
      l.info('FORBIDDEN entry..');

      return res.status(403).json({
        status: 403,
        message: 'FORBIDDEN',
      });
    }

    const data = jwt.verify(authHeader, process.env.SECRET_KEY);

    if (!data) {
      l.info('unauthorised entry..');
      return res.status(403).json({
        status: 401,
        message: 'UNAUTHRIZED',
      });
    }

    const { id, userName, name } = data;

    res.locals.auth = {
      id,
      name,
      userName,
    };

    next();
  } catch (err) {
    next(err);
  }
}

export default function routes(app) {
  app.use('/api/v1/vehicle', authMiddleware, vehicleRouter);
  app.use('/api/v1/booking', authMiddleware, bookingRouter);
  app.use('/api/v1/user', authMiddleware, userRouter);
  app.use('/api/v1/auth', authRouter);
  app.use(logErrors);
  app.use(errorHandler);
}
