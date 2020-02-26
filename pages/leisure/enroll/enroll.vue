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
        <view class="fo-28 bold">本人学号:</view>
        <input class="text-right fo-28" type="number" :value="stu_num" disabled="disabled" name="stu_num" placeholder="请输入学号"></input>
      </view>
      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">报名部门:</view>
        <picker class="text-right fo-28" @change="groupChange" :value="groupArr[groupIndex].key" :range="group">
            <view>
              <text>{{groupArr[groupIndex].value}}</text>
            </view>
        </picker>
      </view>
      <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">接受调剂:</view>
        <radio-group class="text-right fo-28" @change="regChange">
              <label v-for="(item, index) in regData" :key="index">
                  <radio :value="item.value" :checked="item.checked">{{item.name}}</radio>
              </label>
        </radio-group>
      </view>
        <view class="panel-between border-b pa-t30 pa-b10">
        <view class="fo-28 bold">联系方式:</view>
          <input class="text-right fo-28" type="number" value name="stu_phone" placeholder="请输入手机号"></input>
        </view>
        <view class="pa-t30 pa-b10">
        <view class="fo-28 bold">个人简介:</view>
        <textarea class="job_desc" value @blur="bindTextAreaBlur" maxlength="1024" placeholder="请填写个人简介"></textarea>
      </view>
       <view class="pa-t30 pa-b10">
        <view class="fo-28 bold">社团期望:</view>
        <textarea class="job_desc" value @blur="bindTeamAreaBlur" maxlength="1024" placeholder="请填写对社团的期望"></textarea>
      </view>
      <view class="pa-t30 pa-b10">
        <view class="fo-28 bold">免冠照片:</view>
        <view class="tuu panel-center item-center fo-g fo-50" :style="'background-image:url(' + tmp_stu_card + ')'" data-name="stu_card" @tap="choose">+</view>
      </view>
      <button class="btns" form-type="submit">确认提交</button>
    </form>

  </view>
  <view v-if="!show && !isUpdate">
    <view v-if="status==3">
      <view class="text-center">
        <image src="../../../static/images/img/sh.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">需要1-3个工作日完成录取审核，请耐心等待</view>
    </view>

    <view v-if="status==1">
      <view class="text-center">
        <image src="../../../static/images/img/sh1.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">录取成功</view>
    </view>

    <view v-if="status==2  && !isUpdate">
      <view class="text-center">
        <image src="../../../static/images/img/sh2.png" style="width:200rpx;height:200rpx"></image>
      </view>
      <view class="fo-30 text-center">录取失败</view>
      <view class="fo-30 text-center" style="padding-top:40rpx;color:red;">{{msg}}</view>
      <view class="fo-30 text-center fo-t" style="margin-top:30rpx;" @tap="goTeams">转转别的社团</view>
    </view>
  </view>
</view>
</template>

<script>
import { My } from "../../my/my-model";
import { Let } from "../let-model";
var my = new My();
var team = new Let();

export default {
  data() {
    return {
      img_pre: 'https://shelian.qtc369.com/images/',
      cert: '',
      show: true,
      isUpdate: false,
      res: 0,
      regulate: 1,
      regData: [{
        name: '否',
        value: 1,
        checked: 'true'
      }, {
        name: '是',
        value: 2
      }],
      regIndex: 0,
      groupArr: '',
      groupIndex: 0,
      team_id: "",
      status: 0,
      msg: "",
      stu_num: "",
      group: "",
      groupId: "",
      job_text: "",
      team_text: "",
      stu_card: "",
      tmp_stu_card: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let team_id = options.team_id;
    this.setData({
      team_id: team_id
    });
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
      wx.showLoading({
        title: '加载中'
      });
      my.checkBindSid(res => {
        if (res.status == 2) {
          wx.showModal({
            title: '还没有绑定学生信息呦',
            content: '前去绑定学生信息',
            cancelText: '不去',
            confirmText: '好的',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my/info/info'
                });
              } else {
                wx.navigateTo({
                  url: '/pages/leisure/home/home'
                });
              }
            }
          });
        } else {
          team.checkTeamSchedule(this.team_id, res => {
            console.log(res);

            if (res.status == 2) {
              this.getTeamById();
            } else {
              if (res.data.status == 3) {
                this.setData({
                  show: false,
                  isUpdate: false,
                  status: 3
                });
              } else if (res.data.status == 2) {
                this.setData({
                  status: 2,
                  show: false,
                  isUpdate: false,
                  msg: '您未被该社团录取'
                });
              } else {
                this.setData({
                  show: false,
                  isUpdate: false,
                  status: 1
                });
              }

              setTimeout(function () {
                wx.hideLoading();
              }, 1500);
            }
          });
        }
      });
    },
    //获得社团id
    getTeamById: function () {
      my.getStudentInfo(res => {
        let stu_num = res.data.stu_code;
        this.setData({
          stu_num: stu_num
        });
      });
      let team_id = this.team_id;
      team.getTeamById(team_id, res => {
        console.log(res.data);
        console.log(res.data.groupList);
        this.setData({
          groupArr: res.data.groupList,
          group: res.data.arr,
          groupId: res.data.groupList[0].key
        });
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 1500);
    },
    //重新填写信息
    goTeams: function () {
      wx.navigateTo({
        url: '/pages/leisure/home/home'
      });
    },
    //个人简介以及工作计划
    bindTextAreaBlur: function (e) {
      let job_text = e.detail.value;
      this.setData({
        job_text: job_text
      });
    },
    bindTeamAreaBlur: function (e) {
      let team_text = e.detail.value;
      this.setData({
        team_text: team_text
      });
    },
    //接受调剂
    regChange: function (e) {
      let regulate = e.detail.value;

      if (regulate == 2) {
        this.setData({
          regulate: 2
        });
      }
    },
    //选择部门
    groupChange: function (e) {
      let group_id = this.groupArr[e.detail.value].key;
      this.setData({
        groupIndex: e.detail.value,
        groupId: group_id
      });
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

      if (e.detail.value.stu_num == '') {
        wx.showToast({
          title: '请输入学生证号',
          icon: 'none'
        });
      } else if (e.detail.value.stu_phone == '') {
        wx.showToast({
          title: '请输入联系方式',
          icon: 'none'
        });
      } else if (this.stu_card == '' || this.stu_card.indexOf('tmp') > 0) {
        wx.showToast({
          title: '请上传一寸免冠照片',
          icon: 'none'
        });
      } else if (this.regulate == '') {
        wx.showToast({
          title: '请选择是否调剂',
          icon: 'none'
        });
      } else if (this.groupId == 0) {
        wx.showToast({
          title: '请选择加入部门',
          icon: 'none'
        });
      } else if (this.job_text == '') {
        wx.showToast({
          title: '请填写个人简介',
          icon: 'none'
        });
      } else if (this.team_text == '') {
        wx.showToast({
          title: '请填写社团期望',
          icon: 'none'
        });
      } else {
        wx.showLoading({
          title: '加载中'
        });
        let param = {
          form_id: formId,
          stu_phone: e.detail.value.stu_phone,
          stu_num: e.detail.value.stu_num,
          stu_card: this.stu_card,
          regulate: this.regulate,
          groupId: this.groupId,
          teamId: this.team_id,
          job_desc: this.job_text,
          team_desc: this.team_text
        };
        team.submitTeamApply(param, res => {
          wx.hideLoading();
          console.log(res);

          if (res.status == 1) {
            wx.showToast({
              title: '提交成功'
            });
            this.onloadFun();
          } else {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            });
            this.onloadFun();
          }
        });
      }
    }

  }
};
</script>
<style>
@import "./enroll.css";
</style>