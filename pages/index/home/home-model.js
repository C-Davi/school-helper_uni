import { Base } from '../../../utils/base.js';
class Home extends Base {
  constructor() {
    super();
  }

  getBanner(callback) {
    var allParams = {
      url: 'system/banner',
      data: { token: 'wxshelian' },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }
}
export { Home };