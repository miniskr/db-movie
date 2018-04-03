
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [],
        page: 1,
        size: 6
    },

    onLoad() {
        this.loadMovies()
    },

    loadMovies() {
        const { size, page } = this.data;

        wx.request({
            url: `http://db.miaov.com/doubanapi/v0/movie/list?page=${page}&size=${size}`,
            success:(res) => {
                console.log(res);
                const { data } = res.data;
                const movies = this.data.movies;
                console.log(data);
                for(let i = 0; i < data.length; i+=2 ){
                    movies.push([ data[i], data[i+1] ? data[i+1] : null]);
                }

                this.setData({ movies });
            }
        })
    }
})

