import * as Actions from '../actions/actionTypes';
import { LIST_CATEGORY } from '../actions/actionTypes';

const initialState = {
    products: [],
    productDetails: {},
    categories: []
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
            case LIST_CATEGORY: 
            return {
                ...state,
                categories: action.payload
            }
            
        default: return state;
    }
}
export default ProductsReducer;