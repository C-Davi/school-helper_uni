Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {
      avatarUrl: 'https://tvax3.sinaimg.cn/crop.8.7.322.322.180/8970ff1ely8frdenkcgutj209k09kdgw.jpg'
    }
    },
    onLoad: function (n) {
      wx.setNavigationBarTitle({
        title: `掌上嗨尔社联`
      });
      // setTimeout(function () {
      //   wx.switchTab({
      //     url: "../home/home"
      //   });
    },
    goToIndex() {
      wx.switchTab({  
        url: '../home/home',
      });
    },
    onReady: function() {
      setTimeout(() => {
        this.setData({
          remind: ''
        });
      }, 1000);
      wx.onAccelerometerChange((res) => {
        let angle = -(res.x * 30).toFixed(1);
        if (angle > 14) { angle = 14; }
        else if (angle < -14) { angle = -14; }
        if (this.data.angle !== angle) {
          this.setData({
            angle: angle
          });
        }
      });
    },
    onShow: function() {
      let userInfo = wx.getStorageSync('userInfo')
      let dialogComponent = this.selectComponent('.wxc-dialog');
      if (!userInfo) {
        dialogComponent && dialogComponent.show();
      } else {
        this.setData({
          userInfo: userInfo
        })
        dialogComponent && dialogComponent.hide();
      }
    },
  onConfirm(e) { // 点击允许
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
    let userInfo = JSON.parse(e.detail.detail.rawData)
    if (!userInfo) {
      return;
    }else{
      console.log(userInfo)
    }
    this.setData({
      userInfo: userInfo
    })
    wx.setStorageSync('userInfo', userInfo)
  },
  onCancel() { // 点击拒绝
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
  },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});