export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const CHANGE_COUNT_IN_BASKET = 'CHANGE_COUNT_IN_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const CLEAR_BASKET = 'CLEAR_BASKET';

export const addToBasket = (product) => ({
    type: ADD_TO_BASKET,
    payload: {product}
});
export const changeCountInBasket = (productId, count) => ({
    type: CHANGE_COUNT_IN_BASKET,
    payload: {productId, count}
});
export const removeFromBasket = (productId) => ({
    type: REMOVE_FROM_BASKET,
    payload: {productId}
});
export const clearBasket = () => ({
    type: CLEAR_BASKET
});
