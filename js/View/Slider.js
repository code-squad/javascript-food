import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class Slider {
  constructor({ category, apiUrl, tpl, slideMenuData }) {
    this.category = category;
    this.title = slideMenuData[category].title;
    this.subtitle = slideMenuData[category].subtitle;
    this.apiUrl = apiUrl;
    this.tpl = tpl;
    this.index = 0;
  }
  initialize() {
    this.render();
    this._registEvent(this.getSlideNumber());
  }
  getSlideNumber() {
    return document.querySelectorAll('.slider').length - 1;

  }

  _registEvent(number) {
    $on(qsa('.slide_arrow')[number], 'click', e => {
      e.preventDefault();
      if (e.target.className === 'slide_left_nav') this._prevSlide(number);
      if (e.target.className === 'slide_right_nav') this._nextSlide(number);
    });
  }

  _prevSlide(number) {
    this.index && this.index--;
    qsa('.slider')[number].style.transform = `translate3d(${this.index * -980}px,0,0)`
  }

  _nextSlide(number) {
    if (this.index + 1 >= qs(`#${this.category}_slider`).children.length) return;
    this.index++;
    qsa('.slider')[number].style.transform = `translate3d(${this.index * -980}px,0,0)`
  }

  render() {
    const sliderNode = this.makeSlideNode();
    qs('main').appendChild(sliderNode);
    ajax(this.apiUrl, this.cbRenderByTemplate.bind(this));
  }

  makeSlideNode() {
    const sliderNode = document.createElement('div');
    sliderNode.classList.add('slide_background');
    sliderNode.innerHTML = this.tpl.makeSliderTpl(this.category, this.title, this.subtitle);
    return sliderNode;
  }

  cbRenderByTemplate(ajaxRequest) {
    console.log(ajaxRequest);
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest);
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest);
  }
}