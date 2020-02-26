<template>
<view>
<view class="list-header" v-if="articleList[0]">
    <view class="list-header-img">
        <image src="../../static/image/list_header_index.png"></image>
    </view>
    <view @tap="changeSort" class="list-header-sort">
        <span :class="listSort?'check':''">冷</span>
        <span class="red-dot" v-if="redDot"></span>
        <span class="line">|</span>
        <span :class="listSort?'':'check'">热</span>
    </view>
</view>
<view class="main-list">
    <block v-if="listSort" data-type="template" data-is="itemCardNew" data-attr="item:item,index:index,sensitive:sensitive" v-for="(item, id) in articleList" :key="id">
    <view class="main-list-item">
        <form @submit="goArticle" :data-article-id="item.id" :data-article-index="index" reportSubmit="true">
            <button class="main-item-article" formType="submit" hoverClass="main-item-article-hover">
                <text class="article-text">{{item.content}}</text>
                <view class="article-author">-- {{item.userNick}}</view>
            </button>
        </form>
        <view class="main-item-sidebar" :style="'height:' + (item.line*60+40) + 'rpx'">
            <view class="date">
                <view class="date-text">
                    <view class="dayStr">{{mod.getDateArr(item.created_at)[2]}}</view>
                    <view class="date-line"></view>
                    <view class="month">{{mod.getMonthStr( mod.getDateArr(item.created_at)[1] )}}</view>
                </view>
            </view>
            <view class="main-sidebar-action">
                <view @tap="showShareDialog" class="share" :data-article-id="item.id" :data-article-index="index" hoverClass="class-hover">
                    <image class="share-icon" src="../../static/image/share.png"></image>
                    <view class="share-text">分享</view>
                </view>
                <form @submit="clickLike" :data-article-id="item.id" :data-article-index="index" :data-article-liked="item.isLiked" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover">
                        <view class="like-image">
                            <image class="like-icon" src="../../static/image/like.png" v-if="!item.isLiked"></image>
                            <image class="like-icon" src="../../static/image/liked.png" v-if="item.isLiked"></image>
                        </view>
                        <view class="like-anim">
                            <image class="like-anim-image" src="../../static/image/liked.png" v-if="item.likeAnim"></image>
                        </view>
                        <view class="like-num-area" :hidden="item.likeNum==0">
                            <view class="like-num">{{item.likeNum}}</view>
                        </view>
                        <view class="like-text">扎心</view>
                    </button>
                </form>
                <!-- <form bindsubmit="goArticle" data-article-id="{{item.id}}" data-article-index="{{index}}" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover" wx:if="{{!sensitive}}">
                        <view class="like-image">
                            <image class="like-icon" src="/image/comment.png"></image>
                        </view>
                        <view class="like-num-area" hidden="{{!item.commentNum}}">
                            <view class="like-num">{{item.commentNum}}</view>
                        </view>
                        <view class="like-text">补刀</view>
                    </button>
                </form> -->
            </view>
        </view>
    </view>
    <view class="list-ad" v-if="(index+1)%3==0">
        <ad unitId="adunit-0cc2c6eb033128d1"></ad>
    </view>
