import { RSAA } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/SearchCategories/SearchCategories";

export const onChange = (value, category, locale = "en") => dispatch => {
  let endpoint = `product/autocomplete?search=${value}&lang=${locale}`;
  if (category.name !== "All Categories") {
    endpoint = `product/autocomplete?search=${value}&category=${
      category.id
    }&lang=${locale}`;
  }
  dispatch({
    [RSAA]: {
      endpoint,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.SEARCH_CATEGORIES_REQUEST,
        a.SEARCH_CATEGORIES_SUCCESS,
        a.SEARCH_CATEGORIES_FAILURE
      ]
    }
  });
};
export const onClear = () => dispatch => {
  dispatch({
    type: a.FLUSH_SUGGESTION
  });
};

export const onSelectCategory = value => dispatch => {
  dispatch({
    type: a.SELECT_CATEGORIES,
    value
  });
};
