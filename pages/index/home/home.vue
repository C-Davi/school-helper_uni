<template>
<view>
<swiper autoplay circular class="header" interval="3000">
    <swiper-item v-for="(item, index) in banner" :key="index">
        <navigator hoverClass="none" :url="item.img_url">
            <image class="header-banner" mode="aspectFill" :src="item.img_url"></image>
        </navigator>
    </swiper-item>
</swiper>
<view class="title">学在青职</view>
<view class="main">
    <view @tap="goUnionPage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="../../../static/images/icon/canteen.svg"></image>
        <text class="main-list__name">海尔社联</text>
    </view>
    <view @tap="goScorePage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="../../../static/images/icon/asso.svg"></image>
        <text class="main-list__name">社团组织</text>
    </view>
    <!-- <view class="main-list" hoverClass="main-list--hover">
        <text class="main-list__icon" data-name="R">32</text>
        <text class="main-list__name">空教室</text>
    </view> -->
</view>
<view class="title">住在青职</view>
<view class="main">
    <view @tap="goMapPage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="../../../static/images/icon/map.svg"></image>
        <text class="main-list__name">校园导航</text>
    </view>
    <!-- <view bindtap="showBusTime" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/bus.svg"></image>
        <text class="main-list__name">校车车</text>
    </view> -->
    <!-- <view bindtap="showCalendar" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/calendar.svg"></image>
        <text class="main-list__name">校历历</text>
    </view>  -->
    <!-- <view bindtap="goAssoPage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/asso.svg"></image>
        <text class="main-list__name">学校社团</text>
    </view> -->
    <view @tap="goPhonePage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="../../../static/images/icon/phone.svg"></image>
        <text class="main-list__name">通讯录</text>
    </view>
</view>
<!-- + -->
<!-- <view class="main">
    <view bindtap="goBoomPage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/boom.svg"></image>
        <text class="main-list__name">扫雷boom</text>
    </view> -->
    <!-- <view bindtap="showRockModal" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/dice.svg"></image>
        <text class="main-list__name">摇一摇</text>
    </view> -->
    <!-- <view bindtap="goFlowerPage" class="main-list" hoverClass="main-list--hover">
        <image class="main-list__icon" src="/images/icon/plant.svg"></image>
        <text class="main-list__name">植物识别</text>
    </view> -->
<!-- </view> -->
<view class="bottom"></view>
<!-- <view bindtap="hideRockModal" class="cu-modal {{showRock?'show':''}}">
    <view catchtap class="cu-dialog modal">
        <template is="{{dice[num]}}" data></template>
    </view>
</view> -->
<view class="white-space"></view>
</view>
</template>

<script>
// var e = wx.cloud.database();
import { Home } from "./home-model";
var home = new Home();

export default {
  data() {
    return {
      banner: ["https://612d-a-e8726c-1258823957.tcb.qcloud.la/login_banner.png"],
      temp: "--",
      showRock: !1,
      showModal: !1,
      dice: ["first", "second", "third", "fourth", "fifth", "sixth"],
      num: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    this.getBanner(); //  this.getWeather();
  },
  onShareAppMessage: function () {
    return {
      title: "掌上嗨尔社联",
      path: "/pages/index/home/home"
    };
  },
  methods: {
    getBanner: function () {
      home.getBanner(res => {
        this.setData({
          banner: res.data
        });
      });
      wx.hideLoading();
    },
    getWeather: function () {// var e = this;
      // wx.cloud.callFunction({
      //     name: "getWeather"
      // }).then(function(a) {
      //     var t = a.result;
      //     e.setData({
      //         temp: t
      //     });
      // });
    },
    goUnionPage: function () {
      wx.navigateTo({
        url: "../../union/home/home"
      });
    },
    goScorePage: function () {
      wx.navigateTo({
        url: "../../leisure/home/home"
      });
    },
    goMapPage: function () {
      wx.navigateTo({
        url: "../map/map"
      });
    },
    goBoomPage: function () {
      wx.navigateTo({
        url: "../boom/boom"
      });
    },
    goFlowerPage: function () {
      wx.navigateTo({
        url: "../flower/flower"
      });
    },
    goAssoPage: function () {
      wx.navigateTo({
        url: "../asso/asso"
      });
    },
    goPhonePage: function () {
      wx.navigateTo({
        url: "../phone/phone"
      });
    },
    showRockModal: function () {
      var e = this;
      this.setData({
        showRock: !0
      });
      var a = 0,
          t = setInterval(function () {
        var o = ~~(6 * Math.random());
        a += 1, e.setData({
          num: o
        }), a >= 30 && clearInterval(t);
      }, 50);
    },
    hideRockModal: function () {
      this.setData({
        showRock: !1
      });
    },
    showCalendar: function () {
      wx.previewImage({
        urls: ["https://612d-a-e8726c-1258823957.tcb.qcloud.la/xl.jpg"]
      });
    },
    showBusTime: function () {
      wx.previewImage({
        urls: ["https://612d-a-e8726c-1258823957.tcb.qcloud.la/busTime.jpg"]
      });
    }
  }
};
</script>
<style>
@import "./home.css";
</style>