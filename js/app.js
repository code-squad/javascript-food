/* Entry Point */

import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { apiUrl } from "./model/data/apiUrl.js";

import { NavModel } from "./Model/navModel.js";

import Nav from "./View/Nav.js";
import BestMenu from "./View/BestMenu.js";
import Promotion from './View/Promotion.js'
// import SideMenu from "./View/SideMenu.js";
import Slider from './View/Slider.js';

import { bestMenuItemTpl } from "./templates/bestMenuTpl.js";
// import { makeSlideWrapTpl, makeSlideItemTpl } from './templates/sideMenuTpl.js';
import { slideTpl } from './templates/sideMenuTpl.js'

import { RequestAnimations } from './Util/raf.js'

const navModel = new NavModel(navItemList);

const nav = new Nav();
const bestMenu = new BestMenu(apiUrl.bestMenu, bestMenuItemTpl);
const promotion = new Promotion(RequestAnimations);
// const sideMenu = new SideMenu(makeSideMenuTpl, makeSliderTpl);
const sideMenuSlide = new Slider({
  number: 0,
  id: 'side',
  title: '밑반찬',
  subtitle: '언제 먹어도 든든한 반찬',
  apiUrl: apiUrl.sideMenu,
  tpl: slideTpl
});

const mainMenuSlide = new Slider({
  number: 1,
  id: 'main',
  title: '메인반찬',
  subtitle: '담기만 하면 완성되는 메인반찬',
  apiUrl: "http://crong.codesquad.kr:8080/woowa/main",
  tpl: slideTpl
});

const courseMenuSlide = new Slider({
  number: 2,
  id: 'course',
  title: '일품요리',
  subtitle: '담기만 하면 완성되는 메인반찬',
  apiUrl: "http://crong.codesquad.kr:8080/woowa/course",
  tpl: slideTpl
});

const engine = new Engine(
  nav, navModel, bestMenu, promotion, sideMenuSlide, mainMenuSlide, courseMenuSlide, apiUrl);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));