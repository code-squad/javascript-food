/* Entry Point */

import { navItemList } from "./Model/data/navData.js";
import { apiUrl } from "./model/data/apiUrl.js";
import { slideMenuData } from './Model/data/slideMenuData.js';
import LocalStorage from './Model/localStroage.js';

import Header from "./View/Header.js";
import BestMenu from "./View/BestMenu.js";
import Promotion from './View/Promotion.js'
import Slider from './View/Slider.js';
import ScrollBtn from './View/ScrollBtn.js'
import AutoComplete from "./View/AutoComplete.js";


import { bestMenuItemTpl } from "./templates/bestMenuTpl.js";
import { slideTpl } from './templates/slideMenuTpl.js'
import { scrollBtnTpl } from './templates/scrollBtnTpl.js'
import { navTpl } from './templates/navTpl.js'
import { autoCompleteItemTpl, recentDataTpl } from './templates/autoCompleteTpl.js'

import { RequestAnimations } from './Util/raf.js'

const header = new Header(navItemList, navTpl);
const autoComplete = new AutoComplete({
  apiUrl: apiUrl.autoComplete,
  storage: new LocalStorage(),
  autoCompleteItemTpl: autoCompleteItemTpl,
  recentDataTpl: recentDataTpl
});
const bestMenu = new BestMenu(apiUrl.bestMenu, bestMenuItemTpl);
const promotion = new Promotion(RequestAnimations);
const scrollBtn = new ScrollBtn(
  { scrollBtnTpl: scrollBtnTpl, className: 'scroll_btn_box', speed: 1000 });

const sideMenuSlide = new Slider({
  category: 'side', apiUrl: apiUrl.sideMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

const mainMenuSlide = new Slider({
  category: 'main', apiUrl: apiUrl.mainMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

const courseMenuSlide = new Slider({
  category: 'course', apiUrl: apiUrl.courseMenu, tpl: slideTpl, slideMenuData: slideMenuData
});

document.addEventListener("DOMContentLoaded", () => {
  header.init();
  autoComplete.init();
  bestMenu.init();
  promotion.init();
  sideMenuSlide.init();
  mainMenuSlide.init();
  courseMenuSlide.init();
  scrollBtn.init();
});