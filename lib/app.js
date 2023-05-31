/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import routes from './routes';
import config from './config/config';
/*Agregado*/
import path from 'path';

const app = express();

/**
 * Get port from environment and store in Express.
 */

app.set('port', config.port || '3001');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/', routes);

/*Agregado*/
app.use(
  express.static(path.join(__dirname, '../../fileserver/archivos')),
  () => {
    console.log(
      'Ruta estática:' + path.join(__dirname, '../../fileserver/archivos')
    );
  }
);
/**/

module.exports = app;
