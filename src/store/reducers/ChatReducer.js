import * as Actions from '../actions/actionTypes';

const initialState = {
    chat: []
}
function ChatReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_CHAT:
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }
        case Actions.CLEAR_CHAT:
            return {
                ...state,
                chat: []
            }
        default: return state;
    }
}
export default ChatReducer;