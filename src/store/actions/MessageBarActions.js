import {HIDE_MESSAGE, SHOW_MESSAGE} from './actionTypes';
export function showMessageBar(type, message){
    return dispatch => 
    dispatch({
        type:SHOW_MESSAGE,
        payload: {
            type: type,
            message: message
        }
    })
}
export function hideMessageBar(){
    return dispatch => 
    dispatch({
        type:HIDE_MESSAGE,
        payload: false
    })
}