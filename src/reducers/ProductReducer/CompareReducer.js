import _ from "lodash";
import { actionTypes as a } from "../../constants/Product/Compare_action_type";

const initialState = {
  products: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_TO_COMPARE_PRODUCT:
      if (_.isEmpty(_.find(state.products, ["id", action.item.id]))) {
        return {
          ...state,
          products: [...state.products, action.item]
        };
      }
      return {
        ...state
      };
    case a.SELECT_FILTER_PRODUCT:
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.id === action.item) {
            return {
              ...product,
              selected: !product.selected || false
            };
          }
          return product;
        })
      };
    case a.SET_FILTER_PRODUCT:
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.selected) {
            return {
              ...product,
              filtered: true
            };
          }
          return {
            ...product,
            filtered: false
          };
        })
      };
    case a.RESET_FILTER_PRODUCT:
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.filtered) {
            return {
              ...product,
              selected: false,
              filtered: false
            };
          }
          return {
            ...product,
            selected: false,
            filtered: false
          };
        })
      };
    default:
      return state;
  }
};
