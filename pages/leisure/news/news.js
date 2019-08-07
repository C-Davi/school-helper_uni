Page({
    data: {
        news: ""
    },
    onLoad: function() {
        var t = this;
        wx.request({
            url: "https://www.zzuyinluo.top/schedules/schoolNews",
            success: function(e) {
                t.setData({
                    news: e.data
                });
            }
        });
    },
    goDetailPage: function(t) {
        var e = t.currentTarget.dataset.index;
        wx.setStorage({
            key: "newsDetail",
            data: JSON.stringify(this.data.news[e]),
            success: function(t) {
                wx.navigateTo({
                    url: "index/index"
                });
            }
        });
    }
});