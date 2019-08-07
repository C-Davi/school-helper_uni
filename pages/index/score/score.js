Page({
    data: {
        username: "",
        password: "",
        showModal: !1
    },
    onLoad: function() {
        var a = wx.getStorageSync("username");
        a && this.setData({
            username: a
        });
    },
    getUsername: function(a) {
        this.setData({
            username: a.detail.value
        });
    },
    getPassword: function(a) {
        this.setData({
            password: a.detail.value
        });
    },
    goIndexPage: function() {
        var a = this, s = this.data.username, e = this.data.password;
        wx.showLoading({
            title: "验证学生信息~",
            mask: !0
        }), wx.request({
            url: "https://www.zzuyinluo.top/schedules/stuProve?username=" + s + "&password=" + e,
            success: function(t) {
                wx.hideLoading(), "success" === t.data ? (wx.setStorageSync("username", s), wx.navigateTo({
                    url: "index/index?username=" + s + "&password=" + e
                })) : a.setData({
                    showModal: !0,
                    password: ""
                });
            }
        });
    },
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    }
});