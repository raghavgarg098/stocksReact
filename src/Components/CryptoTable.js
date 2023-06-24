import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file for CryptoPrices component

const CryptoPrices = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/cryptos');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatMarketCap = (value) => {
    if (value === null || value === undefined) {
      return '---';
    } else if (value < 1000000) {
      return value.toFixed(2);
    } else if (value < 1000000000) {
      return `${(value / 1000000).toFixed(2)} Million`;
    } else if (value < 1000000000000) {
      return `${(value / 1000000000).toFixed(2)} Billion`;
    } else if (value < 1000000000000000) {
      return `${(value / 1000000000000).toFixed(2)} Trillion`;
    } else {
      return `${(value / 1000000000000000).toFixed(2)} Quadrillion`;
    }
  };

  return (
    <div>
      <h2 className="crypto-heading">CryptoCurrency Prices</h2>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>1h%</th>
            <th>24h%</th>
            <th>7d%</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crypto, index) => (
            <tr key={index}>
              <td>{crypto.name || '----'}</td>
              <td>{crypto.price !== null && crypto.price !== undefined ? `$${crypto.price}` : '----'}</td>
              <td>{crypto.last_hour_difference || '----'}</td>
              <td>{crypto.last_24_hour_difference || '----'}</td>
              <td>{crypto.last_7_day_difference || '----'}</td>
              <td>{formatMarketCap(crypto.market_cap)}</td>
              <td>{formatMarketCap(crypto.volume_last_24_hour)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrices;
