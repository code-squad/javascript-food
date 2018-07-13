import { $on, qs } from './helper/helper.js';

import { userMenuLinkText, mainMenuLinkText, specialMenuLinkText } from '../assets/data/menuLinkText.js';
import { appDownLoad } from '../assets/data/dropdownText.js';

import { textLinkTemplate, specialMenuTemplate } from '../template/linkListTemplate.js';
import { dropdownTemplate } from '../template/dropdownTemplate.js';

import ListItems from '../js/components/Shared/ListItems/ListItems.js';
import Dropdown from '../js/components/Shared/Dropdown/Dropdown.js';


const userMenuListEl = new ListItems('.header__user-menu-list');
const specialMenuListEL = new ListItems('.header__body-special-menu');
const mainMenuListEl = new ListItems('.header__main-menu-list');
// dropdown
const appDownLoadEl = new Dropdown('.dropdown-download');

$on(document, 'DOMContentLoaded', () => {
  userMenuListEl.render(textLinkTemplate, userMenuLinkText);
  mainMenuListEl.render(textLinkTemplate, mainMenuLinkText);
  specialMenuListEL.render(specialMenuTemplate, specialMenuLinkText);
  appDownLoadEl.render(dropdownTemplate, appDownLoad);
});
