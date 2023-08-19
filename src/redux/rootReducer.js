import categoriesReducer from "./Category/categoryReducer.js";
import subCategoriesReducer from "./SubCategory/subCategoryReducer.js";
import productReducer from "./Product/productReducer.js";
import reviewsReducer from "./Review/reviewReducer.js";
import cartReducer from "./Cart/cartReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  productList: productReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
});

export default rootReducer;
