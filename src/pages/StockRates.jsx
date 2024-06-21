import { useState, useEffect } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";
import axios from "axios";

const StockRates = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockRate, setStockRate] = useState(null);
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
          setStockRate(response.data.price);
        })
        .catch(error => {
          console.error("Error fetching stock rate:", error);
        });
    }
  }, [stockSymbol]);

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Stock Rates</Heading>
      <Text mb={4}>View current stock rates.</Text>
      <Select value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} mb={4}>
        {stocks.map(stock => <option key={stock.symbol} value={stock.symbol}>{stock.name} ({stock.symbol})</option>)}
      </Select>
      {stockRate && <Text>Stock Rate: ${stockRate}</Text>}
    </Box>
  );
};

export default StockRates;