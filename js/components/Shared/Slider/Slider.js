import { qs, $on } from '../../../helper/helper.js';
import { mainSlideData } from '../../../../assets/data/mainSlide.js';
import { mainSlideTemplate, slidEButtonTemplate } from '../../../../template/mainSlideTemplate.js';
import PagiNation from '../PagiNation/PagiNation.js';
import { animation } from '../../../helper/animation/raf.js';

export default class Slider {
  constructor(slideSelector, pagiNationSelector) {
    this.slideEl = qs(slideSelector);
    this.pagiNationEl = new PagiNation(pagiNationSelector, mainSlideData.length);
    this.contentsMaxIdx = mainSlideData.length - 1;
    this.activeIdx = Math.floor(Math.random() * (mainSlideData.length));
    this.render();
    this.bindEvents();
    this.pagiNationEl.sendIdx = this.updateActiveIdx.bind(this);
    // this.pagiNationEl.sendIdx = this.activeSlidebyAnimation.bind(this);
  }
  updateActiveIdx(idx) {
    this.activeIdx = idx;
    qs('.active', this.slideEl).classList.remove('active');
    this.slideEl.children[this.activeIdx].classList.add('active');
  }
  updateActiveSlidebyAnimation(activeIdx, hideIdx) {
    const activeEl = this.slideEl.children[this.activeIdx];
    const hideEl = this.slideEl.children[hideIdx];
    hideEl.style.opacity = 0;
    hideEl.style.position = 'absolute';
    activeEl.style.transition = 'opacity 0.05s ease';
    activeEl.style.opacity = 1;
    activeEl.style.position = 'static';
  }
  render() {
    this.renderContents();
    this.renderButtons();
  }
  renderContents() {
    this.slideEl.innerHTML = mainSlideTemplate(mainSlideData);
    this.slideEl.children[this.activeIdx].classList.add('active');
  }
  renderButtons() {
    this.slideEl.insertAdjacentHTML('afterend', slidEButtonTemplate);
  }
  bindEvents() {
    const slideButtonList = this.slideEl.nextElementSibling;
    $on(qs('.left-button', slideButtonList), 'click', this.handlLeftButtonClicked.bind(this));
    $on(qs('.right-button', slideButtonList), 'click', this.handleRightButtonClicked.bind(this));
    
    // $on(qs('.right-button', slideButtonList), 'click', this.handleRightButtonClickedAnimation.bind(this));
    // $on(qs('.left-button', slideButtonList), 'click', this.handleLeftButtonClickedAnimation.bind(this));
  }
  setActiveIdx(idx) {
    this.activeIdx = idx;
  }
  setNextActiveIdx() {
    this.activeIdx = this.activeIdx + 1;
    if (this.activeIdx > this.contentsMaxIdx) this.activeIdx = 0;
  }
  setPrevActiveIdx() {
    this.activeIdx = this.activeIdx - 1;
    if (this.activeIdx < 0) this.activeIdx = this.contentsMaxIdx;
  }
  activeSlidebyAnimation(idx) {
    const beforeIdx = this.activeIdx;
    this.activeIdx = idx;
    animation(() => this.updateActiveSlidebyAnimation(this.activeIdx, beforeIdx));
  }
  handleRightButtonClickedAnimation() {
    const beforeIdx = this.activeIdx;
    this.setNextActiveIdx();
    animation(() => this.updateActiveSlidebyAnimation(this.activeIdx, beforeIdx));
  }
  handleLeftButtonClickedAnimation() {
    const beforeIdx = this.activeIdx;
    this.setPrevActiveIdx();
    animation(() => this.updateActiveSlidebyAnimation(this.activeIdx, beforeIdx));
  }
  handleChangeActiveClass(hideEl, activeEl) {
    hideEl.classList.remove('active');
    activeEl.classList.add('active');
  }
  handleRightButtonClicked() {
    const beforeIdx = this.activeIdx;
    this.setNextActiveIdx();
    this.handleChangeActiveClass(this.slideEl.children[beforeIdx], this.slideEl.children[this.activeIdx]);
  }
  handlLeftButtonClicked() {
    const beforeIdx = this.activeIdx;
    this.setPrevActiveIdx();
    this.handleChangeActiveClass(this.slideEl.children[beforeIdx], this.slideEl.children[this.activeIdx]);
  }
}
