const chan = {};
chan.controller = {
  init() {
    this.getChans();
  },

  getChans() {
    this.setAjax("GET", "http://crong.codesquad.kr:8080/woowa/side", this.getChansEvent);
  },

  getChansEvent() {
    const result = JSON.parse(this.responseText);
  },

  setAjax(method, uri, event) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", event);
    oReq.open(method, uri);
    oReq.send();
  },
}