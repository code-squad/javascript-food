const Utility = {

    setCSS(element, mode, data) {
        const run = {
            backgroundColor() { element.style.backgroundColor = data; },
            displayProperty() { element.style.display = data; },
            border() { element.style.border = data; },
            textColor() { element.style.color = data; },
            fontWeight() { element.style.fontWeight = data; },
        };

        return run[mode]();
    }

}

export { Utility }