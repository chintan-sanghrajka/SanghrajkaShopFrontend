const initialState = {
  subCategories: [],
  isLoading: false,
  error: null,
};

const subCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUBCATEGORIES_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_SUBCATEGORIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        subCategories: action.payload,
      };
    case "GET_SUBCATEGORIES_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subCategoriesReducer;
