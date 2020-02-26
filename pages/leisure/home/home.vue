<template>
<view>
<view class="nav">
    <view @tap="getActiveNav" :class="(isActive===index?'nav-active':'') + ' nav-list'" :data-index="index" v-for="(item, index) in nav" :key="index">{{item}}</view>
</view>
<view class="main">
    <view @tap="goDetailPage" class="news" :data-index="index" v-for="(item, index) in news" :key="index">
        <image class="news-img" mode="aspectFill" :src="img_pre + '' + item.logo"></image>
        <text class="news-name">{{item.team_name}}</text>
        <view v-if="apply" class="new-stu" :data-id="item.id" @tap="toApply">
              <image class="new-icon" src="../../../static/images/img/mt2.png"></image>纳新报名</view>
        <text class="news-times">{{item.desc_txt}}</text>
    </view>
</view>
</view>
</template>

<script>
import { Let } from "../let-model";
var team = new Let();

export default {
  data() {
    return {
      isActive: 0,
      nav: ["身心社团", "技能社团"],
      news: "",
      type: 1,
      md: "",
      en: "",
      apply: false,
      img_pre: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    // var t = this;
    // wx.request({
    //     url: "https://www.zzuyinluo.top/schedules/schoolNews",
    //     success: function(e) {
    //         t.setData({  
    //             news: e.data
    //         });
    //     }
    // });
    this.teamCanApply();
    this.getTeamsByType();
  },
  methods: {
    teamCanApply: function () {
      team.teamCanApply(res => {
        if (res.status == 1) {
          this.setData({
            apply: true
          });
        }
      });
    },
    getTeamsByType: function () {
      let teamType = this.type;
      wx.showLoading({
        title: '加载中'
      });

      if (this.news != '') {
        if (teamType == 1) {
          this.setData({
            news: this.md
          });
        } else if (teamType == 2) {
          this.setData({
            news: this.en
          });
        }
      } else {
        let teamType = this.type;
        team.getTeamsByType(teamType, res => {
          if (res.status == 1) {
            let img_pre = res.data.img_pre;
            let list = res.data.list;
            this.setData({
              img_pre: img_pre,
              news: list
            });

            if (teamType == 1) {
              team.getTeamsByType(2, res => {
                if (res.status == 1) {
                  this.setData({
                    en: res.data.list
                  });
                }
              });
              this.setData({
                md: list
              });
            } else if (teamType == 2) {
              this.setData({
                en: list
              });
            }
          }
        });
      }

      setTimeout(function () {
        wx.hideLoading();
      }, 1500);
    },
    getActiveNav: function (t) {
      var e = t.currentTarget.dataset.index;

      if (e == 0) {
        this.setData({
          type: 1
        });
      } else if (e == 1) {
        this.setData({
          type: 2
        });
      }

      this.setData({
        isActive: e
      });
      this.getTeamsByType();
    },
    goDetailPage: function (t) {// var e = t.currentTarget.dataset.index;
      // wx.setStorage({
      //     key: "newsDetail",
      //     data: JSON.stringify(this.data.news[e]),
      //     success: function(t) {
      //         wx.navigateTo({
      //             url: "../news/index/index"
      //         });
      //     }
      // });
    },
    toApply: function (e) {
      let team_id = e.currentTarget.dataset['id'];
      wx.navigateTo({
        url: '../enroll/enroll?team_id=' + team_id
      });
    }
  }
};
</script>
<style>
@import "./home.css";
</style>