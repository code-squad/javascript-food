import { getLocalItem, checkLocalItem } from "../../util.js";

export default class SlideController {

    constructor({ slideContent, slideDots, throttleTime, urlRequestData }) {
        this.slideContent = slideContent;
        this.slideDots = slideDots;

        this.slideContent.clickNextBtn(this.nextSlide.bind(this), throttleTime);
        this.slideContent.clickPreBtn(this.preSlide.bind(this), throttleTime);
        this.slideDots.clickDots(this.showSlide.bind(this), throttleTime);

        this.currentIdx = 0;
        this.init(urlRequestData);
    }

    async init(url) {
        if (await checkLocalItem(url)) return;
        this.slideContent.setContentData(getLocalItem(url))
        this.contentLength = getLocalItem(url).length;
        this.slideContent.init(this.getCurrentIdx());
    }

    nextSlide() {
        this.plusIdx();
        this.slideContent.showNextContent(this.getCurrentIdx());
        this.slideDots.highlightDot(this.getCurrentIdx());
    }

    preSlide() {
        this.minusIdx();
        this.slideContent.showPreContent(this.getCurrentIdx());
        this.slideDots.highlightDot(this.getCurrentIdx());
    }

    showSlide(idx) {
        const currentIdx = this.getCurrentIdx();
        if (currentIdx == idx) return;
        this.setCurrentIdx(idx);
        currentIdx > idx ? this.slideContent.showPreContent(this.getCurrentIdx())
            : this.slideContent.showNextContent(this.getCurrentIdx());
    }

    setCurrentIdx(idx) {
        this.currentIdx = idx;
    }

    getCurrentIdx() {
        this.currentIdx = this.currentIdx < 0 ? this.contentLength - 1 : this.currentIdx % this.contentLength;
        return this.currentIdx;
    }

    plusIdx() {
        ++this.currentIdx;
    }

    minusIdx() {
        --this.currentIdx;
    }
}