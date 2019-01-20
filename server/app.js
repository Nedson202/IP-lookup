import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import routes from './routes/index';

const app = express();
const logger = debug('log');

const port = 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  logger(`Server started on port: ${port}`)
});

// setup a default catch-all route for undef-route
app.get('*', (req, res) => {
  res.status(405).json({
    message: 'Welcome to the service api',
    error: true
  });
});

export default app;