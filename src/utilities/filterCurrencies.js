function filterCurrencies (currencyCollection, currencyCode) {
    const [ currencyArray ] = currencyCollection;
    const { currencies } = currencyArray;

    return currencies.filter((currency) => {
        return currency.code.toLowerCase() === currencyCode;
    });
}

module.exports = filterCurrencies;