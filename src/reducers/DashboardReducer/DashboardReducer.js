import _ from "lodash";
import { ActionTypes as a } from "../../constants/Dashboard/Dashboard_action_type";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  upldateProductLoading: false,
  location: "",
  products: [],
  categories: [],
  product: {},
  activeMap: "registeredAddress"
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET_SELLER_PRODUCTS
    case a.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: [
          ..._.map(action.payload.products, product =>
            Object.assign({}, product, {
              isLoading: true
            })
          )
        ]
      };
    case a.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    // Single_Product

    case a.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product
      };

    case a.GET_PRODUCT_IMAGE_REQUEST:
      return {
        ...state,
        products: [
          ..._.map(state.products, product =>
            Object.assign({}, product, {
              isLoading: true
            })
          )
        ]
      };

    // UPDATE_PRODUCT
    case a.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        upldateProductLoading: true
      };
    case a.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        upldateProductLoading: false
      };
    case a.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        upldateProductLoading: false,
        error: true
      };
    // DELETE_PRODUCT_IMAGE

    case a.DELETE_PRODUCT_IMAGE_REQUEST:
      return {
        ...state,
        upldateProductLoading: true
      };

    case a.DELETE_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        upldateProductLoading: false,
        product: {
          ...state.product,
          productPictures: _.filter(
            state.product.productPictures,
            image => image._id !== action.meta.imageId
          )
        }
      };

    case a.DELETE_PRODUCT_IMAGE_FAILURE:
      return {
        ...state,
        upldateProductLoading: false
      };

    case a.GET_PRODUCT_IMAGE_SUCCESS:
      return {
        ...state,
        products: [
          ..._.map(state.products, product => {
            const productImages = action.payload;
            const productKey = _.indexOf(
              _.map(productImages, "productId"),
              product.id
            );
            if (productKey !== -1) {
              return Object.assign({}, product, {
                productPictures: _.map(productImages, image => ({
                  url: image.url,
                  id: image._id
                })),
                isLoading: false
              });
            }
            return {
              ...product,
              isLoading: false
            };
          })
        ]
      };
    case a.GET_PRODUCT_IMAGE_FAILURE:
      return {
        ...state
      };
    case a.DELETE_PRODUCT_OPTIMISTIC:
      return {
        ...state
      };
    case a.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: state.products.filter(
          product => product.id !== action.meta.id
        )
      };
    case a.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case a.SHOW_MAP:
      return {
        ...state,
        activeMap: action.types
      };
    case a.GET_LOCATION_REQUEST:
      return {
        ...state
      };
    case a.GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload.results[0].formatted_address
      };
    case a.GET_LOCATION_FAILURE:
      return {
        ...state
      };
    // GET_PRODUCT_CATEGORY
    case a.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
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
