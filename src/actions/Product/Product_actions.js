import { actionTypes as a } from "../../constants/Product/Product_action_type";

export const onIncrement = () => ({
  type: a.QUANTITY_INCREMENT
});

export const onDecrement = () => ({
  type: a.QUANTITY_DECREMENT
});

export const AddCategory = () => ({
  type: a.ADD_PRODUCT_CATEGORY
});

export const selectCategory = category => ({
  type: a.SELECTED_PRODUCT_CATEGORY,
  category
});

export const selectLanguage = lang => ({
  type: a.SELECT_PRODUCT_LANGUAGE,
  lang
});

export const searchCategories = value => ({
  type: a.SEARCH_CATEGORIES,
  value
});

export const handleCategory = value => ({
  type: a.SELECT_CATEGORY,
  value
});

export const flushCategories = () => ({
  type: a.FLUSH_CATEGORIES
});

export const getCategories = () => dispatch => {
  dispatch({
    type: a.GET_CATEGORY_SUCCESS
  });
};
