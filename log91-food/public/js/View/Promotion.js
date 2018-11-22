import { qs, $on } from '../Util/helper.js'

export default class Promotion {
  constructor({ fadeIn, fadeOut }) {
    this.index = 0;
    this.fadeIn = fadeIn;
    this.fadeOut = fadeOut;
  }

  init() {
    this._showSlide(this.index);
    this._registEvent();
  }

  _registEvent() {
    $on(qs('.promotion_nav_arrow'), 'click', e => {
      e.preventDefault();
      if (e.target.className === 'promotion_left_nav') this._prevSlide();
      if (e.target.className === 'promotion_right_nav') this._nextSlide();
    });

    $on(qs('.slides_navi'), 'click', e => {
      e.preventDefault();
      if (e.target.tagName !== 'LI') return;
      this._hideSlide(this.index);
      this.index = parseInt(e.target.dataset.index);
      this._showSlide(this.index);
    })
  }

  _nextSlide() {
    this._hideSlide(this.index);
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
    this._hideSlide(this.index);
    if (!this.index) this.index = qs('.promotion_ul').children.length - 1;
    else this.index -= 1;
    this._showSlide(this.index);
  }

  _showSlide(index) {
    this._slidesNaviOn(qs(`[data-index='${index}']`));
    const selector = qs('.promotion_ul').children[index].firstElementChild;
    selector.id = 'show';
    // this.fadeIn(selector, 1200);
  }

  _hideSlide(index) {
    const selector = qs('.promotion_ul').children[index].firstElementChild;
    selector.id = '';
    // this.fadeOut(selector, 1200);
  }
}