const chan = {};

chan.controller = {

  slidePosition: 0,
  slideWidth: 345,

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
    el.addEventListener("click", this.clickPrev);
    el = document.querySelector('.slide_next');
    el.addEventListener("click", this.clickNext);
  },

  clickNext() {
    // if (!slidePosition) {
    this.slidePosition += this.slideWidth;
    // }
    slideDishes(this.slidePosition);
  },

  clickPrev() {
    if (!this.slidePosition) {
      this.slidePosition -= this.slideWidth;
    }
    slideDishes(this.slidePosition);
  },

  slideDishes(slidePosition) {
    let dishes = document.getElementsByClassName("dishes");
    // if (n > x.length) { slideIndex = 1 };
    // if (n < 1) { slideIndex = x.length };
    // for (i = 0; i < x.length - 4; i++) {
    //   x[i].style.display = "none";
    // }
    // x[slideIndex - 1].style.display = "inline-block";
    // x[slideIndex].style.display = "inline-block";
    // x[slideIndex + 1].style.display = "inline-block";
    // x[slideIndex + 2].style.display = "inline-block";
  }
}
