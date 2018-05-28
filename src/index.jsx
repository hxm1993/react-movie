import React from "react";
import {AppContainer} from 'react-hot-loader';
import {render} from "react-dom";
import getRouter from "./routes";
import {Provider} from "react-redux";
import store from "./redux";

require("./styles/reset.sass");
require("./styles/icon/iconfont.css");

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./routes', () => {
        const getRouter = require('./routes').default;
        renderWithHotReload(getRouter());
    });
}

// render(
// 	<AppContainer>
// 		<Provider store={store}>
// 			{routes}
// 		</Provider>
// 	</AppContainer>,
// 	document.getElementById("app")
// )
function renderWithHotReload(RootElement) {
    render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';