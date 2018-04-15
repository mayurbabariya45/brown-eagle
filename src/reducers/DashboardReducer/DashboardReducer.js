import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case a.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };
    case a.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    default:
      return state;
  }
};
