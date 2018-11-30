import { throttle } from '../../util.js'
export default class SlideDots {
    constructor({ dotListEl }) {
        this.dotListEl = dotListEl;
    }

    clickDots(handler, timer) {
        this.dotListEl.addEventListener('click', throttle(({ target }) => {
            if (target.tagName !== 'A') return;
            this.highlightDot(target.innerText);
            handler(target.innerText);
        }, timer))
    }

    highlightDot(idx) {
        Array.from(this.dotListEl.children)
            .filter((i) => i != idx)
            .forEach(v => v.firstElementChild.classList.remove('now'));
        this.dotListEl.children[idx].firstElementChild.classList.add('now');
    }
}