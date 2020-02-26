<template>
<view class="asso">
    <navigator class="asso-list" :url="'index/index?id=' + item.id" v-for="(item, index) in asso" :key="index">
        <image class="asso-list__logo" :src="item.logo"></image>
        <text class="asso-list__name">{{item.name}}</text>
    </navigator>
</view>
</template>

<script>
var o = wx.cloud.database();

export default {
  data() {
    return {
      asso: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (n) {
    var a = this;
    o.collection("asso").get({
      success: function (o) {
        var n = [];
        o.data.forEach(function (o) {
          n.push({
            id: o.id,
            name: o.name,
            logo: o.logo
          });
        }), a.setData({
          asso: n
        });
      }
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
@import "./asso.css";
</style>