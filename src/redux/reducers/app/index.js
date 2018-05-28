import * as types from "../../types";

const initialState = {
	banner:[],
	hotMovie: {}
}

export default function app(state=initialState,action) {
	switch(action.type) {
		case types.GET_BANNER:
			return Object.assign({},state,{
                banner:action.data
            })
		case types.GET_HOTMOVIE:
			return Object.assign({},state,{
                hotMovie:action.data
            })
        case types.GET_COMINGMOVIE:
        	return Object.assign({},state,{
        		comingMoive: action.data
        	})
		default:
			return state;
	}
}