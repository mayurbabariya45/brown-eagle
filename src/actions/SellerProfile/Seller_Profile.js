import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/SellerProfile/SellerProfile";

export const getCompanyProfile = authId => ({
  [RSAA]: {
    endpoint: `seller/${authId}`,
    method: "GET",
    types: [
      a.GET_SELLER_PROFILE_REQUEST,
      a.GET_SELLER_PROFILE_SUCCESS,
      a.GET_SELLER_PROFILE_FAILURE
    ]
  }
});

export const getProducts = sellerId => ({
  [RSAA]: {
    endpoint: `product?seller=${sellerId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_SELLER_PRODUCTS_REQUEST,
      a.GET_SELLER_PRODUCTS_SUCCESS,
      a.GET_SELLER_PRODUCTS_FAILURE
    ]
  }
});
