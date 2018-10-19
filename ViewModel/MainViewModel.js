const MainViewModel = (function() {

    const mainViewModel = function(model) {
        this.registerHoverEvent = function(viewElement) {
            const first = 0;
            const mainMenuSubListElements = this.selectByNodeName(viewElement, 'UL')[first];
            const mainNaviItemElement = this.selectByNodeName(viewElement, 'DIV')[first];
            const mainNaviTextElement = this.selectByNodeName(mainNaviItemElement, 'P')[first];

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
                if (elem.nodeName === tagName) {
                    selectedNodes.push(elem);
                }
            });
            return selectedNodes;
        };
    };

    return mainViewModel;
})();

console.log("Success Load MainViewModel.js");