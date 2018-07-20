import { actionTypes as a } from "../../constants/Home/Home_action_type";

const INITIAL_STATE = {
  error: false,
  success: false,
  loading: false,
  loadingProduct: false,
  categories: [],
  products: []
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
        loading: true,
        loadProduct: true
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
        loadProduct: false,
        loading: false,
        error: true
      };
    // GET_CATEGORY_PRODUCTS
    case a.GET_CATEGORY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        loadingProduct: true
      };

    case a.GET_CATEGORY_PRODUCTS_SUCCESS:
      console.log(action);
      // const products = state.products;
      // products.push({ ...action.meta });
      return {
        ...state,
        loading: false,
        loadingProduct: false,
        products: state.products.concat({
          ...action.meta,
          products: action.payload.products
        })
      };

    case a.GET_CATEGORY_PRODUCTS_FAILURE:
      return {
        ...state,
        loadingProduct: false,
        loading: false,
        error: true
      };

    // GET_CATEGORY_PRODUCTS
    default:
      return state;
  }
};
