import foodBoxSideTemplate from '../template/foodBoxSide-tpl.html';
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
        this.slidesSidePrevEl = qs('.side_food .infinite_food_slides_navi>.slides_prev');
        this.slidesSideNextEl = qs('.side_food .infinite_food_slides_navi>.slides_next');

        this.mainFoodBoxEl = qs('.main_food .infinite_food_box_list');
        this.slidesMainPrevEl = qs('.main_food .infinite_food_slides_navi>.slides_prev');
        this.slidesMainNextEl = qs('.main_food .infinite_food_slides_navi>.slides_next');

        this.courseFoodBoxEl = qs('.course_food .infinite_food_box_list');
        this.slidesCoursePrevEl = qs('.course_food .infinite_food_slides_navi>.slides_prev');
        this.slidesCourseNextEl = qs('.course_food .infinite_food_slides_navi>.slides_next');
    }

    bind(event, handler) {
        switch (event) {
            case 'sideSlidesPrev':
                on(this.slidesSidePrevEl, 'click', throttle(() => handler(10), 800));
                break;
            case 'sideSlidesNext':
                on(this.slidesSideNextEl, 'click', throttle(() => handler(-10), 800));
                break;
            case 'sideSlides':
                on(this.sideFoodBoxEl, 'transitionend', () => handler());
                break;
            case 'mainSlidesPrev':
                on(this.slidesMainPrevEl, 'click', throttle(() => handler(10), 800));
                break;
            case 'mainSlidesNext':
                on(this.slidesMainNextEl, 'click', throttle(() => handler(-10), 800));
                break;
            case 'mainSlides':
                on(this.mainFoodBoxEl, 'transitionend', () => handler());
                break;
            case 'courseSlidesPrev':
                on(this.slidesCoursePrevEl, 'click', throttle(() => handler(10), 800));
                break;
            case 'courseSlidesNext':
                on(this.slidesCourseNextEl, 'click', throttle(() => handler(-10), 800));
                break;
            case 'courseSlides':
                on(this.courseFoodBoxEl, 'transitionend', () => handler());
                break;
            default:
                break;
        }
    }

    render(viewCmd, ...parameter) {
        const viewCommands = {
            SideBanchan: () => {
                this.renderBanchan('side', this.sideFoodBoxEl, ...parameter);
            },
            MainBanchan: () => {
                this.renderBanchan('main', this.mainFoodBoxEl, ...parameter);
            },
            CourseBanchan: () => {
                this.renderBanchan('course', this.courseFoodBoxEl, ...parameter);
            }
        };

        viewCommands[viewCmd]();
    }


    renderBanchan(name, element, food, direction) {
        this.renderFoodBoxSideList(element, food);
        this.renderFoodBoxSide(food, qsa(`.${name}_food .prd_box>a`));
        this.renderSlides(element, qsa(`.${name}_food .prd_box`));
        this.showSlides(name, direction, true);
    }

    renderFoodBoxSideList(element, food) {
        const foodBoxSideList = food.map(item =>
            foodBoxSideTemplate({
                image: item.image,
                alt: item.alt,
                title: item.title,
                description: item.description,
                old_price: item.n_price,
                new_price: item.s_price.slice(0, -1),
                won: item.s_price.slice(-1)
            })).join('');
        element.insertAdjacentHTML('afterbegin', foodBoxSideList);
    }

    renderFoodBoxSide(food, prdBox) {
        food.forEach((item, i) => {
            prdBox[i].insertAdjacentHTML('beforeend', badgeTemplate({
                badge: item.badge
            }));
            prdBox[i].firstElementChild.insertAdjacentHTML('beforeend', deliveryTypeTemplate({
                delivery_type: item.delivery_type
            }));
        });
    }

    renderSlides(element, sideSlides) {
        const sideSlidesSecond = Array.from(sideSlides).slice(sideSlides.length / 2);
        sideSlides.forEach(sideSlide =>
            element.appendChild(sideSlide.cloneNode(true)));
        sideSlidesSecond.reverse().forEach(sideSlideSecond =>
            element.insertBefore(sideSlideSecond.cloneNode(true), element.childNodes[0]));
    }

    showSlides(name, direction, Immediately) {
        let element;
        switch (name) {
            case 'side':
                element = this.sideFoodBoxEl;
                break;
            case 'main':
                element = this.mainFoodBoxEl;
                break;
            case 'course':
                element = this.courseFoodBoxEl;
                break;
        }

        element.style.transitionDuration = Immediately ? '0s' : '0.5s';
        element.style.transform = `translateX(${direction}%)`;
    }
}