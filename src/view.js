import foodBoxTemplate from '../template/foodBox-tpl.html';
import foodTabTemplate from '../template/foodTab-tpl.html';
import containerTemplate from '../template/container-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import badgeSideTemplate from '../template/badgeSide-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import {qs,qsa,$on,$delegate} from './helpers';

export default class View {
    constructor() {
        this.foodTabEl = qs('.best_food_tabs');
        this.slidesPrevEl = qs('.slides_prev');
        this.slidesNextEl = qs('.slides_next');
        this.slidesSidePrevEl = qs('.side_food_slides_navi>.slides_prev');
        this.slidesSideNextEl = qs('.side_food_slides_navi>.slides_next');
        this.slidesEl = qsa('.main_slides_list > li');
        this.dotsEl = qsa('.slides_dots > li > a');
        this.sideFoodBoxEl = qs('.side_food_box_list');
    }

    bindSlidesPrev(handler) {
        $on(this.slidesPrevEl, 'click', () => handler(-1));
    }

    bindSlidesNext(handler) {
        $on(this.slidesNextEl, 'click', () => handler(1));
    }

    bindSlidesSidePrev(handler) {
        $on(this.slidesSidePrevEl, 'click', throttle(() => handler(10), 800));
    }

    bindSlidesSideNext(handler) {
        $on(this.slidesSideNextEl, 'click', throttle(() => handler(-10), 800));
    }

    bindSideSlides(handler) {
        $on(this.sideFoodBoxEl, 'transitionend', () => handler(true));
    }

    bindSlidesDots(handler) {
        $delegate('.slides_dots', '.slides_dots > li > a', 'click', (e) => handler(+e.delegateTarget.textContent));
    }

    bindPreventDefault() {
        $delegate('body', 'a', 'click', e => e.preventDefault());
    }

    bindFoodTab() {
        $delegate(this.foodTabEl, 'li > a', 'click', e => {
            Array.from(this.foodTabListEl).forEach(tab => tab.className =
                tab === e.delegateTarget ? 'now' : '');
            Array.from(this.foodBoxListEl).forEach(food => food.style.display =
                e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none');
        });
    }


    renderBanchan(food) {
        this.renderFoodTab(food);
        this.renderFoodContainer(food);
        this.renderFoodBoxList(food);
        this.renderFoodBox(food);
        this.renderFoodTabList(food, Math.floor(Math.random() * 6));
    }


    renderSideBanchan(food) {
        this.renderFoodBoxSideList(food);
        this.renderFoodBoxSide(food);
        this.renderSideSlides();
    }

    renderFoodTab(food) {
        this.foodTabEl.insertAdjacentHTML('afterbegin', food.map(value => foodTabTemplate({
            category_id: value.category_id,
            name: value.name
        })).join(''));
    }

    renderFoodContainer(food) {
        qs('.best_food_container').insertAdjacentHTML('afterbegin', food.map(value => containerTemplate({
            category_id: value.category_id
        })).join(''));
    }

    renderFoodBoxList(food) {
        this.foodBoxListEl = qsa('.best_food_box_list');
        food.forEach((value, i) => {
            this.foodBoxListEl[i].insertAdjacentHTML('afterbegin', value.items.map(item =>
                foodBoxTemplate({
                    image: item.image,
                    alt: item.alt,
                    title: item.title,
                    description: item.description,
                    old_price: item.n_price,
                    new_price: item.s_price.slice(0, -1),
                    won: item.s_price.slice(-1)
                })).join(''));
        });
    }

    renderFoodBox(food) {
        const foodBoxEl = qsa('.best_food_box');
        food.forEach((value, i) => {
            const len = value.items.length;
            value.items.forEach((item, j) => {
                foodBoxEl[i * len + j].insertAdjacentHTML('beforeend', badgeTemplate({
                    badge: item.badge
                }));
                foodBoxEl[i * len + j].firstElementChild.insertAdjacentHTML('beforeend', deliveryTypeTemplate({
                    delivery_type: item.delivery_type
                }));
            });
        });
    }

    renderFoodBoxSideList(food) {
        this.sideFoodBoxEl.insertAdjacentHTML('afterbegin', food.map(item =>
            foodBoxSideTemplate({
                image: item.image,
                alt: item.alt,
                title: item.title,
                description: item.description,
                old_price: item.n_price,
                new_price: item.s_price.slice(0, -1),
                won: item.s_price.slice(-1)
            })).join(''));
    }

    renderFoodBoxSide(food) {
        const prdBox = qsa('.prd_box>a');
        food.forEach((item, i) => {
            prdBox[i].insertAdjacentHTML('beforeend', badgeSideTemplate({
                badge: item.badge
            }));
            prdBox[i].firstElementChild.insertAdjacentHTML('beforeend', deliveryTypeTemplate({
                delivery_type: item.delivery_type
            }));
        });
    }

    renderSideSlides() {
        const sideSlides = qsa('.prd_box');
        const sideSlidesSecond = Array.from(sideSlides).slice(sideSlides.length / 2);

        sideSlides.forEach(sideSlide =>
            this.sideFoodBoxEl.appendChild(sideSlide.cloneNode(true)));

        sideSlidesSecond.reverse().forEach(sideSlideSecond =>
            this.sideFoodBoxEl.insertBefore(sideSlideSecond.cloneNode(true), this.sideFoodBoxEl.childNodes[0]));
    }

    renderFoodTabList(food, initNum) {
        this.foodTabListEl = qsa('.best_food_tabs > li > a');
        this.foodTabListEl[initNum].className = 'now';
        this.foodBoxListEl[initNum].style.display = 'block';
    }

    removeCurrentDisplay(currentIndex) {
        this.slidesEl[currentIndex].className = 'fadeout';
        this.dotsEl[currentIndex].classList.remove('now');
    }

    showSlides(slideIndex, slideImg) {
        this.slidesEl[slideIndex].className = 'fadein';
        this.slidesEl[slideIndex].style.backgroundImage = `url("${slideImg}")`;
        this.dotsEl[slideIndex].className = 'now';
    }

    showSideSlides(direction) {
        this.sideFoodBoxEl.style.transitionDuration = '0.5s';
        this.sideFoodBoxEl.style.transform = `translateX(${direction}%)`;
    }

    resetSideSlides(direction) {
        this.sideFoodBoxEl.style.transitionDuration = '0s';
        this.sideFoodBoxEl.style.transform = `translateX(${direction}%)`;
    }

}