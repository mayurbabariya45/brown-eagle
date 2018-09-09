import { ActionTypes as a } from "../../constants/FilterSellers/FilterSellers";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  sellers: {
    count: 0,
    page: 1
  }
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_SELLERS_REQUEST:
      return {
        ...state
      };
    case a.GET_SELLERS_SUCCESS:
      return {
        ...state,
        sellers: action.payload
      };
    case a.GET_SELLERS_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
