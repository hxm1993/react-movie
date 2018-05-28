import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as cinemaAction from "../../redux/actions/cinema";
require("./index.sass");
class Cinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pinyin : ""
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.topArear) {
			this.setState({
				pinyin: nextProps.topArear.pinyin
			})
		}
		
	}
	componentWillMount() {
		let search = this.props.location.search;
		let index = search.indexOf("=");
		let id = search.substr(index+1);
		this.props.actions.getCinemaList(id);
	}
	toggleTab(pinyinStr) {
		if(this.state.pinyin === pinyinStr) {
			this.setState({
				pinyin: ""
			})
		}else {
			this.setState({
				pinyin: pinyinStr
			})
		}
		
	}
	renderAreaItem() {
		console.log("MMDDDDDDDDDDDDD")
		console.log(this.props.topArear)
		console.log(this.state.pinyin)
		if(!this.props.cinemas) {
			return;
		}
		console.log(this.props)
		let {district} = this.props;
		let cinemas = this.props.cinemas.cinemas;
		let areaArr = [];
		district.forEach(district => {

			areaArr.push(
				<div className={this.state.pinyin === district.pinyin ? "item active" : "item"}>
					<div className="title" onClick={this.toggleTab.bind(this,district.pinyin)}>{district.name}</div>
					<div className="cinemaDesc"><ul>{this.renderCinemas(cinemas,district.pinyin)}</ul></div>
					
				</div>
			)
		})

		return areaArr;
	}
	renderCinemas(cinemas,pinyin) {
		let cinemaArr = [];
		cinemas.forEach(cinema => {
			if(cinema.district.pinyin === pinyin) {
				cinemaArr.push(
					<li>
						<p className="name">{cinema.name}<span>座</span>{cinema.itemTypes.length > 3&&<span>通</span>}</p>
						<p className="address">{cinema.address}</p>
						<p className="avaliableSchedule">距离未知|剩余{cinema.avaliableSchedule}场</p>
						<p className="price">￥{cinema.minimumPrice}</p>
					</li>
				)
			}
			
		})
		return cinemaArr;
	}
	render() {
		let cinemaDom = this.renderAreaItem();
		return(
			<div>
				<div className={this.props.loading ? "loading" : "loaded"}><div>加载中...</div></div>
				<div className="cinema">{cinemaDom}</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		cinemas: state.cinema.cinemas,
		district: state.cinema.district,
		topArear: state.cinema.district[0],
		loading: state.com.loading

	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(cinemaAction,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Cinema);