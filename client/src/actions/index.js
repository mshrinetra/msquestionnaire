import axios from "axios";
import { FETCH_USER, FETCH_USER_RETURNED_ERROR } from "./types";

export const fetchUser = () => {
    return function (dispatch) {
        axios.get("/api/current_user")
            .then(
                res => dispatch({
                    type: FETCH_USER,
                    payload: res
                })
            )
            .catch(
                err => dispatch({
                    type: FETCH_USER_RETURNED_ERROR,
                    payload: err.response.data.error
                })
            );
    }
};