import * as Actions from '../actions/actionTypes';
import { LIST_CATEGORY, PRODUCT_CLEAR } from '../actions/actionTypes';

const initialState = {
    products: [],
    productDetails: {},
    categories: [],
    metadata: {}
}

function ProductsReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.LIST_PRODUCTS:
            return {
                ...state,
                products: [...state.products, ...action.payload.products],
                metadata: action.payload.metadata
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
            case PRODUCT_CLEAR: 
                return {
                    ...state,
                    products: []
                }
        default: return state;
    }
}
export default ProductsReducer;