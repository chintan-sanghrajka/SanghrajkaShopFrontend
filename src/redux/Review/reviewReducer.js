const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
  success: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REVIEWS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_REVIEWS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        reviews: action.payload,
      };
    case "GET_REVIEWS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_REVIEW_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_REVIEW_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case "ADD_REVIEW_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_REVIEW_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_REVIEW_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case "DELETE_REVIEW_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
