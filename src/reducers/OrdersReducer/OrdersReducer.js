import { ActionTypes as a } from "../../constants/Account/Orders_action_type";

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: false,
  isLoading: false,
  orders: [],
  transactions: [],
  selectedFilter: {
    name: "All",
    status: "all"
  }
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
      };
    case a.CANCEL_ORDER_REQUEST:
      return {
        ...state,
        loading: false
      };
    case a.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.CANCEL_ORDER_FAILURE:
      return {
        ...state,
        loading: false
      };
    case a.GET_ORDER_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case a.GET_ORDER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactions: action.payload.transactions
      };
    case a.GET_ORDER_TRANSACTIONS_FAILURE:
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
