import {request} from './helpers';

export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(urlList, view, infiniteView) {
        this.urlList = urlList;
        this.view = view;
        this.infiniteView = infiniteView;

        view.bind('slidesPrev', this.moveSlides.bind(this));
        view.bind('slidesNext', this.moveSlides.bind(this));
        view.bind('slidesDots', this.currentSlide.bind(this));

        infiniteView.bind('sideSlidesPrev', this.moveInfiniteSlides.bind(this));
        infiniteView.bind('sideSlidesNext', this.moveInfiniteSlides.bind(this));

        infiniteView.bind('mainSlidesPrev', this.moveInfiniteSlides.bind(this));
        infiniteView.bind('mainSlidesNext', this.moveInfiniteSlides.bind(this));

        infiniteView.bind('courseSlidesPrev', this.moveInfiniteSlides.bind(this));
        infiniteView.bind('courseSlidesNext', this.moveInfiniteSlides.bind(this));
    }

    setView() {
        this.initSlide(this.urlList.mainSlide);
        this.initBanchan(this.urlList.bestBanchan);
        this.initInfiniteBanchan('side', this.urlList.sideBanchan);
        this.initInfiniteBanchan('main', this.urlList.mainBanchan);
        this.initInfiniteBanchan('course', this.urlList.courseBanchan);
        this.view.bind('preventDefault');
    }

    async initSlide(url) {
        try {
            this.slideImgs = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.slidesEnd = this.slideImgs.length - 1;
        this.view.showSlide(0, this.slideImgs[0]);
    }

    moveSlides(target, n) {
        this.view.hideSlide(target.index);
        target.index += n;
        if (target.index > this.slidesEnd) target.index = 0;
        if (target.index < 0) target.index = this.slidesEnd;
        this.view.showSlide(target.index, this.slideImgs[target.index]);
    }

    currentSlide(target, n) {
        this.view.hideSlide(target.index);
        target.index = n;
        this.view.showSlide(target.index, this.slideImgs[target.index]);
    }

    async initBanchan(url) {
        try {
            const banchan = await request(url);
            this.view.render('Banchan', banchan);
            this.view.bind('foodTab', banchan);
        } catch (e) {
            console.error(e);
        }
    }

    async initInfiniteBanchan(name, url) {
        try {
            const foodData = await request(url);
            this.infiniteView.render(`${name}Banchan`, foodData);
            const [thresholdLeft, thresholdRight] = [-20 - (foodData.length * 2.5), -20 + (foodData.length * 2.5)];
            this.infiniteView.bind(`${name}Slides`, this.resetInfiniteSlides.bind(this, thresholdLeft, thresholdRight));
        } catch (e) {
            console.error(e);
        }
    }

    moveInfiniteSlides(target, move) {
        target.direction += move;
        this.infiniteView.showSlides(target.name, target.direction);
    }

    resetInfiniteSlides(thresholdLeft, thresholdRight, target) {
        if (target.direction === thresholdLeft || target.direction === thresholdRight) {
            this.infiniteView.showSlides(target.name, target.direction = -20, true);
        }
    }

}