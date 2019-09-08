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
    // 跳转学生信息
    getStudent:function(){
      wx.navigateTo({
        url: '/pages/my/info/info',
      })
    },
    // 跳转社团信息
    getTeam:function(){
      wx.navigateTo({
        url: '/pages/my/team/team',
      })
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
            data: "gh_f5af1f194953",
            success: function(a) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "掌上海尔社联",
            path: "/pages/index/home/home"
        };
    }
});