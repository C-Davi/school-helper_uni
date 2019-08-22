// var e = wx.cloud.database();
import { Home } from 'home-model.js';
var home = new Home();
Page({
    data: {
        banner: [ "https://612d-a-e8726c-1258823957.tcb.qcloud.la/login_banner.png" ],
        temp: "--",
        showRock: !1,
        showModal: !1,
        dice: [ "first", "second", "third", "fourth", "fifth", "sixth" ]
    },
    onLoad: function() {
        this.getBanner();
        //  this.getWeather();
    },
    getBanner: function() {
      home.getBanner((res)=>{
        this.setData({
          banner: res.data
        })
      })
    },
    getWeather: function() {
        // var e = this;
        // wx.cloud.callFunction({
        //     name: "getWeather"
        // }).then(function(a) {
        //     var t = a.result;
        //     e.setData({
        //         temp: t
        //     });
        // });
    },
    goScorePage: function() {
        wx.navigateTo({
            url: "../score/score"
        });
    },
    goMapPage: function() {
        wx.navigateTo({
            url: "../map/map"
        });
    },
    goBoomPage: function() {
        wx.navigateTo({
            url: "../boom/boom"
        });
    },
    goFlowerPage: function() {
        wx.navigateTo({
            url: "../flower/flower"
        });
    },
    goAssoPage: function() {
        wx.navigateTo({
            url: "../asso/asso"
        });
    },
    goPhonePage: function() {
        wx.navigateTo({
            url: "../phone/phone"
        });
    },
    showRockModal: function() {
        var e = this;
        this.setData({
            showRock: !0
        });
        var a = 0, t = setInterval(function() {
            var o = ~~(6 * Math.random());
            a += 1, e.setData({
                num: o
            }), a >= 30 && clearInterval(t);
        }, 50);
    },
    hideRockModal: function() {
        this.setData({
            showRock: !1
        });
    },
    showCalendar: function() {
        wx.previewImage({
            urls: [ "https://612d-a-e8726c-1258823957.tcb.qcloud.la/xl.jpg" ]
        });
    },
    showBusTime: function() {
        wx.previewImage({
            urls: [ "https://612d-a-e8726c-1258823957.tcb.qcloud.la/busTime.jpg" ]
        });
    },
    onShareAppMessage: function() {
        return {
          title: "掌上嗨尔社联",
            path: "/pages/index/home/home"
        };
    }
});