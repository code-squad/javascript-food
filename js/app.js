import { Engine } from "./engine.js";

import { navItemList } from "./Model/data/navData.js";
import { menuList } from "./Model/data/menuListData.js";

import { NavModel } from "./Model/navModel.js";
import { MainModel } from "./Model/mainModel.js";

import Nav from "./View/Nav.js";
import Main from "./View/Main.js";

const navModel = new NavModel(navItemList);
const mainModel = new MainModel(menuList);
const nav = new Nav();
const main = new Main();

const engine = new Engine(nav, navModel, main, mainModel);

document.addEventListener("DOMContentLoaded", engine.start.bind(engine));
