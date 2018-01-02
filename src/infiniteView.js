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
            default:
                break;
        }
    }

    render(viewCmd, ...parameter) {
        const viewCommands = {
            renderSideBanchan: () => {
                this.renderSideBanchan(...parameter);
            },
            renderMainBanchan: () => {
                this.renderMainBanchan(...parameter);
            }
        };

        viewCommands[viewCmd]();
    }


    renderSideBanchan(food, direction) {
        this.renderFoodBoxSideList(this.sideFoodBoxEl, food);
        this.renderFoodBoxSide(food, qsa('.side_food .prd_box>a'));
        this.renderSideSlides(this.sideFoodBoxEl, qsa('.side_food .prd_box'));
        this.showSlides('side', direction, true);
    }

    renderMainBanchan(food, direction) {
        this.renderFoodBoxSideList(this.mainFoodBoxEl, food);
        this.renderFoodBoxSide(food, qsa('.main_food .prd_box>a'));
        this.renderSideSlides(this.mainFoodBoxEl, qsa('.main_food .prd_box'));
        this.showSlides('main', direction, true);
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

    renderSideSlides(element, sideSlides) {
        const sideSlidesSecond = Array.from(sideSlides).slice(sideSlides.length / 2);
        sideSlides.forEach(sideSlide =>
            element.appendChild(sideSlide.cloneNode(true)));
        sideSlidesSecond.reverse().forEach(sideSlideSecond =>
            element.insertBefore(sideSlideSecond.cloneNode(true), element.childNodes[0]));
    }

    showSlides(name, direction, Immediately) {
        const element = name === 'side' ? this.sideFoodBoxEl : this.mainFoodBoxEl;
        element.style.transitionDuration = Immediately ? '0s' : '0.5s';
        element.style.transform = `translateX(${direction}%)`;
    }
}