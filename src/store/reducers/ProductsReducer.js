import * as Actions from '../actions/actionTypes';

const initialState = {
    products: [],
    productDetails: {}
}
function ProductsReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.LIST_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case Actions.PRODUCT_DETAIL:
            return {
                ...state,
                productDetails: action.payload
            }
            
        default: return state;
    }
}
export default ProductsReducer;