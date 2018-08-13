import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

export const getProducts = (id, page = 1) => ({
  [RSAA]: {
    endpoint: `product?seller=${id}&page=${page}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_PRODUCTS_REQUEST,
      a.GET_PRODUCTS_SUCCESS,
      a.GET_PRODUCTS_FAILURE
    ]
  }
});
export const getProduct = product => ({
  type: a.GET_PRODUCT_SUCCESS,
  product
});
export const getProductImage = (id, token) => ({
  [RSAA]: {
    endpoint: `product/${id}/image`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_PRODUCT_IMAGE_REQUEST,
      a.GET_PRODUCT_IMAGE_SUCCESS,
      a.GET_PRODUCT_IMAGE_FAILURE
    ]
  }
});

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



export const deleteProductImage = (productId, imageId) => ({
  [RSAA]: {
    endpoint: `product/${productId}/image/${imageId}`,
    method: "DELETE",
    types: [
      a.DELETE_PRODUCT_IMAGE_REQUEST,
      {
        type: a.DELETE_PRODUCT_IMAGE_SUCCESS,
        meta: { imageId }
      },
      a.DELETE_PRODUCT_IMAGE_FAILURE
    ]
  }
});

export const deleteProduct = id => ({
  [RSAA]: {
    endpoint: `product/${id}`,
    method: "DELETE",
    types: [
      a.DELETE_PRODUCT_REQUEST,
      {
        type: a.DELETE_PRODUCT_SUCCESS,
        meta: { id }
      },
      a.DELETE_PRODUCT_FAILURE
    ]
  }
});
export const getLocation = (lat, lng) => ({
  [RSAA]: {
    endpoint: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBWPufkpoBVSbyfwu-xVuXPea5YZQJj3OY`,
    method: "GET",
    types: [
      a.GET_LOCATION_REQUEST,
      a.GET_LOCATION_SUCCESS,
      a.GET_LOCATION_FAILURE
    ]
  }
});

export const handleInputMap = types => dispatch => {
  dispatch({
    type: a.SHOW_MAP,
    types
  });
};

export const getProductReview = (productId, page) => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `product/${productId}/review?page=${page}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_PRODUCT_REVIEW_REQUEST,
        a.GET_PRODUCT_REVIEW_SUCCESS,
        a.GET_PRODUCT_REVIEW_FAILURE
      ]
    }
  });
};

export const changeProductReviewStatus = (productId, reviewId, status) => ({
  [RSAA]: {
    endpoint: `product/${productId}/review/${reviewId}/status/${status}`,
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    types: [
      a.CHANGE_PRODUCT_STATUS_REVIEW_REQUEST,
      a.CHANGE_PRODUCT_STATUS_REVIEW_SUCCESS,
      a.CHANGE_PRODUCT_STATUS_REVIEW_FAILURE
    ]
  }
});
export const updateProduct = (product, locale) => ({
  [RSAA]: {
    endpoint: `product/${product.id}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
    types: [
      a.UPDATE_PRODUCT_REQUEST,
      a.UPDATE_PRODUCT_SUCCESS,
      a.UPDATE_PRODUCT_FAILURE
    ]
  }
});
export const editProductReview = (values, productId, reviewId) => ({
  [RSAA]: {
    endpoint: `product/${productId}/review/${reviewId}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    types: [
      a.EDIT_PRODUCT_REVIEW_REQUEST,
      a.EDIT_PRODUCT_REVIEW_SUCCESS,
      a.EDIT_PRODUCT_REVIEW_FAILURE
    ]
  }
});
