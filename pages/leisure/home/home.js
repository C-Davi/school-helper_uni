
import { Let } from '../let-model.js';
var team = new Let();
Page({
    data: {
        isActive: 0,
        nav: [ "身心社团", "技能社团" ],
        news: "",
        type:1,
        md:"",
        en:"",
        apply:false
    },
    onLoad: function() {
      
        // var t = this;
        // wx.request({
        //     url: "https://www.zzuyinluo.top/schedules/schoolNews",
        //     success: function(e) {
        //         t.setData({  
        //             news: e.data
        //         });
        //     }
        // });
        this.teamCanApply();
        this.getTeamsByType();
    },
    teamCanApply:function(){
      team.teamCanApply((res)=>{
        if(res.status==1){
          this.setData({
            apply:true
          })
        }
      })
    },
    getTeamsByType:function(){
      let teamType = this.data.type;
      wx.showLoading({
        title: '加载中',
      })
      
      if(this.data.news!=''){
        if(teamType==1){
          this.setData({
            news:this.data.md
          })
        }else if(teamType==2){
          this.setData({
            news:this.data.en
          })
        }
      }else{
        let teamType = this.data.type;
        team.getTeamsByType(teamType, (res) => {
          if (res.status == 1) {
            let img_pre = res.data.img_pre;
            let list = res.data.list;
            this.setData({
              img_pre: img_pre,
              news: list
            })
            if (teamType == 1) {
              team.getTeamsByType(2,(res)=>{
                if(res.status==1){
                  this.setData({
                    en:res.data.list
                  })
                }
              })
              this.setData({
                md: list
              })
            } else if (teamType == 2) {
              this.setData({
                en: list
              })
            }
          }
        })
      }
      
      setTimeout(function () {
        wx.hideLoading()
      }, 1500);
    },
    getActiveNav: function(t) {
        var e = t.currentTarget.dataset.index;
        if(e==0){
          this.setData({
            type:1
          })
        }else if(e==1){
          this.setData({
            type:2
          })
        }
        this.setData({
            isActive: e
        });
      this.getTeamsByType();
    },
    goDetailPage: function(t) {
        // var e = t.currentTarget.dataset.index;
        // wx.setStorage({
        //     key: "newsDetail",
        //     data: JSON.stringify(this.data.news[e]),
        //     success: function(t) {
        //         wx.navigateTo({
        //             url: "../news/index/index"
        //         });
        //     }
        // });
    },
    toApply:function(e){
      let team_id = e.currentTarget.dataset['id'];
      wx.navigateTo({
        url:'../enroll/enroll?team_id='+team_id
      })
    }
});