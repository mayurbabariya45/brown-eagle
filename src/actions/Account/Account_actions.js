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
