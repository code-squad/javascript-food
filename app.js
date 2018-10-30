// IMPORT
import { MenuManager } from './js/MenuManager.js';
import { BestDishesView } from './js/BestDishesView.js';

// Variable
const mainNaviElement = document.querySelector('.main_navi');

// RUN
function loadHandler() {

    const menuManager = new MenuManager(mainNaviElement);
    const bestDishesView = new BestDishesView();

    menuManager.setHoverToMainMenu();
    bestDishesView.request("http://crong.codesquad.kr:8080/woowa/best");
    bestDishesView.addClickEvent();

}

document.addEventListener('DOMContentLoaded', loadHandler);
console.log("Success APP JS");