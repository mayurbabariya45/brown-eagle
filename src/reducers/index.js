import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifications } from "react-notification-system-redux";
import { IntlReducer as Intl } from "react-redux-multilingual";
import newsLetterReducer from "./NewsLetterReducer/NewsLetterReducer";
import quotationReducer from "./QuotationReducer/QuotationReducer";
import productReducer from "./ProductReducer/ProductReducer";
import authReducer from "./AuthReducer/AuthReducer";
import dashboardReducer from "./DashboardReducer/DashboardReducer";
import searchCategoriesReducer from "./SearchCategoriesReducer/SearchCategoriesReducer";

const rootReducers = combineReducers({
  newsLetter: newsLetterReducer,
  quotation: quotationReducer,
  product: productReducer,
  auth: authReducer,
  form: formReducer,
  categories: searchCategoriesReducer,
  dashboard: dashboardReducer,
  Intl,
  notifications
});

export default rootReducers;
