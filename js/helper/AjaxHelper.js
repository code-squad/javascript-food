
import { $on } from './helper.js';
export default class AjaxHelper {
  constructor(el) {
    this.httpRequest = null;
    this.init();
    this.el = el;
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
    this.el.getData(JSON.parse(this.httpRequest.responseText));
  }
}
