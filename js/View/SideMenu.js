import { qs, qsa, $on, ajax, makeItemScoreByStars } from "../../js/Util/helper.js";
import { makeSliderTpl } from '../templates/sideMenuTpl.js';


export default class SideMenu {
  constructor() {
    this.index = 0;
  }
  initialize() {
    this.render();
    this._registEvent();
  }
  _registEvent() {
    $on('.side_nav_arrow', 'click', e => {
      e.preventDefault();
      if (e.target.className === 'side_left_nav') this._prevSlide();
      if (e.target.className === 'side_right_nav') this._nextSlide();
    });
  }
  _prevSlide() {
    this.index && this.index--;
    qs('.slider').style.transform = `translate3d(${this.index * -980}px,0,0)`
  }
  _nextSlide() {
    if (this.index + 1 >= qsa('.side_item_wrap').length) return;
    this.index++;
    qs('.slider').style.transform = `translate3d(${this.index * -980}px,0,0)`
  }

  render() {
    ajax('http://crong.codesquad.kr:8080/woowa/side', this.cbRenderByTemplate);
    qs('.slide_wrap').addEventListener('click', (e) => {
      e.preventDefault();
      qs('.slider').style.transform = 'translate3d(-980px,0,0)'
    })
  }
  cbRenderByTemplate(ajaxRequest) {
    qs('.slider').innerHTML = makeSliderTpl(ajaxRequest);
  }
}