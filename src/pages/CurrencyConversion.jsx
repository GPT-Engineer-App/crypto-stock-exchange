import { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Button, Select } from "@chakra-ui/react";
import localforage from "localforage";

const CACHE_KEY = "currency_conversion_cache";
const CACHE_EXPIRY = 3600000; // 1 hour in milliseconds
import axios from "axios";

const CurrencyConversion = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionResult, setConversionResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await localforage.getItem(CACHE_KEY);
      const now = new Date().getTime();

      if (cachedData && now - cachedData.timestamp < CACHE_EXPIRY) {
        setCurrencies(cachedData.data);
      } else {
        axios.get("https://api.exchangerate-api.com/v4/latest/USD")
          .then(response => {
            setCurrencies(Object.keys(response.data.rates));
            localforage.setItem(CACHE_KEY, { data: Object.keys(response.data.rates), timestamp: now });
          })
          .catch(error => {
            console.error("Error fetching currency data:", error);
          });
      }
    };

    fetchData();
  }, []);

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates?.[toCurrency];
        if (rate) {
          setConversionResult(amount * rate);
        } else {
          setConversionResult("Conversion rate not available");
        }
      })
      .catch(error => {
        console.error("Error converting currency:", error);
        setConversionResult("Error converting currency");
      });
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Currency Conversion</Heading>
      <Text mb={4}>Real-time and accurate currency conversion.</Text>
      <Box mb={4}>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" mb={2} />
        <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} mb={2}>
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </Select>
        <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} mb={2}>
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </Select>
        <Button onClick={convertCurrency}>Convert</Button>
      </Box>
      {conversionResult && <Text>Conversion Result: {conversionResult} {toCurrency}</Text>}
    </Box>
  );
};

export default CurrencyConversion;