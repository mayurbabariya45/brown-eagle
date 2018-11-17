import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Checkout/Checkout_action_type";

export const createOrder = values => ({
  [RSAA]: {
    endpoint: "order",
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(values),
    types: [a.ADD_ORDER_REQUEST, a.ADD_ORDER_SUCCESS, a.ADD_ORDER_FAILURE]
  }
});

export const saveAddress = values => ({
  type: a.SAVE_SHIPPING_ADDRESS,
  values
});

export const flushCheckout = () => ({
  type: a.FLUSH_ORDER
});
export const nextStep = () => ({
  type: a.NEXT_STEP
});
export const selectShippingOption = value => ({
  type: a.SELECT_SHIPPING_OPTION,
  option: value
});
export const getShippingOptions = values => ({
  [RSAA]: {
    endpoint: "cart/delivery",
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(values),
    types: [
      a.GET_SHIPPING_OPTIONS_REQUEST,
      a.GET_SHIPPING_OPTIONS_SUCCESS,
      a.GET_SHIPPING_OPTIONS_FAILURE
    ]
  }
});
