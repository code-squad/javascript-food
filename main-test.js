const mainNaviElement = document.querySelector('.main_navi');
const mainMenuElement = document.querySelector(".main_navi_list");

let currentTarget;
let currentParentElement;
let currentListElement;

mainMenuElement.addEventListener('mouseover', (evt) => {
    const target = evt.target;
    if (target.nodeName === 'DIV') {
        if (currentTarget && target != currentTarget) {
            this.updateElementDisplayProperty(currentParentElement.lastElementChild, 'none');
        }

        currentTarget = target;
        currentParentElement = target.parentElement;
        currentListElement = currentParentElement.lastElementChild;
        
        this.updateElementDisplayProperty(currentListElement, 'block');
    }
});

mainNaviElement.addEventListener('mouseleave', () => {
    this.updateElementDisplayProperty(currentListElement, 'none');
})

function updateElementDisplayProperty(element, type) {
    element.style.display = type;
}