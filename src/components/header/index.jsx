import React,{Component} from "react";

require("./index.sass");

class Header extends Component {
	render() {
		return (
			<div className="header">
				<a className="go-menu"><i className="icon iconfont icon-menu"></i></a>
				<div className="title">
					<p>卖座电影</p>
					<a className="go-city">广州<i className="icon iconfont icon-bottom"></i></a>
				</div>
				<a className="go-menu"><i className="icon iconfont icon-people"></i></a>
			</div>
		)
	}
}

export default Header;
