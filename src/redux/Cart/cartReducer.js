const initialState = {
  products: [],
  isLoading: false,
  error: null,
  success: null,
  max: null,
  message: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_PRODUCTS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_CART_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        success: true,
      };
    case "GET_CART_PRODUCTS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_TO_CART_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        max: action.payload,
      };
    case "ADD_TO_CART_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_CART_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_CART_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        message: action.payload,
      };
    case "DELETE_CART_PRODUCT_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "BUY_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "BUY_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case "BUY_PRODUCT_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_CART_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_CART_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };
    case "UPDATE_CART_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
