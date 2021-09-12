import OrderApis from '../../api/order'
import { isFunction } from '../../config/Utils'
import {CURRENT_ORDER, LIST_ORDERS} from './actionTypes'

export function listOrders(onSuccess, onFailure) {
    return dispatch => {
        OrderApis.listOrders().then(res => {
            dispatch({
                type: LIST_ORDERS,
                payload: res.data
            })
            if(isFunction(onSuccess)) onSuccess(res.message)
        }).catch(err => {
            if(isFunction(onFailure)) onFailure(err.message)
        })
    }
}

export function currentOrder(data){
    return dispatch => {
        dispatch({
            type: CURRENT_ORDER,
            payload: data
        })
    }
}