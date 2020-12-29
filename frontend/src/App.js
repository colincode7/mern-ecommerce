import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screen/HomeScreen";
import "./index.css";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen";
import PaymentMethod from "./screen/PaymentMethod";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <main className="mx-5 px-4 py-4">
          <Route path="/" component={Home} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/products/:category/:id" component={ProductScreen} />
          <Route path="/cart/:category?/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethod} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
