// Prototype Design Pattern
function MenuManager(element) {
    this.menuElement = element;
    this.mainMenuSubListElement = selectByNodeName(element, 'UL');
    this.mainNaviItemElement = selectByNodeName(element, 'DIV');
    this.mainNaviTextElement = selectByNodeName(this.mainNaviItemElement, 'P');
}

MenuManager.prototype = {

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

function MenuListManager(element) {
    this.menuListLiElements = selectByNodeName(element, 'LI');
}

MenuListManager.prototype = {

    hover: function() {
        this.menuListLiElements.forEach((element) => {
            const aElement = selectByNodeName(element, 'A');
            const spanElement = selectByNodeName(aElement, 'SPAN');
            this.mouseOver(spanElement);
            this.mouseOut(spanElement);
        });
    },

    // mouseOver 인데 이벤트 전파가 왜 안되는지 모르겠음
    mouseOver: function(element) {
        element.addEventListener('mouseover', () => {
            updateElementTextSize(element, "16px");
            updateElementTextDecoration(element, "underline");
            updateElementTextColor(element, "#2AC1BC");
        }, false);
    },

    mouseOut: function(element) {
        element.addEventListener('mouseout', () => {
            updateElementTextSize(element, '14px');
            updateElementTextDecoration(element, 'none');
            updateElementTextColor(element, "#555");
        })
    }

}




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

function updateElementTextSize(element, sizeData) {
    element.style.fontSize = sizeData;
}

function updateElementTextDecoration(element, type) {
    element.style.textDecoration = type;
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
    const menuManager = new MenuManager(element);
    menuManager.hover();
});

const mainNaviMenuListUlElements = document.querySelectorAll('.main-navi-sub-list');
mainNaviMenuListUlElements.forEach((element) => {
    const menuListManager = new MenuListManager(element);
    menuListManager.hover();
});

// Log
console.log("Success load main.js");
