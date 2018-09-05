import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Orders_action_type";

export const getOrders = (authId, page) => ({
  [RSAA]: {
    endpoint: `order?page=${page}&perPage=20&seller=${authId}`,
    method: "GET",
    types: [
      a.GET_SELLER_ORDERS_REQUEST,
      a.GET_SELLER_ORDERS_SUCCESS,
      a.GET_SELLER_ORDERS_FAILURE
    ]
  }
});

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
