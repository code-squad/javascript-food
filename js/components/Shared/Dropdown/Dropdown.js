import { qs, $on } from '../../../helper/helper.js';

export default class Dropdown {
  constructor(selector, triggerSelector) {
    this.dropdwonEl = qs(selector);
    this.showState = false;
    this.setDisplay();
    if(triggerSelector){
      this.bindEvents(qs(triggerSelector))
    }
  }

  render(template, data) {
    this.dropdwonEl.innerHTML = template(data);
  }
  bindEvents(el){
    $on(el,'click',this.toggleShowState.bind(this));
  }
  toggleShowState(){
    this.showState = !this.showState;
    this.setDisplay()
  }
  setDisplay(){
    if(this.showState) this.dropdwonEl.style.display = "block"
    else this.dropdwonEl.style.display = "none"
  }
}
