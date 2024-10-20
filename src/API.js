          // API.js
const API_URL = 'https://v6.exchangerate-api.com/v6/ac52910cec3481c93d9b349d/latest/USD';

export const fetchExchangeRates = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }
  const data = await response.json();
  return data.conversion_rates;
};
