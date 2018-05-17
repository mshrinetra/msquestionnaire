import { FETCH_AVAILABLE_QSNR } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_QSNR:
            return action.payload.data || false;
        default:
            return state;
    }
}