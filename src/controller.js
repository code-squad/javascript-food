import {
    request
} from './helpers';

export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(view, infiniteView) {
        this.view = view;
        this.infiniteView = infiniteView;

        view.bind('slidesPrev', this.moveSlides.bind(this));
        view.bind('slidesNext', this.moveSlides.bind(this));
        view.bind('slidesDots', this.currentSlide.bind(this));

        infiniteView.bind('sideSlidesPrev', this.moveSideSlides.bind(this));
        infiniteView.bind('sideSlidesNext', this.moveSideSlides.bind(this));

        infiniteView.bind('mainSlidesPrev', this.moveMainSlides.bind(this));
        infiniteView.bind('mainSlidesNext', this.moveMainSlides.bind(this));

        this.slideIndex = 0;
        this.sideDirection = -20;
        this.mainDirection = -20;
    }

    setView() {
        this.initSlide('http://home.dotol.xyz/php/test_api.php');
        this.initBanchan('http://crong.codesquad.kr:8080/woowa/best');
        this.initSideBanchan('http://crong.codesquad.kr:8080/woowa/side');
        this.initMainBanchan('http://crong.codesquad.kr:8080/woowa/main');
        this.view.bind('preventDefault');
    }

    async initSlide(url) {
        try {
            this.slideImgs = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.slidesEnd = this.slideImgs.length - 1;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSlides(n) {
        this.view.hideSlide(this.slideIndex);
        this.slideIndex += n;
        if (this.slideIndex > this.slidesEnd) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slidesEnd;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    currentSlide(n) {
        this.view.hideSlide(this.slideIndex);
        this.slideIndex = n;
        this.view.showSlide(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    async initBanchan(url) {
        try {
            this.banchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.view.render('renderBanchan', this.banchan);
        this.view.bind('foodTab', this.banchan);
    }

    moveSideSlides(direction) {
        this.sideDirection += direction;
        this.infiniteView.showSlides('side', this.sideDirection);
    }

    moveMainSlides(direction) {
        this.mainDirection += direction;
        this.infiniteView.showSlides('main', this.mainDirection);
    }

    resetSideSlides(thresholdLeft, thresholdRight) {
        if (this.sideDirection === thresholdLeft || this.sideDirection === thresholdRight) {
            this.infiniteView.showSlides('side', this.sideDirection = -20, true);
        }
    }

    resetMainSlides(thresholdLeft, thresholdRight) {
        if (this.mainDirection === thresholdLeft || this.mainDirection === thresholdRight) {
            this.infiniteView.showSlides('main', this.mainDirection = -20, true);
        }
    }

    async initSideBanchan(url) {
        try {
            this.sideBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.infiniteView.render('renderSideBanchan', this.sideBanchan, this.sideDirection);
        this.infiniteView.bind('sideSlides', this.resetSideSlides.bind(this, -40, 0));
    }

    async initMainBanchan(url) {
        try {
            this.mainBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.infiniteView.render('renderMainBanchan', this.mainBanchan, this.mainDirection);
        this.infiniteView.bind('mainSlides', this.resetMainSlides.bind(this, -40, 0));
    }

}