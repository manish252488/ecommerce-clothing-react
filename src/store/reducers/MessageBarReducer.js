import * as Actions from '../actions/actionTypes';

const initialState = {
    show: false,
    message: "",
    type: "",
    loading:false
}
function MessageBarReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SHOW_MESSAGE:
            return {
                ...state,
                show: true,
                message: action.payload.message,
                type: action.payload.type
            }
        case Actions.HIDE_MESSAGE:
            return {
                ...state,
                show: false,
            }
        case Actions.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default: return state;
    }
}
export default MessageBarReducer;