import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class Slider {
  constructor({ category, apiUrl, tpl, slideMenuData }) {
    this.category = category;
    this.title = slideMenuData[category].title;
    this.subtitle = slideMenuData[category].subtitle;
    this.apiUrl = apiUrl;
    this.tpl = tpl;
    this.index = 1;
    this.timeChecker = null;
  }

  init() {
    this.render();
    this._registEvent();
  }

  _registEvent() {
    $on(qs(`.${this.category}_slide .slide_arrow`), 'click', e => {
      e.preventDefault();
      if (e.target.className === 'slide_left_nav') this._prevSlide();
      if (e.target.className === 'slide_right_nav') this._nextSlide();
    });
  }

  _prevSlide() {
    this.transformByIndex('prev');
  }

  _nextSlide() {
    this.transformByIndex('next');
  }

  transformByIndex(way) {
    if (this.timeChecker) return;
    way === 'prev' ? this.index-- : this.index++;
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    qs(`#${this.category}_slider`).style.transform = `translateX(${this.index * -SLIDE_WIDTH}px)`

    if (way === 'prev') {
      this.timeChecker = setTimeout(() =>
        this.cbTranslateWithoutTransition.call(this, 0, qs(`#${this.category}_slider`).children.length - 2), 700);
    } else {
      this.timeChecker = setTimeout(() =>
        this.cbTranslateWithoutTransition.call(this, qs(`#${this.category}_slider`).children.length - 1, 1), 700);
      qs(`#${this.category}_slider`).style.transition = 'all 0.7s';
    }
  }

  cbTranslateWithoutTransition(condition, after) {
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    if (this.index === condition) {
      this.index = after;
      qs(`#${this.category}_slider`).style.transition = 'none';
      qs(`#${this.category}_slider`).style.transform = `translateX(${after * -SLIDE_WIDTH}px)`;
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
    sliderNode.classList.add(`${this.category}_slide`);
    sliderNode.innerHTML = this.tpl.makeSliderTpl(this.category, this.title, this.subtitle);
    return sliderNode;
  }

  cbRenderByTemplate(ajaxRequest) {
    const SLIDE_WIDTH = qs('.slide_wrap').offsetWidth;
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qs(`#${this.category}_slider`).style.transform = `translateX(${-SLIDE_WIDTH}px)`
  }

  initializeChecker() {
    this.timeChecker = null;
  }
}