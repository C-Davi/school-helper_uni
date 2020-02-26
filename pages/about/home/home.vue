<template>
<view>
<view class="header" :hidden="header">
    <open-data class="header-avatar" type="userAvatarUrl"></open-data>
    <open-data class="header-name" type="userNickName"></open-data>
</view>
<view class="header" :hidden="!header">
  <image class="header-avatar" src="../../../static/image/user-icon.svg"></image> 
   <view class="header-name">点击头像登陆</view>
</view>
<view class="main">
    <view class="main-list">
        <button class="main-list__item" @tap="getStudent">
            <image src="../../../static/images/icon/calendar.svg"></image>
            <text>学生信息</text>
        </button>
        <button class="main-list__item" @tap="getTeam">
            <image src="../../../static/images/icon/canteen.svg"></image>
            <text>社团信息</text>
        </button>
        <button class="main-list__item" openType="feedback">
            <image src="../../../static/images/icon/feedback.svg"></image>
            <text>意见反馈</text>
        </button>
        <button class="main-list__item" openType="share">
            <image src="../../../static/images/icon/share.svg"></image>
            <text>我要分享</text>
        </button>
    </view>
    <view @longtap="copyAppid" class="main-desc">
        <image class="main-desc__logo" :src="logo_url"></image>
        <text>嗨尔社联
      便捷服务只为青职的你！
      公众号<text class="appid">嗨尔社联</text>(长摁复制)</text>
    </view>
</view>
<view @tap="hideModal" :class="'cu-modal ' + (showModal?'show':'')">
    <view @tap.native.stop class="cu-dialog tmodal">
        <view class="tmodal-title" style="background: #11a3ff;">提示</view>
        <view class="tmodal-content">敬请期待🎉~</view>
    </view>
</view>
</view>
</template>

<script>
var a = getApp().globalData;
import { About } from "../about-model";
var about = new About();

export default {
  data() {
    return {
      StatusBar: a.globalData.StatusBar,
      CustomBar: a.globalData.CustomBar,
      Custom: a.globalData.Custom,
      showModal: !1,
      header: true,
      logo_url: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.getLogo();
    this.onloadFun();
  },
  onShareAppMessage: function () {
    return {
      title: "掌上海尔社联",
      path: "/pages/index/home/home"
    };
  },
  methods: {
    onloadFun: function () {
      let userInfo = wx.getStorageSync('userInfo');

      if (userInfo) {
        this.setData({
          header: false
        });
      }
    },
    // 跳转学生信息
    getStudent: function () {
      wx.navigateTo({
        url: '/pages/my/info/info'
      });
    },
    // 跳转社团信息
    getTeam: function () {
      wx.navigateTo({
        url: '/pages/my/team/team'
      });
    },
    getLogo: function () {
      about.getLogo(res => {
        this.setData({
          logo_url: res.data.img_url
        });
      });
    },
    showModalFun: function () {
      this.setData({
        showModal: !0
      });
    },
    hideModal: function () {
      this.setData({
        showModal: !1
      });
    },
    copyAppid: function () {
      console.log(111), wx.setClipboardData({
        data: "gh_f5af1f194953",
        success: function (a) {
          wx.showToast({
            title: "复制成功"
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./home.css";
</style>