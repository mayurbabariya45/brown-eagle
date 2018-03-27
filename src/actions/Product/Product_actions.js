import ActionTypes from '../../constants/Product/Product_action_type';

export const onIncrement = () => ({
    type: ActionTypes.quantityIncrement
});

export const onDecrement = () => ({
    type: ActionTypes.quantityDecrement
})