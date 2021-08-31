import Admin from '../../api/admin';
import {SET_USERS_LIST} from './actionTypes';
import {isFunction}  from '../../config/Utils';
export const listUsers = (onSuccess,onFailure) => {
    return dispatch => 
    Admin.listUsers().then(data=>{
        dispatch({
            type: SET_USERS_LIST,
            payload: data.data
        })
        if(isFunction(onSuccess)) onSuccess();
    }).catch(err=> {
        if(isFunction(onFailure)) onFailure(err.message)
    })
} 