import { Phone } from 'phone-model.js';
var phone = new Phone();
Page({
    data: {
        phones: []
    },
    onLoad: function() {
      this.getPhone();
    },
    getPhone:function(){
      phone.getAll((res)=>{
        this.setData({
          phones:res.data
        })
      })
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});