import _ from "lodash";
import { actionTypes as a } from "../../constants/Quotation/Quotation_action_type";

const initialState = {
  error: false,
  success: false,
  loading: false,
  submitQuoteLoading: false,
  selectedFilter: "All",
  searchQuery: "",
  categories: [],
  selectedCategory: {},
  activePlan: {},
  sellerQuotation: {
    count: 0,
    page: 0,
    rfqs: []
  },
  sellerQuotes: {
    count: 0,
    page: 0,
    quotes: []
  },
  buyerQuotation: {
    count: 0,
    page: 0,
    rfqs: []
  },
  quotationImages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    // GET_BUYER_QUOTATIONS
    case a.GET_BUYER_QUOTATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_BUYER_QUOTATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        buyerQuotation: action.payload
      };
    case a.GET_BUYER_QUOTATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    // GET_QUOTATIONS
    case a.GET_QUOTATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_QUOTATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case a.GET_QUOTATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    // GET_CATEGORIES
    case a.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload.category
      };
    case a.GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: false
      };

    // DROP_QUOTATION_IMAGES
    case a.DROP_QUOTATION_IMAGES:
      return {
        ...state,
        quotationImages: action.files
      };

    // DROP_DELETE_QUOTATION_IMAGES
    case a.REMOVE_QUOTATION_IMAGES:
      return {
        ...state,
        quotationImages: action.files
      };

    // FLUSH_QUOTATION_IMAGES
    case a.FLUSH_QUOTATION_IMAGES:
      return {
        ...state,
        quotationImages: []
      };

    // FLUSH_ADD_QUOTATION

    case a.FLUSH_ADD_QUOTATION:
      return {
        ...state,
        productImages: [],
        sCategories: [],
        selectedCategory: "",
        activeCategory: -1,
        activeTabs: 1
      };

    // ADD_QUOTATION
    case a.ADD_QUOTATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case a.ADD_QUOTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };
    case a.ADD_QUOTATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    case a.GET_SELLER_QUOTATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SELLER_QUOTATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        sellerQuotation: action.payload
      };
    case a.GET_SELLER_QUOTATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    case a.GET_SELLER_QUOTES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SELLER_QUOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        sellerQuotes: action.payload
      };
    case a.GET_SELLER_QUOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    case a.SEARCH_QUOTATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.SEARCH_QUOTATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        searchQuery: action.meta,
        sellerQuotation: action.payload
      };
    case a.FLUSH_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: ""
      };
    case a.SEARCH_QUOTATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    case a.SUBMIT_QUOTE_REQUEST:
      return {
        ...state,
        submitQuoteLoading: true
      };
    case a.SUBMIT_QUOTE_SUCCESS:
      return {
        ...state,
        submitQuoteLoading: false
      };
    case a.SUBMIT_QUOTE_FAILURE:
      return {
        ...state,
        submitQuoteLoading: false
      };
    case a.SELECT_FILTER:
      return {
        ...state,
        selectedFilter: action.value
      };
    case a.SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: _.find(state.categories, ["name", action.value])
      };
    case a.GET_SELLER_ACTIVE_PLAN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case a.GET_SELLER_ACTIVE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        activePlan: action.payload.plan
      };
    case a.GET_SELLER_ACTIVE_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
