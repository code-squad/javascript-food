import foodBoxTemplate from '../template/foodBox-tpl.html';
import foodTabTemplate from '../template/foodTab-tpl.html';
import containerTemplate from '../template/container-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import {
    qs,
    qsa,
    on,
    throttle,
    delegate
} from './helpers';

export default class View {
    constructor() {
        this.foodTabEl = qs('.best_food_tabs');
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
                    'click', (e) => handler(this.state, +e.delegateTarget.textContent));
            },
            scroller: () => {
                delegate('.page_up_down_list', '.page_up_down_list > li > a',
                    'click', (e) => handler(e.delegateTarget.dataset.direction));
            },
            foodTab: () => {
                delegate(this.foodTabEl, 'li > a', 'click', e => {
                    Array.from(this.foodTabListEl).forEach(tab => tab.className =
                        tab === e.delegateTarget ? 'now' : '');
                    Array.from(this.foodBoxListEl).forEach(food => food.style.display =
                        e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none');
                });
            },
            preventDefault: () => {
                delegate('body', 'a', 'click', e => e.preventDefault());
            }
        };

        bindCommands[bindCmd]();
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            bestBanchan: () => {
                this.bestBanchan(parameter);
            }
        };

        viewCommands[viewCmd]();
    }

    bestBanchan(food) {
        this.renderFoodTab(food);
        this.renderFoodContainer(food);
        this.renderFoodBoxList(food);
        this.renderFoodBox(food);
        this.renderFoodTabList(food, Math.floor(Math.random() * 6));
    }


    renderFoodTab(food) {
        const foodTab = food.map(value => foodTabTemplate({
            category_id: value.category_id,
            name: value.name
        })).join('');
        this.foodTabEl.insertAdjacentHTML('afterbegin', foodTab);
    }

    renderFoodContainer(food) {
        const foodContainer = food.map(value => containerTemplate({
            category_id: value.category_id
        })).join('');
        qs('.best_food_container').insertAdjacentHTML('afterbegin', foodContainer);
    }

    renderFoodBoxList(food) {
        this.foodBoxListEl = qsa('.best_food_box_list');
        food.forEach((value, i) => {
            const foodBoxList = value.items.map(item =>
                foodBoxTemplate({
                    image: item.image,
                    alt: item.alt,
                    title: item.title,
                    description: item.description,
                    old_price: item.n_price,
                    new_price: item.s_price.slice(0, -1),
                    won: item.s_price.slice(-1)
                })).join('');
            this.foodBoxListEl[i].insertAdjacentHTML('afterbegin', foodBoxList);
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

    renderFoodTabList(food, initNum) {
        this.foodTabListEl = qsa('.best_food_tabs > li > a');
        this.foodTabListEl[initNum].className = 'now';
        this.foodBoxListEl[initNum].style.display = 'block';
    }

    hideSlide(currentIndex) {
        this.slidesEl[currentIndex].className = 'fadeout';
        this.dotsEl[currentIndex].classList.remove('now');
    }

    showSlide(slideIndex, slideImg) {
        this.slidesEl[slideIndex].className = 'fadein';
        this.slidesEl[slideIndex].style.backgroundImage = `url("${slideImg}")`;
        this.dotsEl[slideIndex].className = 'now';
    }
}