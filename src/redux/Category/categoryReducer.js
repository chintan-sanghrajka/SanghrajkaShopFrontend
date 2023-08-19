const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case "GET_CATEGORIES_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
