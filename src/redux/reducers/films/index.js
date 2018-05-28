import * as types from "../../types";

const initialState = {
	hotMovie: {},
	comingMovie: {}
}

export default function films(state=initialState,action) {
	switch(action.type) {
		case types.GET_FILM_COMINGSOON:
			return Object.assign({},state,{
                comingMovie:action.data
            })
		case types.GET_FILM_NOWPLAYING:
			return Object.assign({},state,{
                hotMovie:action.data
            })
		default:
			return state;
	}
}