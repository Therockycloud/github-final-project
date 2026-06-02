import { Link, Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUs.jsx";
import CartItem from "./CartItem.jsx";
import ProductList from "./ProductList.jsx";

function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-content">
        <p className="eyebrow">Indoor plants delivered with care</p>
        <h1>Paradise Nursery</h1>
        <p>
          Bring fresh color, clean air, and calm energy into your home with
          carefully selected houseplants for every room.
        </p>
        <Link className="primary-button" to="/plants">
          Get Started
        </Link>
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}

export default App;
