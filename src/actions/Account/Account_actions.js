import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Account/Account_action_type";

export const getWishList = authId => ({
  [RSAA]: {
    endpoint: `product/buyer/${authId}/favorite`,
    method: "GET",
    types: [
      a.GET_WISHLIST_REQUEST,
      a.GET_WISHLIST_SUCCESS,
      a.GET_WISHLIST_FAILURE
    ]
  }
});

export const removeWishListProduct = (authId, productId, locale) => ({
  [RSAA]: {
    endpoint: `product/${productId}/buyer/${authId}/favorite`,
    method: "DELETE",
    types: [
      a.REMOVE_WISHLIST_REQUEST,
      {
        type: a.REMOVE_WISHLIST_SUCCESS,
        meta: { productId }
      },
      a.REMOVE_WISHLIST_FAILURE
    ]
  }
});

export const addToWishlistProduct = (authId, productId) => ({
  [RSAA]: {
    endpoint: `buyer/${authId}`,
    method: "POST",
    types: [
      a.ADD_TO_WISHLIST_REQUEST,
      a.ADD_TO_WISHLIST_SUCCESS,
      a.ADD_TO_WISHLIST_FAILURE
    ]
  }
});

export const resendEmail = (email, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `auth/verify/resendEmail?ln=${locale}`,
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      types: [
        a.VERIFY_EMAIL_REQUEST,
        a.VERIFY_EMAIL_SUCCESS,
        a.VERIFY_EMAIL_FAILURE
      ]
    }
  });
export const getLocation = (lat, lng) => ({
  [RSAA]: {
    endpoint: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBWPufkpoBVSbyfwu-xVuXPea5YZQJj3OY`,
    method: "GET",
    types: [
      a.GET_BUYER_LOCATION_REQUEST,
      a.GET_BUYER_LOCATION_SUCCESS,
      a.GET_BUYER_LOCATION_FAILURE
    ]
  }
});

export const handleInputMap = types => dispatch => {
  dispatch({
    type: a.SHOW_BUYER_MAP,
    types
  });
};
export const location = coordinates => dispatch => {
  dispatch({
    type: a.ADD_BUYER_LOCATION,
    coordinates
  });
};
