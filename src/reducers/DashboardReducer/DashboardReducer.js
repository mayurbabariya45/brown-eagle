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
    default:
      return state;
  }
};
