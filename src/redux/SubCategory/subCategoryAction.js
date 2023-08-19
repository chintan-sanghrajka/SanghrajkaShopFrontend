import axios from "axios";
import { BASE_URL } from "./../../components/helper.js";

export const getSubCategories = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_SUBCATEGORIES_PENDING" });
    return axios
      .post(`${BASE_URL}get-sub-categories`, { categoryId: id })
      .then((res) => {
        const subCategories = res.data.subCategories;
        dispatch({ type: "GET_SUBCATEGORIES_SUCCESS", payload: subCategories });
      })
      .catch((error) => {
        dispatch({ type: "GET_SUBCATEGORIES_FAIL", payload: error.message });
      });
  };
};
