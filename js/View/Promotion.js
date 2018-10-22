import { qs, $on } from '../Util/helper.js'
export default class Promotion {
  constructor() {
    this.index = 0;
  }

  initialize() {
    this.showSlide(this.index);
    this._registEvt();
  }

  _registEvt() {
    $on('.promotion_right_nav', 'click', e => this.cbClickNextSlide(e));
    $on('.promotion_left_nav', 'click', e => this.cbClickPrevSlide(e));
    qs('.slides_navi').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName !== 'LI') return;
      this.slidesNaviOn(e.target);
      this.hideSlide();
      this.index = +(e.target.dataset.index);
      this.showSlide(this.index);
    })
  }
  cbClickNextSlide(event) {
    event.preventDefault();
    this.nextSlide();
  }
  cbClickPrevSlide(event) {
    event.preventDefault();
    this.prevSlide();
  }

  nextSlide() {
    if (this.index >= qs('.promotion_ul').children.length - 1) this.index = 0;
    else this.index += 1;
    this.hideSlide();
    this.showSlide(this.index);
  }

  slidesNaviOn(targetNode) {
    if (qs('.slides_navi_li_clicked')) {
      qs('.slides_navi_li_clicked').classList.remove('slides_navi_li_clicked')
    }
    targetNode.classList.add('slides_navi_li_clicked');
  }

  prevSlide() {
    if (!this.index) this.index = qs('.promotion_ul').children.length - 1;
    else this.index -= 1;
    this.hideSlide();
    this.showSlide(this.index);
  }

  showSlide(index) {
    this.slidesNaviOn(qs(`[data-index='${index}']`));
    qs('.promotion_ul').children[index].firstElementChild.classList.add('show');
  }

  hideSlide() {
    qs('.show').classList.remove('show');
  }
}