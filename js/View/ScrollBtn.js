import { qs, qsa, $on, ajax } from "../../js/Util/helper.js";
import { RequestAnimations } from '../Util/raf.js'

export default class ScrollBtn {
  constructor({ scrollBtnTpl, className, speed, leftValue, topValue }) {
    this.scrollBtnTpl = scrollBtnTpl;
    this.className = className;
    this.speed = speed;
    this.leftValue = leftValue;
    this.topValue = topValue;
  }
  init() {
    this.render();
    this.registScrollEvent();
  }

  render() {
    const scrollNode = document.createElement('div');
    scrollNode.classList.add(this.className);
    scrollNode.innerHTML = this.scrollBtnTpl;
    this.setCoordiantes(scrollNode, this.leftValue, this.topValue);
    document.body.appendChild(scrollNode);
  }

  setCoordiantes(node, top = "500px", left = "1180px") {
    node.style.top = top;
    node.style.left = left;
  }

  registScrollEvent() {
    $on(qs(`.${this.className}`), 'click', e => {
      e.preventDefault();
      if (e.target.className.match(/down/g)) RequestAnimations.scrollDown(e.pageY - e.clientY, document.body.offsetHeight, this.speed);
      if (e.target.className.match(/up/g)) RequestAnimations.scrollUp(e.pageY - e.clientY, 0, this.speed);
    })
  }
}