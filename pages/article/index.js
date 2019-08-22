// pages/article/index.js
import { Articles } from 'articles-model.js';
var article = new Articles();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: {},
    type:2,
    page:1,
    totalPage:0,
    loadMore: !0,
    nextPage:false,
    listSort: false,
    redDot: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = "2019-08-20 11:46:47";
    let str = date.substr(0, 10);
    console.log(str)
    this._onload();
  },
  _onload:function(){
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    this.getArtiByType();
  },
  getArtiByType:function(){
    let param = {
      type: this.data.type,
      page: this.data.page
    };
    article.getGoodArticle(param, (res) => {
      this.loading = true;
      this.setData({
        articleList: res.data.list,
        totalPage: res.data.totalPage,
        page: this.data.page + 1
      });
      this.loading = false;
    });
  },
  changeSort:function(){
    let type = this.data.type;
    if(type==1){
      this.setData({type:2})
    }else{
      this.setData({type:1})
    }
    this.setData({
      page:1
    })
    this.getArtiByType();
    this.setData({
      listSort:!this.data.listSort,
    })
    console.log(this.data.listSort)
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
    if (!this.loading && (this.data.page<=this.data.totalPage)){
      let param = {
        type: this.data.type,
        page: this.data.page
      };
      article.getGoodArticle(param, (res) => {
        console.log(res);
        this.setData({
          articleList: this.data.articleList.concat(res.data.list)
        });
        this.setData({
          page: this.data.page + 1
        })
      });
    }else{
      this.setData({
        loadMore: false,
        nextPage: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})