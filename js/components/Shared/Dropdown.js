import { qs, $on, renderer } from "../../helper/helper.js";

export default class Dropdown {
  constructor({ dropdownSelector, triggerSelector, dropdownTemplate, templateData }) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
    this.init({ selector: dropdownSelector, template: dropdownTemplate, data: templateData });
  }
  init(...initData) {
    this.dropdwonEl.style.visibility = "hidden";
    renderer(...initData);
  }
  bindEvents(el) {
    $on(el, "click", this.toggleDisplay.bind(this));
  }
  toggleDisplay() {
    const visibility = this.dropdwonEl.style.visibility === "visible";
    if (visibility) this.dropdwonEl.style.visibility = "hidden";
    else this.dropdwonEl.style.visibility = "visible";
  }
}
