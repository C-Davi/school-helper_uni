import { Base } from "../../../utils/base";

class Index extends Base {
  constructor() {
    super();
  }

  getLogo(callback) {
    var allParams = {
      url: 'system/logo',
      data: {
        token: 'wxshelian'
      },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }

}

export { Index };