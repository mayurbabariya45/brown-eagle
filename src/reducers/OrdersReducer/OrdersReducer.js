import { ActionTypes as a } from "../../constants/Account/Orders_action_type";

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: false,
  orders: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
      };
    case a.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.ADD_PAYMENT_REQUEST:
      return {
        ...state,
        loading: false
      };
    case a.ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.ADD_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }  
    default:
      return state;
  }
};
