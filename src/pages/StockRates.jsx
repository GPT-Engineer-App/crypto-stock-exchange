import { Box, Heading, Text } from "@chakra-ui/react";

const StockRates = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Stock Rates</Heading>
      <Text>View current stock rates.</Text>
      {/* Add your stock rates logic here */}
    </Box>
  );
};

export default StockRates;