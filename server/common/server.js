import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';

import { getDBInstance } from './db';

import oas from './oas';

import l from './logger';

const app = new Express();
const exit = process.exit;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));

    app.use(mongoSanitize());
    app.use(helmet());
    app.use(xss());
    // Stoping static content serving for now
    // app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    const db = getDBInstance();
    if (!db) {
      l.error(`Not able to connect to DB ... Please Varify again..`);
      exit(1);
    }

    oas(app, this.routes)
      .then(() => {
        http.createServer(app).listen(port, welcome(port));
      })
      .catch((e) => {
        l.error(e);
        exit(1);
      });

    return app;
  }
}
