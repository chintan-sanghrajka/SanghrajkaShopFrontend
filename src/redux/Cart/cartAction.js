import axios from "axios";
import { BASE_URL } from "./../../components/helper.js";
import Cookies from "js-cookie";

export const addToCart = (product) => {
  const user = JSON.parse(Cookies.get("user"));
  return async (dispatch) => {
    dispatch({ type: "ADD_TO_CART_PENDING" });
    return axios
      .post(`${BASE_URL}add-product-to-cart`, {
        productId: product._id,
        userId: user._id,
      })
      .then((res) => {
        dispatch({ type: "ADD_TO_CART_SUCCESS", payload: res.data.max });
        return Promise.resolve(res.data.max);
      })
      .catch((error) => {
        console.log(error.response.status);
        dispatch({ type: "ADD_TO_CART_FAILED", payload: error.message });
      });
  };
};

export const getProductsFromCart = () => {
  const user = JSON.parse(Cookies.get("user"));
  return async (dispatch) => {
    dispatch({ type: "GET_CART_PRODUCTS_PENDING" });
    return axios
      .post(`${BASE_URL}get-cart-products`, {
        userId: user._id,
        page: 1,
        limit: 4,
      })
      .then((res) => {
        const products = res.data.products;
        dispatch({ type: "GET_CART_PRODUCTS_SUCCESS", payload: products });
      })
      .catch((error) => {
        dispatch({ type: "GET_CART_PRODUCTS_FAILED", payload: error.message });
      });
  };
};

export const deleteFromCart = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CART_PRODUCTS_PENDING" });
    return axios
      .post(`${BASE_URL}delete-from-cart`, {
        cartId: id,
      })
      .then((res) => {
        dispatch({
          type: "DELETE_CART_PRODUCTS_SUCCESS",
          payload: res.data.message,
        });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "GET_CART_PRODUCTS_FAILED", payload: error.message });
      });
  };
};

export const buyProduct = (productId, count) => {
  const user = JSON.parse(Cookies.get("user"));
  return async (dispatch) => {
    dispatch({ type: "BUY_PRODUCT_PENDING" });
    return axios
      .post(`${BASE_URL}buy-product`, {
        productId: productId,
        count: count,
        userId: user._id,
      })
      .then((res) => {
        dispatch({ type: "BUY_PRODUCT_SUCCESS", payload: true });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "BUY_PRODUCT_FAILED", payload: error.message });
      });
  };
};

export const updateCartProduct = (id, action) => {
  console.log(id, action);
  const user = JSON.parse(Cookies.get("user"));
  return async (dispatch) => {
    dispatch({ type: "UPDATE_CART_PENDING" });
    return axios
      .put(`${BASE_URL}update-cart`, {
        productId: id,
        action: action,
        userId: user._id,
      })
      .then((res) => {
        dispatch({ type: "UPDATE_CART_SUCCESS", payload: true });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_CART_FAILED", payload: error.message });
      });
  };
};
