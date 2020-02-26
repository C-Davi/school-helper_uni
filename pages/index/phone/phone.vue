<template>
<view>
<view class="title">联系方式</view>
<view class="phone" v-for="(item, index) in phones" :key="index">
    <view class="phone-name">
        <text>部门</text>
        <text>{{item.s_name}}</text>
    </view>
    <view @tap="callPhone" class="phone-value" :data-phone="item.phone">
        <text>联系方式</text>
        <text>{{item.phone}}</text>
    </view>
</view>
<view class="note">点击号码可以直接拨号</view>
</view>
</template>

<script>
import { Phone } from "./phone-model";
var phone = new Phone();

export default {
  data() {
    return {
      phones: []
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.getPhone();
  },
  methods: {
    getPhone: function () {
      phone.getAll(res => {
        this.setData({
          phones: res.data
        });
      });
    },
    callPhone: function (a) {
      var e = a.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: e
      });
    }
  }
};
</script>
<style>
@import "./phone.css";
</style>