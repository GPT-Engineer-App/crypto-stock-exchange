import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CurrencyConversion from "./pages/CurrencyConversion.jsx";
import CryptoConversion from "./pages/CryptoConversion.jsx";
import StockRates from "./pages/StockRates.jsx";
import StockPrices from "./pages/StockPrices.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/currency-conversion" element={<CurrencyConversion />} />
        <Route exact path="/crypto-conversion" element={<CryptoConversion />} />
        <Route exact path="/stock-rates" element={<StockRates />} />
        <Route exact path="/stock-prices" element={<StockPrices />} />
      </Routes>
    </Router>
  );
}

export default App;