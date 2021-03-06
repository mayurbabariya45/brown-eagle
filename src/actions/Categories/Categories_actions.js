import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Categories/Categories_action_type";

export const getCategories = () => ({
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

export const onSelectCategory = value => dispatch => {
  dispatch({
    type: a.SELECTED_CATEGORY,
    value
  });
};
