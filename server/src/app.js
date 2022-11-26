const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./middlewares/corsMiddlewares');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

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
