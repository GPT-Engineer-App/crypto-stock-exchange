import { Box, Heading, Text } from "@chakra-ui/react";

const CurrencyConversion = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Currency Conversion</Heading>
      <Text>Real-time and accurate currency conversion.</Text>
      {/* Add your currency conversion logic here */}
    </Box>
  );
};

export default CurrencyConversion;