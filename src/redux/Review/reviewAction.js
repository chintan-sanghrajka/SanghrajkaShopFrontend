import axios from "axios";
import { BASE_URL } from "./../../components/helper.js";
import Cookies from "js-cookie";

export const getReviews = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_REVIEWS_PENDING" });
    return axios
      .post(`${BASE_URL}get-reviews`, {
        productId: id,
        page: 1,
        limit: 50,
      })
      .then((res) => {
        const reviews = res.data.reviews;
        dispatch({ type: "GET_REVIEWS_SUCCESS", payload: reviews });
      })
      .catch((error) => {
        dispatch({ type: "GET_REVIEWS_FAIL", payload: error.message });
      });
  };
};

export const addReview = (review, productId) => {
  const user = JSON.parse(Cookies.get("user"));
  return async (dispatch) => {
    dispatch({ type: "ADD_REVIEW_PENDING" });
    return axios
      .post(`${BASE_URL}add-review`, {
        productId: productId,
        review: review,
        userName: user.userName,
      })
      .then((res) => {
        dispatch({ type: "ADD_REVIEW_SUCCESS", payload: "Success" });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "ADD_REVIEW_FAILED", payload: error.message });
      });
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_REVIEW_PENDING" });
    return axios
      .delete(`${BASE_URL}delete-review?reviewId=${id}`)
      .then((res) => {
        dispatch({ type: "DELETE_REVIEW_SUCCESS", payload: "Success" });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "DELETE_REVIEW_FAILED", payload: error.message });
      });
  };
};
