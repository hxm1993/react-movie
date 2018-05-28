import React, {Component} from "react";
import {Link} from "react-router-dom";
require("./index.sass");
let _key = 0;
class List extends Component {
	renderNowplay(){
	    const {hotMovie} = this.props
	    if(!hotMovie.films){
	      return ;
	    }
	    let str = []
	    for(let item of hotMovie.films){
	    	_key ++;
	      str.push(
	        <div className="item" key={_key}>
	          <Link to={{pathname:'/detail',search:'id='+item.id}}>
	            <img src={item.cover.origin} alt=""/>
	            <div className="desc">
	              <div className="info">
	                <h4>{item.name}</h4>
	                <p>{item.cinemaCount}家影院上映 {item.watchCount}人购票</p>
	              </div>
	              <div className="count">{item.grade}</div>
	            </div>
	          </Link>
	        </div>
	      )
	    }
	    return (
	      <div className="now-playing">
	          {str}
	        <Link to={{pathname:'films',search:'?now-playing'}} className="go-more">更多热映电影</Link>

	      </div>
	    );
	}
	componentWillMount() {
		
	}
	render() {
		console.log("movielist")
		console.log(this.props)
		return (
			<div>
				{this.renderNowplay()}
			</div>
		)
	}
}

export default List;