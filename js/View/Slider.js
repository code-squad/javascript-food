import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class Slider {
  constructor({ number, id, title, subtitle, apiUrl, tpl }) {
    this.number = number;
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.apiUrl = apiUrl;
    this.tpl = tpl;
    this.index = 0;
  }
  initialize() {
    this.render();
    this._registEvent();
  }

  _registEvent() {
    $on(qsa('.slide_arrow')[this.number], 'click', e => {
      e.preventDefault();
      if (e.target.className === 'slide_left_nav') this._prevSlide();
      if (e.target.className === 'slide_right_nav') this._nextSlide();
    });
  }

  _prevSlide() {
    this.index && this.index--;
    qsa('.slider')[this.number].style.transform = `translate3d(${this.index * -980}px,0,0)`
  }

  _nextSlide() {
    if (this.index + 1 >= qs(`#${this.id}_slider`).children.length) return;
    this.index++;
    qsa('.slider')[this.number].style.transform = `translate3d(${this.index * -980}px,0,0)`
  }

  render() {
    const sliderNode = document.createElement('div');
    sliderNode.classList.add('slide_background');
    sliderNode.innerHTML = this.tpl.makeSliderTpl(this.id, this.title, this.subtitle);
    qs('main').appendChild(sliderNode);
    ajax(this.apiUrl, this.cbRenderByTemplate.bind(this));
  }

  cbRenderByTemplate(ajaxRequest) {
    console.log(ajaxRequest);
    qs(`#${this.id}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qs(`#${this.id}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest);
    qs(`#${this.id}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest);
  }
}