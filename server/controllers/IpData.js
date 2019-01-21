import ipApi from 'ipapi.co';
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
  static async getIpData(req, res) {
    let IPs = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    if (IPs.indexOf(":") !== -1) {
        IPs = IPs.split(":")[IPs.split(":").length - 1]
    }

    const ipResponse = await new Promise((resolve, reject) => {
      ipApi.location((res) => {
        resolve(res)
      }, IPs);
    })
    return ipResponse;
  }

  static async returnIpData(req, res) {
    const ipResponse = await IpController.getIpData(req, res);
    return res.status(200).json({
      error: false,
      message: 'Ip lookup completed successfully',
      data: ipResponse
    });
  }

  static async getWeatherData(req, res) {
    const ipResponse = await IpController.getIpData(req, res);
    const { latitude, longitude } = ipResponse;
    const weatherData = await new Promise((resolve, reject) => {
      https.get(`https://api.darksky.net/forecast/3cd49b356a32eb606332aa01439fd4c0/${latitude},${longitude}`, (resp) => {
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
  }

  static async getTrends(req, res) {
    try {
      const { query } = req;
      const { from, size } = query;
      const ipResponse = await IpController.getIpData(req, res);
      const { city } = ipResponse;
      const placeId = woeid.find(earthId => earthId.name === city);
      params.id = placeId.woeid;

      const trends = await new Promise((resolve, reject) => {
        twitterClient.get('trends/place', params, function(error, response) {
          if (error) {
            reject(error);
          }
          const { trends } = response[0];
          const slicedTrends = trends.splice(from, size);
          console.log(slicedTrends.length)
          response[0].trends = slicedTrends
          resolve(response)
        });
      });

      return res.status(200).json({
        error: false,
        message: 'Twitter trends retrieved successfully',
        data: trends[0]
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default IpController;