import { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Button, Select } from "@chakra-ui/react";
import axios from "axios";

const CryptoConversion = () => {
  const [amount, setAmount] = useState(1);
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("ETH");
  const [conversionResult, setConversionResult] = useState(null);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/list")
      .then(response => {
        setCryptos(response.data);
      })
      .catch(error => {
        console.error("Error fetching crypto data:", error);
      });
  }, []);

  const convertCrypto = () => {
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=${toCrypto}`)
      .then(response => {
        const rate = response.data[fromCrypto][toCrypto];
        setConversionResult(amount * rate);
      })
      .catch(error => {
        console.error("Error converting crypto:", error);
      });
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Crypto Conversion</Heading>
      <Text mb={4}>Convert between different cryptocurrencies.</Text>
      <Box mb={4}>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" mb={2} />
        <Select value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)} mb={2}>
          {cryptos.map(crypto => <option key={crypto.id} value={crypto.id}>{crypto.name}</option>)}
        </Select>
        <Select value={toCrypto} onChange={(e) => setToCrypto(e.target.value)} mb={2}>
          {cryptos.map(crypto => <option key={crypto.id} value={crypto.id}>{crypto.name}</option>)}
        </Select>
        <Button onClick={convertCrypto}>Convert</Button>
      </Box>
      {conversionResult && <Text>Conversion Result: {conversionResult} {toCrypto}</Text>}
    </Box>
  );
};

export default CryptoConversion;