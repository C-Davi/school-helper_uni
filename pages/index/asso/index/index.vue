<template>
<view>
<view class="header">
    <image class="header-logo" :src="data.logo"></image>
    <text class="header-name">{{data.name}}</text>
</view>
<view class="main">
    <text class="main-desc">{{data.desc}}</text>
</view>
</view>
</template>

<script>
var a = wx.cloud.database();

export default {
  data() {
    return {
      data: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (t) {
    var s = this;
    a.collection("asso").where({
      id: +t.id
    }).get({
      success: function (a) {
        s.setData({
          data: a.data[0]
        });
      }
    });
  },
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>