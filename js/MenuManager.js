import { Utility as util } from './util.js';

class MenuManager {
    constructor(element) {
        this.element = element;
        this.currentElement = {
            'target' : "",
            'parent' : "",
            'list' : "",
        };

        console.log("menu-manager enter constructor");
    }

    getCurrentElement() {
        return this.currentElement;
    }

    setCurrentElements(object) {
        this.currentElement.target = object.target;
        this.currentElement.parent = object.parent;
        this.currentElement.list = object.list;
    }

    hover() {
        this.mouseOver(this.element);
        this.mouseLeave(this.element);
    }

    mouseOver(element) {
        element.addEventListener('mouseover', (evt) => {
            const target = evt.target;
            this.actionShowMainSubMenuList(target);
            this.showMainMenuHighlight(this.currentElement.target);
        });
    }

    mouseLeave(element) {
        element.addEventListener('mouseleave', () => {
            this.hideMainMenuSubList(this.currentElement.list);
            this.hideMainMenuHighlight(this.currentElement.target);
        });
    }

    actionShowMainSubMenuList(element) {
        if (element.nodeName != 'DIV') return;

        const currentTarget = this.currentElement.target;

        if (currentTarget && element != currentTarget) {
            this.hideMainMenuSubList(this.currentElement.list);
            this.hideMainMenuHighlight(currentTarget);
        }

        this.setCurrentElements({
            'target' : element,
            'parent' : element.parentElement,
            'list' : element.parentElement.lastElementChild,
        });

        this.showMainMenuSubList(this.currentElement.list);
    }

    showMainMenuHighlight(element) {
        util.setCSS(element, 'backgroundColor', 'WHITE');
        util.setCSS(element, 'border', '1px solid BLACK');
        util.setCSS(element.firstElementChild, 'textColor', "#2AC1BC");
    }
    
    hideMainMenuHighlight(element) {
        util.setCSS(element, 'backgroundColor', '#473F36');
        util.setCSS(element, 'border', 'NONE');
        util.setCSS(element.firstElementChild, 'textColor', 'WHITE');
    }

    showMainMenuSubList(element) {        
        util.setCSS(element, 'displayProperty', 'BLOCK');
    }

    hideMainMenuSubList(element) {
        util.setCSS(element, 'displayProperty', 'NONE');
    }

    removeTabMenuStyle() {
        const foodTabListElements = document.querySelectorAll('.food_tab_list > li');
        
        foodTabListElements.forEach((element) => {
            util.setCSS(element, 'backgroundColor', 'WHITE');
            util.setCSS(element, 'fontWeight', 'NORMAL');
            util.setCSS(element, 'textColor', '#777');
        });
    }
    
    hideAllBestDishesContainer() {
        const bestSideDishesElements = document.querySelectorAll('.best_food_list');
    
        bestSideDishesElements.forEach(element => {
            util.setCSS(element, 'displayProperty', 'NONE');
        });
    }

}

export { MenuManager }