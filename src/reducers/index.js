import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifications } from "react-notification-system-redux";
import { IntlReducer as Intl } from "react-redux-multilingual";
import newsLetterReducer from "./NewsLetterReducer/NewsLetterReducer";
import quotationReducer from "./QuotationReducer/QuotationReducer";
import productReducer from "./ProductReducer/ProductReducer";
import authReducer from "./AuthReducer/AuthReducer";
import verificationReducer from "./AuthReducer/VerificationReducer";
import dashboardReducer from "./DashboardReducer/DashboardReducer";
import searchCategoriesReducer from "./SearchCategoriesReducer/SearchCategoriesReducer";
import categoriesReducer from "./CategoriesReducer/CategoriesReducer";

const rootReducers = combineReducers({
  newsLetter: newsLetterReducer,
  quotation: quotationReducer,
  product: productReducer,
  auth: authReducer,
  form: formReducer,
  searchCategories: searchCategoriesReducer,
  categories: categoriesReducer,
  dashboard: dashboardReducer,
  verification: verificationReducer,
  Intl,
  notifications
});

export default rootReducers;
