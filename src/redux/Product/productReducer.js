const initialState = {
  productList: [],
  product: {},
  isLoading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SEARCH_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PRODUCT_SEARCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        productList: action.payload,
      };
    case "GET_PRODUCT_SEARCH_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_PRODUCT_CAT_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PRODUCT_CAT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        productList: action.payload,
      };
    case "GET_PRODUCT_CAT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case "GET_PRODUCT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
