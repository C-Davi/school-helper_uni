import { Base } from "../../../utils/base";

class Phone extends Base {
  constructor() {
    super();
  }

  getAll(callback) {
    var allParams = {
      url: 'schoolCollege',
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

export { Phone };