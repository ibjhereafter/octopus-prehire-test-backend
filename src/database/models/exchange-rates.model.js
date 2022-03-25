const mongoose = require('mongoose');

const exchangeRates = new mongoose.Schema({
    currencyCode: {
          type: String,
          required: true
    },
    
    rates: []
}, {
    timestamps: true
});

const ExchangeRates = mongoose.model('exchange-rates', exchangeRates);

module.exports = ExchangeRates;