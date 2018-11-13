import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class Slider {
  constructor({ category, apiUrl, tpl, slideMenuData }) {
    this.category = category;
    this.title = slideMenuData[category].title;
    this.subtitle = slideMenuData[category].subtitle;
    this.apiUrl = apiUrl;
    this.tpl = tpl;
    this.index = 1;
    this.slideIndex = null;
    this.timeChecker = null;
  }

  initialize() {
    this.render();
    this._registEvent(this.getSlideNumber());
    this.slideIndex = this.getSlideNumber();
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
    // if (this.timeChecker) return;
    // this.index--;
    // qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`
    // this.timeChecker = setTimeout(() => {
    //   if (this.index === 0) {
    //     this.index = 2;
    //     qsa('.slider')[number].style.transition = 'none';
    //     qsa('.slider')[number].style.transform = `translateX(${(qsa('.slider')[number].children.length - 2) * -980}px)`;
    //   }
    //   this.initializeChecker();
    // }, 700);
    // qsa('.slider')[number].style.transition = 'all 0.7s';
  }
  transformByIndex(way, number, before, after) {
    if (this.timeChecker) return;
    way === 'prev' ? this.index-- : this.index++;
    qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`
    if (way === 'prev') {
      this.timeChecker = setTimeout(() => {
        if (this.index === 0) {
          this.index = 2;
          qsa('.slider')[number].style.transition = 'none';
          qsa('.slider')[number].style.transform = `translateX(${(qsa('.slider')[number].children.length - 2) * -980}px)`;
        }
        this.initializeChecker();
      }, 700);
    } else {
      // this.index++;
      // qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`
      this.timeChecker = setTimeout(() => {
        if (this.index + 1 >= qsa('.slider')[number].children.length) {
          this.index = 1;
          qsa('.slider')[number].style.transition = 'none';
          qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`;
        }
        this.initializeChecker();
      }, 700);
    }
    qsa('.slider')[number].style.transition = 'all 0.7s';
  }

  _nextSlide(number) {
    if (this.timeChecker) return;
    this.index++;
    qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`
    this.timeChecker = setTimeout(() => {
      if (this.index + 1 >= qsa('.slider')[number].children.length) {
        this.index = 1;
        qsa('.slider')[number].style.transition = 'none';
        qsa('.slider')[number].style.transform = `translateX(${this.index * -980}px)`;
      }
      this.initializeChecker();
    }, 700);
    qsa('.slider')[number].style.transition = 'all 0.7s';
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
    qs(`#${this.category}_slider`).innerHTML += this.tpl.makeSlideItemTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qsa('.slider')[this.slideIndex].style.transform = 'translateX(-980px)'
  }

  initializeChecker() {
    this.timeChecker = null;
  }
}