import foodBoxInfiniteTemplate from '../template/foodBoxInfinite-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import {
    qs,
    qsa,
    on,
    throttle
} from './helpers';

export default class InfiniteView {
    constructor() {
        this.sideFoodBoxEl = qs('.side_food .infinite_food_box_list');
        this.sideSlidesPrevEl = qs('.side_food .slides_prev');
        this.sideSlidesNextEl = qs('.side_food .slides_next');

        this.mainFoodBoxEl = qs('.main_food .infinite_food_box_list');
        this.mainSlidesPrevEl = qs('.main_food .slides_prev');
        this.mainSlidesNextEl = qs('.main_food .slides_next');

        this.courseFoodBoxEl = qs('.course_food .infinite_food_box_list');
        this.courseSlidesPrevEl = qs('.course_food .slides_prev');
        this.courseSlidesNextEl = qs('.course_food .slides_next');

        this.state = {
            side: {
                name: 'side',
                el: this.sideFoodBoxEl,
                direction: -20
            },
            main: {
                name: 'main',
                el: this.mainFoodBoxEl,
                direction: -20
            },
            course: {
                name: 'course',
                el: this.courseFoodBoxEl,
                direction: -20
            }
        };
    }

    bind(bindCmd, handler) {
        const bindCommands = {
            sideSlides: () => {
                on(this.sideFoodBoxEl, 'transitionend', () => handler(this.state.side));
            },
            sideSlidesPrev: () => {
                on(this.sideSlidesPrevEl, 'click', throttle(() => handler(this.state.side, 10), 600));
            },
            sideSlidesNext: () => {
                on(this.sideSlidesNextEl, 'click', throttle(() => handler(this.state.side, -10), 600));
            },
            mainSlides: () => {
                on(this.mainFoodBoxEl, 'transitionend', () => handler(this.state.main));
            },
            mainSlidesPrev: () => {
                on(this.mainSlidesPrevEl, 'click', throttle(() => handler(this.state.main, 10), 600));
            },
            mainSlidesNext: () => {
                on(this.mainSlidesNextEl, 'click', throttle(() => handler(this.state.main, -10), 600));
            },
            courseSlides: () => {
                on(this.courseFoodBoxEl, 'transitionend', () => handler(this.state.course));
            },
            courseSlidesPrev: () => {
                on(this.courseSlidesPrevEl, 'click', throttle(() => handler(this.state.course, 10), 600));
            },
            courseSlidesNext: () => {
                on(this.courseSlidesNextEl, 'click', throttle(() => handler(this.state.course, -10), 600));
            }
        };

        bindCommands[bindCmd]();
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            sideBanchan: () => {
                this.renderBanchan(this.state.side, parameter);
            },
            mainBanchan: () => {
                this.renderBanchan(this.state.main, parameter);
            },
            courseBanchan: () => {
                this.renderBanchan(this.state.course, parameter);
            }
        };

        viewCommands[viewCmd]();
    }

    renderBanchan(target, food) {
        this.renderFoodBoxList(target.el, food);
        this.renderFoodBox(food, qsa(`.${target.name}_food .prd_box>a`));
        this.renderSlides(target.el, qsa(`.${target.name}_food .prd_box`));
        this.showSlides(target.el, target.direction, true);
    }

    renderFoodBoxList(element, food) {
        const foodBoxList = food.map(item =>
            foodBoxInfiniteTemplate({
                image: item.image,
                alt: item.alt,
                title: item.title,
                description: item.description,
                old_price: item.n_price,
                new_price: item.s_price.slice(0, -1),
                won: item.s_price.slice(-1)
            })).join('');
        element.insertAdjacentHTML('afterbegin', foodBoxList);
    }

    renderFoodBox(food, prdBox) {
        food.forEach((item, i) => {
            prdBox[i].insertAdjacentHTML('beforeend', badgeTemplate({
                badge: item.badge
            }));
            prdBox[i].firstElementChild.insertAdjacentHTML('beforeend', deliveryTypeTemplate({
                delivery_type: item.delivery_type
            }));
        });
    }

    renderSlides(element, Slides) {
        const lastSlides = Array.from(Slides).slice(-4);

        Slides.forEach(Slide =>
            element.appendChild(Slide.cloneNode(true)));
        lastSlides.reverse().forEach(lastSlide =>
            element.insertBefore(lastSlide.cloneNode(true), element.childNodes[0]));
    }

    showSlides(element, direction, Immediately) {
        element.style.transitionDuration = Immediately ? '0s' : '0.5s';
        element.style.transform = `translateX(${direction}%)`;
    }
}