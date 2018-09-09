import { ActionTypes as a } from "../../constants/SellerProfile/SellerProfile";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  profile: {},
  products: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_SELLER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        profile: {}
      };
    case a.GET_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case a.GET_SELLER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case a.GET_SELLER_PRODUCTS_REQUEST:
      return {
        ...state,
        isProductLoading: true
      };
    case a.GET_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isProductLoading: false,
        success: true,
        products: action.payload.products
      };
    case a.GET_SELLER_PRODUCTS_FAILURE:
      return {
        ...state,
        isProductLoading: false,
        error: true
      };
    default:
      return state;
  }
};
