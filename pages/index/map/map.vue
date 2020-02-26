<template>
<view>
<view class="custom" :style="'height: ' + CustomBar + 'px; padding-top: ' + StatusBar + 'px; background-color: var(--primary);'">
    <navigator class="custom-back" openType="navigateBack"></navigator>
    <view class="custom-name">黄岛校区</view>
</view>
<swiper class="tab" :current="current" nextMargin="645rpx">
    <swiper-item v-for="(item, index) in tab" :key="index">
        <view @tap="changeActive" :class="'tab-list ' + (tabNum===index?'active':'quiet')" :data-index="index">{{item.name}}</view>
    </swiper-item>
</swiper>
<map enable3D enableOverlooking enableTraffic showCompass showLocation @markertap="getMarker" id="map" :includePoints="include" :markers="markers" :style="'height: calc(100vh - 80vw - ' + CustomBar + 'px); width: 100vw;'"></map>
<scroll-view scroll-y class="region" :scrollIntoView="view">
    <view @tap="getMarker" v-for="(item, index) in markers" :key="index" class="region-list" :data-id="item.id" :idAttr="'region-' + item.id">
        <image class="region-list__pic" mode="aspectFit" :src="logo"></image>
        <text class="region-list__name">{{item.callout.content}}</text>
        <button open-type="share" title="分享青职定位" :data-name="item.callout.content" class="region-list__icon_share">
          <image src="../../../static/images/icon/share.svg" class="region-list__share"></image>
        </button>
        <image @tap="openLoc" class="region-list__icon" :data-id="item.id" src="../../../static/images/icon/nav.svg"></image>
    </view>
</scroll-view>
<!-- <view class="detail {{show?'show-detail':'hide-detail'}}" wx:if="{{floorInfo}}">
    <view bindtap="handleShow" class="detail-arrow" wx:if="{{show}}">🔻</view>
    <view bindtap="handleShow" class="detail-arrow" wx:else>🔺</view>
    <view class="detail-header">
        <text class="detail-header__name">{{floorInfo.bname}}</text>
        <image bindtap="openLoc" class="detail-header__icon" data-id="{{floorInfo.id}}" src="../../../images/icon/nav.svg"></image>
    </view>
    <view class="detail-content">
        <text wx:for="{{floorInfo.binfo}}">{{item}}
        </text>
    </view>
</view> -->
</view>
</template>

<script>
var t = getApp().globalData;
new Date();
import { Index } from "../index/index-model";
var index = new Index();

export default {
  data() {
    return {
      StatusBar: t.globalData.StatusBar,
      CustomBar: t.globalData.CustomBar,
      Custom: t.globalData.Custom,
      view: "",
      tab: [{
        name: "首页",
        index: 0
      }, {
        name: "校门",
        index: 1
      }, {
        name: "教学楼",
        index: 2
      }, {
        name: "宿舍",
        index: 3
      }, {
        name: "图书馆",
        index: 4
      }, {
        name: "餐厅",
        index: 5
      }, {
        name: "校医院",
        index: 6
      }, {
        name: "实验室",
        index: 7
      }, {
        name: "体育馆",
        index: 8
      }, {
        name: "卫生间",
        index: 9
      }, {
        name: "服务",
        index: 10
      }],
      markers: [],
      include: [],
      floorInfo: "",
      tabNum: 0,
      current: 0,
      show: !0,
      showModal: !1,
      logo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    index.getLogo(res => {
      this.setData({
        logo: res.data.img_url
      });
    });
    this.getRegionLoc(0);
  },
  onShareAppMessage: function (t) {
    let title_str = t.target.dataset.name;
    return {
      title: '我在青职-' + title_str + '等你来呦！'
    };
  },
  methods: {
    getRegionLoc: function (t) {
      var e = this;
      this.setData({
        markers: []
      }), wx.request({
        url: "https://shelian.qtc369.com/api/v1/schedules/" + t,
        success: function (t) {
          console.log(t);

          for (var a = getApp().globalData.data, n = [], o = [], i = 0; i < a.length; i++) {
            var r = {
              id: a[i].id,
              latitude: a[i].latitude,
              longitude: a[i].longitude,
              iconPath: "../../../images/icon/loc.png",
              width: "30",
              height: "50",
              callout: {
                content: a[i].name,
                color: "#333",
                borderWidth: "2",
                borderColor: "#000",
                borderRadius: "5",
                padding: "5",
                display: "ALWAYS",
                bgColor: "#ffe411",
                textAlign: "center"
              }
            };
            n.push(r), o.push({
              latitude: a[i].latitude,
              longitude: a[i].longitude
            });
          }

          e.setData({
            markers: n,
            include: o
          });
        }
      });
    },
    changeActive: function (t) {
      var e = t.currentTarget.dataset.index,
          a = this.tab;
      this.getRegionLoc(e), e <= a.length - 7 ? this.setData({
        tabNum: e,
        current: e
      }) : this.setData({
        tabNum: e,
        current: a.length - 7
      });
    },
    getMarker: function (t) {
      for (var e = t.currentTarget.dataset.id ? t.currentTarget.dataset.id : t.markerId, a = this.markers, n = "", o = 0; o < a.length; o++) a[o].id === e ? (n = "region-" + a[o].id, a[o].callout.bgColor = "#fff") : "#ffe411" !== a[o].callout.bgColor && (a[o].callout.bgColor = "#ffe411");

      this.setData({
        markers: a,
        view: n
      }), this.getFloorInfo(e);
    },
    getFloorInfo: function (t) {// var e = this;
      // wx.request({
      //     url: "https://www.zzuyinluo.top/schedules/building/" + t,
      //     success: function(t) {
      //       console.log(t)
      //         var a = t.data;
      //         console.log(t.data), a.binfo = a.binfo.split("\\n"), e.setData({
      //             floorInfo: a
      //         });
      //     }
      // });
    },
    handleShow: function () {
      var t = this.show;
      this.setData({
        show: !t
      });
    },
    openLoc: function (t) {
      var e = t.currentTarget.dataset.id,
          a = void 0,
          n = void 0;
      this.markers.forEach(function (t) {
        t.id === e && (a = +t.latitude, n = +t.longitude);
      }), wx.openLocation({
        latitude: a,
        longitude: n
      });
    }
  }
};
</script>
<style>
@import "./map.css";
</style>