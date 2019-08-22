var a = getApp();
import { About } from '../about-model.js';
var about = new About();
Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        Custom: a.globalData.Custom,
        showModal: !1
    },
    onLoad: function() {
      this.getLogo()
    },
    getLogo:function(){
      about.getLogo((res)=>{
        this.setData({
          logo_url: res.data.img_url
        })
      })
    },
    showModal: function() {
        this.setData({
            showModal: !0
        });
    },
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    copyAppid: function() {
        console.log(111), wx.setClipboardData({
            data: "wx23f9146e0ebc330f",
            success: function(a) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "ZZUhelper--北校区校园助手",
            path: "/pages/index/home/home"
        };
    }
});