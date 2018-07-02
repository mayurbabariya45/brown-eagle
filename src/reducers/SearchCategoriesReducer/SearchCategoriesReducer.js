import { actionTypes as a } from "../../constants/SearchCategories/SearchCategories";

const INITIAL_STATE = {
  categories: [
    "abasement",
    "abhor",
    "abrasive",
    "abrogate",
    "absolution",
    "abstain",
    "abstemious",
    "abstruse",
    "accolade",
    "acquiesce",
    "acrid",
    "acrophobia",
    "acuity",
    "adamant",
    "adroit",
    "adulation",
    "adversity",
    "advocate",
    "aesthetic",
    "affable",
    "alacrity",
    "alchemy",
    "alibi",
    "allay",
    "alleviate",
    "aloof",
    "altruism",
    "amass",
    "ambiguity",
    "ambiguous",
    "ambivalence"
  ],
  suggestions: [],
  selectedCategory: "All Categories"
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
        ...action.payload
      };
    case a.SEARCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        suggestions: state.categories.filter(category =>
          category.startsWith(action.value)
        )
      });
    case a.SEARCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        key: action.payload
      });
    case a.SELECT_CATEGORIES:
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
