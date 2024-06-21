import { useState, useEffect } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";
import axios from "axios";

const StockPrices = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockPrice, setStockPrice] = useState(null);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get("https://api.twelvedata.com/stocks")
      .then(response => {
        setStocks(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  useEffect(() => {
    if (stockSymbol) {
      axios.get(`https://api.twelvedata.com/price?symbol=${stockSymbol}&apikey=YOUR_API_KEY`)
        .then(response => {
          setStockPrice(response.data.price);
        })
        .catch(error => {
          console.error("Error fetching stock price:", error);
        });
    }
  }, [stockSymbol]);

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Stock Prices</Heading>
      <Text mb={4}>View current stock prices.</Text>
      <Select value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} mb={4}>
        {stocks.map(stock => <option key={stock.symbol} value={stock.symbol}>{stock.name} ({stock.symbol})</option>)}
      </Select>
      {stockPrice && <Text>Stock Price: ${stockPrice}</Text>}
    </Box>
  );
};

export default StockPrices;