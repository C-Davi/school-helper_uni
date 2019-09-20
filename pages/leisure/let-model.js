import { Base } from '../../utils/base.js';
class Let extends Base {
  constructor() {
    super();
  }
  getTeamsByType(data,callback){
    var params = {
      url:'teams',
      data:{type:data},
      type:'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  getTeamById(id,callback){
    var params = {
      url: 'teams/find',
      data: { team_id: id },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  // 判断是否绑定学生信息
  checkBindSid(callback) {
    var allParams = {
      url: 'user/checkBindSid',
      data: { token: 'wxshelian' },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  // 提交学生信息
  submitStuInfo(data, callback) {
    var allParams = {
      url: 'user/upStuInfo',
      data: data,
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //社团是否纳新
  teamCanApply(callback){
    var allParams = {
      url: 'system/canTeamApply',
      data: { token: 'wxshelian' },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
}
export { Let };