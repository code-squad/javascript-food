import { qs, $on } from "../../helper/helper.js";

export default class Dropdown {
  constructor(selector, triggerSelector) {
    this.dropdwonEl = qs(selector);
    this.bindEvents(qs(triggerSelector));
    this.dropdwonEl.style.visibility = "hidden";
  }

  render(template, data) {
    this.dropdwonEl.innerHTML = template(data);
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
