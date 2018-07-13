import _ from "lodash";
import { actionTypes as a } from "../../constants/Quotation/Quotation_action_type";

const initialState = {
  error: false,
  success: false,
  loading: false,
  submitQuoteLoading: false,
  selectedFilter: {
    filter: "ALL",
    date: ""
  },
  searchQuery: "",
  categories: [],
  sellerQuotation: {
    count: 0,
    page: 0,
    rfqs: []
  },
  buyerQuotation: [],
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
        buyerQuotation: [
          ..._.map(action.payload.rfqs, quotation => ({
            title: quotation.title,
            id: quotation.id,
            description: quotation.description,
            preferredUnitPrice: quotation.preferredUnitPrice,
            purchaseQuantity: quotation.purchaseQuantity,
            rfqPictures: quotation.rfqPictures
          }))
        ]
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
        selectedFilter: {
          filter: action.value,
          date: ""
        }
      };
    default:
      return state;
  }
};
