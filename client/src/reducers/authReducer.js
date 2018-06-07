import { FETCH_USER, FETCH_USER_RETURNED_ERROR } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload.data || false;
        case FETCH_USER_RETURNED_ERROR:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}