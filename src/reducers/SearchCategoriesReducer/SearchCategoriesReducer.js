import { actionTypes as a } from "../../constants/SearchCategories/SearchCategories";

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: false,
  suggestions: [],
  selectedCategory: {
    name: "All Categories"
  }
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case a.SEARCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.SEARCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        suggestions: action.payload
      });
    case a.SEARCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        key: action.payload
      });
    case a.SELECT_CATEGORIES:
      console.log(action);
      return Object.assign({}, state, {
        selectedCategory: action.value
      });
    case a.FLUSH_SUGGESTION:
      return Object.assign({}, state, {
        suggestions: []
      });
    default:
      return state;
  }
};
