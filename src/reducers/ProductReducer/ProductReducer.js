
import ActionTypes from '../../constants/Product/Product_action_type';
const initialState  = {
    quantity: 1
}
export default (state = initialState,action) => {
    switch (action.type) {
       
        // QUANTITY_INCREMENT
        case ActionTypes.quantityIncrement :
        return {
            ...state,
            quantity : state.quantity + 1
        }
        // QUANTITY_INCREMENT

        //QUANTITY_DECREMENT
        case ActionTypes.quantityDecrement :
            return {
                ...state,
                quantity : state.quantity > 1 ? state.quantity - 1 : 1
            }
        //QUANTITY_DECREMENT
        default:
        return state;
    }
}