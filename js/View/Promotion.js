import { qs, qsa } from '../Util/helper.js'
export default class Promotion {
  constructor() {
    this.index = 0;
  }
  initialize() {
    this.showSlide(this.index);
    this.registEvt();
  }
  registEvt() {
    qs('.promotion_right_nav').addEventListener('click', (e) => {
      e.preventDefault();
      this.nextSlide();
    })
    qs('.promotion_left_nav').addEventListener('click', (e) => {
      e.preventDefault();
      this.prevSlide();
    })
  }
  nextSlide() {
    if (this.index >= qs('.promotion_ul').children.length - 1) return;
    this.hideSlide(this.index);
    this.index += 1;
    this.showSlide(this.index);
  }
  prevSlide() {
    if (!this.index) return;
    this.hideSlide(this.index);
    this.index -= 1;
    this.showSlide(this.index);
  }
  showSlide(index) {
    qs('.promotion_ul').children[index].classList.add('show');

  }
  hideSlide(index) {
    qs('.promotion_ul').children[index].classList.remove('show');
  }
}