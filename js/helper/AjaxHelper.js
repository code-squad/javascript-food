
import { $on } from './helper.js';
export default class AjaxHelper {
  constructor() {
    this.httpRequest = null;
    this.getData = null;
    this.init();
  }
  init() {
    if (window.XMLHttpRequest) {
      // 모질라, 사파리등 그외 브라우저, ...
      this.httpRequest = new XMLHttpRequest();
    } else {
      this.httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
    }
    $on(this.httpRequest, 'load', this.reqListener.bind(this));
  }
  sendReq(method, url) {
    this.httpRequest.open(method, url);
    this.httpRequest.send();
  }
  reqListener() {
    this.getData(JSON.parse(this.httpRequest.responseText));
  }
}
