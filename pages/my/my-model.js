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
}
export { My };