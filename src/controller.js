import {
    request,
    delegate,
    getLocalStorage,
    setLocalStorage,
    isValid,
    moveScroll,
    fetchJSONP
} from './helpers';

export default class {
    constructor(urlList, mainSlideView, bestBanchanView, scrollerView, autoCompleteView, ...infiniteViews) {
        this.urlList = urlList;
        this.mainSlideView = mainSlideView;
        this.bestBanchanView = bestBanchanView;
        this.scrollerView = scrollerView;
        this.autoCompleteView = autoCompleteView;
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
        this.bindMainSlide().fetchMainSlide(this.urlList.mainSlide);
        this.fetchBestBanchan(this.urlList.bestBanchan);
        this.bindScroller();
        this.fetchInfiniteSlide();
        this.infiniteViews.forEach(infiniteView => {
            infiniteView.bind('slidesPrev', this.moveInfiniteSlides.bind(infiniteView));
            infiniteView.bind('slidesNext', this.moveInfiniteSlides.bind(infiniteView));
            this.fetchInfiniteBanchan(infiniteView, this.urlList[infiniteView.state.name]);
        });
        this.bindAutoComplete();
        delegate('body', 'a', 'click', e => e.preventDefault());
    }

    bindMainSlide() {
        this.mainSlideView.bind('slidesPrev', this.moveSlides.bind(this));
        this.mainSlideView.bind('slidesNext', this.moveSlides.bind(this));
        this.mainSlideView.bind('slidesDots', this.currentSlide.bind(this));
        return this;
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

    bindScroller() {
        this.scrollerView.bind('click', this.moveScroller.bind(this));
        this.scrollerView.bind('hide', this.moveScroller.bind(this));
    }

    bindAutoComplete() {
        this.autoCompleteView.bind('press', this.pressAutoComplete.bind(this));
        this.autoCompleteView.bind('submit', this.submitHistory.bind(this));
        this.autoCompleteView.bind('history', this.showHistory.bind(this));
        this.autoCompleteView.bind('click');
        this.autoCompleteView.bind('nonClick');
        this.autoCompleteView.bind('hover');
    }


    moveScroller(direction) {
        direction === 'up' ? moveScroll(0) : moveScroll(document.body.clientHeight);
    }

    async pressAutoComplete(term, key, isSeleted) {
        const isString = (!key || (key < 35 || key > 40) && key !== 13 && key !== 27);
        const isUpdown = (key === 40 || key === 38);
        const isESC = key === 27;
        const isEnter = key === 13;

        if (isString) {
            if (term) {
                const suggestions = await this.checkLocalStorage(`https://ko.wikipedia.org/w/api.php?action=opensearch&search=${term}`, true);
                this.autoCompleteView.render('autoComplete', term, suggestions);
            } else {
                this.autoCompleteView.emptyAutoComplete();
            }
        } else if (isUpdown) {
            this.autoCompleteView.moveAutoComplete(key);
        } else if (isESC) {
            this.autoCompleteView.emptyAutoComplete();
        } else if (isEnter) {
            isSeleted ? this.autoCompleteView.enterAutoComplete() : this.submitHistory(term);
        }
    }

    submitHistory(keyword) {
        if (keyword) {
            const history = new Set(getLocalStorage('history'));
            history.add(keyword);
            setLocalStorage('history', [...history]);
            this.autoCompleteView.emptyAutoComplete();
            this.autoCompleteView.emptySearchbar();
        }
    }

    async showHistory(check) {
        if (check) {
            const history = await getLocalStorage('history');
            history && this.autoCompleteView.render('history', history.slice(-5).reverse());
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
        return this;
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