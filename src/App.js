import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/userComponents/LoginPage.jsx";
import SignupPage from "./components/userComponents/SignupPage.jsx";
import LoginPageOTP from "./components/userComponents/LoginPageOTP.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import PublicRoute from "./auth/PublicRoute";
import Home from "./components/productComponent/Home.jsx";
import ProductList from "./components/productComponent/ProductList.jsx";
import SubCategories from "./components/productComponent/SubCategories.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import Product from "./components/productComponent/Product.jsx";
import UserCart from "./components/productComponent/UserCart.jsx";

function App() {
  axios.interceptors.request.use((request) => {
    let token = Cookies.get("token");
    request.headers.authorization = token;
    return request;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/:userSearch" element={<ProductList />} />
            <Route
              path="/sub-categories/:name/:id"
              element={<SubCategories />}
            />
            <Route path="/products/:name/:id" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/user-cart" element={<UserCart />} />
          </Route>

          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup/:role" element={<SignupPage />} />
            <Route path="/login-with-OTP" element={<LoginPageOTP />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
