import { FETCH_CREATED_QSNR } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_CREATED_QSNR:
            return action.payload.data || false;
        default:
            return state;
    }
}