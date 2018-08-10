import { qs,  $on } from '../../../helper/helper.js';
import { scrollBtnTemplate } from './template/ScrollButtonTemplate.js';

export default class ScrollButton {
  constructor(scrollBtnSelector) {
    this.scrollBtnListEl = qs(scrollBtnSelector);
    this.init()
  }
  init(){
    this.render();
  }
  render(){
    this.scrollBtnListEl.innerHTML = scrollBtnTemplate;
  }
}
