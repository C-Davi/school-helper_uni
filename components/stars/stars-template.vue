<template>
<view>
<!--pages/review/stars/stars.wxml-->
<template name="starsTemplate">
  <view class="stars-container">
    <view class="stars">
      <block v-for="(item, index) in stars" :key="index">
        <image v-if="item === 'on'" src="../../../images/icon/star_on.png"></image>
        <image v-if="item === 'half'" src="../../../images/icon/star_half.png"></image>
        <image v-if="item === 'off'" src="../../../images/icon/star_off.png"></image>
      </block>
    </view>
    <text class="star-score">{{score}}</text>
  </view>
</template>
</view>
</template>

<style>
@import "./stars-template.css";
</style>