import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as detailAction from "../../redux/actions/detail";
require("./index.sass");
class Detail extends Component {
	componentWillMount() {
		console.log(this.props.location.search)
		let search = this.props.location.search;
		let id = search.substr(search.indexOf("=")+1)
		this.props.actions.getFilmDetailById(id);
	}
	renderMovieDetail() {
		if(!this.props.movieDetail) return;
		let movie = this.props.movieDetail.film;
		let arr = [];
		arr.push(<div>aaaa</div>);
		return arr;
	}
	formatDate(time) {
		let dateTime = new Date(time),
			year = dateTime.getFullYear(),
			month = dateTime.getMonth() + 1 > 9 ? dateTime.getMonth() + 1 : "0" + (dateTime.getMonth() + 1 ),
			date = dateTime.getDate() > 9 ? dateTime.getDate() : "0" + dateTime.getDate();
		return year + "-" + month + "-" + date;
	}
	getActors(actors) {
		let nameStr = "";
		actors.forEach(actor => {
			nameStr += actor.name + "|"
		})
		return nameStr.substring(0,nameStr.length-1)
	}
	render() {
		if(!this.props.movieDetail) {
			return(
				<div className="loading"><div>加载中...</div></div>
			)
		}
		let movie = this.props.movieDetail.film;
		return(
			<div className="detail">
				<div className={this.props.loading ? "loading" : "loaded"}><div>加载中...</div></div>
				<div className="movieImg">
					<img src={movie.cover.origin} />
				</div>
				<div className="movieDesc">
					<p className="title">影片简介</p>
					<div className="info">
						<p>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{movie.director}</p>
						<p className="actors">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{this.getActors(movie.actors)}</p>
						<p>地区语言：{movie.nation}({movie.language})</p>
						<p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{movie.category}</p>
						<p>上映日期：{this.formatDate(movie.premiereAt)}</p>
						<p className="info-desc">{movie.synopsis}</p>
					</div>
				</div>
				
				<div className={movie.isNowPlaying ? "buyTicket showBlock" : "buyTicket" }>
					<Link to={{pathname:'/cinema',search:'id='+movie.id}} className="button">
						立即购票
					</Link>
				</div>
				
			</div>
		)
	}
}


const mapStateToProps = state => {
	console.log(state)
	return {
		movieDetail: state.detail.movieDetail,
		loading: state.com.loading
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(detailAction,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Detail);