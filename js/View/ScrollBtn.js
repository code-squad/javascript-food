import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";
import { RequestAnimations } from '../Util/raf.js'

export default class ScrollBtn {
  constructor() {
    this.registScrollEvent();
  }
  registScrollEvent() {
    $on(qs('.scroll_btn_box'), 'click', e => {
      e.preventDefault();
      if (e.target.className === 'scroll_down_btn') RequestAnimations.scrollDown(e.layerY, document.body.offsetHeight, 100);
      if (e.target.className === 'scroll_up_btn') RequestAnimations.scrollUp(e.layerY, 0, 100);
    })
  }
}