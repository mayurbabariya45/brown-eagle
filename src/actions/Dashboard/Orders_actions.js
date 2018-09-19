import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Orders_action_type";

export const getOrders = (authId, status = "all", page) => {
  let endStatus = "";
  if (status !== "all") {
    endStatus = `&status=${status}`;
  }
  return {
    [RSAA]: {
      endpoint: `order?page=${page}&perPage=20&seller=${authId}${endStatus}`,
      method: "GET",
      types: [
        a.GET_SELLER_ORDERS_REQUEST,
        a.GET_SELLER_ORDERS_SUCCESS,
        a.GET_SELLER_ORDERS_FAILURE
      ]
    }
  };
};

export const changeOrderStatus = (orderId, status) => ({
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

export const updateOrder = values => ({
  [RSAA]: {
    endpoint: `order/${values.id}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(values),
    types: [
      a.UPDATE_ORDER_REQUEST,
      a.UPDATE_ORDER_SUCCESS,
      a.UPDATE_ORDER_FAILURE
    ]
  }
});

export const getOrderTransactions = (orderId, seller) => ({
  [RSAA]: {
    endpoint: `order/${orderId}/transactions?seller=${seller}&type=order_update`,
    method: "GET",
    types: [
      a.GET_SELLER_ORDER_TRANSACTIONS_REQUEST,
      a.GET_SELLER_ORDER_TRANSACTIONS_SUCCESS,
      a.GET_SELLER_ORDER_TRANSACTIONS_FAILURE
    ]
  }
});

export const selectFilters = value => ({
  type: a.SELECT_ORDER_FILTER,
  value
});
