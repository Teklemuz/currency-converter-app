import React from 'react';

// Functional component to render an input for entering an amount
const AmountInput = ({ amount, onAmountChange, disabled, className }) => {
  return (
    <input
      type="number"                                           // Input type set to number for amount entry
      value={amount}                                           // Current amount value passed as a prop
      onChange={(e) => onAmountChange(Number(e.target.value))}   // Handle input change and convert to number
      disabled={disabled}                                          // Disable input if the disabled prop is true
      className={`p-2 border border-gray-300 rounded w-full ${className}`}     // Tailwind CSS classes for styling
      min="0"                                 // Prevent negative values by setting a minimum of 0
    />
  );
};

export default AmountInput;                      // Export the component for use in other parts of the application
