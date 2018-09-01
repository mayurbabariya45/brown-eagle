import _ from "lodash";
import { ActionTypes as a } from "../../constants/Cart/Cart_action_type";

const INITIAL_STATE = {
  loading: false,
  addToCartLoading: false,
  error: false,
  success: false,
  cartProductTotal: 0,
  products: []
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET_CART_PRODUCTS
    case a.GET_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case a.GET_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case a.GET_CART_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false
      };
    case a.GET_CART_PRODUCTS_TOTALS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_CART_PRODUCTS_TOTALS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.concat(action.payload.products)
      };
    case a.GET_CART_PRODUCTS_TOTALS_FAILURE:
      return {
        ...state,
        loading: false
      };
    // QUANTITY_INCREMENT
    case a.CART_QUANTITY_INCREMENT:
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.id === action.item.id) {
            return {
              ...product,
              quantity: product.quantity + 1
            };
          }
          return {
            ...product
          };
        })
      };
    case a.QUANTITY_INCREMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.QUANTITY_INCREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.QUANTITY_INCREMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // QUANTITY_INCREMENT

    // QUANTITY_DECREMENT
    case a.CART_QUANTITY_DECREMENT:
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.id === action.item.id) {
            return {
              ...product,
              quantity: product.quantity - 1
            };
          }
          return {
            ...product
          };
        })
      };
    case a.QUANTITY_DECREMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.QUANTITY_DECREMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.QUANTITY_DECREMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // QUANTITY_DECREMENT

    // ADD_TO_CART
    case a.ADD_TO_CART:
      if (_.isEmpty(_.find(state.products, ["id", action.item.id]))) {
        return {
          ...state,
          products: [...state.products, action.item],
          cartProductTotal: state.products.length + 1
        };
      }
      return {
        ...state,
        products: _.map(state.products, product => {
          if (product.id === action.item.id) {
            return {
              ...product,
              quantity: product.quantity + 1
            };
          }
          return {
            ...product
          };
        })
      };

    case a.ADD_TO_CART_REQUEST:
      return {
        ...state,
        addToCartLoading: true
      };
    case a.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false
      };
    case a.ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        cartProductTotal: state.products.length - 1
      };
    case a.REMOVE_CART_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.REMOVE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: _.filter(
          state.products,
          product => product.id !== action.meta.id
        ),
        cartProductTotal: state.products.length - 1
      };
    case a.REMOVE_CART_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case a.ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