</block><block v-else data-type="template" data-is="itemCardHot" data-attr="item:item,index:index,sensitive:sensitive" v-for="(item, id) in articleList" :key="id">
    <view class="main-list-item">
        <form @submit="goArticle" :data-article-id="item.id" :data-article-index="index" reportSubmit="true">
            <button class="main-item-article" formType="submit" hoverClass="main-item-article-hover">
                <text class="article-text">{{item.content}}</text>
                <view class="article-author">-- {{item.userNick}}</view>
            </button>
        </form>
        <view class="main-item-sidebar" :style="'height:' + (item.line*60+40) + 'rpx'">
            <view class="date">
                <view class="date-text">
                    <view class="dayStr">{{mod.getDateArr(item.created_at)[2]}}</view>
                    <view class="date-line"></view>
                    <view class="month">{{mod.getMonthStr( mod.getDateArr(item.created_at)[1] )}}</view>
                </view>
            </view>
            <view class="main-sidebar-action">
                <view @tap="showShareDialog" class="share" :data-article-id="item.id" :data-article-index="index" hoverClass="class-hover">
                    <image class="share-icon" src="../../static/image/share.png"></image>
                    <view class="share-text">分享</view>
                </view>
                <form @submit="clickLike" :data-article-id="item.id" :data-article-index="index" :data-article-liked="item.isLiked" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover">
                        <view class="like-image">
                            <image class="like-icon" src="../../static/image/like.png" v-if="!item.isLiked"></image>
                            <image class="like-icon" src="../../static/image/liked.png" v-if="item.isLiked"></image>
                        </view>
                        <view class="like-anim">
                            <image class="like-anim-image" src="../../static/image/liked.png" v-if="item.likeAnim"></image>
                        </view>
                        <view class="like-num-area" :hidden="item.likeNum==0">
                            <view class="like-num">{{item.likeNum}}</view>
                        </view>
                        <view class="like-text">扎心</view>
                    </button>
                </form>
                <!-- <form bindsubmit="goArticle" data-article-id="{{item.id}}" data-article-index="{{index}}" reportSubmit="true">
                    <button class="like" formType="submit" hoverClass="class-hover" wx:if="{{!sensitive}}">
                        <view class="like-image">
                            <image class="like-icon" src="/image/comment.png"></image>
                        </view>
                        <view class="like-num-area" hidden="{{!item.commentNum}}">
                            <view class="like-num">{{item.commentNum}}</view>
                        </view>
                        <view class="like-text">补刀</view>
                    </button>
                </form> -->
            </view>
        </view>
    </view>
    <view class="list-ad" v-if="(index+1)%3==0">
        <ad unitId="adunit-6950d410c8b19891"></ad>
    </view>
</block>
</view>
<view class="util-loadmore" :hidden="!loadMore">
    <view class="util-loading"></view>
    <view class="util-loadmore-tips">一大碗毒汤正在袭来</view>
</view>
<view class="util-loadmore" :hidden="loadMore" v-if="nextPage">
    <view class="util-loadmore-tips">- 已无更多记录 -</view>
</view>
<block data-type="template" data-is="shareDialog" data-attr="isShareDialogShow:isShareDialogShow,shareQuanImage:shareQuanImage,clickShareArticleId:clickShareArticleId,clickShareArticleIndex:clickShareArticleIndex">
    <view @tap.native.stop="hideShareDialog" catchtouchmove="disMove" class="share-dialog" v-if="isShareDialogShow">
        <view class="share-load">
            <view class="util-loadmore" v-if="!shareQuanImage">
                <view class="util-loading"></view>
                <view class="util-loadmore-tips">正在加载海报</view>
            </view>
        </view>
        <view class="share-image">
            <image mode="aspectFill" :src="shareQuanImage"></image>
        </view>
        <view class="share-dialog-area">
            <view @tap.native.stop="clickNull" class="share-to-user" hoverClass="class-hover">
                <image src="../../static/image/share-user.png"></image>
                <button openType="share"></button>
                <view class="share-to-user-text">转发好友</view>
            </view>
            <view @tap.native.stop="saveShareImage" class="share-to-quan" :data-article-id="clickShareArticleId" :data-article-index="clickShareArticleIndex" hoverClass="class-hover" v-if="!sensitive">
                <image src="../../static/image/share-quan.png"></image>
                <view class="share-to-user-text">保存相册</view>
            </view>
        </view>
    </view>
</block>
</view>
</template>

<script module="mod" lang="wxs" src="../../utils/mod.wxs"></script>

<script>
// pages/article/index.js
import { Articles } from "./articles-model";
var article = new Articles();

