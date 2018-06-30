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

export const getBuyerQuotations = (buyerId, token) => ({
  [RSAA]: {
    endpoint: `rfq?buyer=${buyerId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_BUYER_QUOTATIONS_REQUEST,
      a.GET_BUYER_QUOTATIONS_SUCCESS,
      a.GET_BUYER_QUOTATIONS_FAILURE
    ]
  }
});

export const getCategories = () => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: "category",
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
