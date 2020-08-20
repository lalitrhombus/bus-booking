import busRouter from './api/controllers/bus/router';
import ticketRouter from './api/controllers/ticket/router';
export default function routes(app) {
  app.use('/api/v1/bus', busRouter);
  app.use('/api/v1/ticket', ticketRouter);
}
