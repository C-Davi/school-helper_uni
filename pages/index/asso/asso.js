var o = wx.cloud.database();

Page({
    data: {},
    onLoad: function(n) {
        var a = this;
        o.collection("asso").get({
            success: function(o) {
                var n = [];
                o.data.forEach(function(o) {
                    n.push({
                        id: o.id,
                        name: o.name,
                        logo: o.logo
                    });
                }), a.setData({
                    asso: n
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});