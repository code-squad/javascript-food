import { debounce, showElement, hideElement } from '../util.js'
export default class ScrollBtnView {
    constructor({ scrollEl, debounceTime = 200, acceleration = 1.5 }) {
        this.scrollEl = scrollEl;
        this.clickScrollBtn(acceleration);
        this.scrollWindow(debounceTime);
    }

    clickScrollBtn(acceleration) {
        this.scrollEl.addEventListener('click', ({ target }) => {
            this.pageScroll(target.className, acceleration);
        })
    }

    scrollWindow(timer) {
        window.addEventListener('scroll', () => {
            hideElement(this.scrollEl);
        })
        window.addEventListener('scroll', debounce(() => {
            showElement(this.scrollEl);
        }, timer))
    }

    pageScroll(className, acceleration) {
        const pageY = scrollY;
        const pageHeight = document.body.scrollHeight;
        let fps = 1;

        if (className === "page-up") pageUp();
        if (className === "page-down") pageDown();

        function pageUp() {
            fps = fps * acceleration;
            scrollTo(0, pageY - fps);
            if (pageY > fps) requestAnimationFrame(pageUp);
        }
        function pageDown() {
            fps = fps * acceleration;
            scrollTo(0, pageY + fps);
            if (pageY + fps < pageHeight) requestAnimationFrame(pageDown);
        }
    }
}