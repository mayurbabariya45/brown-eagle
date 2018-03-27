import ActionTypes from "../../constants/Product/Product_action_type";

const initialState = {
  quantity: 1,
  activeTabs: 1,
  error: false,
  success: false,
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    // QUANTITY_INCREMENT
    case ActionTypes.quantityIncrement:
      return {
        ...state,
        quantity: state.quantity + 1
      };
    // QUANTITY_INCREMENT

    // QUANTITY_DECREMENT
    case ActionTypes.quantityDecrement:
      return {
        ...state,
        quantity: state.quantity > 1 ? state.quantity - 1 : 1
      };
    // QUANTITY_DECREMENT

    // ADD_PRODUCT_CATEGORY
    case ActionTypes.ADD_PRODUCT_CATEGORY:
      return {
        ...state,
        loading: false,
        activeTabs: 2
      };
    default:
      return state;
  }
};
