<template>
<view>
<view class="header">NEWS</view>
<view @tap="goDetailPage" class="news" :data-index="index" v-for="(item, index) in news" :key="index">
    <image class="news-img" mode="aspectFill" :src="item.imgMap[0].imgUrl"></image>
    <text class="news-name">{{item.newsName}}</text>
    <text class="news-times">{{item.newsTime}}</text>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      news: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    var t = this;
    wx.request({
      url: "https://www.zzuyinluo.top/schedules/schoolNews",
      success: function (e) {
        t.setData({
          news: e.data
        });
      }
    });
  },
  methods: {
    goDetailPage: function (t) {
      var e = t.currentTarget.dataset.index;
      wx.setStorage({
        key: "newsDetail",
        data: JSON.stringify(this.news[e]),
        success: function (t) {
          wx.navigateTo({
            url: "index/index"
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./news.css";
</style>