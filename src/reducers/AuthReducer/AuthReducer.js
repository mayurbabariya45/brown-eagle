import _ from "lodash";
import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";

const INITIAL_STATE = {
  loginForm: false,
  loading: false,
  isLoading: false,
  loader: false,
  success: false,
  errors: false,
  activeTabs: 1,
  formData: {},
  registerSuccess: false,
  emailSent: "",
  user: [],
  activePlan: {}
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
      if (action.payload) {
        localStorage.setItem("webAuthToken", action.payload.auth.key);
        localStorage.setItem("webAuthId", action.payload.user.id);
        localStorage.setItem("webAuthRole", action.payload.user.role);
      }
      return {
        ...state,
        user: { ...action.payload.user },
        auth: { ...action.payload.auth },
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

    /** *** AUTH_STATUS ****** */

    case a.AUTH_STATUS_REQUEST:
      return {
        ...state,
        loader: true,
        errors: false,
        success: false
      };
    case a.AUTH_STATUS_SUCCESS:
      return {
        ...state,
        success: true,
        loader: false
      };
    case a.AUTH_STATUS_FAILURE:
      return {
        ...state,
        errors: true,
        loader: false
      };
    case a.LOGOUT_REQUEST:
      localStorage.removeItem("webAuthToken");
      localStorage.removeItem("webAuthId");
      localStorage.removeItem("webAuthRole");
      return {
        ...state,
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
    case a.LOGOUT_SUCCESS:
      return {
        ...state
      };
    case a.LOGOUT_FAILURE:
      return {
        ...state
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
    case a.PASSWORD_RESET_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        errors: false,
        success: false
      };
    case a.PASSWORD_RESET_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
        success: true,
        message: action.payload.message
      };
    case a.PASSWORD_RESET_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        errors: true,
        success: false,
        message: action.payload.response.message
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
    case a.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loader: true
      };
    case a.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loader: false,
        success: false,
        user: { ...action.payload }
      };
    case a.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loader: false,
        error: true
      };
    case a.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: false,
        user: { ...action.payload }
      };
    case a.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

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
    case a.UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        success: false,
        loading: false,
        user: { ...action.payload }
      };
    case a.UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.GET_SELLER_ACTIVE_PLAN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SELLER_ACTIVE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        activePlan: action.payload.plan
      };
    case a.GET_SELLER_ACTIVE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.UPLOAD_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.UPLOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        success: false,
        loading: false
      };
    case a.UPLOAD_CERTIFICATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.UPDATE_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.UPDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        success: false,
        loading: false,
        user: {
          ...state.user,
          certificates: state.user.certificates.concat(action.payload)
        }
      };
    case a.UPDATE_CERTIFICATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.DELETE_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.DELETE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        success: false,
        loading: false,
        user: {
          ...state.user,
          certificates: _.filter(
            state.user.certificates,
            certificate => certificate._id !== action.meta
          )
        }
      };
    case a.DELETE_CERTIFICATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.UPLOAD_VIDEO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.UPLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        success: false,
        loading: false,
        user: action.payload
      };
    case a.UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      };
    case a.ADD_NEW_REFERENCE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case a.ADD_NEW_REFERENCE_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
        user: {
          ...state.user,
          references: state.user.references.concat(action.payload)
        }
      };
    case a.ADD_NEW_REFERENCE_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case a.EDIT_REFERENCE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case a.EDIT_REFERENCE_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
        user: {
          ...state.user,
          references: _.map(state.user.references, reference => {
            if (reference._id === action.meta) {
              return {
                _id: action.payload.id,
                ...action.payload
              };
            }
            return {
              ...reference
            };
          })
        }
      };
    case a.EDIT_REFERENCE_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
