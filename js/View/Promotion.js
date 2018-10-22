import { qs, $on } from '../Util/helper.js'
export default class Promotion {
  constructor() {
    this.index = 0;
  }

  initialize() {
    this._showSlide(this.index);
    this._registEvent();
  }

  _registEvent() {
    $on('.promotion_right_nav', 'click', e => this._cbClickNextSlide(e));
    $on('.promotion_left_nav', 'click', e => this._cbClickPrevSlide(e));
    $on('.slides_navi', 'click', e => this._cbClickSlidesNavi(e))
  }

  _cbClickNextSlide(event) {
    event.preventDefault();
    this._nextSlide();
  }

  _cbClickPrevSlide(event) {
    event.preventDefault();
    this._prevSlide();
  }

  _cbClickSlidesNavi(event) {
    event.preventDefault();
    if (e.target.tagName !== 'LI') return;
    this.slidesNaviOn(event.target);
    this.index = +(e.target.dataset.index);
    this._showSlide(this.index);
  }

  _nextSlide() {
    if (this.index >= qs('.promotion_ul').children.length - 1) this.index = 0;
    else this.index += 1;
    this._showSlide(this.index);
  }

  _slidesNaviOn(targetNode) {
    if (qs('.slides_navi_li_clicked')) {
      qs('.slides_navi_li_clicked').classList.remove('slides_navi_li_clicked')
    }
    targetNode.classList.add('slides_navi_li_clicked');
  }

  _prevSlide() {
    if (!this.index) this.index = qs('.promotion_ul').children.length - 1;
    else this.index -= 1;
    this._showSlide(this.index);
  }

  _showSlide(index) {
    if (qs('.show')) qs('.show').classList.remove('show');
    this._slidesNaviOn(qs(`[data-index='${index}']`));
    qs('.promotion_ul').children[index].firstElementChild.classList.add('show');
  }
}