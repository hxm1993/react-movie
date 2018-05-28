import * as types from "../../types";

const initialState = {
	movieDetail: null
}

export default function detail(state=initialState,action) {
	switch(action.type) {
		case types.GET_DETAIL_FILM_BY_ID:
			return Object.assign({},state,{
                movieDetail:action.data
            })
		default:
			return state;
	}
}