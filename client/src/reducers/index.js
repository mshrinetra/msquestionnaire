import { combineReducers } from "redux";
import authReducer from "./authReducer";
import availableQsnrReducer from "./availableQsnrReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    auth: authReducer,
    availableQsnr: availableQsnrReducer,
    userProfile: profileReducer
});