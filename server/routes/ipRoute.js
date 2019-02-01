import { Router } from 'express';
import IpController from '../controllers/IpData';

const router = Router();

const { returnIpData, getWeatherData, getTrends, healthChecker } = IpController;

router.get(
  '/getIpData',
  returnIpData
);

router.get(
  '/getWeatherData',
  getWeatherData
);

router.get(
  '/getTrends',
  getTrends
);

router.get(
  '/healthCheck',
  healthChecker
);

export default router;