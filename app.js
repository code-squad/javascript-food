// IMPORT
import { MenuManager } from "./js/MenuManager.js";
import { BestDishesView } from "./js/BestDishesView.js";
import { MainBannerSlider } from "./js/MainBannerSlider.js";

// Variable
const mainNaviElement = document.querySelector(".main_navi");

// RUN
function loadHandler() {
  const menuManager = new MenuManager(mainNaviElement);
  const bestDishesView = new BestDishesView();
  const mainBannerSlider = new MainBannerSlider();

  menuManager.setHoverToMainMenu();
  bestDishesView.request("http://crong.codesquad.kr:8080/woowa/best");
  bestDishesView.addClickEvent();
  mainBannerSlider.run();
}

document.addEventListener("DOMContentLoaded", loadHandler);
console.log("Success APP JS");
