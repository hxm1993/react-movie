import axios from 'axios'


export default {
    getBanner(cb) {
        var url = process.env.NODE_ENV !== 'production' ? '/api/billboard/home?t=' + new Date()*1 + '&callback=?' : '/mock/bannerList.json';
        axios.get(url).then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getHotMovie(cb) {
        var url = process.env.NODE_ENV !== 'production' ? '/api/film/now-playing?_t=' + new Date()*1 + '&callback=?' : '/mock/hotMovie.json';
        axios.get(url).then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getComingMovie(cb) {
        var url = process.env.NODE_ENV !== 'production' ? '/api/film/coming-soon?__t=' + new Date()*1 +'&page=1&count=3' : '/mock/comingMovie.json';

        axios.get(url).then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res.data)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getHotMovieList(page,cb) {
        var url = process.env.NODE_ENV !== 'production' ? '/api/film/now-playing?_t=' + new Date()*1 +'&page='+page+'&count=10' : '/mock/hotMovieList.json';

        axios.get(url).then(function(res){
                if(res.status >= 200 && res.status <300){
                    cb(res)
                }
            }).catch((error) => {
                // new Error('desc');
                return Promise.reject(error)
        })
    },

    getComingMovieList(page,cb) {
        var url = process.env.NODE_ENV !== 'production' ? '/api/film/coming-soon?__t=' + new Date()*1 +'&page='+page+'&count=10' : '/mock/comingMovieList.json';

        axios.get(url).then(function(res){
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