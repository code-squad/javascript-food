import {
    qs,
    qsa,
    on,
    throttle,
    delegate
} from '../helpers';

export default class {
    constructor() {
        this.slidesPrevEl = qs('.slides_prev');
        this.slidesNextEl = qs('.slides_next');
        this.slidesEl = qsa('.main_slides_list > li');
        this.dotsEl = qsa('.slides_dots > li > a');

        this.state = {
            index: 0
        };
    }

    bind(bindCmd, handler) {
        const bindCommands = {
            slidesPrev: () => {
                on(this.slidesPrevEl, 'click', throttle(() => handler(this.state, -1), 1000));
            },
            slidesNext: () => {
                on(this.slidesNextEl, 'click', throttle(() => handler(this.state, 1), 1000));
            },
            slidesDots: () => {
                delegate('.slides_dots', '.slides_dots > li > a',
                    'click', throttle(e => handler(this.state, +e.delegateTarget.textContent), 1000));
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    hideSlide(currentIndex) {
        this.slidesEl[currentIndex].className = 'fadeout';
        this.dotsEl[currentIndex].classList.remove('now');
        return this;
    }

    showSlide(slideIndex, slideImg) {
        this.slidesEl[slideIndex].className = 'fadein';
        this.slidesEl[slideIndex].style.backgroundImage = `url("${slideImg}")`;
        this.dotsEl[slideIndex].className = 'now';
        return this;
    }

}