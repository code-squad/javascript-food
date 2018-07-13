import { qs } from '../../../helper/helper.js';

export default class Dropdown {
  constructor(selector) {
    this.dropdwonEl = qs(selector);
  }

  render(template, data) {
    this.dropdwonEl.innerHTML = template(data);
  }
}
