import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: false
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case a.VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false
      };
    case a.VERIFICATION_EMAIL_FAILURE:
      return {
        ...state,
        error: true,
        message: action.payload.response.message,
        loading: false
      };
    default:
      return state;
  }
};
