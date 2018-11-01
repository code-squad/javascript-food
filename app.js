// IMPORT
import {
  MenuManager
} from "./js/MenuManager.js";
import {
  BestDishesView
} from "./js/BestDishesView.js";
import {
  MainBannerSlider
} from "./js/Transition.js";
import {
  RequestAnimationFrame
} from "./js/raf.js";
import {
  Model
} from './js/Model.js';
import {
  View
} from './js/View.js';
import {
  ViewModel
} from './js/ViewModel.js';

// Variable
const mainNaviElement = document.querySelector(".main_navi");

// RUN
function loadHandler() {
  const model = new Model();
  const menuManager = new MenuManager(mainNaviElement);
  const bestDishesView = new BestDishesView();
  const mainBannerSlider = new MainBannerSlider(model); // transition
  const raf = new RequestAnimationFrame(model);

  // slides_pagination MVVM
  const viewModel = new ViewModel(model);
  const view = new View(model, viewModel);


  menuManager.setHoverToMainMenu();
  bestDishesView.request("http://crong.codesquad.kr:8080/woowa/best");
  bestDishesView.addClickEvent();
  mainBannerSlider.run();
  // raf.run();
  view.run();
}

document.addEventListener("DOMContentLoaded", loadHandler);
console.log("Success APP JS");