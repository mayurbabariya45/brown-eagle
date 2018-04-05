// import { CALL_API } from "../../middleware/redux-api/symbol";
import { actionTypes as a } from "../../constants/SearchCategories/SearchCategories";

export const onChange = value => dispatch => {
  dispatch({
    type: a.SEARCH_CATEGORIES_SUCCESS,
    value
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
