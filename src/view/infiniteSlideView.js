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
            HSlope: ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 1,
            index: -20,
            startIndex: -20,
            moveType: -1,
            startX: -1,
            startY: -1,
            startTime: 0,
            startEvent: false
        };
    }

    bind(bindCmd) {
        const bindCommands = {
            transitionend: () => {
                this.on('transitionend', () => this.emit('@transitionend'));
            },
            slidesNavi: () => {
                this.delegate('.infinite_food_slides_navi > a', 'click', throttle(e => this.emit('@move', {
                    direction: +e.delegateTarget.dataset.direction
                }), 1000));
            },
            touch: () => {
                this.on('touchstart', throttle(e => {
                    this.initTouchInfo();
                    this.state.startIndex = Math.ceil(this.state.index / 10) * 10;
                    this.state.startX = e.changedTouches[0].pageX;
                    this.state.startY = e.changedTouches[0].pageY;
                    this.state.startTime = e.timeStamp;
                    this.state.startEvent = true;
                }, 1000));
                this.on('touchmove', e => this.state.startEvent && this.emit('@touchmove', {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                }));
                this.on('touchend', e => this.state.startEvent && this.emit('@touchend', {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                }));
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
        this.renderFoodBoxList(food).renderFoodBoxOption(food).renderSlides().showSlides({
            Immediately: true
        });
    }

    renderFoodBoxList(food) {
        const foodBoxList = food.map(item => foodBoxInfiniteTemplate({
            image: item.image,
            alt: item.alt,
            title: item.title,
            description: item.description,
            old_price: item.n_price,
            new_price: item.s_price.slice(0, -1),
            won: item.s_price.slice(-1)
        })).join('');
        this.foodBoxListEl.insertAdjacentHTML('afterbegin', foodBoxList);
        return this;
    }

    renderFoodBoxOption(food) {
        const prdBox = this.qsa('.prd_box>a');
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

    renderSlides() {
        const slides = this.qsa('.prd_box');
        const lastSlides = Array.from(slides).slice(-4);

        slides.forEach(slide => this.foodBoxListEl.appendChild(slide.cloneNode(true)));
        lastSlides.reverse().forEach(lastSlide => this.foodBoxListEl.insertBefore(lastSlide.cloneNode(true), this.foodBoxListEl.childNodes[0]));
        return this;
    }

    showSlides({
        Immediately
    }) {
        this.foodBoxListEl.style.transitionDuration = Immediately ? '0s' : '0.5s';
        this.foodBoxListEl.style.transform = `translateX(${this.state.index}%)`;
        return this;
    }

    initTouchInfo() {
        this.state.moveType = -1;
        this.state.startX = -1;
        this.state.startY = -1;
        this.state.startTime = 0;
        this.state.startEvent = false;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

    setMoveType(type) {
        this.state.moveType = type;
        return this;
    }

    setThreshold(threshold) {
        this.state.thresholdL = -20 - threshold;
        this.state.thresholdR = -20 + threshold;
        return this;
    }
}