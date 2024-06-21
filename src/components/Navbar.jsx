import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-around">
        <Link as={NavLink} to="/" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Home</Link>
        <Link as={NavLink} to="/currency-conversion" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Currency Conversion</Link>
        <Link as={NavLink} to="/crypto-conversion" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Crypto Conversion</Link>
        <Link as={NavLink} to="/stock-rates" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Stock Rates</Link>
        <Link as={NavLink} to="/stock-prices" color="white" _hover={{ textDecoration: "none", color: "gray.200" }}>Stock Prices</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;