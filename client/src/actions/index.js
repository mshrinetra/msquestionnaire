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

export const fetchQsnr = (getQuery) => {
    return function (dispatch) {
        axios.get(getQuery)
            .then(
                res => dispatch({
                    type: types.FETCH_QSNR,
                    payload: res
                })
            );
    }
};

export const submitQsnr = (payload) => {
    return function (dispatch) {
        axios.post("/api/qsnr_submit", payload)
            .then(
                res => dispatch({
                    type: types.SUBMIT_QSNR,
                    payload: res
                })
            );
    }
};