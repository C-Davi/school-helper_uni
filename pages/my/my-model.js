import { Base } from '../../utils/base.js';
class My extends Base {
  constructor() {
    super();
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
  submitStuInfo(data,callback){
    var  allParams = {
      url:'user/upStuInfo',
      data:data,
      type:'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //获取全部院系
  getColleges(type,callback){
    var allParams = {
      url: 'user/getGroupByType',
      data: { type: type},
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //获取全部专业
  getMajor(id, callback) {
    var allParams = {
      url: 'user/getGroupByType',
      data: { id: id, type: 2 },
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //获取全部班级
  getClass(id, callback) {
    var allParams = {
      url: 'user/getGroupByType',
      data: { id: id ,type:3},
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
}
export { My };