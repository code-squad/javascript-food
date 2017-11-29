const chan = {};
chan.controller = {
  init() {
    this.getChans();
  },

  getChans() {
    this.setAjax("GET", "http://crong.codesquad.kr:8080/woowa/side", this.getChansEvent);
  },

  getChansEvent() {
    const chans = JSON.parse(this.responseText);

    for (const chan of chans) {
      const chanTemplate = document.querySelector('.chan_template');
      const clone = document.importNode(chanTemplate.content, true);
      clone.querySelector('img').src = chan.image;
      clone.querySelector('dl > dt').innerText = chan.title;
      clone.querySelector('dl > dd').innerText = chan.description;
      clone.querySelector('dl > span').innerText = chan.s_price;

      document.querySelector('.chans > ul').appendChild(clone);
    }
    console.log(chans);
  },

  setAjax(method, uri, event) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", event);
    oReq.open(method, uri);
    oReq.send();
  },
}