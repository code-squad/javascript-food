import { qs,  $on } from '../../../helper/helper.js';
import animation from '../../../helper/animation/raf.js';
export default class ScrollButton {
  constructor(scrollBtnSelector) {
    this.scrollBtnListEl = qs(scrollBtnSelector);
    this.bindEvents();
  }
  bindEvents(){
    $on(this.scrollBtnListEl,'click', (e)=>this.handleScrollBtnClicked(e))
  }
  handleScrollBtnClicked(e){
    if(!this.checkBtn(e.target)) return;
    const action = e.target.dataset.id 
    if(action==='up') return this.handleUpBtnClicked()
    else return this.handleDownBtnClicked()
  }
  checkBtn(target){
    if(target.dataset.id==='up'||target.dataset.id==='down') return true;
    else false;
  }
  handleUpBtnClicked(){
    animation.scrollTop(window, 0);
  }
  handleDownBtnClicked(){
    animation.scrollBottom(window, document.body.offsetHeight);
  }
 
}
