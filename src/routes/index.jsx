import React, {Component} from "react";
import { HashRouter, BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Bundle from './Bundle';


// import app from "bundle-loader?lazy&name=home!../pages/app";
// import films from "bundle-loader?lazy&name=home!../pages/films";

import Root from "../pages/root";
// import Home from "bundle-loader?lazy&name=home!../pages/test/home";

// import mine from "bundle-loader?lazy&name=home!../pages/mine";


let Router = process.env.NODE_ENV !== 'production' ? HashRouter : BrowserRouter;

const getRouter = () => (
    <Router>
        <Switch>
			<Route path="/" component={Root} />
		</Switch>
    </Router>
);
export default getRouter;