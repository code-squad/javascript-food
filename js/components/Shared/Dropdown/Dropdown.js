import { qs, $on } from '../../../helper/helper.js';

export default class Dropdown {
  constructor(dropdownSelector, triggerSelector, dropdwonController) {
    this.dropdwonEl = qs(dropdownSelector);
    this.bindEvents(qs(triggerSelector));
    this.dropdwonController = dropdwonController;
  }
  bindEvents(el) {
    $on(el, 'click', () => this.dropdwonController.subscribe(this.dropdwonEl));
    $on(el, 'click', this.toggleDisplay.bind(this));
  }
  toggleDisplay() {
    const isblock = this.dropdwonEl.className === 'dropdown show';
    if (isblock) this.dropdwonEl.classList.remove('show');
    else this.dropdwonEl.classList.add('show');
  }
}
