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

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">性别(必选):</view>
        <radio-group class="text-right fo-28" @change="sexChange">
              <label v-for="(item, index) in sexData" :key="index">
                  <radio :value="item.value" :checked="item.checked">{{item.name}}</radio>
              </label>
        </radio-group>
      </view>
      
      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">院系(必选):</view>
        <picker class="text-right fo-28" @change="collegeChange" :value="collegeArr[collegeIndex].key" :range="college">
            <view>
              <text>{{collegeArr[collegeIndex].value}}</text>
            </view>
        </picker>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">专业(必选):</view>
        <picker class="text-right fo-28" @change="majorChange" :value="majorArr[majorIndex].key" :range="major">
            <view>
              <text>{{majorArr[majorIndex].value}}</text>
            </view>
        </picker>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">班级(必选):</view>
        <picker class="text-right fo-28" @change="classChange" :value="classArr[classIndex].key" :range="classA">
            <view>
              <text>{{classArr[classIndex].value}}</text>
            </view>
        </picker>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">联系方式(必填):</view>
        <input class="text-right fo-28" type="number" :value="stu_num" name="stu_phone" placeholder="输入手机号"></input>
      </view>

      <view class="pa-t30 pa-b10">
        <view class="fo-28 bold">学生证正面(必填):</view>
        <view class="tuu panel-center item-center fo-g fo-50" :style="'background-image:url(' + tmp_stu_card + ')'" data-name="stu_card" @tap="choose">+</view>
      </view>
      <button class="btns" form-type="submit">确认绑定</button>
    </form>

  </view>
  <view v-if="!show && !isUpdate">
    <view v-if="status==3">
      <view class="text-center">
        <image src="../../../static/images/img/sh.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">需要1-3个工作日完成审核，请耐心等待</view>
    </view>

    <view v-if="status==1">
      <view class="text-center">
        <image src="../../../static/images/img/sh1.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">审核成功</view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">{{info.name}}</view>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">{{info.code}}</view>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">{{info.sex}}</view>
      </view>

      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">{{info.group}}</view>
      </view>

      <view class="pa-t30 pa-b10">
        <view class="tuu panel-center item-center fo-g fo-50" :style="'background-image:url(' + info.img + ')'"> </view>
      </view>
    </view>

    <view v-if="status==2  && !isUpdate">
      <view class="text-center">
        <image src="../../../static/images/img/sh2.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">审核失败</view>
      <view class="fo-30 text-center" style="padding-top:40rpx;color:red;">{{msg}}</view>
      <view class="fo-30 text-center fo-t" style="margin-top:30rpx;" @tap="gotoUpdate">去修改</view>
    </view>
  </view>
</view>
</template>

<script>
// pages/my/info/info.js
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
      sex: 1,
      sexData: [{
        name: '男',
        value: 1,
        checked: 'true'
      }, {
        name: '女',
        value: 2
      }],
      sexIndex: 0,
      collegeArr: '',
      collegeIndex: 0,
      majorArr: '',
      majorIndex: 0,
      classArr: '',
      classIndex: 0,
      college: "",
      collegeId: "",
      major: "",
      majorId: "",
      classA: "",
      classId: "",
      status: 0,
      msg: "",
      info: "",
      tmp_stu_card: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onloadFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    onloadFun: function () {
      this.checkBindSid();
    },
    getGroup: function () {
      let type = 1;
      my.getColleges(type, res => {
        this.setData({
          collegeArr: res.data.list,
          college: res.data.arr
        });
      });
    },
    //院系
    collegeChange: function (e) {
      this.setData({
        collegeIndex: e.detail.value,
        collegeId: e.detail.value
      });
      my.getMajor(e.detail.value, res => {
        console.log(res);
        this.setData({
          majorArr: res.data.list,
          major: res.data.arr
        });
      });
    },
    //专业
    majorChange: function (e) {
      this.setData({
        majorIndex: e.detail.value,
        majorId: this.majorArr[e.detail.value].key
      });
      let major_id = this.majorArr[e.detail.value].key;

      if (major_id != 0) {
        my.getClass(major_id, res => {
          this.setData({
            classArr: res.data.list,
            classA: res.data.arr
          });
        });
      }
    },
    //班级
    classChange: function (e) {
      let class_id = this.classArr[e.detail.value].key;
      this.setData({
        classIndex: e.detail.value,
        classId: this.classArr[e.detail.value].key
      });
    },
    // 是否绑定学生信息
    checkBindSid: function () {
      my.checkBindSid(res => {
        console.log(res);

        if (res.status == 2) {
          this.getGroup();
        }

        if (res.status == 1) {
          let status = res.data.type;
          console.log(status);

          if (status == 3) {
            this.setData({
              show: false,
              isUpdate: false,
              status: 3
            });
          } else if (status == 2) {
            console.log(222);
            this.setData({
              status: 2,
              show: false,
              isUpdate: false,
              msg: '请仔细审阅提交的信息是否真实'
            });
          } else if (status == 1) {
            wx.showLoading({
              title: '加载中'
            });
            this.setData({
              show: false,
              isUpdate: false,
              status: 1,
              info: res.data.info
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 1500);
          }
        }
      });
    },
    gotoUpdate: function () {
      this.setData({
        show: true,
        isUpdate: true
      });
    },
    //性别选择
    sexChange: function (e) {
      let sex = e.detail.value;

      if (sex == 2) {
        this.setData({
          sex: 2
        });
      }
    },

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
      } else if (e.detail.value.stu_phone == '') {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
      } else if (this.stu_card == '' || this.stu_card.indexOf('tmp') > 0) {
        wx.showToast({
          title: '请上传学生证',
          icon: 'none'
        });
      } else if (this.collegeId == 0) {
        wx.showToast({
          title: '请选择院系',
          icon: 'none'
        });
      } else if (this.majorId == 0) {
        wx.showToast({
          title: '请选择专业',
          icon: 'none'
        });
      } else if (this.classId == 0) {
        wx.showToast({
          title: '请选择班级',
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
          stu_card: this.stu_card,
          stu_phone: e.detail.value.stu_phone,
          sex: this.sex,
          collegeId: this.collegeId,
          majorId: this.majorId,
          classId: this.classId
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
@import "./info.css";
</style>