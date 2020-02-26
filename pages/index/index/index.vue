<template>
<!--pages/welcome/welcome.wxml-->
<!--start.wxml-->
<view class="container">
  <view class="remind-box" v-if="remind">
    <image class="remind-img" src="../../../static/images/more/loading.gif"></image>
  </view>
  <block v-else>
    <!-- <image class="title" src="/images/more/title8.png"></image> -->
    <view class="content">
      <view class="hd" :style="'transform:rotateZ(' + angle + 'deg);'">
        <image class="logo" :src="userInfo.avatarUrl"></image>
        <image class="wave" src="../../../static/images/more/wave.png" mode="aspectFill"></image>
        <image class="wave wave-bg" src="../../../static/images/more/wave.png" mode="aspectFill"></image>
      </view>
      <view class="bd">
        <!-- <image class="smalltitle" src="/images/more/confirm-word1.png"></image> -->
        <view class="confirm-btn" @tap="goToIndex">
          <text>欢迎回家</text>
        </view>
        <text class="copyright"></text>
      </view>
    </view>
  </block>
  <wxc-dialog
	ref="child"
   title="微信授权" content="获得您的公开信息(昵称、头像等)" logName="掌上嗨尔社联" :logImage="logoUrl" @cancel="onCancel" @confirm="onConfirm"></wxc-dialog>
</view>
</template>

<script>
import { Index } from "./index-model";
var index = new Index();
var app = getApp().globalData;
import wxcDialog from "../../../components/dialog/dialog";

export default {
  data() {
    return {
      remind: '加载中',
      angle: 0,
      userInfo: {
        avatarUrl: 'https://shelian.qtc369.com/images/20190821/2ecc3f99a443e5fb93124d3e0e0b3472.jpg'
      },
      logoUrl: ""
    };
  },

  components: {
    wxcDialog
  },
  props: {},
  onLoad: function (n) {
    wx.setNavigationBarTitle({
      title: `掌上嗨尔社联`
    });
    index.getLogo(res => {
      this.setData({
        logoUrl: res.data.img_url
      });
    });
  },
  onReady: function () {
    setTimeout(() => {
      this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(res => {
      let angle = -(res.x * 30).toFixed(1);

      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }

      if (this.angle !== angle) {
        this.setData({
          angle: angle
        });
      }
    });
  },
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    

    if (!userInfo) {
      this.$refs.child.onchangeVisible(true);
    } else {
      this.setData({
        userInfo: userInfo
      });
      this.$refs.child.onchangeVisible(false);
    }
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    goToIndex() {
      wx.switchTab({
        url: '../home/home'
      });
    },

    onConfirm(e) {
      // 点击允许
      
      let userInfo = JSON.parse(e.detail.rawData);

      if (!userInfo) {
        return;
      } else {
        console.log(userInfo);
      }

      this.setData({
        userInfo: userInfo
      });
      wx.setStorageSync('userInfo', userInfo);
	  this.$refs.child.onchangeVisible(false);
    },

    onCancel() {
      // 点击拒绝
      this.$refs.child.onchangeVisible(false);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>