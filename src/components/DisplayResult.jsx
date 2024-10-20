import React from 'react';

const DisplayResult = ({ convertedAmount, fromCurrency, toCurrency }) => {
  return (
    <div className="mt-4 p-4 sm:p-6 md:p-8 bg-white rounded"> {/* Main Container with padding and background color */}
      {convertedAmount ? (
        <p className="text-lg font-semibold md:text-xl">      {/* Display the converted Amount with text size */}
          {`Converted Amount: ${convertedAmount} ${toCurrency} (from ${fromCurrency})`}
        </p>
      ) : (
        <p className="text-gray-500 text-sm md:text-base">
          Please enter an amount and select currencies to convert.
        </p>
      )}
    </div>
  );
};

export default DisplayResult; // Export the component for use in other parts of the application
