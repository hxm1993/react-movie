import * as types from "../../types";
import axios from "axios";
import api from "../../api";

function returnNowPlaying(data) {
	return {
		type: types.GET_FILM_NOWPLAYING,
		data:data.data.data
	}
}
function returnComingMovie(data) {
    return {
        type: types.GET_FILM_COMINGSOON,
        data: data.data.data
    }
}
export function getNowPlaying(page,data) {
    return(dispatch) => {
        api.getHotMovieList(page,function(res) {
            dispatch(returnNowPlaying(res))
        })
    }	
}

export function getComingMovie(page,data) {
    return(dispatch) => {
        api.getComingMovieList(page,function(res) {
            dispatch(returnComingMovie(res))
        })
    }
}