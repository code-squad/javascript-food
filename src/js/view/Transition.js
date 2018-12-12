export default class Transition {
    constructor({ mainSlideContentList, mainSlideDotList }) {
        this.contentList = mainSlideContentList;
        this.dotList = mainSlideDotList;
        this.currentIdx = 0;
    }

    init() {
        this.nextBtnClick();
        this.prevBtnClick();
        this.dotBtnClick();
    }

    nextBtnClick() {
        const nextIMG = document.querySelector(".main_slide_wrap .slides_navi .slide_next");
        nextIMG.addEventListener('click', () => {
            this.plusCurrentIdx();
            this.showContent(this.getCurrentIdx());
        })
    }

    prevBtnClick() {
        const preIMG = document.querySelector(".main_slide_wrap .slides_navi .slide_prev");
        preIMG.addEventListener('click', () => {
            this.minusCurrentIdx();
            this.showContent(this.getCurrentIdx());
        })
    }

    dotBtnClick() {
        const parentElement = this.dotList[0].parentElement;
        parentElement.addEventListener('click', ({ target }) => {
            if (target.tagName !== 'A') return;
            this.currentIdx = target.innerText;
            this.showContent(this.getCurrentIdx());
        })
    }

    showContent(currentIdx) {
        this.hiddenContent();
        this.contentList[currentIdx].classList.remove('hidden');
        this.contentList[currentIdx].classList.add('show');
        this.dotList[currentIdx].firstElementChild.classList.add('now');
    }

    hiddenContent() {
        this.contentList.forEach((v, i) => {
            v.classList.add('hidden');
            v.classList.remove('show');
            this.dotList[i].firstElementChild.classList.remove('now');
        })
    }

    getCurrentIdx() {
        const contentCount = this.contentList.length;
        this.currentIdx = this.currentIdx < 0 ? contentCount - 1 : this.currentIdx % contentCount;
        return this.currentIdx;
    }

    plusCurrentIdx() {
        ++this.currentIdx;
    }

    minusCurrentIdx() {
        --this.currentIdx;
    }
}