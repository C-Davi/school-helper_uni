Page({
    data: {},
    onLoad: function(n) {
        setTimeout(function() {
            wx.switchTab({
                url: "../home/home"
            });
        }, 4e3);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});