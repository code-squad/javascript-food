import {
    request,
    getLocalStorage,
    setLocalStorage,
    isValid,
    moveScroll,
    isString,
    isUpdown,
    isESC,
    isEnter
} from './helpers';

export default class Controller {
    constructor(urlList, commonView, automCompleteView, ...infiniteViews) {
        this.urlList = urlList;
        this.commonView = commonView;
        this.automCompleteView = automCompleteView;

        commonView.bind('slidesPrev', this.moveSlides.bind(this));
        commonView.bind('slidesNext', this.moveSlides.bind(this));
        commonView.bind('slidesDots', this.currentSlide.bind(this));
        commonView.bind('scroller', this.moveScroller.bind(this));

        automCompleteView.bind('press', this.pressAutoComplete.bind(this));
        automCompleteView.bind('submit', this.submitSearches.bind(this));
        automCompleteView.bind('searches', this.showSearches.bind(this));
        automCompleteView.bind('click');
        automCompleteView.bind('nonClick');
        automCompleteView.bind('hover');


        infiniteViews.forEach(infiniteView => {
            infiniteView.bind('slidesPrev', this.moveInfiniteSlides.bind(infiniteView));
            infiniteView.bind('slidesNext', this.moveInfiniteSlides.bind(infiniteView));
            this.initInfiniteBanchan(infiniteView, this.urlList[infiniteView.state.name]);
        });
    }

    async checkLocalStorage(key) {
        const cache = getLocalStorage(key);
        if (cache && isValid(cache.time, 6)) return cache.data;
        const value = {
            data: await request(key),
            time: Date.now()
        };
        return value.data.hasOwnProperty('error') ? false : setLocalStorage(key, value);
    }

    setView() {
        this.initSlide(this.urlList.mainSlide);
        this.initBestBanchan(this.urlList.bestBanchan);
        this.commonView.bind('preventDefault');
    }

    async initSlide(url) {
        this.slideImgs = await this.checkLocalStorage(url);
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
        direction === 'up' ? moveScroll(0) : moveScroll(document.body.clientHeight);
    }

    async pressAutoComplete(term, key) {
        if (isString(key)) {
            const suggestions = await this.checkLocalStorage(`http://crong.codesquad.kr:8080/ac/${term}`);
            suggestions && term ? this.automCompleteView.render('autoComplete', term, suggestions[1]) : this.automCompleteView.emptyAutoComplete();
        } else if (isUpdown(key)) {
            this.automCompleteView.moveAutoComplete(key);
        } else if (isESC(key)) {
            this.automCompleteView.emptyAutoComplete();
        } else if (isEnter(key)) {
            this.automCompleteView.enterAutoComplete();
        }
    }

    submitSearches(keyword) {
        if (keyword) {
            const searches = new Set(getLocalStorage('searches'));
            searches.add(keyword);
            setLocalStorage('searches', [...searches]);
            this.automCompleteView.emptySearchbar();
        }
    }

    async showSearches(check) {
        if (check) {
            const searches = await getLocalStorage('searches');
            this.automCompleteView.render('searches', searches.slice(-5).reverse());
        }
    }

    async initBestBanchan(url) {
        const banchan = await this.checkLocalStorage(url);
        this.commonView.render('bestBanchan', banchan);
        this.commonView.bind('foodTab');
    }

    async initInfiniteBanchan(targetView, url) {
        const foodData = await this.checkLocalStorage(url);
        targetView.render('banchan', foodData);
        const threshold = foodData.length * 2.5;
        targetView.bind('slides', this.resetInfiniteSlides.bind(targetView, -20 - threshold, -20 + threshold));
    }

    moveInfiniteSlides(target, move) {
        this.showSlides(target.el, target.direction += move);
    }

    resetInfiniteSlides(thresholdLeft, thresholdRight, target) {
        if (target.direction === thresholdLeft || target.direction === thresholdRight) {
            this.showSlides(target.el, target.direction = -20, true);
        }
    }

}