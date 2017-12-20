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
        this.slideImgs;
    }

    setView() {
        this.initSlide();
        this.initBanchan();
    }

    async initSlide() {
        const url = 'http://home.dotol.xyz/php/test_api.php';
        const data = await this.request(url);
        this.slideImgs = JSON.parse(data);

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
        const url = 'http://crong.codesquad.kr:8080/woowa/best';
        const data = await this.request(url);
        const food = JSON.parse(data);

        this.view.renderFoodTab(food);
        this.view.renderFoodContainer(food);
        this.view.renderFoodList(food);
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
                    resolve(xhr.response);
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