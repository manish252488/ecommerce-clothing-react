import * as Actions from '../actions/actionTypes';

const initialState = {
    list: [],
    current_order: {}
}
function OrderReducers(state = initialState, action) {
    switch (action.type) {
        case Actions.LIST_ORDERS:
            return {
                ...state,
                list: action.payload
            }
        case Actions.CURRENT_ORDER:
            return {
                ...state,
                current_order: action.payload
            }
        default: return state;
    }
}
export default OrderReducers;