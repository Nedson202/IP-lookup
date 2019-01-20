import ipApi from 'ipapi.co';
import https from 'https';
import Twitter from 'twitter';
import woeid from '../model/woeid';

const twitterClient = new Twitter({
  consumer_key: 'R62B9QjwvTBY095RY7SM0tAhK',
  consumer_secret: 'JLTmL6COGZPn52JTHTzqRF73sv1hWiUW8R5eaTvRGCtVJNpeqs',
  access_token_key: '2528849026-cwGfyD5glbeGwD6zegTW5c5rX6L3cdwj3VEHZQO',
  access_token_secret: '3oyJlztufuZXgaNOZO6RXUypOdaoTOr3Sl10qZJhUMeeE'
});

const params = {
  screen_name: 'nodejs',
};

class IpController {
  static async getIpData(req, res) {
    const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const ipResponse = await new Promise((resolve, reject) => {
      ipApi.location((res) => {
        resolve(res)
      }, '41.215.245.118');
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
    const ipResponse = await IpController.getIpData(req, res);
    const { city } = ipResponse;
    const placeId = woeid.find(earthId => earthId.name === city);
    params.id = placeId.woeid;

    const trends = await new Promise((resolve, reject) => {
      twitterClient.get('trends/place', params, function(error, response) {
        if (error) {
          reject(error);
        }
        resolve(response)
      });
    });

    return res.status(200).json({
      error: false,
      message: 'Twitter trends retrieved successfully',
      data: trends
    });
  }
}

export default IpController;