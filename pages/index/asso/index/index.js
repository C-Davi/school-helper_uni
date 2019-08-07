var a = wx.cloud.database();

Page({
    data: {},
    onLoad: function(t) {
        var s = this;
        a.collection("asso").where({
            id: +t.id
        }).get({
            success: function(a) {
                s.setData({
                    data: a.data[0]
                });
            }
        });
    }
});