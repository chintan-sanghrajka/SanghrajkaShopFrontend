import axios from "axios";
import { BASE_URL } from "./../../components/helper.js";

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_CATEGORIES_PENDING" });
    return axios
      .get(`${BASE_URL}get-categories`)
      .then((res) => {
        const categories = res.data.categories;
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: categories });
      })
      .catch((error) => {
        dispatch({ type: "GET_CATEGORIES_FAIL", payload: error.message });
      });
  };
};
