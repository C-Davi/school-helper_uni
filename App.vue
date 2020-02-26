<script>
import { Token } from "./utils/token";

export default {
  onLaunch: function () {
    var t = this;
    wx.cloud && wx.cloud.init({
      traceUser: true
    }), this.globalData.update(), wx.getSystemInfo({
      success: function (a) {
        console.log(a);
        t.globalData.StatusBar = a.statusBarHeight;
        var e = wx.getMenuButtonBoundingClientRect();
        t.globalData.Custom = e, t.globalData.CustomBar = e.bottom + e.top - a.statusBarHeight, t.globalData.ScreenWidth = a.screenWidth;
      }
    });
  },
  globalData: {
    update: function () {
      var token = new Token();
      token.verify(); // var t = wx.getUpdateManager();
      // t.onCheckForUpdate(function(t) {}), t.onUpdateReady(function() {
      //     wx.showModal({
      //         title: "更新提示",
      //         content: "新版本已经准备好，是否重启应用？",
      //         success: function(a) {
      //             a.confirm && t.applyUpdate();
      //         }
      //     });
      // });
    },
    userInfo: null,
    StatusBar: "",
    Custom: "",
    CustomBar: "",
    ScreenWidth: "",
    UserInfo: "",
    Logo: ''
  },
  methods: {}
};
</script>
<style>
@import url("./components/gaoyia-parse/parse.css");
@import "./app.css";
</style>