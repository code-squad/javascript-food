import { qsAll, $on } from "../../helper/helper.js";

export default class DropdownBox {
  constructor(dropdownSelector, triggerSelector) {
    this.dropdwonEl = qsAll(dropdownSelector);
    this.bindEvents(qsAll(triggerSelector));
  }
  bindEvents(elList) {
    [...elList].forEach(el => $on(el, "click", this.hideOtheDropdowns.bind(this)));
  }
  hideOtheDropdowns(e) {
    const id = e.target.id;
    const dropdownId = id.split("-trigger")[0];
    [...this.dropdwonEl].filter(el => el.id !== dropdownId).forEach(el => (el.style.display = "none"));
  }
}
