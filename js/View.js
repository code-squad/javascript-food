class View {
    constructor(model, viewModel) {
        this.model = model;
        this.vm = viewModel;
        this.targetElement = document.querySelector('.slides_pagination');
        this.initElement = document.querySelector('#now');
        this.btnLeft = document.querySelector(".slide_prev");
        this.btnRight = document.querySelector(".slide_next");
    }

    run() {
        this.addEvent();
        this.addTransitionEvent();
        this.vm.bind(this.initElement);
    }

    addEvent() {
        this.targetElement.addEventListener('click', ({target}) => {
            this.beforeAction();
            this.model.setMainBannerIdx(parseInt(target.innerText));
        });
    }

    /**
     * Transition 속성을 이용한 이벤트입니다.
     */
    addTransitionEvent() {
        this.btnLeft.addEventListener('click', () => {
            this.transitionEventListener('LEFT');
        });
        this.btnRight.addEventListener('click', () => {
            this.transitionEventListener('RIGHT');
        });
    }

    transitionEventListener(mode) {
        let idx = this.model.getMainBannerIdx();
        if (!this.checkPossibleRange(mode, idx)) return;
        this.beforeAction();
        idx += (mode === 'LEFT') ? -1 : 1;
        this.model.setMainBannerIdx(idx);
    }

    checkPossibleRange(mode, data) {
        const first = 1;
        const last = document.querySelectorAll(".banner-common-property").length;
    
        if (mode === "LEFT" && data === first) return false;
        if (mode === "RIGHT" && data === last) return false;
    
        return true;
    }

    beforeAction() {
        const targetElement = document.querySelector('.opacity-show-active');
        targetElement.classList.remove('opacity-show-active');
    }
    
}

export { View };