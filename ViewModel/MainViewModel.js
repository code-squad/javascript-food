/*
    1. VIEW 에서 Element 들을 찾고, ViewModel 의 메소드 들이 재사용 될 수 있도록 구성해야 할 듯 함
    2. ES6 Class 구조로 변경하면 좋을 듯 함
*/
const MainViewModel = (function() {
    const mainViewModel = function(model) {
        this.registerHoverEvent = function(viewElement) {
            const mainMenuSubListElements = this.selectByNodeName(viewElement, 'UL');
            const mainNaviItemElement = this.selectByNodeName(viewElement, 'DIV');
            const mainNaviTextElement = this.selectByNodeName(mainNaviItemElement, 'P');

            viewElement.addEventListener('mouseover', () => {
                this.updateElementDisplayProperty(mainMenuSubListElements, 'block');
                this.updateElementBackgroundColor(viewElement, 'WHITE');
            });

            viewElement.addEventListener('mouseout', () => {
                this.updateElementDisplayProperty(mainMenuSubListElements, 'none');
                this.updateElementBackgroundColor(viewElement, '#473F36');
            });

            viewElement.addEventListener('mouseenter', () => {
                this.updateElementTextColor(mainNaviTextElement, '#2AC1BC');
                this.updateElementBorder(mainNaviItemElement, "1px solid BLACK");
                viewElement.borderBottom = "";
            });

            viewElement.addEventListener('mouseleave', () => {
                this.updateElementTextColor(mainNaviTextElement, 'WHITE');
                this.updateElementBorder(mainNaviItemElement, 'NONE');
            });
        };

        this.getChildNodes = function(element) {
            return element.childNodes;
        };

        this.updateElementDisplayProperty = function(element, property) {
            element.style.display = property;
        };

        this.updateElementBackgroundColor = function(element, colorData) {
            element.style.backgroundColor = colorData;
        };

        this.updateElementTextColor = function(element, colorData) {
            element.style.color = colorData;
        }

        this.updateElementBorder = function(element, borderData) {
            element.style.border = borderData;
        }

        this.selectByNodeName = function(parentNode, tagName) {
            const selectedNodes = [];
            const childNodes = this.getChildNodes(parentNode);

            childNodes.forEach(function(elem) {
                if (elem.nodeName === tagName)
                    selectedNodes.push(elem);
            });

            return (selectedNodes.length === 1) ? selectedNodes[0] : selectedNodes;
        };
    };

    return mainViewModel;
})();

console.log("Success Load MainViewModel.js");