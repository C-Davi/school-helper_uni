<template>
<!--component/loadmore/loadmore.wxml-->
<view class="loadmore" v-if="iconStatus && iconType">
  <block v-if="isEnd">
    <view class="loadmore__line"></view>

    <image v-if="!text && iconStatus === iconType.HIDDEN" class="loadmore__icon" :src="type.icon" mode="aspectFill"></image>

    <image v-if="iconStatus === iconType.SHOW_DEFAULT" class="loadmore__icon" :src="type.icon" mode="aspectFill"></image>

    <image v-if="iconStatus === iconType.SHOW_CONFIG" class="loadmore__icon" :src="icon" mode="aspectFill"></image>

    <text class="loadmore__text">{{ text || type.text }}</text>
    <view class="loadmore__line"></view>
  </block>
  <view v-else class="loadmore__wrap">
    <view v-if="iconStatus === iconType.SHOW_DEFAULT" class="loadmore__loading-icon"></view>
    <image v-if="iconStatus === iconType.SHOW_CONFIG" class="loadmore__icon" :src="icon" mode="aspectFill"></image>
    <text class="loadmore__loading-text">{{ text || '加载中...' }}</text>
  </view>
</view>
</template>

<script>
// component/loadmore/loadmore.js
const TYPES = [{
  icon: 'https://s10.mogucdn.com/p2/161213/upload_57bl76e9010115f3fj1d2k1kj5l4b_44x44.png',
  text: '再看点别的？'
}, {
  icon: 'https://s10.mogucdn.com/p2/161213/upload_6c4a17j86gb0lh9hba01i464fkie2_44x44.png',
  text: '哎呀都看完了'
}, {
  icon: 'https://s10.mogucdn.com/p2/161213/upload_1iddk17bfe1k4257f207i467f21e8_44x44.png',
  text: '叽~木有啦'
}, {
  icon: 'https://s10.mogucdn.com/p2/161213/upload_2e6ig5fb6k773l546a9gj8g2k7bfg_44x44.png',
  text: '哎一古~刷完了'
}, {
  icon: 'https://s10.mogucdn.com/p2/161213/upload_124lgj5ji1h9f3ci0bdbe5k4gf1kk_44x44.png',
  text: '没有了呢'
}, {
  icon: 'https://s10.mogucdn.com/p2/161213/upload_1122hdalb10h08kbiehd344fj6j1k_44x44.png',
  text: '汪~木有啦'
}];
const IconType = {
  HIDDEN: -1,
  SHOW_DEFAULT: 1,
  SHOW_CONFIG: 2
};

export default {
  data() {
    return {
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      iconStatus: IconType.HIDDEN,
      iconType: IconType
    };
  },

  components: {},
  props: {
    text: {
      type: String,
      default: ''
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  config: {
    usingComponents: {}
  },
  mixins: [],

  beforeMount() {
    let iconStatus = IconType.HIDDEN;
    const icon = this.icon;

    if (icon) {
      iconStatus = IconType.SHOW_DEFAULT;
    }

    if (/\.(jpg|gif|jpeg|png)+$/.test(icon)) {
      iconStatus = IconType.SHOW_CONFIG;
    }

    this.setData({
      iconStatus
    });
  },

  methods: {}
};
</script>
<style>
@import "./loadmore.css";
</style>