const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, PUT, POST, DELETE',
};
app.use(cors(corsOptions));

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const stations = require('./routes/stations');

app.use('/api/stations', stations);

const regions = require('./routes/regions');

app.use('/api/regions', regions);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
