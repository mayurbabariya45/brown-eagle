import { ActionTypes as a } from "../../constants/Account/Account_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  isLoading: false,
  isResendEmail: false,
  wishList: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishList: action.payload
      };
    case a.GET_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        wishList: {
          ...state.wishList,
          products: state.wishList.products.filter(
            product => product.product._id !== action.meta.productId
          )
        }
      };
    case a.REMOVE_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: false
      };
    case a.VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case a.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isResendEmail: true
      };
    case a.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
