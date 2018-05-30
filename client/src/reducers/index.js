import { combineReducers } from "redux";
import authReducer from "./authReducer";
import availableQsnrReducer from "./availableQsnrReducer";
import profileReducer from "./profileReducer";
import qsnrReducer from "./qsnrReducer";
import submitQsnrReducer from "./submitQsnrReducer";
import newQsnrReducer from "./newQsnrReducer";

export default combineReducers({
    auth: authReducer,
    availableQsnr: availableQsnrReducer,
    userProfile: profileReducer,
    qsnr: qsnrReducer,
    result: submitQsnrReducer,
    newQsnrSaveResult: newQsnrReducer
});