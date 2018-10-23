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
            this.showMenuAction(target);
        });
    },

    mouseLeave: function(element) {
        element.addEventListener('mouseleave', () => {
            this.hideMenu(this.getCurrentElement().list);
        });
    },
    
    showMenuAction: function(element) {
        if (element.nodeName != 'DIV') return;

        const currentTarget = this.getCurrentElement().target;

        if (currentTarget && element != currentTarget)
            this.hideMenu(this.getCurrentElement().list);

        this.setCurrentElements({
            'target' : element,
            'parent' : element.parentElement,
            'list' : element.parentElement.lastElementChild,
        });

        this.showMenu(this.getCurrentElement().list);
    }, 

    showMenu: function(element) {        
        updateElementDisplayProperty(element, 'block');
    },

    hideMenu: function(element) {
        updateElementDisplayProperty(element, 'none');
    },

}

function updateElementDisplayProperty(element, type) {
    element.style.display = type;
}

const mainNaviElement = document.querySelector('.main_navi'); 

const menuLayoutManager = new MenuLayoutManager(mainNaviElement);
menuLayoutManager.hover();