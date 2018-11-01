class ViewModel {
    constructor(model) {
        this.model = model;
    }

    bind(element) {
        this.model.subscribe(() => {
            if (document.querySelector('#now')) document.querySelector('#now').id = "";
            const idx = this.model.getMainBannerIdx() - 1;
            const aElements = document.querySelectorAll('.slides_pagination li a');
            aElements[idx].id = 'now';
        });

        this.model.subscribe(() => {
            const idx = this.model.getMainBannerIdx() - 1;
            const mainBannerList = document.querySelectorAll('.main-slide-list li');
            mainBannerList[idx].classList.add('opacity-show-active');
        });

        const choicedBannerIdx = parseInt(element.innerText);
        this.model.setMainBannerIdx(choicedBannerIdx);
    }

}

export { ViewModel };