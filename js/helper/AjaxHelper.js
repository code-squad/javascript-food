const tabURL = `http://crong.codesquad.kr:8080/woowa/best`;

export default class AjaxHelper {
  constructor({ tab }) {
    this.httpRequest = null;
    this.init();
    this.tab = tab;
    this.sendTabData = this.tab.getData.bind(this.tab);
    this.getTabData();
  }
  init() {
    if (window.XMLHttpRequest) {
      // 모질라, 사파리등 그외 브라우저, ...
      this.httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE 8 이상
      this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    this.httpRequest.onreadystatechange = this.onreadystatechange.bind(this);
  }
  onreadystatechange() {
    const { readyState, status, responseText } = this.httpRequest;
    // process he server response
    const DONE = 4; // readyState 4 means the request is done.
    const OK = 200; // status 200 is a successful return.
    console.log(readyState);
    if (readyState === DONE) {
      if (status === OK) {
        this.sendTabData(JSON.parse(responseText));
      } else {
        console.error("Error: " + this.status); // An error occurred during the request.
      }
    }
  }
  getTabData() {
    this.httpRequest.open("GET", tabURL, true);
    this.httpRequest.send(null);
  }
}
