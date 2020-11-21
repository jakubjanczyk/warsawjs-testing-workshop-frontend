import * as actions from '../actions/basket-actions';

const defaultState = [];

export const basket = (state = defaultState, action) => {
    switch(action.type) {
        case actions.ADD_TO_BASKET:
            return [...state, action.payload.product];
        case actions.REMOVE_FROM_BASKET:
            return state.filter(item => item.id !== action.payload.productId);
        case actions.CLEAR_BASKET:
            return [];
        case actions.CHANGE_COUNT_IN_BASKET:
            return state.map(item => item.id === action.payload.productId ? {...item, count: action.payload.count} : item);
        default:
            return state;
    }
}
