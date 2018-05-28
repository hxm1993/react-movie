import * as types from "../../types";

export function loading(bool) {
	return {
		type: types.LOADING,
		loading: bool 
	}
}