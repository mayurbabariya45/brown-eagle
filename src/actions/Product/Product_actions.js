import { RSAA } from "../../middleware/redux-api/symbol";
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

export const flushAddProduct = () => ({
  type: a.FLUSH_ADD_PRODUCT
});

export const getCategories = () => dispatch => {
  dispatch({
    type: a.GET_CATEGORY_SUCCESS
  });
};
export const dropProductImages = files => ({
  type: a.DROP_PRODUCT_IMAGES,
  files
});
export const removeProductImages = files => ({
  type: a.PRODUCT_IMAGES_REMOVE,
  files
});
export const flushProductImages = () => ({
  type: a.FLUSH_PRODUCT_IMAGES
});
export const addProduct = (product, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `http://35.200.219.57:8000/v1/product?ln=${locale}`,
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(product),
      types: [
        a.ADD_PRODUCT_REQUEST,
        a.ADD_PRODUCT_SUCCESS,
        a.ADD_PRODUCT_FAILURE
      ]
    }
  });

export const addProductImages = (file, id, locale) => ({
  [RSAA]: {
    endpoint: `http://35.200.219.57:8000/v1/product/${id}/image?ln=${locale}`,
    method: "POST",
    body: file,
    types: [
      a.ADD_PRODUCT_IMAGES_REQUEST,
      a.ADD_PRODUCT_IMAGES_SUCCESS,
      a.ADD_PRODUCT_IMAGES_FAILURE
    ]
  }
});
