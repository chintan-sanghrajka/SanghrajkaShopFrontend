import axios from "axios";
import { BASE_URL } from "./../../components/helper.js";
import Cookies from "js-cookie";

export const getProductBySearch = (userSearch) => {
  return async (dispatch) => {
    const user = JSON.parse(Cookies.get("user"));
    dispatch({ type: "GET_PRODUCT_SEARCH_PENDING" });
    return axios
      .post(`${BASE_URL}get-products`, {
        keys: userSearch,
        page: 1,
        limit: 4,
        userId: user._id,
        role: user.role,
      })
      .then((res) => {
        const productList = res.data.productList;
        dispatch({ type: "GET_PRODUCT_SEARCH_SUCCESS", payload: productList });
      })
      .catch((error) => {
        dispatch({ type: "GET_PRODUCT_SEARCH_FAIL", payload: error.message });
      });
  };
};

export const getProductBySubCat = (id) => {
  return async (dispatch) => {
    const user = JSON.parse(Cookies.get("user"));
    dispatch({ type: "GET_PRODUCT_CAT_PENDING" });
    return axios
      .post(`${BASE_URL}get-products-cat`, {
        subCategoryId: id,
        page: 1,
        limit: 4,
        userId: user._id,
        role: user.role,
      })
      .then((res) => {
        const productList = res.data.productList;
        dispatch({ type: "GET_PRODUCT_CAT_SUCCESS", payload: productList });
      })
      .catch((error) => {
        dispatch({ type: "GET_PRODUCT_CAT_FAIL", payload: error.message });
      });
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_PRODUCT_PENDING" });
    return axios
      .post(`${BASE_URL}get-product`, { productId: id })
      .then((res) => {
        const product = res.data.product[0];
        dispatch({ type: "GET_PRODUCT_SUCCESS", payload: product });
      })
      .catch((error) => {
        dispatch({ type: "GET_PRODUCT_FAIL", payload: error.message });
      });
  };
};
