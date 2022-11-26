// const allowedOrigins = require('./allowedOrigins');
const allowedOrigins = [
  'https://www.yoursite.com',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:4200',
  'http://185.74.5.173/api/',
  'http://185.74.5.173/api/api',
  'http://185.74.5.173/',
  'http://185.74.5.173',

];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
