import { success, error } from "react-notification-system-redux";
import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";
import {
  auth,
  Googleprovider,
  Facebookprovider
} from "../../config/firebase_config";

const notificationOpts = {
  title: "Sample Notification",
  message: "",
  position: "bc",
  autoDismiss: 5
};

/**
 * Show growl notification
 *
 * @returns
 */
export const showNotification = (
  title,
  message,
  fail,
  action = {}
) => dispatch => {
  if (fail) {
    dispatch(
      error({
        ...notificationOpts,
        title: title || "Error",
        message,
        ...action
      })
    );
  } else {
    dispatch(
      success({
        ...notificationOpts,
        title: title || "Success",
        message
      })
    );
  }
};
export const toggleLoginForm = () => ({
  type: a.TOGGLE_LOGIN_FORM
});
export const flushState = () => ({
  type: a.FLUSH_STATE
});
export const checkAuthStatus = (token, id, locale) => ({
  [RSAA]: {
    endpoint: `users/verify/${id}?ln=${locale}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    },
    types: [a.AUTH_STATUS_REQUEST, a.AUTH_STATUS_SUCCESS, a.AUTH_STATUS_FAILURE]
  }
});
export const login = (value, locale) => ({
  [RSAA]: {
    endpoint: `auth/login?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.LOGIN_REQUEST, a.LOGIN_SUCCESS, a.LOGIN_FAILURE]
  }
});

export const checkUsername = (username, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `auth/checkusername/${username}?ln=${locale}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.USERNAME_REQUEST,
        {
          type: a.USERNAME_SUCCESS,
          meta: { username, email: username }
        },
        a.USERNAME_FAILURE
      ]
    }
  });
export const socialAccessToken = (token, provider) => ({
  [RSAA]: {
    endpoint: `auth/${provider}`,
    method: "POST",
    body: JSON.stringify(token),
    headers: { "Content-Type": "application/json" },
    types: [
      a.SOCIAL_LOGIN_TOKEN_REQUEST,
      a.SOCIAL_LOGIN_TOKEN_SUCCESS,
      a.SOCIAL_LOGIN_TOKEN_FAILURE
    ]
  }
});

export const socialLogin = provider => dispatch => {
  dispatch({ type: a.SOCIAL_LOGIN_REQUEST });
  return new Promise((resolve, reject) => {
    let promise;
    if (provider === "google") {
      promise = auth().signInWithPopup(Googleprovider);
    } else if (provider === "facebook") {
      promise = auth().signInWithPopup(Facebookprovider);
    }
    promise
      .then(user => {
        if (provider === "google") {
          auth()
            .currentUser.getIdToken(true)
            .then(token => {
              localStorage.setItem("accessToken", token);
              dispatch({
                type: a.SOCIAL_LOGIN_SUCCESS,
                payload: user
              });
              resolve(user);
            });
        } else {
          auth()
            .currentUser.getIdToken(true)
            .then(token => {
              localStorage.setItem("accessToken", token);
              dispatch({
                type: a.SOCIAL_LOGIN_SUCCESS,
                payload: user
              });
              resolve(user);
            });
        }
      })
      .catch(e => {
        dispatch({
          type: a.SOCIAL_LOGIN_FAILURE,
          payload: e
        });
        reject(e);
      });
  });
};

export const resetPasswordEmail = (value, locale) => ({
  [RSAA]: {
    endpoint: `auth/passwordresetlink?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [
      a.PASSWORD_RESET_EMAIL_REQUEST,
      a.PASSWORD_RESET_EMAIL_SUCCESS,
      a.PASSWORD_RESET_EMAIL_FAILURE
    ]
  }
});
export const resetPassword = (value, locale) => ({
  [RSAA]: {
    endpoint: `auth/reset-password?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [
      a.PASSWORD_RESET_REQUEST,
      a.PASSWORD_RESET_SUCCESS,
      a.PASSWORD_RESET_FAILURE
    ]
  }
});
export const register = (value, locale) => ({
  [RSAA]: {
    endpoint: `auth/register?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.REGISTER_REQUEST, a.REGISTER_SUCCESS, a.REGISTER_FAILURE]
  }
});

export const verifyEmail = (token, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `auth/verify/email?ln=${locale}`,
      method: "POST",
      body: JSON.stringify(token),
      headers: { "Content-Type": "application/json" },
      types: [
        a.VERIFY_EMAIL_REQUEST,
        a.VERIFY_EMAIL_SUCCESS,
        a.VERIFY_EMAIL_FAILURE
      ]
    }
  });

