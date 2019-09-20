import { My } from '../../my/my-model.js';
import { Let } from '../let-model.js';
var my = new My();
var team = new Let();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_pre: 'https://shelian.qtc369.com/images/',
    cert: '',
    show: true,
    isUpdate: false,
    res:0,
    regulate: 1,
    regData: [
      { name: '否', value: 1, checked: 'true' },
      { name: '是', value: 2 }
    ],
    regIndex: 0,
    groupArr: '',
    groupIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let team_id = options.team_id;
      this.setData({
        team_id:team_id
      })
      this._onload();
  },

  _onload:function(){
    wx.showLoading({
      title: '加载中',
    })
    my.checkBindSid((res)=>{
      if(res.status==2){
          wx.showModal({
            title: '还没有绑定学生信息呦',
            content: '前去绑定学生信息',
            cancelText:'不去',
            confirmText:'好的',
            success:function(res){
              if (res.confirm){
                wx.navigateTo({
                  url: '/pages/my/info/info'
                })
              }else{
                wx.navigateTo({
                  url: '/pages/leisure/home/home'
                })
              }
            }
          })
      }else{
        team.checkTeamSchedule((res)=>{
          console.log(res)
          if(res.status==2){
            this.getTeamById();
          }else{
            if(res.data.status==3){
                  this.setData({
                    show: false,
                    isUpdate: false,
                    status: 3
                  })
                  
            } else if (res.data.status == 2){
              this.setData({
                status: 2,
                show: false,
                isUpdate: false,
                msg: '您未被该社团录取'
              })
            }else{
              this.setData({
                show: false,
                isUpdate: false,
                status: 1
              })
              
            }
            setTimeout(function () {
              wx.hideLoading()
            }, 1500);
          }
        })
       
      }
    })
  },
  //获得社团id
  getTeamById:function(){
    my.getStudentInfo((res)=>{
      let stu_num = res.data.stu_code;
      this.setData({
        stu_num: stu_num
      })
    })
    let team_id = this.data.team_id;
    team.getTeamById(team_id,(res)=>{
        console.log(res.data)
        console.log(res.data.groupList)
        this.setData({
          groupArr: res.data.groupList,
          group:res.data.arr,
          groupId:res.data.groupList[0].key
        })
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500);
  },
  //重新填写信息
  goTeams: function () {
    wx.navigateTo({
      url: '/pages/leisure/home/home'
    })
  },
  //接受调剂
  regChange:function(e){
    let regulate = e.detail.value;
    if (regulate == 2) {
      this.setData({
        regulate: 2
      })
    }
  },
  //选择部门
  groupChange:function(e){
    let group_id = this.data.groupArr[e.detail.value].key;
    this.setData({
      groupIndex: e.detail.value,
      groupId: group_id
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
     if (e.detail.value.stu_num == '') {
      wx.showToast({
        title: '请输入学生证号',
        icon: 'none'
      })
    } else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp') > 0) {
      wx.showToast({
        title: '请上传一寸免冠照片',
        icon: 'none'
      })
     } else if (this.data.regulate == '') {
      wx.showToast({
        title: '请选择是否调剂',
        icon: 'none'
      })
     } else if (this.data.groupId == 0) {
      wx.showToast({
        title: '请选择加入部门',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      let param = {
        form_id: formId,
        stu_num: e.detail.value.stu_num,
        stu_card: this.data.stu_card,
        regulate: this.data.regulate,
        groupId: this.data.groupId,
        teamId:this.data.team_id
      };
       team.submitTeamApply(param, (res) => {
        wx.hideLoading();
        console.log(res)
        if (res.status == 1) {
          wx.showToast({
            title: '提交成功',
          })
          this._onload();
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
          this._onload();
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