import { qs, $on, renderer } from "../../helper/helper.js";

export default class Dropdown {
  constructor(dropdownSelector, triggerSelector) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
  }
  bindEvents(el) {
    $on(el, "click", this.toggleDisplay.bind(this));
  }
  toggleDisplay() {
    const isblock = this.dropdwonEl.style.display === "block";
    if (isblock) this.dropdwonEl.style.display = "none";
    else this.dropdwonEl.style.display = "block";
  }
}
