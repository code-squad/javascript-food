import { qs } from '../../helper/helper.js';
export default class Tab {
  constructor(selector) {
    this.TabButtonsEl = qs(selector);
  }

  render(template, data) {
    this.TabButtonsEl.innerHTML = template(data);
  }
}