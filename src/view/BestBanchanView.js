import foodBoxTemplate from '../template/foodBox-tpl.html';
import foodTabTemplate from '../template/foodTab-tpl.html';
import containerTemplate from '../template/container-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.foodTabEl = this.qs('.best_food_tabs');
    }

    bind(bindCmd) {
        const bindCommands = {
            foodTab: () => {
                this.delegate('li > a', 'click', e => {
                    Array.from(this.foodTabListEl).forEach(tab => tab.className =
                        tab === e.delegateTarget ? 'now' : '');
                    Array.from(this.foodBoxListEl).forEach(food => food.style.display =
                        e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none');
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(viewCmd, ...params) {
        const viewCommands = {
            bestBanchan: () => {
                this.bestBanchan(...params);
            }
        };

        viewCommands[viewCmd]();
        return this;
    }

    bestBanchan(food) {
        this.renderFoodTab(food).renderFoodContainer(food)
            .renderFoodBoxList(food).renderFoodBox(food)
            .renderSelectedFood(food, Math.floor(Math.random() * 6));
    }

    renderFoodTab(food) {
        const foodTab = food.map(value => foodTabTemplate({
            category_id: value.category_id,
            name: value.name
        })).join('');
        this.foodTabEl.insertAdjacentHTML('afterbegin', foodTab);
        return this;
    }

    renderFoodContainer(food) {
        const foodContainerEl = this.qs('.best_food_container');
        const foodContainer = food.map(value => containerTemplate({
            category_id: value.category_id
        })).join('');
        foodContainerEl.insertAdjacentHTML('afterbegin', foodContainer);
        return this;
    }

    renderFoodBoxList(food) {
        this.foodBoxListEl = this.qsa('.best_food_box_list');
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
        return this;
    }

    renderFoodBox(food) {
        const foodBoxEl = this.qsa('.best_food_box');
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
        return this;
    }

    renderSelectedFood(food, initNum) {
        this.foodTabListEl = this.qsa('.best_food_tabs > li > a');
        this.foodTabListEl[initNum].className = 'now';
        this.foodBoxListEl[initNum].style.display = 'block';
    }

}