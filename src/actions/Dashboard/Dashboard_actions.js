import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

export const addProduct = product => ({
  [RSAA]: {
    endpoint: "http://35.200.219.57:8000/v1/product",
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
    types: [a.ADD_PRODUCT_REQUEST, a.ADD_PRODUCT_SUCCESS, a.ADD_PRODUCT_FAILURE]
  }
});
