const chan = {};
chan.controller = {
  init() {
    this.getDishes();
  },

  getDishes() {
    this.setAjax("GET", "http://crong.codesquad.kr:8080/woowa/side", this.getDishesEvent);
  },

  getDishesEvent() {
    const dishes = JSON.parse(this.responseText);

    for (const chan of dishes) {
      const chanTemplate = document.querySelector('.dish_template');
      const clone = document.importNode(chanTemplate.content, true);
      clone.querySelector('img').src = chan.image;
      clone.querySelector('dl > dt').innerText = chan.title;
      clone.querySelector('dl > dd').innerText = chan.description;
      clone.querySelector('dl > span').innerText = chan.s_price;

      document.querySelector('.dishes > ul').appendChild(clone);
    }
  },

  setAjax(method, uri, event) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", event);
    oReq.open(method, uri);
    oReq.send();
  },
}