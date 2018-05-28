import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { BrowserRouter, HashRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import Header from "../../components/header";
import MySwiper from "../../components/swiper";
import MovieList from "../../components/movieList";
import Category from "../category";
import * as appAction from "../../redux/actions/app";
import axios from "axios";
require("./index.sass")
let _key = 0;
class App extends Component {
	componentWillMount() {
		this.props.actions.getBanner(() => {
			this.props.actions.getHotMovie();
			this.props.actions.getComingMovie();
		});
	}
	shouldComponentUpdate (nextProps, nextState) {
	    console.log(nextProps)
	    if((this.props.banner !== nextProps.banner) || (this.props.hotMovie !== nextProps.hotMovie) || (this.props.comingMoive !== nextProps.comingMoive)){
	      return true;
	    }else{
	      return false;
	    }
	}
	formatTime(time) {
		let date = new Date(time),
			month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0"+ (date.getMonth() + 1),
			day = date.getDate() > 9 ? date.getDate() : "0"+ date.getMonth()
		return month + "月" + day + "日上映";
	}
	renderComing(){
	    const {comingMoive} = this.props
	    if(!comingMoive){
	      return ;
	    }
	    let str = []
	    for(let item of comingMoive.films){
	      str.push(
	        <div className="item" key={++_key}>
	          <Link to={{pathname:'/detail',search: 'id='+item.id}}>
	            <img src={item.cover.origin} alt=""/>
	            <div className="desc">
	              <div className="info">
	                <h4>{item.name}</h4>
	              </div>
	              <div className="time">{this.formatTime(item.premiereAt)}</div>
	            </div>
	          </Link>
	        </div>
	      )
	    }
	    return (
	      <div className="coming-soon">
	        {str}
	        <div className="go-more-box"><Link to={{pathname:'/films',search:'?coming-soon'}} className="go-more">更多即将上映电影</Link></div>
	      </div>
	    );
	}
	render() {
		console.log("AAAAAGGGGGGGGGGGGGGG")
		console.log(this.props.hotMovie)
		console.log(this.props.comingMoive)
		let coming = this.renderComing();
		return (
			<div>
				<div className={this.props.loading ? "loading" : "loaded"}><div>加载中...</div></div>
				<MySwiper banner={this.props.banner} />
				<MovieList hotMovie={this.props.hotMovie}/>
				{coming}

				<div className="slide">
					<Route path="/category"  component={Category} />
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		banner: state.app.banner,
		hotMovie: state.app.hotMovie,
		comingMoive: state.app.comingMoive,
		loading: state.com.loading
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(appAction,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(App);