// Prototype Design Pattern
function Menu(element) {
    this.menuElement = element;
    this.mainMenuSubListElement = selectByNodeName(element, 'UL');
    this.mainNaviItemElement = selectByNodeName(element, 'DIV');
    this.mainNaviTextElement = selectByNodeName(
        this.mainNaviItemElement, 'P'
    );
}

function MenuListItem(element) {
    
}

Menu.prototype = {

    hover: function() {
        this.mouseOver();
        this.mouseOut();
        this.mouseenter();
        this.mouseleave();
    },

    mouseOver: function() {
        this.menuElement.addEventListener('mouseover', () => {
            updateElementDisplayProperty(this.mainMenuSubListElement, 'block');
            updateElementBackgroundColor(this.menuElement, 'WHITE');
        });
    },

    mouseOut: function() {
        this.menuElement.addEventListener('mouseout', () => {
            updateElementDisplayProperty(this.mainMenuSubListElement, 'none');
            updateElementBackgroundColor(this.menuElement, '#473F36');
        });
    },

    mouseenter: function() {
        this.menuElement.addEventListener('mouseenter', () => {
            updateElementTextColor(this.mainNaviTextElement, '#2AC1BC');
            updateELementBorder(this.mainNaviItemElement, "1px solid BLACK");
            this.menuElement.borderBottom = "";
        });
    },

    mouseleave: function() {
        this.menuElement.addEventListener('mouseleave', () => {
            updateElementTextColor(this.mainNaviTextElement, 'WHITE');
            updateELementBorder(this.mainNaviItemElement, 'NONE');
        })
    }
};




// Util Function
function getChildNodes(element) {
    return element.childNodes;
}

function updateElementDisplayProperty(element, property) {
    element.style.display = property;
}

function updateElementBackgroundColor(element, colorData) {
    element.style.backgroundColor = colorData;
}

function updateElementTextColor(element, colorData) {
    element.style.color = colorData;
}

function updateELementBorder(element, borderData) {
    element.style.border = borderData;
}

function selectByNodeName(parentNode, tagName) {
    const selectedNodes = [];
    const childNodes = this.getChildNodes(parentNode);

    childNodes.forEach((elem) => {
        if (elem.nodeName === tagName)
            selectedNodes.push(elem);
    });

    return (selectedNodes.length === 1) ? selectedNodes[0] : selectedNodes;
}

// Main
const mainNaviListElement = document.querySelector('.main_navi_list');
const mainNaviMenuElements = this.selectByNodeName(
        mainNaviListElement,
        'LI'
    );

mainNaviMenuElements.forEach((element) => {
    const menu = new Menu(element);
    menu.hover();
});

// Log
console.log("Success load main.js");
