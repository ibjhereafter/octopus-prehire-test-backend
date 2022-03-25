const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const currenciesRouter = require('./routes/currency.router');
const exchangeRatesRouter = require('./routes/exchange-rates.router');
const applicationStatus = require('./routes/application-status.router');
const app = express();

app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://octopus-prehire-test-frontend.vercel.app' ]} ));
app.use(logger('dev'));
app.use(express.json());

app.use(applicationStatus);
app.use(currenciesRouter);
app.use(exchangeRatesRouter);

module.exports = app;