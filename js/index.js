import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";
import {Template} from './template.js';
import {menuData} from './data.js';
import {BestDishesNavigation} from './bestDishesNavigation.js';
import {BestDishesView} from './bestDishesView.js';

const model = new Model();

const menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: new Template().menuNavigation
})

menuNavigation.render(menuData);

const bestDishesNavigation = new BestDishesNavigation({
  bestDishesNavigation: document.querySelector('.best_dishes_nav')
})

bestDishesNavigation.init();

const bestDishesView = new BestDishesView({
  bestDishesView: document.querySelector('.best_dishes_wrap'),
  template: new Template().bestDishesView
});

const controller = new Controller({
  model: model,
  view: {
    bestDishesNavigation: bestDishesNavigation,
    bestDishesView: bestDishesView
  },
  baseURI: 'http://crong.codesquad.kr:8080/woowa'
});

controller.init();