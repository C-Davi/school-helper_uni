var t = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var s = arguments[i];
        for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
    }
    return t;
}, i = 0, s = "", n = "", e = "";

getApp();

Page({
    mineMap: {},
    mineMapMapping: {},
    rowCount: 9,
    colCount: 9,
    mineCount: 12,
    minesLeft: 0,
    flagOn: !1,
    flags: 0,
    safeMinesGo: 0,
    data: {
        mineMap: {},
        timesGo: "0.00",
        step: 0,
        isWin: "😀",
        isAuth: !1,
        showRank: !1,
        myRank: {},
        rank: []
    },
    onLoad: function() {
        this.login(), this.drawMineField(), this.minesLeft = this.mineCount;
    },
    login: function() {
        var t = this;
        wx.cloud.callFunction({
            name: "login"
        }).then(function(i) {
            n = i.result.openid, wx.getSetting({
                success: function(i) {
                    i.authSetting["scope.userInfo"] && wx.getUserInfo({
                        success: function(i) {
                            e = i.userInfo, t.setData({
                                isAuth: !0
                            }), t.postInfo(n, e);
                        }
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        });
    },
    setGame: function() {
        this.setData({
            isWin: "😀",
            step: 0
        }), this.safeMinesGo = 0, this.drawMineField(), this.timeGoReset(), this.mineMapMapping = {}, 
        this.minesLeft = this.mineCount;
    },
    timeGoClock: function() {
        var t = this, i = 0;
        s = setInterval(function() {
            i += .1, t.setData({
                timesGo: i.toFixed(2)
            });
        }, 100);
    },
    timeGoStop: function() {
        clearInterval(s);
    },
    timeGoReset: function() {
        clearInterval(s), i = 0, this.setData({
            timesGo: "0.00",
            step: 0
        });
    },
    createMinesMap: function() {
        for (var t = {}, i = 0; i < this.rowCount; i++) {
            t[i] = [];
            for (var s = 0; s < this.colCount; s++) t[i][s] = 0;
        }
        for (var n = this.mineCount; n > 0; ) {
            var e = this.rangeRandom(0, this.rowCount - 1), a = this.rangeRandom(0, this.colCount - 1);
            9 != t[e][a] && (t[e][a] = 9, n -= 1);
        }
        for (e = 0; e < this.rowCount; e++) for (a = 0; a < this.colCount; a++) for (var o = e - 1; o < e + 2; o++) for (var h = a - 1; h < a + 2; h++) h >= 0 && h < this.colCount && o >= 0 && o < this.rowCount && (o !== e || h !== a) && 9 == t[o][h] && 9 != t[e][a] && t[e][a]++;
        this.mineMapMapping = t;
    },
    drawMineField: function() {
        for (var t = {}, i = 0; i < this.rowCount; i++) {
            t[i] = [];
            for (var s = 0; s < this.colCount; s++) t[i][s] = -1;
        }
        this.mineMap = t, this.setData({
            mineMap: this.mineMap
        });
    },
    demining: function(t) {
        if ("{}" == JSON.stringify(this.mineMapMapping) && (this.createMinesMap(), this.timeGoClock()), 
        JSON.stringify(this.data.mineMap) !== JSON.stringify(this.mineMapMapping)) {
            var i = +t.target.dataset.x, s = +t.target.dataset.y;
            if (!(+t.target.dataset.value >= 0)) {
                var n = this.mineMapMapping[i][s];
                this.setData({
                    step: this.data.step + 1
                }), n < 9 && (this.mineMap[i][s] = n, this.setData({
                    mineMap: this.mineMap
                }), ++this.safeMinesGo + this.mineCount == this.rowCount * this.colCount && this.success()), 
                9 == n && this.failed(), 0 == n && (this.openZeroArround(i, s), this.setData({
                    mineMap: this.mineMap
                }));
            }
        }
    },
    success: function() {
        this.showAll(), this.timeGoStop(), this.setData({
            isWin: "😎"
        }), this.data.isAuth ? this.getUserScore() : this.setData({
            dialogModal: !0
        });
    },
    hideDialogModal: function() {
        this.setData({
            dialogModal: !1
        });
    },
    failed: function() {
        this.showAll(), this.timeGoStop(), this.setData({
            isWin: "🙁"
        });
    },
    openZeroArround: function(t, i) {
        for (var s = t - 1; s < t + 2; s++) for (var n = i - 1; n < i + 2; n++) s >= 0 && s < this.rowCount && n >= 0 && n < this.colCount && (s !== t || n !== i) && this.mineMap[s][n] < 0 && (this.mineMap[s][n] = this.mineMapMapping[s][n], 
        this.safeMinesGo++, 0 == this.mineMapMapping[s][n] && this.openZeroArround(s, n));
        this.safeMinesGo + this.mineCount == this.rowCount * this.colCount && this.success();
    },
    flag: function(t) {
        var i = +t.target.dataset.x, s = +t.target.dataset.y, n = +t.target.dataset.value;
        0 !== this.data.step && (10 !== n ? this.minesLeft <= 0 || n < 0 && (this.minesLeft -= 1, 
        this.mineMap[i][s] = 10, this.setData({
            mineMap: this.mineMap
        })) : this.pullUpFlag(i, s));
    },
    pullUpFlag: function(t, i) {
        this.minesLeft < this.mineCount && (this.minesLeft = this.minesLeft + 1), this.mineMap[t][i] = -1, 
        console.log(this.mineMap[t][i]), this.setData({
            mineMap: this.mineMap
        });
    },
    rangeRandom: function(t, i) {
        var s = i - t + 1;
        return Math.floor(Math.random() * s + t);
    },
    showAll: function() {
        this.mineMap = this.mineMapMapping, this.setData({
            mineMap: this.mineMap
        });
    },
    getUserInfoAndData: function(t) {
        t.detail.userInfo && (this.getUserInfo(t), this.getUserScore());
    },
    getUserInfo: function(t) {
        !this.logged && t.detail.userInfo && (e = t.detail.userInfo, this.setData({
            isAuth: !0
        }), this.postInfo(n, e));
    },
    getUserScore: function() {
        var t = {
            step: this.data.step,
            time: this.data.timesGo
        };
        this.postInfo(n, "", t);
    },
    postInfo: function(i, s) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", e = t({
            openid: i
        }, s, n);
        wx.request({
            url: "https://www.zzuyinluo.top/schedules/adduser",
            data: e,
            success: function(t) {},
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getRanking: function() {
        var t = this;
        wx.request({
            url: "https://www.zzuyinluo.top/schedules/rank",
            data: {
                openid: n
            },
            success: function(i) {
                t.setData({
                    showRank: !0,
                    rank: i.data.rank,
                    myRank: i.data.myRank
                });
            }
        });
    },
    hideRank: function() {
        this.setData({
            showRank: !1
        });
    }
});