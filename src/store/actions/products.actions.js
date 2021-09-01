import ProductsApi from "../../api/products"
import { isFunction } from "../../config/Utils"
import { LIST_PRODUCTS, PRODUCT_DETAIL } from "./actionTypes"

export const createProduct = (data, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.createProducts(data).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.meesage)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.meesage)
        })
    }
}

export const updateProduct = (data, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.updateProducts(data).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.meesage)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.meesage)
        })
    }
}

export const listProducts = (onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.listProducts().then(
            res => {
                dispatch({
                    type: LIST_PRODUCTS,
                    payload: res.data
                })
                if (isFunction(onSuccess)) onSuccess(res.meesage)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.meesage)
        })
    }
}

export const deleteProduct = (id, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.deleteProducts(id).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.meesage)
            }).catch(err => {
                if (isFunction(onFailure)) onSuccess(err.meesage)
            })
    }
}

export const productDetail = (id, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.productDetail(id).then(
            res => {
                dispatch({
                    type: PRODUCT_DETAIL,
                    payload: res.data
                })
                if (isFunction(onSuccess)) onSuccess(res.meesage)
            }
        ).catch(err => {
                if (isFunction(onFailure)) onSuccess(err.meesage)
            })
    }
}