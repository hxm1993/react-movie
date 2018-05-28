import React, {Component} from "react";
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import category from "./category";
class Mine extends Component {
	render() {
		return (
			<div>
				aaaa
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Mine;