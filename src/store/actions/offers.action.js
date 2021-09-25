import OffersApi from "../../api/offers"
import { isFunction } from "../../config/Utils"
import { LIST_OFFERS } from "./actionTypes"

export const getOffers = (onSuccess, onFailure) => {
    return dispatch => {
        OffersApi.listCategories().then(
            res => {
                dispatch({
                    type: LIST_OFFERS,
                    payload: res.data
                })
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}