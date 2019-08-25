import { Base } from '../../utils/base.js';
class Articles extends Base{
  constructor(){
    super();
  }

  getGoodArticle(data,callback){
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

  changeLiked(data, callback){
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
}
export { Articles };