import * as types from "../../types";
import axios from "axios";
import api from "../../api";
import * as com from "../com";
function returnBanner(res){
    return {
        type:types.GET_BANNER,
        data:res.data.data.billboards
    }
}
function returnHotMovie(res){
    return {
        type:types.GET_HOTMOVIE,
        data:res.data.data
    }
}
function returnComingMovie(res) {
    return {
        type: types.GET_COMINGMOVIE,
        data: res.data
    }
}
export function getBanner(cb) {
    return(dispatch) => {
        dispatch(com.loading(true));
        api.getBanner(function(res) {
            dispatch(returnBanner(res))
            cb()
            dispatch(com.loading(false));
        })

    }	
}

export function getHotMovie() {
    return(dispatch) => {
        api.getHotMovie(function(res) {
            dispatch(returnHotMovie(res))
        })
    }
}

export function getComingMovie() {
    return(dispatch) => {
        api.getComingMovie(function(res) {
            dispatch(returnComingMovie(res))
            dispatch(com.loading(false))

        })
    }
}