import express from 'express';
import path from 'path';
import http from 'http';
import https from 'https';
import debug from 'debug';
import requestLogger from 'morgan';
import cors from 'cors';
import routes from './routes/index';

const app = express();
const logger = debug('log');
const port = 4000;

const appUrl = process.env.NODE_ENV.match('development')
  ? `http://localhost:${process.env.PORT || port}` : process.env.PRODUCTION_URL

app.use(cors());
app.use(requestLogger('combined'));

app.use(routes);

app.use(express.static(path.join(__dirname, '../dist')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  logger(`Server started on port: ${process.env.PORT || port}`);
  logger(`App: ${appUrl}`);
});

const httpProtocol = process.env.NODE_ENV.match('development') ? http : https;

setInterval(() => {
  (() => {
    httpProtocol.get(`${appUrl}/ip/healthCheck`, () => { });
  })();
}, 1000 * 10 * 60 * 24);

export default app;