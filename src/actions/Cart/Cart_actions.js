import { RSAA } from "../../middleware/redux-api/symbol";
import { ActionTypes as a } from "../../constants/Cart/Cart_action_type";

export const getCartProducts = authId => ({
  [RSAA]: {
    endpoint: `cart/${authId}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      a.GET_CART_PRODUCTS_REQUEST,
      a.GET_CART_PRODUCTS_SUCCESS,
      a.GET_CART_PRODUCTS_FAILURE
    ]
  }
});

export const onIncrement = item => dispatch => {
  dispatch({
    type: a.CART_QUANTITY_INCREMENT,
    item
  });
  return dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.QUANTITY_INCREMENT_REQUEST,
        a.QUANTITY_INCREMENT_SUCCESS,
        a.QUANTITY_INCREMENT_FAILURE
      ]
    }
  });
};

export const onDecrement = item => dispatch => {
  dispatch({
    type: a.CART_QUANTITY_DECREMENT,
    item
  });
  return dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.QUANTITY_DECREMENT_REQUEST,
        a.QUANTITY_DECREMENT_SUCCESS,
        a.QUANTITY_DECREMENT_FAILURE
      ]
    }
  });
};

export const addToCartUnsafe = item => ({
  type: a.ADD_TO_CART,
  item
});

export const addToCart = (item, authId) => dispatch => {
  dispatch(addToCartUnsafe(item));
  const product = Object.assign(
    {},
    {
      product: item.id,
      quantity: item.quantity,
      price: {
        value: item.productPrice,
        currency: item.currency
      }
    }
  );
  return dispatch({
    [RSAA]: {
      endpoint: `cart/${authId}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
      types: [
        a.ADD_TO_CART_REQUEST,
        a.ADD_TO_CART_SUCCESS,
        a.ADD_TO_CART_FAILURE
      ]
    }
  });
};

export const removeCartItem = authId => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: `cart/${authId}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      types: [
        a.REMOVE_CART_PRODUCT_REQUEST,
        {
          type: a.REMOVE_CART_PRODUCT_SUCCESS,
          meta: { authId }
        },
        a.REMOVE_CART_PRODUCT_FAILURE
      ]
    }
  });
export const addToWhishlist = item => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: "category?status=enabled&perPage=99",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      types: [
        a.ADD_TO_WISHLIST_REQUEST,
        {
          type: a.ADD_TO_WISHLIST_SUCCESS,
          meta: { ...item }
        },
        a.ADD_TO_WISHLIST_FAILURE
      ]
    }
  });
