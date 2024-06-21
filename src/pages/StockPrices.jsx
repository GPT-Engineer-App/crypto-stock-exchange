import { Box, Heading, Text } from "@chakra-ui/react";

const StockPrices = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Stock Prices</Heading>
      <Text>View current stock prices.</Text>
      {/* Add your stock prices logic here */}
    </Box>
  );
};

export default StockPrices;