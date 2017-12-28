import {
    request
} from './helpers';

export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(view) {
        this.view = view;

        view.bindSlidesPrev(this.moveSlides.bind(this));
        view.bindSlidesNext(this.moveSlides.bind(this));
        view.bindSlidesDots(this.currentSlide.bind(this));
        view.bindSideSlidesPrev(this.moveSideSlides.bind(this));
        view.bindSideSlidesNext(this.moveSideSlides.bind(this));

        this.slideIndex = 0;
        this.direction = -20;
    }

    setView() {
        this.initSlide('http://home.dotol.xyz/php/test_api.php');
        this.initBanchan('http://crong.codesquad.kr:8080/woowa/best');
        this.initSideBanchan('http://crong.codesquad.kr:8080/woowa/side');
        this.view.bindPreventDefault();
    }

    async initSlide(url) {
        this.slideImgs = await request(url);
        this.slidesEnd = this.slideImgs.length - 1;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSlides(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex += n;
        if (this.slideIndex > this.slidesEnd) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slidesEnd;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }
    moveSideSlides(direction) {
        this.direction += direction;
        this.view.showSideSlides(this.direction);
    }

    currentSlide(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex = n;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    async initBanchan(url) {
        const food = await request(url);
        this.view.renderBanchan(food);
        this.view.bindFoodTab(food);
    }

    resetSideSlides() {
        if (this.direction === -40 || this.direction === 0)
            this.view.resetSideSlides(this.direction = -20);
    }

    async initSideBanchan(url) {
        const food = await request(url);
        this.view.renderSideBanchan(food);
        this.view.resetSideSlides(this.direction);
        this.view.bindSideSlides(this.resetSideSlides.bind(this));
    }

}