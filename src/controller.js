import {
    request,
    easeInQuad
} from './helpers';

export default class Controller {
    constructor(urlList, commonView, sideBanchanView, mainBanchanView, courseBanchanView) {
        this.urlList = urlList;
        this.commonView = commonView;
        this.sideBanchanView = sideBanchanView;
        this.mainBanchanView = mainBanchanView;
        this.courseBanchanView = courseBanchanView;

        commonView.bind('slidesPrev', this.moveSlides.bind(this));
        commonView.bind('slidesNext', this.moveSlides.bind(this));
        commonView.bind('slidesDots', this.currentSlide.bind(this));
        commonView.bind('scroller', this.moveScroller.bind(this));

        sideBanchanView.bind('slidesPrev', this.moveInfiniteSlides.bind(sideBanchanView));
        sideBanchanView.bind('slidesNext', this.moveInfiniteSlides.bind(sideBanchanView));
        mainBanchanView.bind('slidesPrev', this.moveInfiniteSlides.bind(mainBanchanView));
        mainBanchanView.bind('slidesNext', this.moveInfiniteSlides.bind(mainBanchanView));
        courseBanchanView.bind('slidesPrev', this.moveInfiniteSlides.bind(courseBanchanView));
        courseBanchanView.bind('slidesNext', this.moveInfiniteSlides.bind(courseBanchanView));
    }

    setView() {
        this.initSlide(this.urlList.mainSlide);
        this.initBestBanchan(this.urlList.bestBanchan);
        this.initInfiniteBanchan(this.sideBanchanView, this.urlList.sideBanchan);
        this.initInfiniteBanchan(this.mainBanchanView, this.urlList.mainBanchan);
        this.initInfiniteBanchan(this.courseBanchanView, this.urlList.courseBanchan);
        this.commonView.bind('preventDefault');
    }

    async initSlide(url) {
        try {
            this.slideImgs = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.slidesEnd = this.slideImgs.length - 1;
        this.commonView.showSlide(0, this.slideImgs[0]);
    }

    moveSlides(target, n) {
        this.commonView.hideSlide(target.index);
        target.index += n;
        if (target.index > this.slidesEnd) target.index = 0;
        if (target.index < 0) target.index = this.slidesEnd;
        this.commonView.showSlide(target.index, this.slideImgs[target.index]);
    }

    currentSlide(target, n) {
        this.commonView.hideSlide(target.index);
        this.commonView.showSlide(target.index = n, this.slideImgs[target.index]);
    }

    moveScroller(direction) {
        direction === 'up' ? this.moveScroll(0) : this.moveScroll(document.body.clientHeight);
    }

    moveScroll(to) {
        const start = scrollY;
        const change = to - start;
        const duration = Math.abs(change / 4);
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;
            let newY = easeInQuad(currentTime, start, change, duration);
            scrollTo(0, newY);
            if (currentTime < duration) requestAnimationFrame(animateScroll);
        };

        requestAnimationFrame(animateScroll);
    }


    async initBestBanchan(url) {
        try {
            const banchan = await request(url);
            this.commonView.render('bestBanchan', banchan);
            this.commonView.bind('foodTab', banchan);
        } catch (e) {
            console.error(e);
        }
    }

    async initInfiniteBanchan(targetView, url) {
        try {
            const foodData = await request(url);
            targetView.render('banchan', foodData);
            const [thresholdLeft, thresholdRight] = [-20 - (foodData.length * 2.5), -20 + (foodData.length * 2.5)];
            targetView.bind('slides', this.resetInfiniteSlides.bind(targetView, thresholdLeft, thresholdRight));
        } catch (e) {
            console.error(e);
        }
    }

    moveInfiniteSlides(target, move) {
        target.direction += move;
        this.showSlides(target.el, target.direction);
    }

    resetInfiniteSlides(thresholdLeft, thresholdRight, target) {
        if (target.direction === thresholdLeft || target.direction === thresholdRight) {
            this.showSlides(target.el, target.direction = -20, true);
        }
    }

}