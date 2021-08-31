import {SET_LOADING} from './actionTypes';
export function showLoader(){
    return dispatch => 
    dispatch({
        type:SET_LOADING,
        payload: true
    })
}
export function hideLoader(){
    return dispatch => 
    dispatch({
        type:SET_LOADING,
        payload: false
    })
}