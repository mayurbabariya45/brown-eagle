import _ from "lodash";
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

export const selectedCategory = category => ({
  type: a.SELECTED_CATEGORY,
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
export const handleSubCategory = value => ({
  type: a.SELECT_SUB_CATEGORY,
  value
});

export const handleSortFilter = value => ({
  type: a.SELECT_SORT_FILTER,
  value
});

export const handlePriceFilter = value => ({
  type: a.SELECT_PRICE_FILTER,
  value
});

export const handleRatingFilter = value => ({
  type: a.SELECT_RATING_FILTER,
  value
});
export const handleCategoryFilter = value => ({
  type: a.SELECT_CATEGORY_FILTER,
  value
});

export const flushCategories = () => ({
  type: a.FLUSH_CATEGORIES
});

export const flushAddProduct = () => ({
  type: a.FLUSH_ADD_PRODUCT
});

export const getCategories = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.GET_CATEGORIES_REQUEST,
        a.GET_CATEGORIES_SUCCESS,
        a.GET_CATEGORIES_FAILURE
      ]
    }
  });
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

export const flushProduct = () => ({
  type: a.FLUSH_PRODUCT
});
export const getProducts = (categoryId, subCategoryId, page) => dispatch => {
  let category = "";
  if (categoryId) {
    const subCategory = subCategoryId ? `&subCategory=${subCategoryId}` : "";
    category = `&category=${categoryId}${subCategory}`;
  }

  return dispatch({
    [RSAA]: {
      endpoint: `product?page=${page}${category}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_CATEGORY_PRODUCTS_REQUEST,
        a.GET_CATEGORY_PRODUCTS_SUCCESS,
        a.GET_CATEGORY_PRODUCTS_FAILURE
      ]
    }
  });
};

export const getProduct = (productId, locale, authId) => dispatch => {
  const buyer = !_.isEmpty(authId) ? `&buyer=${authId}` : "";
  dispatch({
    [RSAA]: {
      endpoint: `product/${productId}?lang=${locale}${buyer}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_PRODUCT_REQUEST,
        a.GET_PRODUCT_SUCCESS,
        a.GET_PRODUCT_FAILURE
      ]
    }
  });
};
export const getProductReview = (productId, locale, page) => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `product/${productId}/review?status=enabled&lang=${locale}&page=${page}&perPage=20`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_PRODUCT_REVIEW_REQUEST,
        a.GET_PRODUCT_REVIEW_SUCCESS,
        a.GET_PRODUCT_REVIEW_FAILURE
      ]
    }
  });
};

export const getSimilarProduct = (productId, locale) => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `product/${productId}/similar?lang=${locale}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.GET_SIMILAR_PRODUCT_REQUEST,
        a.GET_SIMILAR_PRODUCT_SUCCESS,
        a.GET_SIMILAR_PRODUCT_FAILURE
      ]
    }
  });
};

export const searchProducts = (values, page) => dispatch => {
  let sort = "";
  let order = "&order=des";
  let category = "";
  let subCategory = "";
  const minPrice = `&minPrice=${values.price.minPrice}`;
  const maxPrice = `&maxPrice=${values.price.maxPrice}`;
  const minRating = `&minRating=${values.rating.minRating}`;
  const maxRating = `&maxRating=${values.rating.maxRating}`;
  if (_.has(values.sort, "type")) {
    if (values.sort.type !== "popularity") {
      sort = `&sort=${values.sort.type}`;
    }
  }
  if (_.has(values.sort, "order")) {
    if (values.sort.order) {
      order = `&order=${values.sort.order}`;
    }
  }
  if (!_.isEmpty(values.category)) {
    if (values.category.category.length > 0) {
      category = `&category=${values.category.category}`;
    }
    if (values.category.subCategory.length > 0) {
      subCategory = `&subCategory=${values.category.subCategory}`;
    }
  }

  return dispatch({
    [RSAA]: {
      endpoint: `product/search?lang=en&status=approved${category}${subCategory}${sort}${order}${minPrice}${maxPrice}${minRating}${maxRating}&page=${page}`,
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      types: [
        a.SEARCH_PRODUCT_REQUEST,
        a.SEARCH_PRODUCT_SUCCESS,
        a.SEARCH_PRODUCT_FAILURE
      ]
    }
  });
};

export const addProduct = (product, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `product?ln=${locale}`,
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
    endpoint: `product/${id}/image?ln=${locale}`,
    method: "POST",
    body: file,
    types: [
      a.ADD_PRODUCT_IMAGES_REQUEST,
      a.ADD_PRODUCT_IMAGES_SUCCESS,
      a.ADD_PRODUCT_IMAGES_FAILURE
    ]
  }
});

export const addProductVideo = (file, id, locale) => ({
  [RSAA]: {
    endpoint: `product/${id}/video?ln=${locale}`,
    method: "POST",
    body: file,
    types: [
      a.ADD_PRODUCT_VIDEOS_REQUEST,
      a.ADD_PRODUCT_VIDEOS_SUCCESS,
      a.ADD_PRODUCT_VIDEOS_FAILURE
    ]
  }
});
export const addProductReview = (value, productId, locale) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `product/${productId}/review?ln=${locale}`,
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(value),
      types: [
        a.ADD_PRODUCT_REVIEW_REQUEST,
        a.ADD_PRODUCT_REVIEW_SUCCESS,
        a.ADD_PRODUCT_REVIEW_FAILURE
      ]
    }
  });

export const addToWishlistProduct = (productId, authId) => ({
  [RSAA]: {
    endpoint: `product/${productId}/buyer/${authId}/favorite`,
    method: "POST",
    types: [
      a.ADD_TO_WISHLIST_REQUEST,
      a.ADD_TO_WISHLIST_SUCCESS,
      a.ADD_TO_WISHLIST_FAILURE
    ]
  }
});
