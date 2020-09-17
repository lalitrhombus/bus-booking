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
import tripRouter from './api/controllers/trip/router';
import authRouter from './api/controllers/auth/router';

function authMiddleware(req, res, next) {
  try {
    let authHeader = req.headers?.authorization?.replace('Bearer ', '');

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

    const { id, userName, name, _id } = data;

    res.locals.auth = {
      _id,
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
  app.use('/api/v1/users-old', userRouter);
  app.use('/api/v1/users', authMiddleware, userRouter); // TODO: add authentication
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/vehicles', authMiddleware, vehicleRouter);
  app.use('/api/v1/bookings', authMiddleware, bookingRouter);
  app.use('/api/v1/trips', authMiddleware, tripRouter);
  app.use(logErrors);
  app.use(errorHandler);
}
