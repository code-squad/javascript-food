import { qs } from '../../../helper/helper.js';
export default class ListItems {
  constructor(selector) {
    this.ListItemsEl = qs(selector);
  }

  render(template, data) {
    this.ListItemsEl.innerHTML = template(data);
  }
}
