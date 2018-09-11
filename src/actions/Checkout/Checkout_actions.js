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
