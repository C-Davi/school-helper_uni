import { Base } from '../../utils/base.js';
class Union extends Base {
  constructor() {
    super();
  }
  //获取全部社联组织
  getAllUnions(data, callback) {
    var params = {
      url: 'unions',
      data: { type: data },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
  //获取社联某个组织
  getUnionById(id, callback) {
    var params = {
      url: 'unions/find',
      data: { union_id: id },
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
  //提交社联组织申请
  submitTeamApply(data, callback) {
    var allParams = {
      url: 'unions/upStuInfo',
      data: data,
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //查询纳新进度
  checkTeamSchedule(teamId, callback) {
    var allParams = {
      url: 'unions/schedule',
      data: { unionId: teamId },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
  //社联组织是否纳新
  unionCanApply(callback) {
    var allParams = {
      url: 'unions/check',
      data: { token: 'wxshelian' },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
}
export { Union };