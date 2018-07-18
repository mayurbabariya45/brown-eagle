import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifications } from "react-notification-system-redux";
import { IntlReducer as Intl } from "react-redux-multilingual";
import homeReducer from "./HomeReducer/HomeReducer";
import newsLetterReducer from "./NewsLetterReducer/NewsLetterReducer";
import quotationReducer from "./QuotationReducer/QuotationReducer";
import productReducer from "./ProductReducer/ProductReducer";
import authReducer from "./AuthReducer/AuthReducer";
import verificationReducer from "./AuthReducer/VerificationReducer";
import dashboardReducer from "./DashboardReducer/DashboardReducer";
import searchCategoriesReducer from "./SearchCategoriesReducer/SearchCategoriesReducer";
import categoriesReducer from "./CategoriesReducer/CategoriesReducer";
import cartReducer from "./CartReducer/CartReducer";

const rootReducers = combineReducers({
  home: homeReducer,
  newsLetter: newsLetterReducer,
  quotation: quotationReducer,
  product: productReducer,
  auth: authReducer,
  form: formReducer,
  searchCategories: searchCategoriesReducer,
  categories: categoriesReducer,
  dashboard: dashboardReducer,
  verification: verificationReducer,
  cart: cartReducer,
  Intl,
  notifications
});

export default rootReducers;
