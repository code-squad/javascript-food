import { qs, $on } from "../../../helper/helper.js";

export default class Dropdown {
  constructor({dropdownSelector, triggerSelector, dropdownController}) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
    this.dropdownController = dropdownController;
  }
  bindEvents(el) {
    $on(el, "click", () => this.dropdownController.subscribe(this.dropdwonEl));
    $on(el, "click", ()=> this.toggleDisplay());
  }
  toggleDisplay() {   
    const isHide = this.dropdwonEl.className.indexOf('show')===-1
    if (isHide){
      this.dropdwonEl.classList.add('show');
    } 
    else{
      this.dropdwonEl.classList.remove('show')
    } 
  }
}
