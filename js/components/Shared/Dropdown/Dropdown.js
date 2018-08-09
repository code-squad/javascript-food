import { qs, $on } from "../../../helper/helper.js";

export default class Dropdown {
  constructor(dropdownSelector, triggerSelector, dropdwonController) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
    this.dropdwonController = dropdwonController;
  }
  bindEvents(el) {
    $on(el, "click", () => this.dropdwonController.subscribe(this.dropdwonEl));
    $on(el, "click", ()=> this.toggleDisplay());
  }
  toggleDisplay() {   
    const isShow = this.dropdwonEl.dataset.show === "show";
    if (isShow){
      this.dropdwonEl.classList.remove('show');
      this.dropdwonEl.dataset.show = "hide";
    } 
    else{
      this.dropdwonEl.classList.add('show')
      this.dropdwonEl.dataset.show = "show";
    } 
  }
}
