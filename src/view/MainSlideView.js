import mainSlideTemplate from '../template/mainSlide-tpl.html';
import {
    throttle
} from '../helpers';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);

        this.state = {
            index: 0
        };
    }

    bind(bindCmd) {
        const bindCommands = {
            slidesNavi: () => {
                this.delegate('.slides_navi > a', 'click',
                    throttle(e => this.emit('@move', {
                        index: this.state.index,
                        direction: +e.delegateTarget.dataset.direction
                    }), 1000));
            },
            slidesDots: () => {
                this.delegate('.slides_dots > li > a', 'click',
                    throttle(e => this.emit('@selectDot', {
                        index: +e.delegateTarget.textContent
                    }), 1000));
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(viewCmd, ...params) {
        const viewCommands = {
            mainSlide: () => {
                this.mainSlide(...params);
            }
        };

        viewCommands[viewCmd]();
        return this;
    }

    mainSlide(slideImgs) {
        this.renderMainSlide(slideImgs).showSlide();
    }

    renderMainSlide(slideImgs) {
        const mainSlideStr = mainSlideTemplate({
            slideImgs
        });
        this.el.insertAdjacentHTML('afterbegin', mainSlideStr);
        this.slidesEl = this.qsa('.main_slides_list > li');
        this.dotsEl = this.qsa('.slides_dots > li > a');
        return this;
    }

    hideSlide() {
        this.slidesEl[this.state.index].className = 'fadeout';
        this.dotsEl[this.state.index].classList.remove('now');
        return this;
    }

    showSlide() {
        this.slidesEl[this.state.index].className = 'fadein';
        this.dotsEl[this.state.index].className = 'now';
        return this;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

}