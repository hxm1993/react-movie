import React, {Component} from "react";
import Home from "./home"
import Detail from "./detail"
import { BrowserRouter, HashRouter, Switch, Route, Redirect,Link} from 'react-router-dom';
class Root extends Component {
	render() {
		console.log(this.props)
		return(
			<div>
				
    			<h1>root</h1>
    			<Route path="/index/home"  component={Home} />
    			<Route path={`${this.props.match.url}/detail`}  component={Detail} />
			</div>
		)
	}
}

export default Root;