import {combineReducers} from "redux";
import app from "./app";
import films from "./films";
import detail from "./detail";
import cinema from "./cinema";
import com from "./com";

export default combineReducers({
	app,
	films,
	detail,
	cinema,
	com
})