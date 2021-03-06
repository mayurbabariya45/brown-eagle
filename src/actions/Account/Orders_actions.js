import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Account/Orders_action_type";

export const getOrders = (authId, page, status = "all") => {
  let endpoint = `order?page=${page}&perPage=20&buyer=${authId}`;
  if (status !== "all") {
    endpoint = `order?page=${page}&perPage=20&buyer=${authId}&status=${status}`;
  }
  return {
    [RSAA]: {
      endpoint,
      method: "GET",
      types: [a.GET_ORDERS_REQUEST, a.GET_ORDERS_SUCCESS, a.GET_ORDERS_FAILURE]
    }
  };
};

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
export const selectFilters = value => ({
  type: a.SELECT_FILTER,
  value
});

export const getTermAndCondition = loc => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `terms?location=${loc}&page=1&perPage=1`,
      method: "GET",
      types: [
        a.GET_TERMS_CONDTION_REQUEST,
        a.GET_TERMS_CONDTION_SUCCESS,
        a.GET_TERMS_CONDTION_FAILURE
      ]
    }
  });
