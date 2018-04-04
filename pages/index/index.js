
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [],
        page: 1,
        size: 6,
        loading: true
    },

    onLoad() {
        this.loadMovies()
    },

    loadMovies() {
        const { size, page } = this.data;

        this.setData({ loading: true });//加载中的小图标显示
        //请求页面数据
        wx.request({
            url: `http://db.miaov.com/doubanapi/v0/movie/list?page=${page}&size=${size}`,
            success:(res) => {
                const { data } = res.data;
                const movies = this.data.movies;
                for(let i = 0; i < data.length; i+=2 ){
                    movies.push([ data[i], data[i+1] ? data[i+1] : null]);
                }

                this.setData({ movies, loading: false });
            }
        })
    },
    //页面翻页加载数据
    scrollHandler () {
      const { page } = this.data
      this.setData({
        page: page + 1
      });
      this.loadMovies();
    },

    goToDetailHandler(e) {
      console.log(e);
      const { id } = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../movie-detail/movie-detail?id=' + id,
      })
    }

})

