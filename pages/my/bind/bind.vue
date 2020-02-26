<template>
<view class="pa-30">
  <view class="bz" v-if="show || isUpdate">
    <view style="height:60rpx">
      <view class="avatar">
        <open-data type="userAvatarUrl" mode="aspectFill"></open-data>
      </view>
    </view>
    <form @submit="formSubmit" report-submit="true">

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">姓名(必填):</view>
        <input class="text-right fo-28" name="name" :value="name" placeholder="姓名"></input>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">学生证号(必填):</view>
        <input class="text-right fo-28" type="number" :value="stu_num" name="stu_num" placeholder="学生证号"></input>
      </view>
      
      <view class="pa-t30 pa-b10">
        <view class="fo-28 bold">学生证正面(必填):</view>
        <view class="tuu panel-center item-center fo-g fo-50" :style="'background-image:url(' + tmp_stu_card + ')'" data-name="stu_card" @tap="choose">+</view>
      </view>
      <button class="btns" form-type="submit">确认绑定</button>
    </form>

  </view>
  <view v-if="!show && !isUpdate">
    <view v-if="res == 0">
      <view class="text-center">
        <image src="../../../static/images/img/sh.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">需要1-3个工作日完成审核，请耐心等待</view>
    </view>

    <view v-if="res.state == 1">
      <view class="text-center">
        <image src="../../../../img/sh1.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">审核成功，您可以接单啦</view>
      <view class="fo-26 ma-t20 text-center ma-b20">以下为服务费用收取参考表</view>
      <view class="border ma-t20" style="width:450rpx;margin:auto">
        <view class="panel-start border-b pa-t20 pa-b20" style="width:450rpx">
          <view class="text-center fo-28" style="width:150rpx">服务项</view>
          <view class="text-center fo-28" style="width:150rpx">平台获得</view>
          <view class="text-center fo-28" style="width:150rpx">用户获得</view>
        </view>
        <view class="panel-start border-b pa-t20 pa-b20" style="width:450rpx" v-for="(item, index) in server" :key="index" v-if="item.server_name != '打印服务' && item.server_name != '快递代取'">
          <view class="text-center fo-28" style="width:150rpx">{{item.server_name}}</view>
          <view class="text-center fo-28" style="width:150rpx">{{(item.pk_server)}}%</view>
          <view class="text-center fo-28" style="width:150rpx">{{item.user_sy*100}}%</view>
        </view>
      </view>
    </view>

    <view v-if="res.state == 2  && !isUpdate">
      <view class="text-center">
        <image src="../../../../img/sh2.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">审核失败</view>
      <view class="fo-30 text-center">{{res.msg}}</view>
      <view class="fo-30 text-center fo-t" @tap="gotoUpdate">去修改</view>
    </view>
    <view class="fo-30 text-center fo-t" style="margin-top:100rpx" @tap="makePhone">联系客服</view>
  </view>
</view>
</template>

<script>
// pages/my/bind/bind.js
import { My } from "../my-model";
var my = new My();

export default {
  data() {
    return {
      img_pre: 'https://shelian.qtc369.com/images/',
      cert: '',
      stu_card: '',
      show: true,
      isUpdate: false,
      res: 0,
      tmp_stu_card: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: false,
      isUpdate: false,
      res: 0
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    //选择照片
    choose(e) {
      let name = e.currentTarget.dataset.name;

      let _this = this;

      wx.chooseImage({
        count: 1,

        success(res) {
          const tempFilePaths = res.tempFilePaths;

          if (name == 'cert') {
            _this.setData({
              cert: tempFilePaths[0]
            });
          } else {
            _this.setData({
              stu_card: tempFilePaths[0]
            });
          }

          _this.upload(name);
        }

      });
    },

    //上传
    upload(name) {
      let _this = this;

      if (this[name] != '' && this[name].indexOf('tmp') > 0) {
        wx.showLoading({
          title: '上传中',
          mask: true
        });
        console;
        wx.uploadFile({
          url: 'https://shelian.qtc369.com/admin/' + 'image/upload',
          // 仅为示例，非真实的接口地址
          filePath: this[name],
          name: 'file',
          formData: {
            is_temp: 0
          },

          success(res) {
            wx.hideLoading();
            let red = JSON.parse(res.data);
            console.log(red);

            if (red.success == true) {
              if (name == 'cert') {
                _this.setData({
                  cert: red.data.url
                });
              } else {
                _this.setData({
                  stu_card: red.thumb_msg,
                  tmp_stu_card: _this[name]
                });
              }
            }
          }

        });
      } else {
        wx.showToast({
          title: '请选择图后再上传',
          icon: 'none'
        });
      }
    },

    // 表单提交
    formSubmit(e) {
      let formId = e.detail.formId;

      if (e.detail.value.name == '') {
        wx.showToast({
          title: '请输入填姓名',
          icon: 'none'
        });
      } else if (e.detail.value.stu_num == '') {
        wx.showToast({
          title: '请输入学生证号',
          icon: 'none'
        });
      } else if (this.stu_card == '' || this.stu_card.indexOf('tmp') > 0) {
        wx.showToast({
          title: '请上传学生证',
          icon: 'none'
        });
      } else {
        wx.showLoading({
          title: '加载中'
        });
        let param = {
          form_id: formId,
          name: e.detail.value.name,
          stu_num: e.detail.value.stu_num,
          stu_card: _this.stu_card
        };
        my.submitStuInfo(param, res => {
          wx.hideLoading();
          console.log(res);

          if (res.status == 1) {
            wx.showToast({
              title: '提交成功'
            });
          } else {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            });
          }
        });
      }
    }

  }
};
</script>
<style>
@import "./bind.css";
</style>