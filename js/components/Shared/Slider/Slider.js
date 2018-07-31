import { qs, $on } from '../../../helper/helper.js';
import { mainSlideData } from '../../../../assets/data/mainSlide.js';
import { mainSlideTemplate, slidEButtonTemplate } from '../../../../template/mainSlideTemplate.js';
import PagiNation from '../PagiNation/PagiNation.js';

export default class Slider {
  constructor(slideSelector, pagiNationSelector) {
    this.slideEl = qs(slideSelector);
    this.pagiNationEl = new PagiNation(pagiNationSelector, mainSlideData.length);
    this.contentsMaxIdx = mainSlideData.length - 1;
    this.activeIdx = Math.floor(Math.random() * (mainSlideData.length));
    this.render();
    this.bindEvents();
    this.pagiNationEl.sendIdx = this.updateActiveIdx.bind(this);
  }
  updateActiveIdx(idx) {
    this.activeIdx = idx;
    qs('.active', this.slideEl).classList.remove('active');
    this.slideEl.children[this.activeIdx].classList.add('active');
    // console.dir(qs(`page-${ this.activeIdx}` ,this.pagiNationEl))
    // qs(`page-${ this.activeIdx}`,this.pagiNationEl).classList.add('active');
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
  }
  handleRightButtonClicked() {
    this.slideEl.children[this.activeIdx].classList.remove('active');
    this.activeIdx = this.activeIdx + 1;
    if (this.activeIdx > this.contentsMaxIdx) this.activeIdx = 0;
    this.slideEl.children[this.activeIdx].classList.add('active');
  }
  handlLeftButtonClicked() {
    this.slideEl.children[this.activeIdx].classList.remove('active');
    this.activeIdx = this.activeIdx - 1;
    if (this.activeIdx < 0) this.activeIdx = this.contentsMaxIdx;
    this.slideEl.children[this.activeIdx].classList.add('active');
  }
}
