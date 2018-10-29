// IMPORT
import { MenuManager } from './js/MenuManager.js';
import { BestDishesView } from './js/BestDishesView.js';

// Variable
const mainNaviElement = document.querySelector('.main_navi');

// RUN
function loadHandler() {

    const menuManager = new MenuManager(mainNaviElement);
    const bestDishesView = new BestDishesView();

    menuManager.hover();
    bestDishesView.request();
    bestDishesView.addClickEvent();

}

document.addEventListener('DOMContentLoaded', loadHandler);
console.log("Success APP JS");