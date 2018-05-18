import { SUBMIT_QSNR } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case SUBMIT_QSNR:
            return action.payload.data || false;
        default:
            return state;
    }
}