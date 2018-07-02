import { ActionTypes as a } from "../../constants/Categories/Categories_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  categories: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case a.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload.category
      };

    case a.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
};
