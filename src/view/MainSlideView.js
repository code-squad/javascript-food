import {
    throttle
} from '../helpers';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.slidesPrevEl = this.qs('.slides_prev');
        this.slidesNextEl = this.qs('.slides_next');
        this.slidesEl = this.qsa('.main_slides_list > li');
        this.dotsEl = this.qsa('.slides_dots > li > a');

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

    hideCurrentSlide() {
        this.slidesEl[this.state.index].className = 'fadeout';
        this.dotsEl[this.state.index].classList.remove('now');
        return this;
    }

    showSlide(index, slideImg) {
        this.slidesEl[index].className = 'fadein';
        this.slidesEl[index].style.backgroundImage = `url("${slideImg}")`;
        this.dotsEl[index].className = 'now';
        return this;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

}