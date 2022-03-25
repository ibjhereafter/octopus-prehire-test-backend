function getSearchResult (currencyCollection, searchTerm) {
    const [ currencyArray ] = currencyCollection;
    const { currencies } = currencyArray;
    let searchResult = null;

    if (searchTerm.length === 3) {
        searchResult = currencies.filter((currency) => {
            return currency.code === searchTerm.toUpperCase();
        });
    } else {
        searchResult = currencies.filter((currency) => {
            return currency.country.toLowerCase() === searchTerm.toLowerCase();
        })
    }

    return searchResult;
}

module.exports = getSearchResult;