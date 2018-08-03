import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";
import {Template} from './template.js';
import {menuData} from './data.js';
import {BestDishesNavigation} from './bestDishesNavigation.js';
import {BestDishesView} from './bestDishesView.js';

const template = new Template();

const model = new Model();

const menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: template
})

menuNavigation.render(menuData);

const bestDishesNavigation = new BestDishesNavigation({
  bestDishesNavigation: document.querySelector('.best_dishes_nav')
})

const bestDishesView = new BestDishesView({
  bestDishesView: document.querySelector('.best_dishes')
});

const controller = new Controller({
  model: model,
  view: {
    bestDishesNavigation: bestDishesNavigation,
    bestDishesView: bestDishesView
  }
});

controller.init();