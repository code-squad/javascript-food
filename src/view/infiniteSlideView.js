import foodBoxInfiniteTemplate from '../template/foodBoxInfinite-tpl.html';
import badgeTemplate from '../template/badge-tpl.html';
import deliveryTypeTemplate from '../template/deliveryType-tpl.html';
import {
    qs,
    qsa,
    on,
    throttle
} from '../helpers';

export default class {
    constructor(name) {
        this.foodBoxEl = qs(`.${name}_food .infinite_food_box_list`);
        this.slidesPrevEl = qs(`.${name}_food .slides_prev`);
        this.slidesNextEl = qs(`.${name}_food .slides_next`);

        this.state = {
            name,
            el: this.foodBoxEl,
            direction: -20
        };
    }

    bind(bindCmd, handler) {
        const bindCommands = {
            slides: () => {
                on(this.foodBoxEl, 'transitionend', () => handler(this.state));
            },
            slidesPrev: () => {
                on(this.slidesPrevEl, 'click', throttle(() => handler(this.state, 10), 600));
            },
            slidesNext: () => {
                on(this.slidesNextEl, 'click', throttle(() => handler(this.state, -10), 600));
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
        this.renderFoodBoxList(this.state.el, food)
            .renderFoodBox(food, qsa(`.${this.state.name}_food .prd_box>a`))
            .renderSlides(this.state.el, qsa(`.${this.state.name}_food .prd_box`))
            .showSlides(this.state.el, this.state.direction, true);
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

    renderFoodBox(food, prdBox) {
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

    showSlides(element, direction, Immediately) {
        element.style.transitionDuration = Immediately ? '0s' : '0.5s';
        element.style.transform = `translateX(${direction}%)`;
    }
}