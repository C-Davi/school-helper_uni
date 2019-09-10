// pages/my/bind/bind.js
import { My } from '../my-model.js';
var my = new My();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_pre:'https://shelian.qtc369.com/images/',
    cert: '',
    stu_card: '',
    show: true,
    isUpdate: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:false,
      isUpdate:false,
      res:0
    })
  },
  //选择照片
  choose(e) {
    let name = e.currentTarget.dataset.name
    let _this = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        if (name == 'cert') {
          _this.setData({
            cert: tempFilePaths[0]
          })

        } else {
          _this.setData({
            stu_card: tempFilePaths[0]
          })
        }
        _this.upload(name)
      }
    })
  },
  //上传
  upload(name) {
    let _this = this;
    if (this.data[name] != '' && this.data[name].indexOf('tmp') > 0) {
      wx.showLoading({
        title: '上传中',
        mask: true
      })
      console
      wx.uploadFile({
        url: 'https://shelian.qtc369.com/admin/' + 'image/upload', // 仅为示例，非真实的接口地址
        filePath: this.data[name],
        name: 'file',
        formData: {
          is_temp: 0
        },
        success(res) {
          wx.hideLoading()
          let red = JSON.parse(res.data)
          console.log(red)
          if (red.success == true) {

            if (name == 'cert') {
              _this.setData({
                cert: red.data.url
              })
            } else {
              _this.setData({
                stu_card: red.thumb_msg,
                tmp_stu_card: _this.data[name]
              })
            }

          }
        }
      })
    } else {
      wx.showToast({
        title: '请选择图后再上传',
        icon: 'none'
      })
    }
  },
  // 表单提交
  formSubmit(e) {
    let formId = e.detail.formId
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '请输入填姓名',
        icon: 'none'
      })
    } else if (e.detail.value.stu_num == '') {
      wx.showToast({
        title: '请输入学生证号',
        icon: 'none'
      })
    }  else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp') > 0){
      wx.showToast({
        title: '请上传学生证',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      let param = {
        form_id: formId,
        name: e.detail.value.name,
        stu_num: e.detail.value.stu_num,
        stu_card: _this.data.stu_card,
      };
      my.submitStuInfo(param,(res)=>{
        wx.hideLoading();
        console.log(res)
        if(res.status==1){
          wx.showToast({
            title: '提交成功',
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      });

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})