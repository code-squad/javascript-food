import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class Slider {
  constructor({ category, apiUrl, tpl, slideMenuData }) {
    this.category = category;
    this.title = slideMenuData[category].title;
    this.subtitle = slideMenuData[category].subtitle;
    this.apiUrl = apiUrl;
    this.tpl = tpl;
    this.index = 1;
    this.slideNumber = null;
    this.timeChecker = null;
  }

  initialize() {
    this.render();
    this._registEvent(this.getSlideNumber());
    this.slideNumber = this.getSlideNumber();
  }

  getSlideNumber() {
    return qsa('.slider').length - 1;
  }

  _registEvent(number) {
    $on(qsa('.slide_arrow')[number], 'click', e => {
      e.preventDefault();
      if (e.target.className === 'slide_left_nav') this._prevSlide(number);
      if (e.target.className === 'slide_right_nav') this._nextSlide(number);
    });
  }

  _prevSlide(number) {
    this.transformByIndex('prev', number);
  }

  _nextSlide(number) {
    this.transformByIndex('next', number);
  }

  transformByIndex(way, number) {
    if (this.timeChecker) return;
    way === 'prev' ? this.index-- : this.index++;
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    qsa('.slider')[number].style.transform = `translateX(${this.index * -SLIDE_WIDTH}px)`

    if (way === 'prev') {
      this.timeChecker = setTimeout(() => this.cbTranslateWithoutTransition(0, qsa('.slider')[number].children.length - 2, number), 700);
    } else {
      this.timeChecker = setTimeout(() => this.cbTranslateWithoutTransition(qsa('.slider')[number].children.length - 1, 1, number), 700);
    }
    qsa('.slider')[number].style.transition = 'all 0.7s';
  }

  cbTranslateWithoutTransition(condition, after, number) {
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    if (this.index === condition) {
      this.index = after;
      qsa('.slider')[number].style.transition = 'none';
      qsa('.slider')[number].style.transform = `translateX(${after * -SLIDE_WIDTH}px)`;
    }
    this.initializeChecker();
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
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qsa('.slider')[this.slideNumber].style.transform = `translateX(${-SLIDE_WIDTH}px)`
  }

  initializeChecker() {
    this.timeChecker = null;
  }
}