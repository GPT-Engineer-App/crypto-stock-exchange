import { Container, Text, VStack, Heading } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Currency Converter</Heading>
        <Text fontSize="xl">Welcome to the Currency Converter App</Text>
        <Text>Navigate through the menu to explore currency, crypto, and stock conversions.</Text>
      </VStack>
    </Container>
  );
};

export default Index;