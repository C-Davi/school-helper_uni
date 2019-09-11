// pages/my/info/info.js
import { My } from '../my-model.js';
var my = new My();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_pre: 'https://shelian.qtc369.com/images/',
    cert: '',
    stu_card: '',
    show: true,
    isUpdate: false,
    sex:1,
    sexData:[
      { name: '男', value: 1, checked: 'true'  },
      { name: '女', value: 2}
    ],
    sexIndex:0,
    collegeArr:'',
    collegeIndex:0,
    majorArr: '',
    majorIndex: 0,
    classArr: '',
    classIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this._onload();
  },

  _onload:function(){
    this.checkBindSid();
  },
  getGroup:function(){
    let type = 1;
    my.getColleges(type,(res)=>{
      this.setData({
        collegeArr:res.data.list,
        college:res.data.arr
      })
    })
  },
  //院系
  collegeChange:function(e){
    this.setData({
      collegeIndex:e.detail.value,
      collegeId: e.detail.value
    })
    my.getMajor(e.detail.value,(res)=>{
      console.log(res)
        this.setData({
          majorArr:res.data.list,
          major:res.data.arr
        })
    })
  },
  //专业
  majorChange:function(e){
    this.setData({
      majorIndex:e.detail.value,
      majorId: this.data.majorArr[e.detail.value].key
    })
    let major_id = this.data.majorArr[e.detail.value].key;
    if (major_id != 0){
      my.getClass(major_id, (res) => {
        this.setData({
          classArr: res.data.list,
          classA:res.data.arr
        })
      })
    }
  },
  //班级
  classChange:function(e){
    let class_id = this.data.classArr[e.detail.value].key;
    this.setData({
      classIndex: e.detail.value,
      classId: this.data.classArr[e.detail.value].key
    })
  },
  
  // 是否绑定学生信息
  checkBindSid:function(){
    my.checkBindSid((res)=>{
      console.log(res)
        if(res.status==2){
          this.getGroup();
        }
        if(res.status ==1){
          let status = res.data.type;
          console.log(status)
          if(status==3){
            this.setData({
              show: false,
              isUpdate: false,
              status:3
            })
          }else if(status==2){
            console.log(222)
            this.setData({
              status:2,
              show:false,
              isUpdate:false,
              msg:'请仔细审阅提交的信息是否真实'
            })
          }else if(status==1){
            wx.showLoading({
              title: '加载中',
            })
            this.setData({
              show: false,
              isUpdate: false,
              status: 1,
              info:res.data.info
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500);
          }
        }
    });
  },
  gotoUpdate:function(){
    this.setData({
      show: true,
      isUpdate: true
    })
  },
  //性别选择
  sexChange:function(e){
    let sex = e.detail.value;
    if(sex==2){
      this.setData({
        sex:2
      })
    }
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
    } else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp') > 0) {
      wx.showToast({
        title: '请上传学生证',
        icon: 'none'
      })
    } else if(this.data.collegeId ==0){
      wx.showToast({
        title: '请选择院系',
        icon: 'none'
      })
    } else if (this.data.majorId ==0) {
      wx.showToast({
        title: '请选择专业',
        icon: 'none'
      })
    } else if (this.data.classId ==0) {
      wx.showToast({
        title: '请选择班级',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      let param = {
        form_id: formId,
        name: e.detail.value.name,
        stu_num: e.detail.value.stu_num,
        stu_card: this.data.stu_card,
        sex:this.data.sex,
        collegeId:this.data.collegeId,
        majorId:this.data.majorId,
        classId:this.data.classId
      };
      my.submitStuInfo(param, (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.status == 1) {
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      });

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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