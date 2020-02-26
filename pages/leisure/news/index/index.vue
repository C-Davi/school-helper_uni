<template>
<view>
<view class="header">{{newsDetail.newsName}}</view>
<view class="time">{{newsDetail.newsTime}}</view>
<view class="content">
    <text v-for="(item, index) in newsDetail.news" :key="index">{{item}}</text>
</view>
<view class="image" v-for="(item, index) in newsDetail.imgMap" :key="index">
    <image @tap="preview" data-index="index" mode="aspectFill" :src="item.imgUrl"></image>
    <text>{{item.title}}</text>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      newsDetail: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    var e = JSON.parse(wx.getStorageSync("newsDetail"));
    e.news = e.news.split("\n"), this.setData({
      newsDetail: e
    });
  },
  methods: {
    preview: function (e) {
      var t = e.currentTarget.dataset.index,
          a = [];
      this.newsDetail.imgMap.forEach(function (e) {
        a.push(e.imgUrl);
      }), wx.previewImage({
        urls: a,
        current: a[t]
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>