export default {
  data() {
    return {
      articleList: {},
      likeArticleList: [],
      oprtArticleList: [],
      type: 2,
      page: 1,
      totalPage: 0,
      loadMore: !0,
      nextPage: false,
      listSort: false,
      redDot: false,
      shareIg: "",
      isShareDialogShow: "",
      shareQuanImage: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = "2019-08-20 11:46:47";
    let str = date.substr(0, 10);
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
  onReachBottom: function () {
    if (!this.loading && this.page <= this.totalPage) {
      let param = {
        type: this.type,
        page: this.page
      };
      article.getGoodArticle(param, res => {
        console.log(res);
        this.setData({
          articleList: this.articleList.concat(res.data.list)
        });
        this.setData({
          page: this.page + 1
        });
      });
    } else {
      this.setData({
        loadMore: false,
        nextPage: true
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {};
  },
  methods: {
    onloadFun: function () {
      this.getArtiByType();
      article.getShareImg(res => {
        this.setData({
          shareIg: res.data.img_url
        });
      });
    },
    // 获得扎心和取消扎心的
    getLikeIdS: function () {},
    //点击扎心或者取消
    clickLike: function (e) {
      var s = e.currentTarget.dataset.articleId,
          r = e.currentTarget.dataset.articleIndex,
          c = e.currentTarget.dataset.articleLiked;
      console.log("点赞按钮事件articleLikeClick", s, r, c);
    },
    // 获得文章
    getArtiByType: function () {
      let param = {
        type: this.type,
        page: this.page
      };
      article.getGoodArticle(param, res => {
        this.loading = true;
        this.setData({
          articleList: res.data.list,
          totalPage: res.data.totalPage,
          page: this.page + 1
        });
        let list = this.articleList;
        let likeList = wx.getStorageSync('likeArticleList');

        for (let r = list, n = 0; n < r.length; n++) {
          r[n].isLiked = 0;

          if (likeList) {
            let res = likeList.indexOf(r[n].id);

            if (res > -1) {
              r[n].isLiked = 1;
            }
          }
        }

        this.setData({
          articleList: list
        });
        this.loading = false;
      });
    },
    changeSort: function () {
      let type = this.type;

      if (type == 1) {
        this.setData({
          type: 2
        });
      } else {
        this.setData({
          type: 1
        });
      }

      this.setData({
        page: 1
      });
      this.getArtiByType();
      this.setData({
        listSort: !this.listSort
      });
    },
    clickLike: function (e) {
      var s = e.currentTarget.dataset.articleId,
          r = e.currentTarget.dataset.articleIndex,
          c = e.currentTarget.dataset.articleLiked;
      console.log("点赞按钮事件articleLikeClick", s, r, c);

      if (c == 0) {
        let param = {
          type: 1,
          id: s
        };
        article.changeLiked(param, res => {});
        this.likeArticleList.push(s);
        wx.setStorage({
          key: "likeArticleList",
          data: this.likeArticleList
        });
        this.articleList[r].likeNum++;
        this.articleList[r].isLiked = 1;
        this.setData({
          articleList: this.articleList
        });
        let likeList = wx.getStorageSync('likeArticleList');
      } else {
        let param = {
          type: 2,
          id: s
        };
        article.changeLiked(param, res => {});
        let likeList = wx.getStorageSync('likeArticleList');

        for (let r = likeList, n = 0; n < r.length; n++) {
          if (r[n] == s) {
            likeList.splice(n, 1);
          }
        }

        wx.setStorage({
          key: "likeArticleList",
          data: likeList
        });
        this.articleList[r].likeNum--;
        this.articleList[r].isLiked = 0;
        this.setData({
          articleList: this.articleList,
          likeArticleList: likeList
        });
      }
    },
    //展示分享
    showShareDialog: function (e) {
      wx.showLoading({
        title: '正在生成海报',
        mask: !0
      });
      let id = e.currentTarget.dataset.articleId;
      article.makeShare(id, res => {
        this.setData({
          isShareDialogShow: !0,
          shareQuanImage: res.data.img_url
        });
      });
      wx.hideLoading();
    },
    saveShareImage: function () {
      wx.showLoading({
        title: '正在保存海报',
        mask: !0
      });
      wx.downloadFile({
        url: this.shareQuanImage,
        success: function (e) {
          console.log(e), wx.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function (e) {
              console.log("图片保存成功", e), wx.hideLoading(), wx.showToast({
                title: '图片保存成功',
                icon: "success",
                duration: 1e3
              });
            },
            fail: function (e) {
              wx.hideLoading(), console.log("图片保存失败", e), wx.showModal({
                title: "保存失败",
                content: "图片保存失败，请检查图片保存设置是否打开",
                confirmText: "前往设置",
                showCancel: !0,
                success: function (e) {
                  e.confirm && (console.log("图片保存失败弹窗下，用户点击前往设置"), wx.openSetting());
                }
              });
            }
          });
        },
        fail: function () {
          wx.hideLoading();
        }
      });
    },
    //隐藏分享
    hideShareDialog: function () {
      this.setData({
        isShareDialogShow: !1
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>