export const verificationEmail = (token, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `auth/verify/email?ln=${locale}`,
      method: "POST",
      body: JSON.stringify(token),
      headers: { "Content-Type": "application/json" },
      types: [
        a.VERIFICATION_EMAIL_REQUEST,
        a.VERIFICATION_EMAIL_SUCCESS,
        a.VERIFICATION_EMAIL_FAILURE
      ]
    }
  });

export const logout = () => dispatch =>
  dispatch({
    type: a.LOGOUT_REQUEST
  });

export const changePassword = value => ({
  [RSAA]: {
    endpoint: `users/${value.id}`,
    method: "PATCH",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [
      a.PASSWORD_CHANGE_REQUEST,
      a.PASSWORD_CHANGE_SUCCESS,
      a.PASSWORD_CHANGE_FAILURE
    ]
  }
});
export const getUserProfile = (token, id, role) => dispatch => {
  const promise =
    role === "seller" ? `seller/${id}?refrence=true` : `buyer/${id}`;
  return dispatch({
    [RSAA]: {
      endpoint: promise,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.GET_USER_PROFILE_REQUEST,
        a.GET_USER_PROFILE_SUCCESS,
        a.GET_USER_PROFILE_FAILURE
      ]
    }
  });
};

export const updateProfile = (value, profileId, role) => dispatch => {
  const promise =
    role === "seller" ? `seller/${profileId}` : `buyer/${profileId}`;
  return dispatch({
    [RSAA]: {
      endpoint: promise,
      method: "PATCH",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
      types: [
        a.UPDATE_PROFILE_REQUEST,
        a.UPDATE_PROFILE_SUCCESS,
        a.UPDATE_PROFILE_FAILURE
      ]
    }
  });
};

export const userAvatar = (value, profileId, role) => dispatch => {
  const promise =
    role === "seller"
      ? `seller/${profileId}/avatar`
      : `buyer/${profileId}/avatar`;
  return dispatch({
    [RSAA]: {
      endpoint: promise,
      method: "POST",
      body: value,
      types: [
        a.UPDATE_AVATAR_REQUEST,
        a.UPDATE_AVATAR_SUCCESS,
        a.UPDATE_AVATAR_FAILURE
      ]
    }
  });
};
export const getSellerActivePlans = authId => ({
  [RSAA]: {
    endpoint: `seller/${authId}/plan`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_SELLER_ACTIVE_PLAN_REQUEST,
      a.GET_SELLER_ACTIVE_PLAN_SUCCESS,
      a.GET_SELLER_ACTIVE_PLAN_FAILURE
    ]
  }
});

export const uploadCertificate = (value, profileId) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${profileId}/certificate`,
      method: "POST",
      body: value,
      types: [
        a.UPLOAD_CERTIFICATE_REQUEST,
        a.UPLOAD_CERTIFICATE_SUCCESS,
        a.UPLOAD_CERTIFICATE_FAILURE
      ]
    }
  });
export const updateCertificate = (
  value,
  profileId,
  certificateId
) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${profileId}/certificate/${certificateId}`,
      method: "POST",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
      types: [
        a.UPDATE_CERTIFICATE_REQUEST,
        a.UPDATE_CERTIFICATE_SUCCESS,
        a.UPDATE_CERTIFICATE_FAILURE
      ]
    }
  });

export const uploadVideo = (value, profileId) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${profileId}/video`,
      method: "POST",
      body: value,
      types: [
        a.UPLOAD_VIDEO_REQUEST,
        a.UPLOAD_VIDEO_SUCCESS,
        a.UPLOAD_VIDEO_FAILURE
      ]
    }
  });

export const deleteCertificate = (profileId, certificateId) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${profileId}/certificate/${certificateId}`,
      method: "DELETE",
      types: [
        a.DELETE_CERTIFICATE_REQUEST,
        {
          type: a.DELETE_CERTIFICATE_SUCCESS,
          meta: certificateId
        },
        a.DELETE_CERTIFICATE_FAILURE
      ]
    }
  });

export const createReference = (values, seller, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${seller}/reference?ln=${locale}`,
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      types: [
        a.ADD_NEW_REFERENCE_REQUEST,
        a.ADD_NEW_REFERENCE_SUCCESS,
        a.ADD_NEW_REFERENCE_FAILURE
      ]
    }
  });
export const editReference = (
  values,
  referenceId,
  seller,
  locale
) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `seller/${seller}/reference/${referenceId}?ln=${locale}`,
      method: "PATCH",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      types: [
        a.EDIT_REFERENCE_REQUEST,
        {
          type: a.EDIT_REFERENCE_SUCCESS,
          meta: referenceId
        },
        a.EDIT_REFERENCE_FAILURE
      ]
    }
  });
