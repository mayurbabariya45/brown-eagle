import { RSAA } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/SearchCategories/SearchCategories";

export const onChange = value => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: `product/autocomplete?search=${value}&lang=en`,
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
