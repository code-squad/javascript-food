class View {
    constructor(model, viewModel) {
        this.model = model;
        this.vm = viewModel;
        this.targetElement = document.querySelector('.slides_pagination');
        this.initElement = document.querySelector('#now');
    }

    run() {
        this.addEvent();
        this.vm.bind(this.initElement);
    }

    addEvent() {
        this.targetElement.addEventListener('click', ({target}) => {
            this.vm.bind(target);
        });
    }
    
}

export { View };