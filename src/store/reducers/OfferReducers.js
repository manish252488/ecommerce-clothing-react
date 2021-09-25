import { LIST_OFFERS } from "../actions/actionTypes";

const initialState = {
    offers: [],
}

function OffersReducers(state = initialState, action) {
    switch (action.type) {
       
        case LIST_OFFERS:
            return {
                ...state,
                offers: action.payload
            }
        default: return state;
    }
}
export default OffersReducers;