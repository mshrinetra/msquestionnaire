import { combineReducers } from "redux";
import authReducer from "./authReducer";
import availableQsnrReducer from "./availableQsnrReducer";
import atendedQsnrReducer from "./atendedQsnrReducer";
import createdQsnrReducer from "./createdQsnrReducer";
import profileReducer from "./profileReducer";
import qsnrReducer from "./qsnrReducer";
import submitQsnrReducer from "./submitQsnrReducer";
import newQsnrReducer from "./newQsnrReducer";

export default combineReducers({
    auth: authReducer,
    availableQsnr: availableQsnrReducer,
    atendedQsnr: atendedQsnrReducer,
    createdQsnr: createdQsnrReducer,
    userProfile: profileReducer,
    qsnr: qsnrReducer,
    result: submitQsnrReducer,
    newQsnrSaveResult: newQsnrReducer
});