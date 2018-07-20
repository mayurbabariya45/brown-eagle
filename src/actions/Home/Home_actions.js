import _ from "lodash";
import { RSAA } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/Home/Home_action_type";

export const getCategories = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "category",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.GET_CATEGORIES_REQUEST,
        a.GET_CATEGORIES_SUCCESS,
        a.GET_CATEGORIES_FAILURE
      ]
    }
  });

export const getProducts = category => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `product?page=1&category=${category.id}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_CATEGORY_PRODUCTS_REQUEST,
        {
          type: a.GET_CATEGORY_PRODUCTS_SUCCESS,
          meta: category
        },
        a.GET_CATEGORY_PRODUCTS_FAILURE
      ]
    }
  });
