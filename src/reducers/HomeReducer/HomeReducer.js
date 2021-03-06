import _ from "lodash";
import { actionTypes as a } from "../../constants/Home/Home_action_type";

const INITIAL_STATE = {
  error: false,
  success: false,
  loading: false,
  loadingProduct: false,
  categories: [],
  products: [],
  hasError: false,
  hasSuccess: false,
  isCenterBannersLoading: false,
  isTopBannersLoading: false,
  isBottomBannersLoading: false,
  isTopSupplierLoading: false,
  isRecentProductLoading: false,
  topBanners: [],
  centerBanners: [],
  bottomBanners: {},
  topSupplier: {
    sellers: []
  },
  recentProducts: []
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
        loadingProduct: true
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
        loadingProduct: false,
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
    // GET_TOP_BANNERS
    case a.GET_TOP_BANNERS_REQUEST:
      return {
        ...state,
        isTopBannersLoading: true
      };
    case a.GET_TOP_BANNERS_SUCCESS:
      return {
        ...state,
        isTopBannersLoading: false,
        hasError: false,
        hasSuccess: true,
        topBanners: action.payload.images
      };
    case a.GET_TOP_BANNERS_FAILURE:
      return {
        ...state,
        isTopBannersLoading: false,
        hasError: true,
        hasSuccess: false
      };
    // GET_CENTER_BANNERS
    case a.GET_CENTER_BANNERS_REQUEST:
      return {
        ...state,
        isCenterBannersLoading: true
      };
    case a.GET_CENTER_BANNERS_SUCCESS:
      return {
        ...state,
        isCenterBannersLoading: false,
        hasError: false,
        hasSuccess: true,
        centerBanners: _.take(action.payload.images, 2)
      };
    case a.GET_CENTER_BANNERS_FAILURE:
      return {
        ...state,
        isCenterBannersLoading: false,
        hasError: true,
        hasSuccess: false
      };
    // GET_BOTTOM_BANNERS
    case a.GET_BOTTOM_BANNERS_REQUEST:
      return {
        ...state,
        isBottomBannersLoading: true
      };
    case a.GET_BOTTOM_BANNERS_SUCCESS:
      return {
        ...state,
        isBottomBannersLoading: false,
        hasError: false,
        hasSuccess: true,
        bottomBanners: !_.isEmpty(action.payload.images)
          ? { ..._.take(action.payload.images, 1)[0] }
          : {}
      };
    case a.GET_BOTTOM_BANNERS_FAILURE:
      return {
        ...state,
        isBottomBannersLoading: false,
        hasError: true,
        hasSuccess: false
      };
    // TOP_SUPPILER
    case a.GET_TOP_SUPPLIERS_REQUEST:
      return {
        ...state,
        isTopSupplierLoading: true
      };
    case a.GET_TOP_SUPPLIERS_SUCCESS:
      return {
        ...state,
        hasError: false,
        hasSuccess: true,
        isTopSupplierLoading: false,
        topSupplier: action.payload
      };
    case a.GET_TOP_SUPPLIERS_FAILURE:
      return {
        ...state,
        isTopSupplierLoading: false,
        hasError: true,
        hasSuccess: false
      };
    // TOP_SUPPILER
    case a.GET_RECENT_VIEW_PRODUCT_REQUEST:
      return {
        ...state,
        isRecentProductLoading: true
      };
    case a.GET_RECENT_VIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        hasError: false,
        hasSuccess: true,
        isRecentProductLoading: false,
        recentProducts: _.map(action.payload.products, "product")
      };
    case a.GET_RECENT_VIEW_PRODUCT_FAILURE:
      return {
        ...state,
        isRecentProductLoading: false,
        hasError: true,
        hasSuccess: false
      };
    default:
      return state;
  }
};
