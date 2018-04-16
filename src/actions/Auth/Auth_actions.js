import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";
import {
  auth,
  Googleprovider,
  Facebookprovider
} from "../../config/firebase_config";

export const toggleLoginForm = () => ({
  type: a.TOGGLE_LOGIN_FORM
});
export const flushState = () => ({
  type: a.FLUSH_STATE
});
export const checkAuthStatus = (token, id, locale) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/users/verify/${id}?ln=${locale}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: token
    },
    types: [a.AUTH_STATUS_REQUEST, a.AUTH_STATUS_SUCCESS, a.AUTH_STATUS_FAILURE]
  }
});
export const login = (value, locale) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/auth/login?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.LOGIN_REQUEST, a.LOGIN_SUCCESS, a.LOGIN_FAILURE]
  }
});

export const checkUsername = (username, locale) => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `http://35.200.219.57:8000/v1/auth/checkusername/${username}?ln=${locale}`,
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
};
export const socialAccessToken = (token, provider) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/auth/${provider}`,
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
    endpoint: `http://35.200.219.57:8000/v1/auth/passwordresetlink?ln=${locale}`,
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
    endpoint: `http://35.200.219.57:8000/v1/auth/reset-password?ln=${locale}`,
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
    endpoint: `http://35.200.219.57:8000/v1/auth/register?ln=${locale}`,
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.REGISTER_REQUEST, a.REGISTER_SUCCESS, a.REGISTER_FAILURE]
  }
});

export const verifyEmail = (token, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `http://35.200.219.57:8000/v1/auth/verify/email?ln=${locale}`,
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
export const VerificationEmail = (token, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `http://35.200.219.57:8000/v1/auth/verify/email?ln=${locale}`,
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
    endpoint: "http://35.200.219.57:8000/v1/auth/reset-password",
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [
      a.PASSWORD_CHANGE_REQUEST,
      a.PASSWORD_CHANGE_SUCCESS,
      a.PASSWORD_CHANGE_FAILURE
    ]
  }
});
export const getUserProfile = (token, id) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/users/${id}`,
    method: "GET",
    headers: { "Content-Type": "application/json", apikey: token },
    types: [
      a.GET_USER_PROFILE_REQUEST,
      a.GET_USER_PROFILE_SUCCESS,
      a.GET_USER_PROFILE_FAILURE
    ]
  }
});
export const updateProfile = value => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/users/${value.id}`,
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

export const userAvatar = (value, token) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/users/avatar/${token}`,
    method: "POST",
    body: value,
    types: [
      a.UPDATE_AVATAR_REQUEST,
      a.UPDATE_AVATAR_SUCCESS,
      a.UPDATE_AVATAR_FAILURE
    ]
  }
});
