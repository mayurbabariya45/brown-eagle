import _ from "lodash";
import { RSAA } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/Quotation/Quotation_action_type";

export const getQuotations = (id, token) => ({
  [RSAA]: {
    endpoint: `product?seller=${id}&status=pending`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_QUOTATIONS_REQUEST,
      a.GET_QUOTATIONS_SUCCESS,
      a.GET_QUOTATIONS_FAILURE
    ]
  }
});

export const getBuyerQuotations = (buyerId, page) => ({
  [RSAA]: {
    endpoint: `rfq?buyer=${buyerId}&page=${page}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_BUYER_QUOTATIONS_REQUEST,
      a.GET_BUYER_QUOTATIONS_SUCCESS,
      a.GET_BUYER_QUOTATIONS_FAILURE
    ]
  }
});

export const getSellerQuotations = (sellerId, status = "all", page = 1) => {
  let endPoint = `rfq/suggestions/seller/${sellerId}?page=${page}`;
  if (status !== "all") {
    endPoint += `&status=${status}`;
  }
  return {
    [RSAA]: {
      endpoint: endPoint,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.GET_SELLER_QUOTATIONS_REQUEST,
        a.GET_SELLER_QUOTATIONS_SUCCESS,
        a.GET_SELLER_QUOTATIONS_FAILURE
      ]
    }
  };
};
export const getSellerQuotes = (sellerId, page = 1) => ({
  [RSAA]: {
    endpoint: `rfq/quote/seller/${sellerId}?page=${page}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_SELLER_QUOTES_REQUEST,
      a.GET_SELLER_QUOTES_SUCCESS,
      a.GET_SELLER_QUOTES_FAILURE
    ]
  }
});

export const getCategories = () => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.GET_CATEGORY_REQUEST,
        a.GET_CATEGORY_SUCCESS,
        a.GET_CATEGORY_FAILURE
      ]
    }
  });
};

export const dropQuotationImages = files => ({
  type: a.DROP_QUOTATION_IMAGES,
  files
});

export const removeQuotationImages = files => ({
  type: a.REMOVE_QUOTATION_IMAGES,
  files
});

export const flushQuotationImages = () => ({
  type: a.FLUSH_QUOTATION_IMAGES
});

export const flushCreateQuotation = () => ({
  type: a.FLUSH_ADD_QUOTATION
});

export const flushSearchQuery = () => ({
  type: a.FLUSH_SEARCH_QUERY
});

export const selectFilters = value => ({
  type: a.SELECT_FILTER,
  value
});

export const onSelectCategory = value => dispatch => {
  dispatch({
    type: a.SELECTED_CATEGORY,
    value
  });
};

export const createQuotation = (quotation, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `rfq?ln=${locale}`,
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(quotation),
      types: [
        a.ADD_QUOTATION_REQUEST,
        a.ADD_QUOTATION_SUCCESS,
        a.ADD_QUOTATION_FAILURE
      ]
    }
  });

export const addQuotationImages = (file, id, locale) => ({
  [RSAA]: {
    endpoint: `rfq/${id}/image?ln=${locale}`,
    method: "POST",
    body: file,
    types: [
      a.ADD_QUOTATION_IMAGES_REQUEST,
      a.ADD_QUOTATION_IMAGES_SUCCESS,
      a.ADD_QUOTATION_IMAGES_FAILURE
    ]
  }
});

export const searchQuotation = values => dispatch => {
  const { search, category, status, page } = values;
  let endCategory = "";
  if (!_.isEmpty(category)) {
    endCategory = `&category=${category}`;
  }
  dispatch({
    [RSAA]: {
      endpoint: `rfq/search?search=${search}${endCategory}&status=${status}&page=${page}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.SEARCH_QUOTATIONS_REQUEST,
        {
          type: a.SEARCH_QUOTATIONS_SUCCESS,
          meta: search
        },
        a.SEARCH_QUOTATIONS_FAILURE
      ]
    }
  });
};

export const submitQuote = (values, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `rfq/${values.id}/quote?ln=${locale}`,
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(values),
      types: [
        a.SUBMIT_QUOTE_REQUEST,
        a.SUBMIT_QUOTE_SUCCESS,
        a.SUBMIT_QUOTE_FAILURE
      ]
    }
  });
export const getSellerActivePlans = authId => ({
  [RSAA]: {
    endpoint: `seller/${authId}/plan`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_SELLER_ACTIVE_PLAN_REQUEST,
      a.GET_SELLER_ACTIVE_PLAN_SUCCESS,
      a.GET_SELLER_ACTIVE_PLAN_FAILURE
    ]
  }
});
