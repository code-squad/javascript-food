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

    setView() {
        this.fetchMainSlide(this.urlList.mainSlide);
        this.fetchBestBanchan(this.urlList.bestBanchan);

        this.infiniteViews.forEach(infiniteView =>
            this.fetchInfiniteSlide(infiniteView, this.urlList[infiniteView.name]));

        this.scrollerView.bind('click').bind('hide')
            .on('@move', e => this.moveScroller(e.detail.direction));

        this.autoCompleteView.bind('press').bind('submit').bind('history')
            .bind('clickSuggestion').bind('nonClick').bind('hover')
            .on('@press', e => this.pressAutoComplete(e.detail))
            .on('@submit', e => this.submitKeyword(e.detail.keyword))
            .on('@history', () => this.fetchHistory());

        delegate('body', 'a', 'click', e => e.preventDefault());
    }

    async fetchMainSlide(url) {
        this.slideImgs = await this.checkLocalStorage(url);
        this.mainSlideView.render('mainSlide', this.slideImgs)
            .bind('slidesNavi').bind('slidesDots')
            .on('@selectDot', e => this.selectSlide(e.detail.index))
            .on('@move', e => this.moveSlide(e.detail));
    }

    moveSlide({
        index,
        direction
    }) {
        const slidesEnd = this.slideImgs.length - 1;
        index += direction;
        if (index > slidesEnd) index = 0;
        if (index < 0) index = slidesEnd;

        this.selectSlide(index);
    }

    selectSlide(index) {
        this.mainSlideView.hideSlide().setIndex(index).showSlide();
    }

    moveScroller(direction) {
        direction === 'up' ? moveScroll(0) : moveScroll(document.body.clientHeight);
    }

    pressAutoComplete({
        term,
        key,
        isSelected
    }) {
        const isUp = (key) => key === 38;
        const isdown = (key) => key === 40;
        const isESC = (key) => key === 27;
        const isEnter = (key) => key === 13;
        const isString = (key) => key < 35 || key > 40;

        if (isUp(key)) {
            this.autoCompleteView.upSel();
        } else if (isdown(key)) {
            this.autoCompleteView.downSel();
        } else if (isESC(key)) {
            this.autoCompleteView.emptyAutoComplete();
        } else if (isEnter(key)) {
            isSelected ? this.autoCompleteView.setSearchbar() : this.submitKeyword(term);
        } else if (isString(key)) {
            term ? this.fetchAutoComplete(term) : this.autoCompleteView.emptyAutoComplete();
        }
    }

    async fetchAutoComplete(term) {
        const suggestions = await this.checkLocalStorage(this.urlList.autoComplete + term, true);
        this.autoCompleteView.emptyAutoComplete().render('autoComplete', term, suggestions);
    }

    submitKeyword(keyword) {
        if (keyword) {
            const history = new Set(getLocalStorage('history'));
            history.add(keyword);
            setLocalStorage('history', [...history]);
            this.autoCompleteView.emptyAutoComplete().emptySearchbar();
        }
    }

    async fetchHistory() {
        const history = await getLocalStorage('history');
        history && this.autoCompleteView.render('history', history.slice(-5).reverse());
    }

    async fetchBestBanchan(url) {
        const foodData = await this.checkLocalStorage(url);
        this.bestBanchanView.render('bestBanchan', foodData).bind('foodTab');
    }

    async fetchInfiniteSlide(targetView, url) {
        const foodData = await this.checkLocalStorage(url);
        const threshold = foodData.length * 2.5;
        targetView.render('banchan', foodData).bind('transitionend').bind('slidesNavi')
            .on('@move', e => this.moveInfiniteSlides.call(targetView, e.detail))
            .on('@transitionend',
                e => this.resetInfiniteSlides.call(targetView, threshold, e.detail.index));
    }

    moveInfiniteSlides({
        index,
        direction
    }) {
        this.setIndex(index += direction).showSlides({
            Immediately: false
        });
    }

    resetInfiniteSlides(threshold, index) {
        const [thresholdLeft, thresholdRight] = [-20 - threshold, -20 + threshold];
        if (index === thresholdLeft || index === thresholdRight) {
            this.setIndex(-20).showSlides({
                Immediately: true
            });
        }
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

}