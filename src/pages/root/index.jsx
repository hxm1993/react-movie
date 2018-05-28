import React, {Component} from "react";
import { BrowserRouter, HashRouter, Switch, Route, Redirect,Link} from 'react-router-dom';
import Bundle from '../../routes/Bundle';
import Header from "../../components/header";
import App from "bundle-loader?lazy&name=app1!../app";
import Films from "bundle-loader?lazy&name=films1!../films";
import Detail from "bundle-loader?lazy&name=detail1!../detail";
import Cinema from "bundle-loader?lazy&name=cinema1!../cinema";

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

class Root extends Component {
	render() {
		return(
			<div>
				<Header />
				<Switch>
					<Route path="/app"  component={createComponent(App)} />
	    			<Route path="/films"  component={createComponent(Films)} />
	    			<Route path="/detail"  component={createComponent(Detail)} />
	    			<Route path="/cinema"  component={createComponent(Cinema)} />
	    			<Redirect from='' to="/app" />
				</Switch>
			</div>
		)
	}
}

export default Root;