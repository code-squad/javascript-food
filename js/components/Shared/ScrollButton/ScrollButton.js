import { qs,  $on } from '../../../helper/helper.js';
import animation from '../../../helper/animation/raf.js';
export default class ScrollButton {
  constructor(scrollBtnSelector, speed = 2) {
    this.scrollBtnListEl = qs(scrollBtnSelector);
    this.bindEvents();
    this.speed = speed;
  }
  bindEvents(){
    $on(this.scrollBtnListEl,'click', ({target})=>this.handleScrollBtnClicked(target))
    $on(window, 'scroll', ()=> this.handleShowScrollBtn())
  }
  handleShowScrollBtn(boundary = 30){
    let type = ""
    if(window.scrollY>boundary) type="remove";
    else type="add";
    this.scrollBtnListEl.classList[type]('hide')
  }
  handleScrollBtnClicked({dataset: {id}}){
    if(!this.checkBtn(id)) return;
    return this.handleUpDown(id);
  }
  checkBtn(direction){
    if(direction==='up'|| direction==='down') return true;
    else false;
  }
  handleUpDown(id){
    const animationType = id==='up' ? 'scrollTop' : 'scrollBottom';
    const destination = id==='up' ? 0 : document.body.offsetHeight
    animation[animationType](window, destination, this.speed);
  } 
}
