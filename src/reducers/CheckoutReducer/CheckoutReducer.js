import { ActionTypes as a } from "../../constants/Checkout/Checkout_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  addAddress: false,
  orderLoading: false,
  orderSuccess: false,
  showOrder: false,
  address: {},
  shippingOptions: [],
  selectedShipping: {},
  isShippingError: false
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
        orderLoading: true,
        loading: true
      };
    case a.ADD_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        loading: false,
        success: true,
        orderSuccess: true
      };
    case a.ADD_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: false,
        error: true,
        loading: false
      };
    case a.GET_SHIPPING_OPTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        shippingOptions: action.payload,
        isShippingError: false,
        showOrder: true
      };
    case a.GET_SHIPPING_OPTIONS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        isShippingError: true
      };
    case a.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        address: action.values,
        addAddress: true
      };
    case a.SELECT_SHIPPING_OPTION: 
    return {
      ...state,
      selectedShipping: action.option
    }  
    case a.FLUSH_ORDER:
      return {
        ...state,
        orderSuccess: false,
        addAddress: false,
        address: {}
      };
    default:
      return state;
  }
};
