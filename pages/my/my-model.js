import { Base } from '../../utils/base.js';
class My extends Base {
  constructor() {
    super();
  }
  // 检查是否存在学生id
  checkSid(callBack){
    var params ={
      url:'user/checkBindSid',
      data:{token:'wxshelian'},
      type:'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  getLogo(callback) {
    var allParams = {
      url: 'system/logo',
      data: { token: 'wxshelian' },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
}
export { My };