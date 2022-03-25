const express = require('express');
const currenciesRouter = express.Router();
const Currencies = require('../database/models/currencies.model');
const ExchangeRates = require('../database/models/exchange-rates.model');
const filterCurrencies = require('../utilities/filterCurrencies');
const getRates = require('../utilities/getRates');
const merge = require('../utilities/merge');
const getSearchResult = require('../utilities/getSearchResult');

currenciesRouter.post('/currencies/:search', async (req, res) => {
    try {
        const searchTerm = req.params.search;
        if (!searchTerm) {
            const error = new Error('What are you looking for, please?');
            return res.status(400).json({ error: error.message })
        }
        const currencies = await Currencies.find({});
        const result = getSearchResult(currencies, searchTerm);

        return res.status(200).json(result);
    } catch (error) {

        return res.status(400).json({ error: error.message });

    }
});

currenciesRouter.get('/currencies/:code', async (req, res) => {
   // this endpoint returns the details of each currency by querying
    // both the exchange-rates collection and currencies collection
    try {
        const code = req.params.code;
        if (!code) {
            const error = new Error('Please, provide the code of the currency you are looking for.');
            return res.status(400).json({ error: error.message });
        }

        const currencyCode = code.toLowerCase();

        const currencyExchangeRates = await ExchangeRates.findOne({ currencyCode });
        const currencies = await Currencies.find({});

        const currency = filterCurrencies(currencies, currencyCode);
        const rates = getRates(currencyExchangeRates);
        const currencyDetails = merge(currency, rates);

        return res.status(200).json(currencyDetails);

   } catch (error) {
        return res.status(400).json({ error: error.message });
   }
});

currenciesRouter.get('/currencies', async (req, res) => {
   try {
       const currencies = await Currencies.find({});
       return res.status(200).json(currencies);

   } catch (error) {
       return res.status(400).json({ error: error.message });
   }
});

currenciesRouter.post('/currencies', async (req, res) => {
   try {
       const currencies = new Currencies(req.body);
       if (!currencies) {
           const error = new Error('Please, include the currencies you want to add.');
           return res.status(400).json({ error: error.message});
       }

       await currencies.save();

       return res.status(201).json(currencies);
   } catch (error) {

       return res.status(400).json({ error: error.message })
   }
});

module.exports = currenciesRouter;