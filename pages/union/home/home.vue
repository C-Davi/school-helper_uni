<template>
<view>
<view class="nav">
    <view @tap="getActiveNav" :class="(isActive===index?'nav-active':'') + ' nav-list'" :data-index="index" v-for="(item, index) in nav" :key="index">{{item}}</view>
</view>
<view class="main">
    <view @tap="goDetailPage" class="news" :data-index="index" v-for="(item, index) in news" :key="index">
        <image class="news-img" mode="aspectFill" :src="logo"></image>
        <text class="news-name">{{item.branch_name}}</text>
        <view v-if="apply" class="new-stu" :data-id="item.id" @tap="toApply">
              <image class="new-icon" src="../../../static/images/img/mt2.png"></image>纳新报名</view>
        <text class="news-times">{{item.branch_info}}</text>
    </view>
</view>
</view>
</template>

<script>
import { Union } from "../union-model";
var union = new Union();

export default {
  data() {
    return {
      isActive: 0,
      nav: ["社联组织"],
      news: '',
      apply: false,
      logo: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onloadFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    onloadFun: function () {
      this.canAppley();
      this.getAllUnions();
    },
    canAppley: function () {
      union.unionCanApply(res => {
        if (res.status == 1) {
          this.setData({
            apply: true
          });
        }
      });
    },
    getAllUnions: function () {
      union.getAllUnions(1, res => {
        console.log(res.data);
        this.setData({
          logo: res.data.logo,
          news: res.data.list
        });
      });
    },
    toApply: function (e) {
      let union_id = e.currentTarget.dataset['id'];
      wx.navigateTo({
        url: '../enroll/enroll?union_id=' + union_id
      });
    }
  }
};
</script>
<style>
@import "./home.css";
</style>