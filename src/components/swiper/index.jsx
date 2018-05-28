import React, {Component} from "react";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
require("./index.sass");
let _key = 0;
class Swiper extends Component {
	componentWillMount() {
		console.log("Swiper")
		console.log(this.props);
	}
	renderSwiper() {
		let images = [];
		this.props.banner && this.props.banner.forEach(banner => {
			_key ++;
			images.push(<div key={banner.name}><img src={banner.imageUrl} /></div>)
		})
		return images;
	}
	render() {
		let images = this.renderSwiper();
		return (
			//key={images.length} 添加关键属性来提示组件需要重绘
			<ReactSwipe key={images.length}>
			    {images}
			</ReactSwipe>
			
		)
	}
}

export default Swiper;