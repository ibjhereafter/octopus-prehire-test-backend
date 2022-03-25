function merge(currency, rate) {
    const myRates = { rates: rate };
    return [...currency, myRates];
}

module.exports = merge;