import axios from "axios";
import * as types from "./types";

export const fetchUser = () => {
    return function (dispatch) {
        axios.get("/api/current_user")
            .then(
                res => dispatch({
                    type: types.FETCH_USER,
                    payload: res
                })
            )
            .catch(
                err => dispatch({
                    type: types.FETCH_USER_RETURNED_ERROR,
                    payload: err.response.data.error
                })
            );
    }
};

export const fetchAvailableQsnr = () => {
    return function (dispatch) {
        axios.get("/api/available_qsnr")
            .then(
                res => dispatch({
                    type: types.FETCH_AVAILABLE_QSNR,
                    payload: res
                })
            );
    }
};

export const fetchProfile = () => {
    return function (dispatch) {
        axios.get("/api/profile")
            .then(
                res => dispatch({
                    type: types.FETCH_PROFILE,
                    payload: res
                })
            );
    }
};