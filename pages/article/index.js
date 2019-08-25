// pages/article/index.js
import { Articles } from 'articles-model.js';
var article = new Articles();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: {},
    likeArticleList: [],
    oprtArticleList: [],
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
    this._onload();
  },
  _onload:function(){
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    this.getArtiByType();
  },
  // 获得扎心和取消扎心的
  getLikeIdS:function(){

  },
  //点击扎心或者取消
  clickLike:function(e){
    var s = e.currentTarget.dataset.articleId,
      r = e.currentTarget.dataset.articleIndex,
      c = e.currentTarget.dataset.articleLiked;
    console.log("点赞按钮事件articleLikeClick", s, r, c);
  },
  // 获得文章
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
    
      let list = this.data.articleList;
      let likeList = wx.getStorageSync('likeArticleList');
      for (let r = list, n = 0; n < r.length; n++){
        r[n].isLiked=0;
        if (likeList){
          let res = likeList.indexOf(r[n].id);
          if (res > -1) {
            r[n].isLiked = 1;
          }
        }
      }
      this.setData({
        articleList:list
      })
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
  },
  clickLike: function (e) {
    var s = e.currentTarget.dataset.articleId,
      r = e.currentTarget.dataset.articleIndex,
      c = e.currentTarget.dataset.articleLiked;
    console.log("点赞按钮事件articleLikeClick", s, r, c);
    if(c==0){
      let param = {
        type: 1,
        id: s
      };
      article.changeLiked(param, (res) => {
        
      });
      this.data.likeArticleList.push(s);
      wx.setStorage({
        key: "likeArticleList",
        data: this.data.likeArticleList
      })
      this.data.articleList[r].likeNum++;
      this.data.articleList[r].isLiked=1;
      this.setData({
        articleList:this.data.articleList
      })
      let likeList = wx.getStorageSync('likeArticleList');
    }else{
      let param = {
        type: 2,
        id: s
      };
      article.changeLiked(param, (res) => {
        
      });
      let likeList = wx.getStorageSync('likeArticleList');
      for (let r = likeList, n = 0; n < r.length; n++){
          if(r[n]==s){
            likeList.splice(n, 1);
          }
      }
      wx.setStorage({
        key: "likeArticleList",
        data: likeList
      })
      this.data.articleList[r].likeNum--;
      this.data.articleList[r].isLiked = 0;
      this.setData({
        articleList: this.data.articleList,
        likeArticleList: likeList
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
    console.log(123)
  }
})