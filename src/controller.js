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
        targetView.setThreshold(threshold)
            .render('banchan', foodData).bind('transitionend')
            .bind('slidesNavi').bind('touch')
            .on('@move', e => this.moveInfiniteSlides.call(targetView, e.detail.direction))
            .on('@transitionend', () => this.resetInfiniteSlides.call(targetView))
            .on('@touchmove', e => this.checkMoveType.call(targetView, e.detail.x, e.detail.y))
            .on('@touchend', e => {
                targetView.state.moveType < 0 && this.checkMoveType.call(targetView, e.detail.x, e.detail.y);
                this.checkDistance(targetView);
                targetView.initTouchInfo();
            });
    }

    checkDistance(targetView) {
        let {
            index,
            startIndex
        } = targetView.state;
        const Hdistance = startIndex - index;
        if (Hdistance > 2) {
            this.moveInfiniteSlides.call(targetView, Hdistance - 10);
        } else if (Hdistance < -2) {
            this.moveInfiniteSlides.call(targetView, Hdistance + 10);
        } else {
            this.moveInfiniteSlides.call(targetView, Hdistance);
        }
    }

    checkMoveType(x, y) {
        const {
            startX,
            startY,
            startIndex,
            HSlope
        } = this.state;
        const Hdistance = (startX - x) / 100;
        this.setIndex(startIndex - Hdistance).showSlides({
            Immediately: true
        });

        const moveX = Math.abs(startX - x);
        const moveY = Math.abs(startY - y);
        const distance = moveX + moveY;
        if (distance < 25) {
            return this;
        }
        const slope = parseFloat((moveY / moveX).toFixed(2), 10);
        slope > HSlope ? this.setMoveType(1) : this.setMoveType(0);
    }

    moveInfiniteSlides(direction) {
        this.setIndex(this.state.index += direction).showSlides({
            Immediately: false
        });
    }

    resetInfiniteSlides() {
        const {
            index,
            thresholdL,
            thresholdR
        } = this.state;
        if (index <= thresholdL || index >= thresholdR) {
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