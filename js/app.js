import { $on, qs } from './helper/helper.js';
import { userMenuLinkText, mainMenuLinkText, specialMenuLinkText } from '../assets/data/menuLinkText.js';
import { textLinkTemplate, specialMenuTemplate } from '../template/linkListTemplate.js';
class ListItems {
  constructor(selector) {
    this.ListItemsEl = qs(selector);
  }

  render(template, data) {
    this.ListItemsEl.innerHTML = template(data);
  }
}

const userMenuListEl = new ListItems('.header__user-menu-list');
const specialMenuListEL = new ListItems('.header__body-special-menu');
const mainMenuListEl = new ListItems('.header__main-menu-list');

$on(document, 'DOMContentLoaded', () => {
  userMenuListEl.render(textLinkTemplate, userMenuLinkText);
  mainMenuListEl.render(textLinkTemplate, mainMenuLinkText);
  specialMenuListEL.render(specialMenuTemplate, specialMenuLinkText);
});
