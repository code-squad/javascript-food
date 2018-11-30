import { throttle } from '../../util.js';
export default class SlideNavi {
    constructor({ naviEl }) {
        this.naviEl = naviEl;
        this.idx = 0;
    }

    clickNextBtn(handler, timer) {
        const nextBtn = this.naviEl.querySelector('.slide-next');
        nextBtn.addEventListener('click', throttle(() => {
            handler(this.plusIdx());
        }, timer))
    }

    clickPreBtn(handler, timer) {
        const preBtn = this.naviEl.querySelector('.slide-prev');
        preBtn.addEventListener('click', throttle(() => {
            handler(this.minusIdx());
        }, timer))
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