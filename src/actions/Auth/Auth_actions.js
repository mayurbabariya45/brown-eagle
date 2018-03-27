import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Auth/Auth_action_type";
import {
  auth,
  Googleprovider,
  Facebookprovider
} from "../../config/firebase_config";

export const toggleLoginForm = () => ({
  type: a.toogleLoginForm
});

export const login = value => ({
  [RSAA]: {
    endpoint: "http://35.200.219.57:8000/v1/auth/login",
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.loginRequest, a.loginSuccess, a.loginFailure]
  }
});

export const checkUsername = username => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `http://35.200.219.57:8000/v1/auth/checkusername/${username}`,
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

export const register = value => ({
  [RSAA]: {
    endpoint: "http://35.200.219.57:8000/v1/auth/register",
    method: "POST",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
    types: [a.REGISTER_REQUEST, a.REGISTER_SUCCESS, a.REGISTER_FAILURE]
  }
});
