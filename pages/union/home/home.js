import { Union } from '../union-model.js';
var union = new Union();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 0,
    nav: ["社联组织"],
    news:'',
    apply:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this._onload();
  },

  _onload: function(){
      this.canAppley();
    this.getAllUnions();
  },
  canAppley:function(){
    union.unionCanApply((res)=>{
      if(res.status==1){
        this.setData({
          apply:true
        })
      }
    })
  },
  getAllUnions:function(){
    union.getAllUnions(1,(res)=>{
      console.log(res.data)
        this.setData({
            logo:res.data.logo,
            news:res.data.list
        })
    })
  },
  toApply: function (e) {
    let union_id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../enroll/enroll?union_id=' + union_id
    })
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