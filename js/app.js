/* Entry Point */

import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { menuList } from "./Model/data/menuListData.js";
import { apiUrl } from "./model/data/apiUrl.js";

import { NavModel } from "./Model/navModel.js";
import { MainModel } from "./Model/mainModel.js";

import Nav from "./View/Nav.js";
import BestMenu from "./View/BestMenu.js";
import Promotion from './View/Promotion.js'
import SideMenu from "./View/SideMenu.js";

import { RequestAnimations } from './Util/raf.js'

const navModel = new NavModel(navItemList);
const mainModel = new MainModel(menuList);

const nav = new Nav();
const bestMenu = new BestMenu();
const promotion = new Promotion(RequestAnimations);
const sideMenu = new SideMenu();

const engine = new Engine(nav, navModel, bestMenu, mainModel, promotion, sideMenu, apiUrl);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));