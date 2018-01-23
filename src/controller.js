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

        this.scrollerView.bind('click').bind('hide')
            .on('@move', e => this.moveScroller(e.detail.direction));

        this.infiniteViews.forEach(infiniteView =>
            this.fetchInfiniteBanchan(infiniteView, this.urlList[infiniteView.name]));

        this.autoCompleteView.bind('press').bind('submit')
            .bind('history').bind('clickSuggestion').bind('nonClick').bind('hover')
            .on('@press', e => this.pressAutoComplete(e.detail))
            .on('@submit', e => this.submitKeyword(e.detail.keyword))
            .on('@history', () => this.showHistory());

        delegate('body', 'a', 'click', e => e.preventDefault());
    }

    async fetchMainSlide(url) {
        this.slideImgs = await this.checkLocalStorage(url);
        this.slidesEnd = this.slideImgs.length - 1;
        this.mainSlideView.showSlide(0, this.slideImgs[0])
            .bind('slidesNavi').bind('slidesDots')
            .on('@selectDot', e => this.selectSlide(e.detail.index))
            .on('@move', e => this.moveSlide(e.detail));
    }

    moveSlide({
        index,
        direction
    }) {
        index += direction;
        if (index > this.slidesEnd) index = 0;
        if (index < 0) index = this.slidesEnd;

        this.mainSlideView.hideCurrentSlide().setIndex(index)
            .showSlide(index, this.slideImgs[index]);
    }

    selectSlide(index) {
        this.mainSlideView.hideCurrentSlide().setIndex(index)
            .showSlide(index, this.slideImgs[index]);
    }

    moveScroller(direction) {
        direction === 'up' ? moveScroll(0) : moveScroll(document.body.clientHeight);
    }

    async pressAutoComplete({
        term,
        key,
        isSeleted
    }) {
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
            isSeleted ? this.autoCompleteView.setSearchbar() : this.submitKeyword(term);
        }
    }

    submitKeyword(keyword) {
        if (keyword) {
            const history = new Set(getLocalStorage('history'));
            history.add(keyword);
            setLocalStorage('history', [...history]);
            this.autoCompleteView.emptyAutoComplete().emptySearchbar();
        }
    }

    async showHistory() {
        const history = await getLocalStorage('history');
        history && this.autoCompleteView.render('history', history.slice(-5).reverse());
    }

    async fetchBestBanchan(url) {
        const foodData = await this.checkLocalStorage(url);
        this.bestBanchanView.render('bestBanchan', foodData).bind('foodTab');
    }

    async fetchInfiniteBanchan(targetView, url) {
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