import {
    request,
    delegate,
    getLocalStorage,
    setLocalStorage,
    isValid,
    moveScroll,
    isString,
    isUpdown,
    isESC,
    isEnter,
    fetchJSONP
} from './helpers';

export default class {
    constructor(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView, ...infiniteViews) {
        this.urlList = urlList;
        this.mainSlideView = mainSlideView;
        this.bestBanchanView = bestBanchanView;
        this.scrollerView = scrollerView;
        this.automCompleteView = automCompleteView;
        this.infiniteViews = infiniteViews;
    }

    async checkLocalStorage(key, isJSONP) {
        const cache = getLocalStorage(key);
        if (cache && isValid(cache.time, 6)) return cache.data;
        const value = {
            data: isJSONP ? (await fetchJSONP(key))[1] : await request(key),
            time: Date.now()
        };
        return value.data.hasOwnProperty('error') ? false : setLocalStorage(key, value);
    }

    setView() {
        this.fetchMainSlide(this.urlList.mainSlide);
        this.mainSlideView.bind('slidesPrev', this.moveSlides.bind(this));
        this.mainSlideView.bind('slidesNext', this.moveSlides.bind(this));
        this.mainSlideView.bind('slidesDots', this.currentSlide.bind(this));

        this.fetchBestBanchan(this.urlList.bestBanchan);

        this.scrollerView.bind('click', this.moveScroller.bind(this));

        this.infiniteViews.forEach(infiniteView => {
            this.fetchInfiniteBanchan(infiniteView, this.urlList[infiniteView.state.name]);
            infiniteView.bind('slidesPrev', this.moveInfiniteSlides.bind(infiniteView));
            infiniteView.bind('slidesNext', this.moveInfiniteSlides.bind(infiniteView));
        });

        this.automCompleteView.bind('press', this.pressAutoComplete.bind(this));
        this.automCompleteView.bind('submit', this.submitHistory.bind(this));
        this.automCompleteView.bind('history', this.showHistory.bind(this));
        this.automCompleteView.bind('click');
        this.automCompleteView.bind('nonClick');
        this.automCompleteView.bind('hover');

        delegate('body', 'a', 'click', e => e.preventDefault());
    }

    async fetchMainSlide(url) {
        this.slideImgs = await this.checkLocalStorage(url);
        this.slidesEnd = this.slideImgs.length - 1;
        this.mainSlideView.showSlide(0, this.slideImgs[0]);
    }

    moveSlides(target, n) {
        this.mainSlideView.hideSlide(target.index);
        target.index += n;
        if (target.index > this.slidesEnd) target.index = 0;
        if (target.index < 0) target.index = this.slidesEnd;
        this.mainSlideView.showSlide(target.index, this.slideImgs[target.index]);
    }

    currentSlide(target, n) {
        this.mainSlideView.hideSlide(target.index);
        this.mainSlideView.showSlide(target.index = n, this.slideImgs[target.index]);
    }

    moveScroller(direction) {
        direction === 'up' ? moveScroll(0) : moveScroll(document.body.clientHeight);
    }

    async pressAutoComplete(term, key, isSeleted) {
        if (isString(key)) {
            if (term) {
                const suggestions = await this.checkLocalStorage(`https://ko.wikipedia.org/w/api.php?action=opensearch&search=${term}`, true);
                this.automCompleteView.render('autoComplete', term, suggestions);
            } else {
                this.automCompleteView.emptyAutoComplete();
            }
        } else if (isUpdown(key)) {
            this.automCompleteView.moveAutoComplete(key);
        } else if (isESC(key)) {
            this.automCompleteView.emptyAutoComplete();
        } else if (isEnter(key)) {
            isSeleted ? this.automCompleteView.enterAutoComplete() : this.submitHistory(term);
        }
    }

    submitHistory(keyword) {
        if (keyword) {
            const history = new Set(getLocalStorage('history'));
            history.add(keyword);
            setLocalStorage('history', [...history]);
            this.automCompleteView.emptyAutoComplete();
            this.automCompleteView.emptySearchbar();
        }
    }

    async showHistory(check) {
        if (check) {
            const history = await getLocalStorage('history');
            history && this.automCompleteView.render('history', history.slice(-5).reverse());
        }
    }

    async fetchBestBanchan(url) {
        const banchan = await this.checkLocalStorage(url);
        this.bestBanchanView.render('bestBanchan', banchan);
        this.bestBanchanView.bind('foodTab');
    }

    async fetchInfiniteBanchan(targetView, url) {
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