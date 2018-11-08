import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";

export default class SideMenu {
  constructor(makeSideMenuTpl, makeSliderTpl) {
    this.makeSideMenuTpl = makeSideMenuTpl;
    this.makeSliderTpl = makeSliderTpl;
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
    qs('main').innerHTML += this.makeSideMenuTpl();
    ajax('http://crong.codesquad.kr:8080/woowa/side', this.cbRenderByTemplate.bind(this));
  }

  cbRenderByTemplate(ajaxRequest) {
    console.log(ajaxRequest);
    qs('.slider').innerHTML += this.makeSliderTpl(ajaxRequest); // API에 메뉴가 8개라 3번 호출
    qs('.slider').innerHTML += this.makeSliderTpl(ajaxRequest);
    qs('.slider').innerHTML += this.makeSliderTpl(ajaxRequest);
  }
}