import { Base } from "../../utils/base";

class Articles extends Base {
  constructor() {
    super();
  }

  getGoodArticle(data, callback) {
    var params = {
      url: 'article',
      type: 'post',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  changeLiked(data, callback) {
    var params = {
      url: 'article/change',
      type: 'post',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  getShareImg(callback) {
    var allParams = {
      url: 'system/share',
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

  makeShare(data, callback) {
    var allParams = {
      url: 'system/getShareCanv',
      data: {
        token: 'wxshelian',
        id: data
      },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(allParams);
  }

}

export { Articles };