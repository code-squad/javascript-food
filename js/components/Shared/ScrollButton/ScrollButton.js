import { qs,  $on } from '../../../helper/helper.js';
import animation from '../../../helper/animation/raf.js';
export default class ScrollButton {
  constructor(scrollBtnSelector) {
    this.scrollBtnListEl = qs(scrollBtnSelector);
    this.bindEvents();
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
    if(id==='up') return this.handleUpBtnClicked()
    else return this.handleDownBtnClicked()
  }
  checkBtn(id){
    if(id==='up'|| id==='down') return true;
    else false;
  }
  handleUpBtnClicked(){
    animation.scrollTop(window, 0);
  }
  handleDownBtnClicked(){
    animation.scrollBottom(window, document.body.offsetHeight);
  }
 
}
