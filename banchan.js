(function () {
    'use strict';

    function setView() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://crong.codesquad.kr:8080/woowa/best', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                const data = JSON.parse(request.responseText);

                const foodTab = qs('.best_food_tabs');
                const foodTabString = data.map(value => `<li><a href="#" data-category_id="${value.category_id}">${value.name}</a></li>`).join('');
                foodTab.insertAdjacentHTML('afterbegin', foodTabString);

                const foodContainer = qs('.best_food_container');
                const containerString = data.map(value => `<ul class="best_food_box_list" data-category_id="${value.category_id}"></ul>`).join('');
                foodContainer.insertAdjacentHTML('afterbegin', containerString);

                const foodList = qsa('.best_food_box_list');
                const foodBoxTemplate = qs('#foodBoxTemplate');
                data.forEach((value, i) => {
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
                data.forEach((value, i) => {
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

            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };

        request.send();



    }

    $on(window, 'load', setView);
})();