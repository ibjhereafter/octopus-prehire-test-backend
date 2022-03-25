const express = require('express');
const exchangeRatesRouter = express.Router();
const ExchangeRates = require('../database/models/exchange-rates.model');

exchangeRatesRouter.post('/rates', async (req, res) => {
   try {
       const rate = new ExchangeRates(req.body);
       if (!rate) {
           const error = new Error('Please, include the rate you want to add.');
           return res.status(400).json({ error: error.message })
       }

       await rate.save();

       return res.status(201).json(rate);

   } catch (error) {
       return res.status(400).json({ error: error.message })

   }
});

module.exports = exchangeRatesRouter;