Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        wx.chooseImage({
            success: function(e) {
                wx.getFileSystemManager().readFile({
                    filePath: e.tempFilePaths[0],
                    encoding: "base64",
                    success: function(e) {
                        t.getFlower(e.data);
                    }
                });
            },
            fail: function() {
                wx.navigateBack({});
            }
        });
    },
    getFlower: function(e) {
        this.setData({
            isLoading: !0
        });
        Math.random();
        var t = this;
        wx.request({
            url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=vGRLZaOyXNw3bXFEtoGca2sO&client_secret=jMrvT3Y7qdw8Xtf45dFedB5n34FlUc72",
            success: function(a) {
                wx.request({
                    url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=" + a.data.access_token,
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        image: e,
                        baike_num: 2
                    },
                    success: function(e) {
                        t.setData({
                            flower: e.data.result[0],
                            isLoading: !1
                        });
                    }
                });
            }
        });
    }
});