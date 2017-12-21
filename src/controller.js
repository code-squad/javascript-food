export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(view) {
        this.view = view;

        view.bindSlidesPrev(this.moveSlides.bind(this));
        view.bindSlidesNext(this.moveSlides.bind(this));
        view.bindSlidesDots(this.currentSlide.bind(this));
        this.slidesEnd = 12;
        this.slideIndex = 0;
    }

    setView() {
        this.initSlide();
        this.initBanchan();
    }

    async initSlide() {
        this.slideImgs = await this.request('http://home.dotol.xyz/php/test_api.php');

        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSlides(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex += n;
        if (this.slideIndex > this.slidesEnd) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slidesEnd;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    currentSlide(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex = n;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    async initBanchan() {
        const food = await this.request('http://crong.codesquad.kr:8080/woowa/best');

        this.renderBanchan(food);
        
        this.view.bindFoodTab(food);
        this.view.bindPreventDefault();
    }

    renderBanchan(food) {
        this.view.renderFoodTab(food);
        this.view.renderFoodContainer(food);
        this.view.renderFoodBoxList(food);
        this.view.renderFoodBox(food);
        const initNum = Math.floor(Math.random() * 6);
        this.view.renderFoodTabList(food, initNum);
    }

    request(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.status);
                }
            };
            xhr.ontimeout = function () {
                reject('timeout');
            };
            xhr.send();
        });
    }
}