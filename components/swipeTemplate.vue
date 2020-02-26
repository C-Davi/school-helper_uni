<template name="swipeTemplate">
  <view class="swiper-container">
    <swiper circular="true" indicator-dots="true" indicator-active-color="#2DC799" autoplay="true" interval="2000">
      <block v-for="(item, idx) in swiperList" :key="idx" v-if="idx < 5">
        <swiper-item @tap="onSwiperTap" :data-item="item">
          <view class="wrap-img" :style="'background-image:url(' + item.thumbnails + ')'"></view>
          <view class="filter" v-if="isTitle">
            <text>{{item.title}}</text>
          </view>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>