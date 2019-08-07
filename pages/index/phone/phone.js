var a = wx.cloud.database();

Page({
    data: {
        phones: []
    },
    onLoad: function() {
        var e = this;
        a.collection("phone").get().then(function(a) {
            var t = a.data;
            e.setData({
                phones: t
            });
        });
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});