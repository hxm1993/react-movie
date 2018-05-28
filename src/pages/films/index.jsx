import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Route, Link } from 'react-router-dom';
import * as filmsAction from "../../redux/actions/films"
require("./index.sass")

class Film extends Component {
	constructor(props){
	    super(props)
	    this.state = {
	      type:this.props.location.search.substr(1) ? this.props.location.search.substr(1) : 'now-playing',
	    }
	}
	componentWillMount() {
		this.props.actions.getNowPlaying();
		this.props.actions.getComingMovie();
	}
	changeTab(curTab) {
		this.setState({type: curTab})
		this.props.history.push("/films?"+curTab);	
	}
	renderNowPlaying() {
		if(!this.props.hotMovie.films) {
			return
		}
		let nowPlay = this.props.hotMovie.films,
			nowPlayDom = [];
		nowPlay.forEach(movie => {
			nowPlayDom.push(
				<Link className="item" to={{pathname: '/cinema', search:'?id='+movie.id}}>
					<div>
						<div className="movie">
							<div className="movieImg">
								<img src={movie.poster.thumbnail} />
							</div>
							<div className="movieDes">
								<h3>{movie.name}</h3>
								<p>{movie.intro}</p>
								<div>
									<p>家影院上映</p>
									<p>人购票</p>
								</div>
							</div>
							<div className="movieGrade">{movie.grade}</div>
						</div>
					</div>
				</Link>
			)
		})

		return nowPlayDom;
	}
	renderComingSoon() {
		if(!this.props.comingMovie.films) {
			return;
		}

		let coming = this.props.comingMovie.films,
			comingDom = [];
		coming.forEach(movie => {
			comingDom.push(
				<Link to={{pathname:'/detail',search:'?id='+movie.id,}} className="item">
					<div>
						<div className="movie">
							<div className="movieImg">
								<img src={movie.poster.thumbnail} />
							</div>
							<div className="movieDes">
								<h3>{movie.name}</h3>
								<p>{movie.intro}</p>
								<div className="playDate">
									<p>{this.formatDate(movie.premiereAt)}</p>
								</div>
							</div>
							<div className="movieGrade"></div>
						</div>
					</div>
				</Link>
			)
		})
		return comingDom;
	}
	formatDate(time) {
		let dateTime = new Date(time),
			month = dateTime.getMonth() + 1 > 9 ? dateTime.getMonth() + 1 : "0" + (dateTime.getMonth() + 1),
			date = dateTime.getDate() > 9 ? dateTime.getDate() : "0" + (dateTime.getDate()),
			day = dateTime.getDay(),
			arr = ['日','一','二','三','四','五','六'];

			return month + '月' + date + '日上映 星期' + arr[day] 
	}
	render() {
		let nowPlayingStr = this.renderNowPlaying();
		let comingMovieStr = this.renderComingSoon();
		return(
			<div className="films">
				<ul className="tab">
					<li onClick={this.changeTab.bind(this,"now-playing")} className={this.state.type === "now-playing" ? "active" : ""}>正在热映</li>
					<li onClick={this.changeTab.bind(this,"coming-soon")} className={this.state.type === "coming-soon" ? "active" : ""}>即将上映</li>
				</ul>
				<div className={this.state.type === "now-playing" ? "now-playing active" : "now-playing"}>{nowPlayingStr}</div>
				<div className={this.state.type === "coming-soon" ? "coming-soon active" : "coming-soon"}>{comingMovieStr}</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		hotMovie: state.films.hotMovie,
		comingMovie: state.films.comingMovie
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(filmsAction,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Film);