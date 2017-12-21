import {request} from './helpers';

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
        this.initSlide('http://home.dotol.xyz/php/test_api.php');
        this.initBanchan('http://crong.codesquad.kr:8080/woowa/best');
    }

    async initSlide(url) {
        this.slideImgs = await request(url);

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

    async initBanchan(url) {
        const food = await request(url);

        this.view.renderBanchan(food);
        this.view.bindFoodTab(food);
        this.view.bindPreventDefault();
    }

}