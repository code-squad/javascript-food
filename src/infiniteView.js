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
        this.sideSlidesPrevEl = qs('.side_food .infinite_food_slides_navi>.slides_prev');
        this.sideSlidesNextEl = qs('.side_food .infinite_food_slides_navi>.slides_next');

        this.mainFoodBoxEl = qs('.main_food .infinite_food_box_list');
        this.mainSlidesPrevEl = qs('.main_food .infinite_food_slides_navi>.slides_prev');
        this.mainSlidesNextEl = qs('.main_food .infinite_food_slides_navi>.slides_next');

        this.courseFoodBoxEl = qs('.course_food .infinite_food_box_list');
        this.courseSlidesPrevEl = qs('.course_food .infinite_food_slides_navi>.slides_prev');
        this.courseSlidesNextEl = qs('.course_food .infinite_food_slides_navi>.slides_next');

        this.data = {
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

    bind(event, handler) {
        switch (event) {
            case 'sideSlides':
                on(this.sideFoodBoxEl, 'transitionend', () => handler(this.data.side));
                break;
            case 'sideSlidesPrev':
                on(this.sideSlidesPrevEl, 'click', throttle(() => handler(this.data.side, 10), 600));
                break;
            case 'sideSlidesNext':
                on(this.sideSlidesNextEl, 'click', throttle(() => handler(this.data.side, -10), 600));
                break;
            case 'mainSlides':
                on(this.mainFoodBoxEl, 'transitionend', () => handler(this.data.main));
                break;
            case 'mainSlidesPrev':
                on(this.mainSlidesPrevEl, 'click', throttle(() => handler(this.data.main, 10), 600));
                break;
            case 'mainSlidesNext':
                on(this.mainSlidesNextEl, 'click', throttle(() => handler(this.data.main, -10), 600));
                break;
            case 'courseSlides':
                on(this.courseFoodBoxEl, 'transitionend', () => handler(this.data.course));
                break;
            case 'courseSlidesPrev':
                on(this.courseSlidesPrevEl, 'click', throttle(() => handler(this.data.course, 10), 600));
                break;
            case 'courseSlidesNext':
                on(this.courseSlidesNextEl, 'click', throttle(() => handler(this.data.course, -10), 600));
                break;
            default:
                break;
        }
    }

    render(viewCmd, ...parameter) {
        const viewCommands = {
            sideBanchan: () => {
                this.renderBanchan('side', this.sideFoodBoxEl, ...parameter);
            },
            mainBanchan: () => {
                this.renderBanchan('main', this.mainFoodBoxEl, ...parameter);
            },
            courseBanchan: () => {
                this.renderBanchan('course', this.courseFoodBoxEl, ...parameter);
            }
        };

        viewCommands[viewCmd]();
    }

    renderBanchan(name, element, food) {
        this.renderFoodBoxList(element, food);
        this.renderFoodBox(food, qsa(`.${name}_food .prd_box>a`));
        this.renderSlides(element, qsa(`.${name}_food .prd_box`));
        this.showSlides(name, this.data[name].direction, true);
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

    showSlides(name, direction, Immediately) {
        const element = this.data[name].el;

        element.style.transitionDuration = Immediately ? '0s' : '0.5s';
        element.style.transform = `translateX(${direction}%)`;
    }
}