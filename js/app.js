import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { menuList } from "./Model/data/menuListData.js";
import { apiUrl } from "./model/data/apiUrl.js";

import { NavModel } from "./Model/navModel.js";
import { MainModel } from "./Model/mainModel.js";

import Nav from "./View/Nav.js";
import BestMenu from "./View/BestMenu.js";

const navModel = new NavModel(navItemList);
const mainModel = new MainModel(menuList);
const nav = new Nav();
const bestMenu = new BestMenu();

const engine = new Engine(nav, navModel, bestMenu, mainModel, apiUrl);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));