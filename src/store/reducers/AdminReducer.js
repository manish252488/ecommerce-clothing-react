import {SET_USERS_LIST} from '../actions/actionTypes'
const initialState={
    users: [],
}
function AdminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS_LIST:
        return {
            ...state,
            users: action.payload
        }
    default:
      return state;
  }
}
export default AdminReducer;