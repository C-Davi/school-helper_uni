var e = {};

Page({
    data: {
        gradeTerms: [],
        range: "",
        value: "",
        score: "",
        rank: ""
    },
    onLoad: function(e) {
        var a = e.username, s = e.password;
        this.requestScore(a, s), this.requestRank(a, s);
    },
    requestScore: function(a, s) {
        var t = this;
        wx.showLoading({
            title: "成绩加载中~"
        }), wx.request({
            url: "https://www.zzuyinluo.top/schedules/gpa?username=" + a + "&password=" + s,
            method: "get",
            success: function(a) {
                var s = a.data;
                e = s.gpaMap;
                var r = [];
                s.gradeTerms.forEach(function(e) {
                    r.push(e.term);
                });
                var n = r.length - 1, u = s.gpaMap[r[n]];
                t.setData({
                    gradeTerms: s.gradeTerms,
                    range: r,
                    value: n,
                    score: u
                }), wx.hideLoading();
            }
        });
    },
    requestRank: function(e, a) {
        var s = this;
        wx.request({
            url: "https://www.zzuyinluo.top/schedules/gpaRank?username=" + e + "&password=" + a,
            method: "get",
            success: function(e) {
                var a = e.data.message;
                s.setData({
                    rank: a
                });
            }
        });
    },
    getChange: function(a) {
        var s = a.detail.value, t = e[this.data.range[s]];
        this.setData({
            value: s,
            score: t
        });
    }
});