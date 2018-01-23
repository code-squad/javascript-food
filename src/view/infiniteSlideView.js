import foodBoxInfiniteTemplate from '../template/foodBoxInfinite-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import {
    throttle
} from '../helpers';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.foodBoxListEl = this.qs('.infinite_food_box_list');

        this.state = {
            index: -20
        };
    }

    bind(bindCmd) {
        const bindCommands = {
            transitionend: () => {
                this.on('transitionend', () => this.emit('@transitionend', {
                    index: this.state.index
                }));
            },
            slidesNavi: () => {
                this.delegate('.infinite_food_slides_navi > a', 'click',
                    throttle(e => this.emit('@move', {
                        index: this.state.index,
                        direction: +e.delegateTarget.dataset.direction
                    }), 1000));
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(viewCmd, ...params) {
        const viewCommands = {
            banchan: () => {
                this.banchan(...params);
            }
        };

        viewCommands[viewCmd]();
        return this;
    }

    banchan(food) {
        this.renderFoodBoxList(this.foodBoxListEl, food)
            .renderFoodBoxOption(food, this.qsa('.prd_box>a'))
            .renderSlides(this.foodBoxListEl, this.qsa('.prd_box'))
            .showSlides({
                Immediately: true
            });
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
        return this;
    }

    renderFoodBoxOption(food, prdBox) {
        food.forEach((item, i) => {
            prdBox[i].insertAdjacentHTML('beforeend', badgeTemplate({
                badge: item.badge
            }));
            prdBox[i].firstElementChild.insertAdjacentHTML('beforeend', deliveryTypeTemplate({
                delivery_type: item.delivery_type
            }));
        });
        return this;
    }

    renderSlides(element, Slides) {
        const lastSlides = Array.from(Slides).slice(-4);

        Slides.forEach(Slide =>
            element.appendChild(Slide.cloneNode(true)));
        lastSlides.reverse().forEach(lastSlide =>
            element.insertBefore(lastSlide.cloneNode(true), element.childNodes[0]));
        return this;
    }

    showSlides({
        Immediately
    }) {
        this.foodBoxListEl.style.transitionDuration = Immediately ? '0s' : '0.5s';
        this.foodBoxListEl.style.transform = `translateX(${this.state.index}%)`;
        return this;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }
}