<template>
<!--components/dialog/dialog.wxml-->
<block v-if="dialog_visible">
  <view class="dialog_mask">
    <view class="dialog_container">
      <view class="dialog__title" v-if="title" :style="'color: ' + titleColor">{{title}}</view>
      <view class="dialog__content" v-if="title">
        <view class="log_wrap" v-if="logImage && logName">
          <view class="log_wrap--log" :style="'background-image:url(' + logImage + ')'"></view>
          <view class="log_wrap--text">{{logName}}</view>
        </view>
        <view class="dialog__content--text" v-if="content" :style="'color: ' + contentColor">{{content}}</view>
      </view>
      <view class="dialog__btns">
        <view class="dialog__btns--cancel" @tap="cancelCallback">拒绝</view>
        <button class="getUserInfo_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">允许</button>
      </view>
    </view>
  </view>
</block>
</template>

<script>

export default {
  data() {
    return {
      dialog_visible: false
    };
  },

  components: {},
  props: {
    title: {
      type: String
    },
    titleColor: {
      type: String,
      default: '#000000'
    },
    logImage: {
      type: String
    },
    logName: {
      type: String
    },
    content: {
      type: String
    },
    contentColor: {
      type: String,
      default: '#888888'
    }
  },
  methods: {
    cancelCallback() {
      this.$emit('cancel');
    },
	onchangeVisible(status){
		console.log(status)
		if(status){
			this.dialog_visible = true;
		}else{
			this.dialog_visible = false;
		}
		console.log(this.dialog_visible)
	},
    onGotUserInfo(e) {
      this.$emit('confirm', e);
    }

  }
};
</script>
<style>
@import "./dialog.css";
</style>