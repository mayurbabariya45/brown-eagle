import _ from "lodash";
import { RSAA } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/Home/Home_action_type";

export const getCategories = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
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
export const getTopBanners = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "home/image?status=enabled&position=top",
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_TOP_BANNERS_REQUEST,
        a.GET_TOP_BANNERS_SUCCESS,
        a.GET_TOP_BANNERS_FAILURE
      ]
    }
  });
export const getCenterBanners = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "home/image?status=enabled&position=center",
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_CENTER_BANNERS_REQUEST,
        a.GET_CENTER_BANNERS_SUCCESS,
        a.GET_CENTER_BANNERS_FAILURE
      ]
    }
  });
export const getBottomBanners = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "home/image?status=enabled&position=bottom",
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_BOTTOM_BANNERS_REQUEST,
        a.GET_BOTTOM_BANNERS_SUCCESS,
        a.GET_BOTTOM_BANNERS_FAILURE
      ]
    }
  });
