import { SAVE_NEW_QSNR } from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case SAVE_NEW_QSNR:
            return action.payload.data || false;
        default:
            return state;
    }
}