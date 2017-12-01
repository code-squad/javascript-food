const chan = {};

chan.controller = {

  slidePosition: 0,
  slideWidth: 245,

  init() {
    this.getDishes();
    this.setSlideEvents();
  },

  getDishes() {
    this.setAjax("GET", "http://crong.codesquad.kr:8080/woowa/side", this.getDishesEvent);
  },

  getDishesEvent() {
    const dishes = JSON.parse(this.responseText);
    console.log(dishes)

    for (const chan of dishes) {
      const chanTemplate = document.querySelector('.dish_template');
      const clone = document.importNode(chanTemplate.content, true);
      clone.querySelector('img').src = chan.image;
      clone.querySelector('dl > dt').innerText = chan.title;
      clone.querySelector('dl > dd').innerText = chan.description;
      clone.querySelector('dl > span').innerText = chan.s_price;

      const delivery_type = `${chan.delivery_type[0]}\n----------\n${chan.delivery_type[1]}`
      clone.querySelector('.dish_type').innerText = delivery_type;

      document.querySelector('.dishes > ul').appendChild(clone);
    }
  },

  setAjax(method, uri, event) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", event);
    oReq.open(method, uri);
    oReq.send();
  },

  setSlideEvents() {
    let el = document.querySelector('.slide_prev');
    el.addEventListener("click", this.clickPrev.bind(this));
    el = document.querySelector('.slide_next');
    el.addEventListener("click", this.clickNext.bind(this));
  },

  clickNext() {
    if (!this.slidePosition) {
      this.slidePosition -= this.slideWidth * 4;
    }
    this.slideDishes(this.slidePosition);
  },

  clickPrev() {
    if (this.slidePosition === -this.slideWidth * 4) {
      this.slidePosition += this.slideWidth * 4;
    }
    this.slideDishes(this.slidePosition);
  },

  slideDishes(slidePosition) {
    let dishes = document.querySelector(".dishes > ul");
    dishes.style.transform = `translate3d(${slidePosition}px, 0px, 0px)`;
  }
}
