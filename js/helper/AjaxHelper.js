
import { $on } from './helper.js';
export default class AjaxHelper {
  constructor() {
    this.httpRequest = null;
    this.init();
  }
  init() {
    if (window.XMLHttpRequest) {
      // 모질라, 사파리등 그외 브라우저, ...
      this.httpRequest = new XMLHttpRequest();
    } else {
      this.httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
    }
   
  }
  sendReq({method, url, successCallback}) {
    $on(this.httpRequest, 'load', ()=>successCallback(this.reqListener()));
    this.httpRequest.open(method, url);
    this.httpRequest.send();
  }
  reqListener(){
    return JSON.parse(this.httpRequest.responseText)
  }
}
