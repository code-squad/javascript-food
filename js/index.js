// model
import {Model} from "./model.js";
// view
import {MenuNavigation} from "./menuNavigation.js";
import {BestDishesNavigation} from './bestDishesNavigation.js';
import {BestDishesView} from './bestDishesView.js';
// controller
import {Controller} from "./controller.js";

import {Template} from './template.js';
import {menuData} from './data.js';



const ajax = function({uri, callback}) {
  const x = new XMLHttpRequest();
  x.addEventListener('load', () => {
    callback(JSON.parse(x.response));
  });
  x.open('GET', uri);
  x.send();
}

// model
const model = new Model();

// view
const menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: new Template().menuNavigation
})


const bestDishesNavigation = new BestDishesNavigation({
  bestDishesNavigation: document.querySelector('.best_dishes_nav')
})

const bestDishesView = new BestDishesView({
  bestDishesView: document.querySelector('.best_dishes_wrap'),
  template: new Template().bestDishesView,
  ajax: ajax,
  baseURI: 'http://crong.codesquad.kr:8080/woowa/best/'
});

// controller
const controller = new Controller({
  model: model,
  view: {
    menuNavigation,
    bestDishesNavigation,
    bestDishesView
  }
});

controller.init({menuData});