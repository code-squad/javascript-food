function MenuLayoutManager(element) {
    this.element = element;

    this.currentElement = {
        'target' : "",
        'parent' : "",
        'list' : "",
    };

    this.getCurrentElement = function() {
        return this.currentElement;
    };

    this.setCurrentElements = function(object) {
        this.currentElement.target = object.target;
        this.currentElement.parent = object.parent;
        this.currentElement.list = object.list;
    };
}

MenuLayoutManager.prototype = {

    hover: function() {
        this.mouseOver(this.element);
        this.mouseLeave(this.element);
    },

    mouseOver: function(element) {
        element.addEventListener('mouseover', (evt) => {
            const target = evt.target;
            this.actionShowMainSubMenuList(target);
            this.showMainMenuHighlight(this.getCurrentElement().target);
        });
    },

    mouseLeave: function(element) {
        element.addEventListener('mouseleave', () => {
            this.hideMainMenuSubList(this.getCurrentElement().list);
            this.hideMainMenuHighlight(this.getCurrentElement().target);
        });
    },
    
    actionShowMainSubMenuList: function(element) {
        if (element.nodeName != 'DIV') return;

        const currentTarget = this.getCurrentElement().target;

        if (currentTarget && element != currentTarget) {
            this.hideMainMenuSubList(this.getCurrentElement().list);
            this.hideMainMenuHighlight(currentTarget);
        }

        this.setCurrentElements({
            'target' : element,
            'parent' : element.parentElement,
            'list' : element.parentElement.lastElementChild,
        });

        this.showMainMenuSubList(this.getCurrentElement().list);
    },

    showMainMenuHighlight: function(element) {
        updateElementBackgroundColor(element, 'WHITE');
        updateElementBorder(element, '1px solid BLACK');
        updateElementTextColor(element.firstElementChild, "#2AC1BC");
    },

    hideMainMenuHighlight: function(element) {
        updateElementBackgroundColor(element, '#473F36');
        updateElementBorder(element, 'NONE');
        updateElementTextColor(element.firstElementChild, "WHITE");
    },

    showMainMenuSubList: function(element) {        
        updateElementDisplayProperty(element, 'BLOCK');
    },

    hideMainMenuSubList: function(element) {
        updateElementDisplayProperty(element, 'NONE');
    },

}

function updateElementBackgroundColor(element, colorData) {
    element.style.backgroundColor = colorData;
}

function updateElementDisplayProperty(element, type) {
    element.style.display = type;
}

function updateElementBorder(element, borderData) {
    element.style.border = borderData;
}

function updateElementTextColor(element, colorData) {
    element.style.color = colorData;
}

const mainNaviElement = document.querySelector('.main_navi');

const menuLayoutManager = new MenuLayoutManager(mainNaviElement);
menuLayoutManager.hover();

document.querySelector('.food_tab_list').addEventListener('click', (evt) => {
    const lastElementIndex = 1;
    
    this.removeTabMenuStyle();
    evt.target.style.backgroundColor = '#5FC8C6';
    evt.target.style.color = 'WHITE';
    evt.target.style.fontWeight = 'BOLD';

    this.hideAllBestDishesContainer();
    const targetId = evt.target.id;
    document.querySelectorAll(`#${targetId}`)[lastElementIndex].style.display = 'BLOCK';
});

function removeTabMenuStyle() {
    const foodTabListElements = document.querySelectorAll('.food_tab_list > li');
    
    foodTabListElements.forEach((element) => {
        element.style.backgroundColor = 'WHITE';
        element.style.fontWeight = 'NORMAL';
        element.style.color = '#777';
    });
}

function hideAllBestDishesContainer() {
    const bestSideDishesElements = document.querySelectorAll('.best_food_list');

    bestSideDishesElements.forEach(element => {
        element.style.display = 'NONE';
    });
}


