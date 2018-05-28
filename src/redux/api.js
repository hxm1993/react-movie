import axios from 'axios'


var api = process.env.NODE_ENV === 'production' ? 'https://m.maizuo.com/v4/api/' : '/api/';
export default {
    getBanner(cb) {
        axios.get(api + 'billboard/home?t=' + new Date()*1 + '&callback=?').then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getHotMovie(cb) {
        axios.get(api + 'film/now-playing?_t=' + new Date()*1 +'&page=1&count=5').then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getComingMovie(cb) {
        axios.get(api + 'film/coming-soon?__t=' + new Date()*1 +'&page=1&count=3').then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res.data)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getHotMovieList(page,cb) {
        axios.get(api + 'film/now-playing?_t=' + new Date()*1 +'&page='+page+'&count=10').then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getComingMovieList(page,cb) {
        axios.get(api + 'film/coming-soon?__t=' + new Date()*1 +'&page='+page+'&count=10').then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getFilmDetailById:function(id,cb){
        axios.get(api + 'film/' + id + '?__t=' + new Date()*1).then(function(res){
            if(res.status >= 200 && res.status < 300){
                cb(res.data)
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    },

    getCinemaList:function(id,cb){
        axios.get(api + 'film/' + id + '/cinema?__t=' + new Date()*1).then(function(res){
            if(res.status >= 200 && res.status < 300){
                cb(res.data)
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}   