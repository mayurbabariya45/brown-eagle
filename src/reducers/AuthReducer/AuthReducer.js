import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";

const INITIAL_STATE = {
  loginForm: false,
  loading: false,
  success: false,
  errors: false,
  activeTabs: 1,
  formData: {},
  registerSuccess: false,
  emailSent: "",
  user: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // TOGGLE_LOGIN_FORM
    case a.TOGGLE_LOGIN_FORM:
      return {
        ...state,
        loginForm: !state.loginForm
      };
    // FLUSH_STATE
    case a.FLUSH_STATE:
      return {
        ...state,
        success: false,
        errors: false,
        message: ""
      };

    /** *** Login Request****** */

    case a.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        errors: false,
        success: false
      };
    case a.LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload.user, ...action.payload.auth },
        success: true,
        loading: false
      };
    case a.LOGIN_FAILURE:
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
    case a.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
        errors: false,
        success: false
      };
    case a.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
        success: true
      };
    case a.PASSWORD_RESET_FAILURE:
      return {
        ...state,
        loading: false,
        errors: true,
        success: false,
        message: action.payload.response.message
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
        emailSent: action.payload.message
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
