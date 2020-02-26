<template>
<view class="body">
    <view class="common-d top">
      <view class="avatar">
          <open-data type="userAvatarUrl" mode="aspectFill"></open-data>
      </view>
      <view class="u-info">
        <view class="u-info-r">
            <text class="txt">各社团总学分：{{totalPoints}}</text>
            <text class="txt">技能社团学分：{{enPoints}}</text>
            <text class="txt">身心社团学分：{{mdPoints}}</text>
        </view>
      </view>
    </view>
    <view class="common-d bottom">
      <view class="b-content" v-if="md_status==1">
        <view class="team-img">
          <image class="team_img" :src="img_pre + '' + mdInfo.md_team.logo"></image>
        </view>
        <view class="team-text">
            <view class="team-t">社团名称：{{mdInfo.md_team.team_name}}</view>
            <view class="team-t">社团类型：身心类社团</view>
            <view class="team-t">社团学分：{{enPoints}}</view>
        </view>
      </view>

      <view class="b-content" v-if="eng_status==1">
        <view class="team-img">
          <image class="team_img" :src="img_pre + '' + enInfo.md_team.logo"></image>
        </view>
        <view class="team-text">
            <view class="team-t">社团名称：{{enInfo.md_team.team_name}}</view>
            <view class="team-t">社团类型：技能类社团</view>
            <view class="team-t">社团学分：{{enPoints}}</view>
        </view>
      </view>
      <view class="b-content-empty" v-if="md_status==2 && en_status==2||status==2">暂无相关社团信息</view>
    </view>
</view>
</template>

<script>
// pages/my/team/team.js
import { My } from "../my-model";
var my = new My();

export default {
  data() {
    return {
      mdInfo: "",
      enInfo: "",
      totalPoints: '0.0',
      mdPoints: '0.0',
      enPoints: '0.0',
      img_pre: 'https://shelian.qtc369.com/images/',
      status: 0,
      md_status: 0,
      en_status: 0
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
      wx.showLoading({
        title: '加载中'
      });
      my.getStuTeams(res => {
        console.log(res);

        if (res.status == 2) {
          this.setData({
            status: 2
          });
        }

        let data = res.data;
        let md_status = data.md_status;
        let en_status = data.en_status;

        if (md_status == 2) {
          this.setData({
            md_status: 2
          });
        } else if (md_status == 1) {
          this.setData({
            md_status: 1,
            mdInfo: data.md_info
          });
        }

        if (en_status == 2) {
          this.setData({
            en_status: 2
          });
        } else if (en_status == 1) {
          this.setData({
            en_status: 1,
            enInfo: data.en_Info
          });
        }
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 1500);
    },
    getStuInfo: function () {}
  }
};
</script>
<style>
@import "./team.css";
</style>