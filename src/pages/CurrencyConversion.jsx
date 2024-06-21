import { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Button, Select } from "@chakra-ui/react";
import axios from "axios";

const CurrencyConversion = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionResult, setConversionResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get("https://api.exchangerate-api.com/v4/latest/USD")
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(error => {
        console.error("Error fetching currency data:", error);
      });
  }, []);

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setConversionResult(amount * rate);
      })
      .catch(error => {
        console.error("Error converting currency:", error);
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