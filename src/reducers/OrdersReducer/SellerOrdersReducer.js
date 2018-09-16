import { ActionTypes as a } from "../../constants/Dashboard/Orders_action_type";

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: false,
  orders: [],
  transactions: [],
  selectedFilter: "All"
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_SELLER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SELLER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
      };
    case a.GET_SELLER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.CHANGE_ORDERS_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.CHANGE_ORDERS_STATUS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.CHANGE_ORDERS_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.GET_SELLER_ORDER_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case a.GET_SELLER_ORDER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: action.payload.transactions
      };
    case a.GET_SELLER_ORDER_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case a.SELECT_FILTER:
      return {
        ...state,
        selectedFilter: action.value
      };
    default:
      return state;
  }
};
