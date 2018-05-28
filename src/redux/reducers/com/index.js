import * as types from "../../types";

const initialState = {
	loading: 0
}

export default function com(state=initialState, action) {
	switch(action.type) {
		case types.LOADING:
			return Object.assign({}, state, {
				loading: action.loading
			})
		default:
			return state;
	}
}