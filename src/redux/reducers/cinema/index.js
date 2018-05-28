import * as types from "../../types";

const initialState = {
	cinemas:null,
	district: []
}

export default function cinema(state=initialState, action) {
	switch(action.type) {
		case types.GET_CINEMA_LIST:
			let districtArr = [];
			action.data.cinemas.forEach(cinema => {
				districtArr.push({
					name: cinema.district.name,
					pinyin: cinema.district.pinyin
				})
			})
			let tempArr = [],len = districtArr.length;
			for(var i = 0; i < len; i++) {
				for(var j = i+1; j < len; j++) {
					if(districtArr[j].name === districtArr[i].name) {
						districtArr.splice(j,1);
						len --;
						j --;
					}
				}
			}
			districtArr.sort(function(a,b) {
				return a.pinyin.localeCompare(b.pinyin.charAt(0))
			})

			return Object.assign({}, state, {
				cinemas: action.data,
				district: districtArr
			})
		default:
			return state;
	}
}