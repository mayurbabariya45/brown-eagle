import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";

const INITIAL_STATE = {
  loginForm: false,
  loading: false,
  success: false,
  errors: false,
  activeTabs: 1,
  formData: {},
  registerSuccess: false,
  user: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.toogleLoginForm:
      return {
        ...state,
        loginForm: !state.loginForm
      };

    /** *** Login Request****** */

    case a.loginRequest:
      return {
        ...state,
        loading: true,
        errors: false,
        success: false
      };
    case a.loginSuccess:
      return {
        ...state,
        user: { ...action.payload.user, ...action.payload.auth },
        success: true,
        loading: false
      };
    case a.loginFailure:
      return {
        ...state,
        errors: true,
        message: action.payload.response.message,
        loading: false
      };
    case a.SOCIAL_LOGIN_REQUEST:
      return {
        ...state
      };
    case a.SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        ...action.payload
      };

    case a.SOCIAL_LOGIN_FAILURE:
      return {
        ...state,
        errors: true,
        message: action.payload.message
      };

    case a.USERNAME_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.USERNAME_SUCCESS:
      return {
        ...state,
        activeTabs: 2,
        formData: {
          ...action.meta
        },
        loading: false,
        success: true,
        errors: false
      };
    case a.USERNAME_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        errors: true,
        message: action.payload.response.message
      };
    case a.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.REGISTER_SUCCESS:
      return {
        ...state,
        activeTabs: 3,
        loading: false,
        success: true,
        errors: false,
        registerSuccess: true,
        user: { ...action.payload.user, ...action.payload.auth }
      };
    case a.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        errors: true,
        message: action.payload.response.message
      };
    default:
      return state;
  }
};
