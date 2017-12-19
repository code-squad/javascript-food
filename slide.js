(function () {
    'use strict';

    const slidesPrev = qs('.slides_prev');
    const slidesNext = qs('.slides_next');
    const slides = qsa('.main_slides_list > li');
    const dots = qsa('.slides_dots > li > a');

    const slidesEnd = slides.length - 1;
    let slideIndex = 0;
    let slideImg;

    function setView() {
        initSlide();
        initBanchan();
    }

    async function initSlide() {
        const url = `http://home.dotol.xyz/php/test_api.php`;
        const data = await request(url);
        slideImg = JSON.parse(data);

        showSlides(slideIndex);
        $on(slidesPrev, 'click', () => moveSlides(-1));
        $on(slidesNext, 'click', () => moveSlides(1));
        $delegate('.slides_dots', '.slides_dots > li > a', 'click', (e) => currentSlide(+e.delegateTarget.textContent));
    }

    function removeCurrentDisplay() {
        const currentIndex = slideIndex;
        slides[currentIndex].className = 'fadeout';
        setTimeout(() => {
            slides[currentIndex].style.display = 'none';
        }, 1000);
        dots[currentIndex].classList.remove("now");
    }

    function moveSlides(n) {
        removeCurrentDisplay();
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        removeCurrentDisplay();
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        if (n > slidesEnd) slideIndex = 0;
        if (n < 0) slideIndex = slidesEnd;

        slides[slideIndex].style.display = 'block';
        slides[slideIndex].className = 'fadein';

        slides[slideIndex].style.backgroundImage = `url("${slideImg[slideIndex]}")`;
        dots[slideIndex].className = "now";
    }


    function request(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            };
            xhr.ontimeout = function () {
                reject('timeout')
            };
            xhr.send();
        })
    }

    async function initBanchan() {
        const url = `http://crong.codesquad.kr:8080/woowa/best`;
        const data = await request(url);
        const food = JSON.parse(data);

        const foodTab = qs('.best_food_tabs');
        const foodTabString = food.map(value => `<li><a href="#" data-category_id="${value.category_id}">${value.name}</a></li>`).join('');
        foodTab.insertAdjacentHTML('afterbegin', foodTabString);

        const foodContainer = qs('.best_food_container');
        const containerString = food.map(value => `<ul class="best_food_box_list" data-category_id="${value.category_id}"></ul>`).join('');
        foodContainer.insertAdjacentHTML('afterbegin', containerString);

        const foodList = qsa('.best_food_box_list');
        const foodBoxTemplate = qs('#foodBoxTemplate');
        food.forEach((value, i) => {
            const foodBoxStrs = value.items.map(item => foodBoxTemplate.innerHTML
                .replace('{{image}}', item.image)
                .replace('{{alt}}', item.alt)
                .replace('{{title}}', item.title)
                .replace('{{description}}', item.description)
                .replace('{{old_price}}', item.n_price ? item.n_price : '')
                .replace('{{new_price}}', item.s_price.slice(0, -1))
                .replace('{{won}}', item.s_price.slice(-1))).join('');
            foodList[i].insertAdjacentHTML('afterbegin', foodBoxStrs);
        });

        const foodBox = qsa('.best_food_box');
        food.forEach((value, i) => {
            value.items.forEach((item, j) => {
                const badges = `<div class="badge_list">${item.badge ? item.badge.map(badge => `<div class='badge'>${badge}</div>`).join('') : ''}</div>`;
                foodBox[i * 3 + j].insertAdjacentHTML('beforeend', badges);

                const deliveryType = `<div class='food_img_hover'><ul>${item.delivery_type ? item.delivery_type.map(type => `<li><span>${type}</span></li>`).join('') : ''}</ul></div>`;
                foodBox[i * 3 + j].firstElementChild.insertAdjacentHTML('beforeend', deliveryType);
            });
        });

        const foodTabList = qsa('.best_food_tabs > li > a');
        const initNum = Math.floor(Math.random() * 6);
        foodList[initNum].style.display = 'block';
        foodTabList[initNum].className = 'now';
        $delegate(foodTab, 'li > a', 'click', e => {
            Array.from(foodTabList).forEach(tab => tab.className =
                tab === e.delegateTarget ? 'now' : '');
            Array.from(foodList).forEach(food => food.style.display =
                e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none');
            e.preventDefault();
        });
    }

    $on(window, 'load', setView);
})();