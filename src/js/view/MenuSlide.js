import { throttle, checkLocalItem, getLocalItem } from '../util.js';
import { itemListTpl } from '../template/itemListTpl.js';

export default class MenuSlide {

    constructor({ urlRequestData, slideListEl, naviEl, viewContentCount = 4, throttleTime = 500 }) {

        this.slideListEl = slideListEl;
        this.naviEl = naviEl;
        this.viewContentCount = viewContentCount;
        this.throttleTime = throttleTime;

        this.init(urlRequestData);
    }

    async init(url) {
        if (await checkLocalItem(url)) return;
        this.setContentData(getLocalItem(url));
        this.render(this.getInitRenderData());

        this.setInitSlidePosition(this.positionValue());
        this.clickNaviBtn(this.positionValue());
        this.transitionEnd(this.positionValue());
    }

    getInitRenderData() {

        const firstViewData = Array.from(this.contentData).slice(0, this.viewContentCount);
        const lastViewData = Array.from(this.contentData).slice(-this.viewContentCount);
        const initRenderData = lastViewData.concat(this.contentData).concat(firstViewData);
        return initRenderData;
    }

    setInitSlidePosition({ firstContentPositionX }) {
        this.currentPositionX = firstContentPositionX;
        this.slideListEl.style.transform = `translateX(${this.currentPositionX}%`;
    }

    clickNaviBtn(positionValue) {

        this.naviEl.addEventListener('click', throttle(({ target }) => {
            if (target.className === "slide-prev") this.slideContent(this.plusPositionX.bind(this), positionValue);
            if (target.className === "slide-next") this.slideContent(this.minusPositionX.bind(this), positionValue);
        }, this.throttleTime))
    }

    transitionEnd({ firstContentPositionX, lastContentPositionX, minPositionX, maxPositionX }) {

        this.slideListEl.addEventListener('transitionend', () => {
            if (this.currentPositionX === maxPositionX) this.resetToInitContent(lastContentPositionX);
            if (this.currentPositionX === minPositionX) this.resetToInitContent(firstContentPositionX);
        })
    }

    slideContent(convertPositionValue, positionValue) {

        if (!this.slideListEl.style.transition) this.slideListEl.style.transition = `transform ${this.throttleTime / 1000}s`;
        convertPositionValue(positionValue);
        this.slideListEl.style.transform = `translateX(${this.currentPositionX}%)`;
    }

    resetToInitContent(initPositionX) {

        this.slideListEl.style.transition = "";
        this.currentPositionX = initPositionX;
        this.slideListEl.style.transform = `translateX(${this.currentPositionX}%)`;
    }

    plusPositionX({ maxPositionX }) {
        const contentWidth = 10;
        this.currentPositionX += contentWidth;
        if (this.currentPositionX > maxPositionX) this.currentPositionX = maxPositionX;
    }

    minusPositionX({ minPositionX }) {
        const contentWidth = 10;
        this.currentPositionX -= contentWidth;
        if (this.currentPositionX < minPositionX) this.currentPositionX = minPositionX;
    }

    setContentData(data) {
        this.contentData = data;
    }

    render(data) {
        this.slideListEl.innerHTML += itemListTpl(data);
    }

    positionValue() {
        const contentWidth = 10;
        const contentLength = this.contentData.length;
        const viewContentCount = this.viewContentCount;
        const remainContentCount = contentLength % viewContentCount;
        const remainContentsWidth = !remainContentCount ? contentWidth : contentWidth / viewContentCount * remainContentCount;

        const firstContentPositionX = -contentWidth;
        const maxPositionX = firstContentPositionX + remainContentsWidth;
        const minPositionX = -(contentWidth / viewContentCount * (contentLength + viewContentCount));
        const lastContentPositionX = minPositionX + remainContentsWidth;

        return { firstContentPositionX, lastContentPositionX, minPositionX, maxPositionX }
    }
}