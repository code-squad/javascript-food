import { qs, $on } from "../../../helper/helper.js";

export default class Dropdown {
  constructor(dropdownSelector, triggerSelector, dropdwonController) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
    this.dropdwonController = dropdwonController;
  }
  bindEvents(el) {
    $on(el, "click", () => this.dropdwonController.subscribe(this.dropdwonEl));
    $on(el, "click", this.toggleDisplay.bind(this));
  }
  toggleDisplay() {   
    const isblock = this.dropdwonEl.style.display === "block";
    if (isblock) this.dropdwonEl.style.display = "none";
    else this.dropdwonEl.style.display = "block";
  }
}
