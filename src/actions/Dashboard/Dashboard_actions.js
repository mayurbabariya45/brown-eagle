import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

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

export const userAvatar = (value, token) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/users/avatar/${token}`,
    method: "POST",
    body: value,
    types: [
      a.CHANGE_PROFILE_REQUEST,
      a.CHANGE_PROFILE_SUCCESS,
      a.CHANGE_PROFILE_FAILURE
    ]
  }
});
