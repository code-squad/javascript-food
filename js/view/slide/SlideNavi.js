import { throttle } from '../../util.js';
export default class SlideNavi {
    constructor({ naviEl }) {
        this.naviEl = naviEl;
        this.idx = 0;
    }

    clickNextBtn(handler, throttleTime) {
        const nextBtn = this.naviEl.querySelector('.slide-next');
        nextBtn.addEventListener('click', throttle(() => {
            handler(this.plusIdx());
        }, throttleTime))
    }

    clickPreBtn(handler, throttleTime) {
        const preBtn = this.naviEl.querySelector('.slide-prev');
        preBtn.addEventListener('click', throttle(() => {
            handler(this.minusIdx());
        }, throttleTime))
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