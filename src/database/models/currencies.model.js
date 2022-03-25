const mongoose = require('mongoose');

const currencies = new mongoose.Schema({
    currencies: [{
        code: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
});

const Currencies = mongoose.model('currencies', currencies);

module.exports = Currencies;