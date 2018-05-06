import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

export const getProducts = (id, token) => ({
  [RSAA]: {
    endpoint: `http://35.197.140.149:8000/v1/product?seller=${id}&status=pending`,
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
    endpoint: `http://35.197.140.149:8000/v1/product/${id}/image`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_PRODUCT_IMAGE_REQUEST,
      a.GET_PRODUCT_IMAGE_SUCCESS,
      a.GET_PRODUCT_IMAGE_FAILURE
    ]
  }
});

export const updateProduct = product => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/product/${product.id}`,
    method: "PATCH",
    body: JSON.stringify(product),
    types: [
      a.UPDATE_PRODUCT_REQUEST,
      a.UPDATE_PRODUCT_SUCCESS,
      a.UPDATE_PRODUCT_FAILURE
    ]
  }
});

export const deleteProductImage = (productId, imageId) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/product/${productId}/image/${imageId}`,
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
    endpoint: `http://35.200.219.57:8000/v1/product/${id}`,
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
    endpoint: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAqnSEwwuF8EaWNFEWi4v5q5mGjTJBOW5Q`,
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

export const getCategories = () => dispatch => {
  dispatch({
    type: a.GET_CATEGORY_SUCCESS
  });
};
