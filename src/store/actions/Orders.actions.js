import OrderApis from '../../api/order'
import { isFunction } from '../../config/Utils'
import {LIST_ORDERS} from './actionTypes'

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