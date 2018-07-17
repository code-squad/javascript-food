import { $on, qs, renderer } from './helper/helper.js';

import { userMenuLinkText, mainMenuLinkText, specialMenuLinkText } from '../assets/data/menuLinkText.js';
import { appDownLoad } from '../assets/data/dropdownText.js';

import { textLinkTemplate, specialMenuTemplate, mainMenuTemplate } from '../template/linkListTemplate.js';
import { dropdownTemplate } from '../template/dropdownTemplate.js';

import Dropdown from '../js/components/Shared/Dropdown.js';

// dropdown
const appDownLoadEl = new Dropdown('.dropdown-download', '#dropdown-download-trigger');

const renderDataList = [
  ['.header__user-menu-list', textLinkTemplate, userMenuLinkText],
  ['.header__main-menu-list', mainMenuTemplate, mainMenuLinkText],
  ['.header__body-special-menu', specialMenuTemplate, specialMenuLinkText],
];

$on(document, 'DOMContentLoaded', () => {
  renderDataList.forEach(v=>renderer(...v))
  // renderer('.header__user-menu-list', textLinkTemplate, userMenuLinkText);
  // renderer('.header__main-menu-list', mainMenuTemplate, mainMenuLinkText);
  // renderer('.header__body-special-menu', specialMenuTemplate, specialMenuLinkText);
  appDownLoadEl.render(dropdownTemplate, appDownLoad);
});
