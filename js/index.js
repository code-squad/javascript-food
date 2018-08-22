// model
import {Model} from "./model.js";
// view
import {MenuNavigation} from "./menuNavigation.js";
import {BestDishesNavigation} from './bestDishesNavigation.js';
import {BestDishesView} from './bestDishesView.js';
import {r_NavigatorStyleSceneChange} from './raf.js';
import {t_NavigatorStyleSceneChange} from './transition.js';
import {SlideStyleSceneChange} from './slideStyleSceneChange.js';
// controller
import {Controller} from "./controller.js";

import {Template} from './template.js';
import {menuData} from './data.js';
import {fade, slide} from './animation.js';



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

const ad = new t_NavigatorStyleSceneChange({
  sceneList: document.querySelectorAll('.ad_img'),
  leftButton: document.querySelector('.ad_left_button'),
  rightButton: document.querySelector('.ad_right_button'),
  leftAnimation: {in: 'fade_in', out: 'fade_out'},
  rightAnimation: {in: 'fade_in', out: 'fade_out'},
  navigatorWrap: document.querySelector('.ad_navigator_wrap'),
  navigatorButtonTemplate: new Template().adNavigatorButton,
  activeNavigatorButtonStyle: 'active_ad_navigator_button'
})

ad.init();

const newDishes = new r_NavigatorStyleSceneChange({
  sceneList: document.querySelectorAll('.new_dishes_img'),
  leftButton: document.querySelector('.new_dishes > .notice_left_button'),
  rightButton: document.querySelector('.new_dishes > .notice_right_button'),
  leftAnimation: slide({speed: 0.9, type: 'left'}),
  rightAnimation: slide({speed: 0.9, type: 'right'}),
  navigatorWrap: document.querySelector('.new_dishes > .notice_navigator_wrap'),
  navigatorButtonTemplate: new Template().noticeNavigatorButton,
  activeNavigatorButtonStyle: 'active_notice_navigator_button'
})

newDishes.init();

const deliverySystem = new r_NavigatorStyleSceneChange({
  sceneList: document.querySelectorAll('.delivery_system_img'),
  leftButton: document.querySelector('.delivery_system > .notice_left_button'),
  rightButton: document.querySelector('.delivery_system > .notice_right_button'),
  leftAnimation: slide({speed: 0.9, type: 'left'}),
  rightAnimation: slide({speed: 0.9, type: 'right'}),
  navigatorWrap: document.querySelector('.delivery_system > .notice_navigator_wrap'),
  navigatorButtonTemplate: new Template().noticeNavigatorButton,
  activeNavigatorButtonStyle: 'active_notice_navigator_button'
})

deliverySystem.init();

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

const sideDishes = new SlideStyleSceneChange({
  wrapper: document.querySelector('.side_dishes .main_section_list'),
  leftButton: document.querySelector('.side_dishes .main_section_left_button'),
  rightButton: document.querySelector('.side_dishes .main_section_right_button'),
  SceneTemplate: new Template().mainSectionListItem,
  uri: 'http://crong.codesquad.kr:8080/woowa/side',
  ajax: ajax,
  animationDuration: 0.5
})

sideDishes.registerAllEventListener();