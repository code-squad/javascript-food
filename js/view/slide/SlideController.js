export default class SlideController {

    constructor({ slideContent, slideNavi, slideDots, throttleTime }) {
        this.slideContent = slideContent;
        this.slideNavi = slideNavi;
        this.slideDots = slideDots;

        this.slideNavi.clickNextBtn(this.nextSlide.bind(this), throttleTime);
        this.slideNavi.clickPreBtn(this.preSlide.bind(this), throttleTime);
        this.slideDots.clickDots(this.showSlide.bind(this), throttleTime);
    }

    nextSlide(idx) {
        this.slideContent.setCurrentIdx(idx);
        this.slideContent.showNextContent();
        this.slideDots.highlightDot(this.slideContent.getCurrentIdx());
    }

    preSlide(idx) {
        this.slideContent.setCurrentIdx(idx);
        this.slideContent.showPreContent();
        this.slideDots.highlightDot(this.slideContent.getCurrentIdx());
    }

    showSlide(idx) {
        const currentIdx = this.slideContent.getCurrentIdx();
        if (currentIdx == idx) return;
        this.slideContent.setCurrentIdx(idx);
        this.slideNavi.setCurrentIdx(idx);
        currentIdx > idx ? this.slideContent.showPreContent() : this.slideContent.showNextContent();
    }
}