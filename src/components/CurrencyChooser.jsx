import React from 'react';

// Functional component for selecting a currency from a dropdown
const CurrencyChooser = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <div className="mb-4 sm:mb-6 md:mb-8"> {/* Responsive margin adjustments for msmall screen, medium and large screen*/}
      <label htmlFor="currency" className="block text-gray-500 font-medium mb-1 text-sm md:text-base"> 
        Select Currency
      </label>                          {/* Label with responsive text size */}

      <select
        id="currency"                               // Unique identifier for accessibility
        value={selectedCurrency}                       // Current selected currency value
        onChange={onChange}                              // Handler function to call when currency is changed
        className="block w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
        aria-label="Select Currency"                   // Accessible label for screen readers
      >
        {currencies.map(currency => (                     // Map over currencies to create option elements
          <option key={currency} value={currency}>       {/* Unique key for each option */}
            {currency}                                 {/* Display the currency code */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyChooser; // Export the component for use in other parts of the application
