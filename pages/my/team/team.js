// pages/my/team/team.js
import { My } from '../my-model.js';
var my = new My();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mdInfo:"",
    enInfo:"",
    totalPoints:0,
    mdPoints:0,
    enPoints:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._onload();
  },

  _onload:function(){
    my.getStuTeams((res)=>{
      console.log(res)
      let data = res.data;
      let md_status = data.md_status;
      let en_status = data.en_status;
      if(md_status==2){
        this.setData({
          md_status:2
        })
      }
      if(en_status==2){
        this.setData({
          en_status:2
        })
      }
    })
  },

  getStuInfo:function(){
    
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