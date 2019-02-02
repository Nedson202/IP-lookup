import { lookup } from 'ipdata';
import https from 'https';
import dotenv from 'dotenv';
import Twitter from 'twitter';
import woeid from '../model/woeid';

dotenv.config();

const twitterClient = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

const params = {};

class IpController {
  static async healthChecker(req, res) {
    return res.status(200).json({
      error: false,
      message: 'Health check complete, server is active'
    })
  }

  static async getIpData(req) {
    const { query } = req;
    const { ip: ipFromQuery } = query;
    let myIPs = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    if (myIPs.indexOf(":") !== -1) {
      myIPs = myIPs.split(":")[myIPs.split(":").length - 1];
    }

    const lookUpIp = ipFromQuery || myIPs;

    const ipResponse = await lookup(lookUpIp, process.env.ip_data_key);
    return ipResponse;
  }

  static async returnIpData(req, res) {
    try {
      const ipResponse = await IpController.getIpData(req, res);
      if (ipResponse.error) {
        return res.status(400).json({
          error: false,
          data: ipResponse
        });
      }
      return res.status(200).json({
        error: false,
        message: 'Ip lookup completed successfully',
        data: ipResponse
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: 'Ip lookup failed',
        data: {
          reason: 'IP address is invalid'
        }
      });
    }
  }

  static async getWeatherData(req, res) {
    try {
      const ipResponse = await IpController.getIpData(req, res);
      const { latitude, longitude } = ipResponse;
      const weatherData = await new Promise((resolve) => {
        https.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${latitude},${longitude}`, (resp) => {
          resp.setEncoding("utf8");
          let body = "";
          resp.on("data", data => {
            body += data;
          });
          resp.on("end", () => {
            body = JSON.parse(body);
            delete(body.minutely)
            delete(body.hourly)
            delete(body.daily)
            resolve(body);
          });
        });
      });
      return res.status(200).json({
        error: false,
        message: 'Weather information completed successfully',
        data: weatherData
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: 'Weather lookup failed',
        data: error
      });
    }
  }

  static async getTrends(req, res) {
    try {
      const { query } = req;
      const { from, size } = query;
      const ipResponse = await IpController.getIpData(req, res);

      const { city, time_zone } = ipResponse;
      let country;
      let placeId = woeid.find(earthId => earthId.name === city);
      if (!placeId) {
        country = time_zone.split('/')[1];
        placeId = woeid.find(earthId => earthId.name === country);
      }
      if (!placeId) {
        return res.status(404).json({
          error: false,
          message: `Unable to fetch trending tweets for ${city}`,
        });
      }
      params.id = placeId.woeid;

      const trends = await new Promise((resolve, reject) => {
        twitterClient.get('trends/place', params, (error, response) => {
          if (response[0]) {
            const { trends } = response[0];
            const slicedTrends = trends.splice(from, size);
            response[0].trends = slicedTrends
            resolve(response)
          }
          if (error) {
            reject(error);
          }
        });
      });

      return res.status(200).json({
        error: false,
        message: 'Twitter trends retrieved successfully',
        data: trends[0]
      });
    } catch (error) {
      return res.status(400).json({
        error: false,
        message: 'Unable to retrieve twitter trends',
        data: error
      });
    }
  }
}

export default IpController;