import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  EGP: 31.5,
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('EGP');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user's location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use this to determine the user's country
          // and set the appropriate currency
          setLocation(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const convertPrice = (price) => {
    const rate = exchangeRates[currency];
    return (price * rate).toFixed(2);
  };

  const formatPrice = (price) => {
    const convertedPrice = convertPrice(price);
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      EGP: 'EGP',
    };
    return `${currencySymbols[currency]} ${convertedPrice}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        location,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
} 