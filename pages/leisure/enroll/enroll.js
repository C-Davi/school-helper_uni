import { Let } from '../let-model.js';
var team = new Let();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_pre: 'https://shelian.qtc369.com/images/',
    show: true,
    isUpdate: false,
    res:0,
    regulate: 1,
    regData: [
      { name: '否', value: 1, checked: 'true' },
      { name: '是', value: 2 }
    ],
    regIndex: 0,
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

  _onload:function(team_id){
    wx.showLoading({
      title: '加载中',
    })
    this.getTeamById();
  },

  getTeamById:function(){
    let team_id = this.data.team_id;
    team.getTeamById(team_id,(res)=>{
        console.log(res.data)
        console.log(res.data.groupList)
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500);
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