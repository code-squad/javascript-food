export default class SlideController {

    constructor({ slideContent, slideNavi, slideDots, timer }) {
        this.slideContent = slideContent;
        this.slideNavi = slideNavi;
        this.slideDots = slideDots;

        this.slideNavi.clickNextBtn(this.nextSlide.bind(this),timer);
        this.slideNavi.clickPreBtn(this.preSlide.bind(this),timer);
        this.slideDots.clickDots(this.showSlide.bind(this),timer);
    }

    nextSlide(idx) {
        this.slideContent.setCurrentIdx(idx);
        this.slideNavi.setCurrentIdx(this.slideContent.getCurrentIdx());
        this.slideContent.showNextContent();
        this.slideDots.highlightDot(this.slideContent.getCurrentIdx());
    }

    preSlide(idx) {
        this.slideContent.setCurrentIdx(idx);
        this.slideNavi.setCurrentIdx(this.slideContent.getCurrentIdx());
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