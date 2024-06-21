import { Box, Heading, Text } from "@chakra-ui/react";

const CryptoConversion = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Crypto Conversion</Heading>
      <Text>Convert between different cryptocurrencies.</Text>
      {/* Add your crypto conversion logic here */}
    </Box>
  );
};

export default CryptoConversion;