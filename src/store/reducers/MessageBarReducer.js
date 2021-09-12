import * as Actions from '../actions/actionTypes';

const initialState = {
    show: false,
    message: "",
    type: "",
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
                message: "",
                type: ""
            }
        default: return state;
    }
}
export default MessageBarReducer;