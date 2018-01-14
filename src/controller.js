import {
    request,
    easeInQuad
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

    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    }

    async checkLocalStorage(key) {
        let cache = this.getLocalStorage(key);
        if (cache) return cache;
        const response = await request(key);
        return response.hasOwnProperty('error') ? false : this.setLocalStorage(key, response);
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

    async pressAutoComplete(term, key) {
        if (!key || (key < 35 || key > 40) && key !== 13 && key !== 27) {
            const suggestions = await this.checkLocalStorage(`http://crong.codesquad.kr:8080/ac/${term}`);
            suggestions && term ? this.automCompleteView.render('autoComplete', term, suggestions[1]) : this.automCompleteView.emptyAutoComplete();
        }
        // down (40), up (38)
        else if (key === 40 || key === 38) {
            this.automCompleteView.moveAutoComplete(key);
        }
        // esc
        else if (key === 27) {
            this.automCompleteView.emptyAutoComplete();
        }
        // enter
        else if (key === 13) {
            this.automCompleteView.enterAutoComplete();
        }
    }

    submitSearches(keyword) {
        if (keyword) {
            const searches = new Set(this.getLocalStorage('searches'));
            searches.add(keyword);
            this.setLocalStorage('searches', [...searches]);
            this.automCompleteView.emptySearchbar();
        }
    }

    async showSearches(check) {
        if (check) {
            const searches = await this.getLocalStorage('searches');
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
        const [thresholdLeft, thresholdRight] = [-20 - (foodData.length * 2.5), -20 + (foodData.length * 2.5)];
        targetView.bind('slides', this.resetInfiniteSlides.bind(targetView, thresholdLeft, thresholdRight));
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