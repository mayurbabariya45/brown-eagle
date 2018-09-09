import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/FilterSellers/FilterSellers";

export const getSellers = location => ({
  [RSAA]: {
    endpoint: `seller/autoComplete?location=${location}`,
    method: "GET",
    types: [a.GET_SELLERS_REQUEST, a.GET_SELLERS_SUCCESS, a.GET_SELLERS_FAILURE]
  }
});
