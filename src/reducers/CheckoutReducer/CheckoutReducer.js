import { ActionTypes as a } from "../../constants/Checkout/Checkout_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  addAddress: false,
  address: {}
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.ADD_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.ADD_ORDER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        address: action.values,
        addAddress: true
      };
    default:
      return state;
  }
};
