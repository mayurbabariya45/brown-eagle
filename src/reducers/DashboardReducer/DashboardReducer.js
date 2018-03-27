import { Action } from "Directory";

const INITIAL_STATE = {};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Action:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
