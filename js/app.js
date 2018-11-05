/* Entry Point */

import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { apiUrl } from "./model/data/apiUrl.js";

import { NavModel } from "./Model/navModel.js";

import Nav from "./View/Nav.js";
import BestMenu from "./View/BestMenu.js";
import Promotion from './View/Promotion.js'
import SideMenu from "./View/SideMenu.js";

import { bestMenuItemTpl } from "./templates/bestMenuTpl.js";
import { makeSliderTpl } from './templates/sideMenuTpl.js';

import { RequestAnimations } from './Util/raf.js'

const navModel = new NavModel(navItemList);

const nav = new Nav();
const bestMenu = new BestMenu(bestMenuItemTpl);
const promotion = new Promotion(RequestAnimations);
const sideMenu = new SideMenu(makeSliderTpl);

const engine = new Engine(nav, navModel, bestMenu, promotion, sideMenu, apiUrl);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));