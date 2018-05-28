import * as types from "../../types";
import api from "../../api";
import * as com from "../com";
function returnCinemaList(data) {
	return {
		type: types.GET_CINEMA_LIST,
		data: data.data
	}
}

export function getCinemaList(id) {
	return (dispatch) => {
		dispatch(com.loading(true));
		api.getCinemaList(id,function(res) {
			dispatch(returnCinemaList(res))
			dispatch(com.loading(false))
		})
	}
}