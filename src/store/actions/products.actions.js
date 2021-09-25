import CategoriesApi from "../../api/categories"
import ProductsApi from "../../api/products"
import BrandsApi from "../../api/brand"
import { isFunction } from "../../config/Utils"
import { LIST_BRANDS, LIST_CATEGORY, LIST_PRODUCTS, PRODUCT_CLEAR, PRODUCT_DETAIL } from "./actionTypes"

export const createProduct = (data, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.createProducts(data).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}

export const updateProduct = (data, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.updateProducts(data).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}
export const clearProducts = () => {
    return dispatch => {
        dispatch({
            type: PRODUCT_CLEAR
        })
    }
}
export const listProducts = ({ perPage, page, search, onSuccess, onFailure }) => {
    return dispatch => {
        ProductsApi.listProducts(perPage, page, search).then(
            res => {
                if (res.data.products.length > 0) {
                    dispatch({
                        type: LIST_PRODUCTS,
                        payload: res.data
                    })
                    if (isFunction(onSuccess)) onSuccess(res.message)
                } else {
                    if (isFunction(onSuccess)) onSuccess("End of teh Page!")
                }
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}

export const deleteProduct = (id, onSuccess, onFailure) => {
    return dispatch => {
        ProductsApi.deleteProducts(id).then(
            res => {
                if (isFunction(onSuccess)) onSuccess(res.message)
            }).catch(err => {
                if (isFunction(onFailure)) onSuccess(err.message)
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
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}

export const getCategories = (onSuccess, onFailure) => {
    return dispatch => {
        CategoriesApi.listCategories().then(
            res => {
                if(res && res.data && res.data.length >= 0){
                    let filter = res.data.filter(val => val.isActive === 1 || val.isActive === 2)
                    dispatch({
                        type: LIST_CATEGORY,
                        payload: filter
                    })
                }
             
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}

export const getBrands = (onSuccess, onFailure) => {
    return dispatch => {
        BrandsApi.listbrands().then(
            res => {
                dispatch({
                    type: LIST_BRANDS,
                    payload: res.data
                })
                if (isFunction(onSuccess)) onSuccess(res.message)
            }
        ).catch(err => {
            if (isFunction(onFailure)) onSuccess(err.message)
        })
    }
}