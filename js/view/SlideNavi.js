export default class SlideNavi {
    constructor({ naviEl }) {
        this.naviEl = naviEl;
        this.idx = 0;
    }

    clickNextBtn(handler) {
        const nextBtn = this.naviEl.querySelector('.slide_next');
        nextBtn.addEventListener('click', () => {
            handler(this.plusIdx());
        })
    }

    clickPreBtn(handler) {
        const preBtn = this.naviEl.querySelector('.slide_prev');
        preBtn.addEventListener('click', () => {
            handler(this.minusIdx());
        })
    }

    plusIdx() {
        return ++this.idx;
    }

    minusIdx() {
        return --this.idx;
    }

    setCurrentIdx(idx) {
        this.idx = idx;
    }
}