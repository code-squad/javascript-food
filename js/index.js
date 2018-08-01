import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";
import {Template} from './template.js';

let template = new Template();

let model = new Model();

let menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: template
})

let controller = new Controller({
  model: model,
  view: menuNavigation
})