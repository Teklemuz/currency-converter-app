import React, { useState, useEffect } from 'react'; 
import { fetchExchangeRates } from '../src/API';
import CurrencyChooser from './components/CurrencyChooser';
import AmountInput from './components/AmountInput';
import DisplayResult from './components/DisplayResult';

const CurrencyConverter = () => {
  // State Variables
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrencies, setToCurrencies] = useState(['ETB']); // Initial target currency
  const [amount, setAmount] = useState(1);
  const [convertedAmounts, setConvertedAmounts] = useState({}); // Store the converted amounts
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Effect to load the exchange rates
  useEffect(() => {
    const loadExchangeRates = async () => {
      setLoading(true);
      
      // Set a timeout to stop loading after 5 seconds
      const loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 5000);

      try {
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
        setCurrencies(Object.keys(rates));
      } catch (err) {
        setError('The exchange rate is unavailable. Please try again later.');
      } finally {
        // Clear the timeout if loading completes before 5 seconds
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };

    loadExchangeRates();
  }, []);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromCurrency && toCurrencies.length && amount > 0) {
      const newConvertedAmounts = {};
      toCurrencies.forEach((toCurrency) => {
        if (exchangeRates[toCurrency] && exchangeRates[fromCurrency]) { // Check if rates exist
          const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
          newConvertedAmounts[toCurrency] = (amount * rate).toFixed(2); // Convert and format the result
        }
      });
      setConvertedAmounts(newConvertedAmounts);
    }
  };

  // Filtering currencies based on search query
  const filteredCurrencies = currencies.filter(currency =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:p-4 md:p-8">
      <h1 className="text-lg font-bold text-center mb-6 sm:text-xl md:text-2xl hover:text-yellow-500 transition-colors duration-200 ease-in-out">Currency Converter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs sm:max-w-sm bg-white rounded-lg shadow-md p-6">
        <input
          type="text"
          placeholder="Search currencies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
          className="mb-4 p-2 border border-gray-300 rounded w-full hover:border-yellow-500 transition-colors duration-200 ease-in-out"
        />

        <label className="block mb-2">
          From Currency:
          <CurrencyChooser
            currencies={filteredCurrencies}
            selectedCurrency={fromCurrency}
            onChange={(currency) => {
              setFromCurrency(currency);
              if (toCurrencies.includes(currency)) {
                setToCurrencies(['ETB']); // Reset to default if the same currency is selected
              }
            }}
            disabled={loading}
          />
        </label>

        <label className="block mb-2">
          To Currencies (comma-separated):
          <input
            type="text"
            value={toCurrencies.join(', ')} // Join selected currencies for display
            onChange={(e) => setToCurrencies(e.target.value.split(',').map(c => c.trim()))} // Split by comma
            placeholder="ETB, INR, GBP, AUD"
            className="mb-4 p-2 border border-gray-300 rounded w-full hover:border-yellow-500 transition-colors duration-200 ease-in-out"
            disabled={loading}
          />
        </label>

        <AmountInput
          amount={amount}
          onAmountChange={handleAmountChange}
          disabled={loading}
          className="mb-4"
        />
        
        <button type="submit" disabled={loading} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 w-full transition-colors duration-200 ease-in-out">
          Convert
        </button>
      </form>

      <div className="mt-4">
        {Object.keys(convertedAmounts).length > 0 ? (
          Object.keys(convertedAmounts).map((currency) => (
            <DisplayResult 
              key={currency}
              convertedAmount={convertedAmounts[currency]} 
              fromCurrency={fromCurrency} 
              toCurrency={currency} 
            />
          ))
        ) : (
          <p>No currency conversions made yet.</p>
        )}
      </div>

      {loading && <p className="mt-4 text-sm md:text-base">Loading...</p>}
      {error && <p className="mt-4 text-red-500 text-sm md:text-base">Error: {error}</p>}
    </div>
  );
};

export default CurrencyConverter;
