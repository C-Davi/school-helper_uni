Page({
    data: {},
    onLoad: function() {
        var e = JSON.parse(wx.getStorageSync("newsDetail"));
        e.news = e.news.split("\n"), this.setData({
            newsDetail: e
        });
    },
    preview: function(e) {
        var t = e.currentTarget.dataset.index, a = [];
        this.data.newsDetail.imgMap.forEach(function(e) {
            a.push(e.imgUrl);
        }), wx.previewImage({
            urls: a,
            current: a[t]
        });
    }
});