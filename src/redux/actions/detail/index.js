import * as types from "../../types";
import axios from "axios";
import api from "../../api";
import * as com from "../com";
function returnFilmDetailById(data) {
	return {
		type: types.GET_DETAIL_FILM_BY_ID,
		data: data.data
	}
}

export function getFilmDetailById(id) {
	return (dispatch) => {
		dispatch(com.loading(true));
		api.getFilmDetailById(id,function(res) {
			console.log("GET_DETAIL_FILM_BY_ID")
			console.log(res)
			dispatch(returnFilmDetailById(res))
			dispatch(com.loading(false))
		})
	}
}