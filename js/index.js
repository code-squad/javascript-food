import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";
import {Template} from './template.js';
import {menuData} from './data.js';

const template = new Template();

const model = new Model();

const menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: template
})

menuNavigation.render(menuData);

const controller = new Controller({
  model: model,
  view: menuNavigation
});