import * as Actions from '../actions/actionTypes';

const initialState = {
    list: []
}
function OrderReducers(state = initialState, action) {
    switch (action.type) {
        case Actions.LIST_ORDERS:
            return {
                ...state,
                list: action.payload
            }
        default: return state;
    }
}
export default OrderReducers;