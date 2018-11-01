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
            // this.vm.bind(target);
            // debugger
            this.beforeAction();
            this.model.setMainBannerIdx(parseInt(target.innerText));
        });
    }

    beforeAction() {
        const targetElement = document.querySelector('.opacity-show-active');
        targetElement.classList.remove('opacity-show-active');
    }
    
}

export { View };