import { slideTpl } from '../../template/slideTpl.js';
import { throttle } from '../../util.js'
export default class SlideContent {
    constructor({ slideListEl, naviEl }) {
        this.slideListEl = slideListEl;
        this.naviEl = naviEl;
    }

    init(idx) {
        const currentContentEl = this.slideListEl.children[1];
        this.render(currentContentEl, this.getCurrentContent(idx));
    }

    clickNextBtn(handler, throttleTime) {
        const nextBtn = this.naviEl.querySelector('.slide-next');
        nextBtn.addEventListener('click', throttle(handler, throttleTime))
    }

    clickPreBtn(handler, throttleTime) {
        const preBtn = this.naviEl.querySelector('.slide-prev');
        preBtn.addEventListener('click', throttle(handler, throttleTime))
    }

    showPreContent(idx) {
        const preContentEl = this.slideListEl.children[0];
        const nextContentEl = this.slideListEl.children[2];

        this.render(preContentEl, this.getCurrentContent(idx));

        this.slideListEl.insertBefore(nextContentEl, preContentEl);
    }

    showNextContent(idx) {
        const preContentEl = this.slideListEl.children[0];
        const nextContentEl = this.slideListEl.children[2];

        //그 다음에 보여줄 content를 render한다.
        this.render(nextContentEl, this.getCurrentContent(idx));
        //맨앞에 있는 li엘리먼트를 맨 마지막 순서로 옮겨준다. 
        this.slideListEl.appendChild(preContentEl);
    }

    render(element, data) {
        element.innerHTML = slideTpl(data);
    }

    setContentData(contentData) {
        this.contentData = contentData;
    }

    getCurrentContent(idx) {
        return this.contentData[idx];
    }
}