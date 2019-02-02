import dotenv from 'dotenv';
dotenv.config();

// const port = 40000;
const appURL = 'process.env.VUE_PRODUCTION_URL';
// const appURL = process.env.NODE_ENV.match('development')
// ? `http://localhost:${port}` : process.env.PRODUCTION_URL;

export const appUrl = appURL;