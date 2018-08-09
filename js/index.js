// model
import {Model} from "./model.js";
// view
import {MenuNavigation} from "./menuNavigation.js";
import {BestDishesNavigation} from './bestDishesNavigation.js';
import {BestDishesView} from './bestDishesView.js';
import {SceneChange} from './sceneChange.js';
// controller
import {Controller} from "./controller.js";

import {Template} from './template.js';
import {menuData} from './data.js';
import {fade, slide} from './raf.js';



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

const ad = new SceneChange({
  sceneList: document.querySelectorAll('.ad_img'), 
  leftButton: document.querySelector('.ad_left_button'),
  rightButton: document.querySelector('.ad_right_button'),
  indexButton: {
    wrap: document.querySelector('.ad_index_button_wrap'),
    template: new Template().adIndexButton,
    activeButtonStyle: 'active_index_button'
  },
  effect: fade,
  speed: 0.03
})

ad.init();

const newDishes = new SceneChange({
  sceneList: document.querySelectorAll('.new_dishes_img'), 
  leftButton: document.querySelector('.new_dishes > .notice_left_button'),
  rightButton: document.querySelector('.new_dishes > .notice_right_button'),
  indexButton: {
    wrap: document.querySelector('.new_dishes > .notice_index_button_wrap'),
    template: new Template().noticeIndexButton,
    activeButtonStyle: 'active_notice_index_button'
  },
  effect: slide,
  speed: 0.9
})

newDishes.init();

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