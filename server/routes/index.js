import express from 'express';
import IpRoute from './ipRoute';

const app = express();

app.use('/ip', IpRoute);

export default app;