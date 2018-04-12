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
    case a.PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: "Password has been changed successfully."
      };
    case a.PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
