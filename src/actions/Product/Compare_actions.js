import { actionTypes as a } from "../../constants/Product/Compare_action_type";

export const addToCompare = item => ({
  type: a.ADD_TO_COMPARE_PRODUCT,
  item
});

export const removeProduct = item => ({
  type: a.REMOVE_COMPARE_PRODUCT,
  item
});

export const selectFilterProduct = item => ({
  type: a.SELECT_FILTER_PRODUCT,
  item
});

export const setFilterProduct = () => ({
  type: a.SET_FILTER_PRODUCT
});

export const resetFilterProduct = () => ({
  type: a.RESET_FILTER_PRODUCT
});
