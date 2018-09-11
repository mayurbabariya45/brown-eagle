import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Account/Orders_action_type";

export const getOrders = (authId, page) => ({
  [RSAA]: {
    endpoint: `order?page=${page}&perPage=20&buyer=${authId}`,
    method: "GET",
    types: [a.GET_ORDERS_REQUEST, a.GET_ORDERS_SUCCESS, a.GET_ORDERS_FAILURE]
  }
});
export const payment = (orderId, token) => ({
  [RSAA]: {
    endpoint: `order/${orderId}/payment/${token}`,
    method: "GET",
    types: [a.ADD_PAYMENT_REQUEST, a.ADD_PAYMENT_SUCCESS, a.ADD_PAYMENT_FAILURE]
  }
});

export const cancelOrder = (orderId, status) => ({
  [RSAA]: {
    endpoint: `order/${orderId}/status/${status}`,
    method: "GET",
    types: [
      a.CHANGE_ORDERS_STATUS_REQUEST,
      a.CHANGE_ORDERS_STATUS_SUCCESS,
      a.CHANGE_ORDERS_STATUS_FAILURE
    ]
  }
});
export const getOrderTransactions = (buyer, orderId) => ({
  [RSAA]: {
    endpoint: `order/${orderId}/transactions?buyer=${buyer}&type=order_update`,
    method: "GET",
    types: [
      a.GET_ORDER_TRANSACTIONS_REQUEST,
      a.GET_ORDER_TRANSACTIONS_SUCCESS,
      a.GET_ORDER_TRANSACTIONS_FAILURE
    ]
  }
});
