export default class SlideDots {
    constructor({ dotListEl }) {
        this.dotListEl = dotListEl;
    }

    clickDots(handler) {
        this.dotListEl.addEventListener('click', ({ target }) => {
            if (target.tagName !== 'A') return;
            handler(target.innerText);
            this.highlightDot(target.innerText);
        })
    }

    highlightDot(idx) {
        Array.from(this.dotListEl.children)
            .filter((i) => i != idx)
            .forEach(v => v.firstElementChild.classList.remove('now'));
        this.dotListEl.children[idx].firstElementChild.classList.add('now');
    }
}