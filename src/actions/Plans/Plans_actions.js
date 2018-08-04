import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Plans/Plans_action_types";

export const getPlans = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "plan?page=1&perPage=10",
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [a.GET_PLANS_REQUEST, a.GET_PLANS_SUCCESS, a.GET_PLANS_FAILURE]
    }
  });

export const getServices = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "service?service=1&perPage=10",
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_SERVICES_REQUEST,
        a.GET_SERVICES_SUCCESS,
        a.GET_SERVICES_FAILURE
      ]
    }
  });