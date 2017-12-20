/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(1);


(function () {
    'use strict';

    const slidesPrev = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* qs */])('.slides_prev');
    const slidesNext = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* qs */])('.slides_next');
    const slides = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* qsa */])('.main_slides_list > li');
    const dots = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* qsa */])('.slides_dots > li > a');

    const slidesEnd = slides.length - 1;
    let slideIndex = 0;
    let slideImg;

    function setView() {
        initSlide();
        initBanchan();
    }

    async function initSlide() {
        const url = 'http://home.dotol.xyz/php/test_api.php';
        const data = await request(url);
        slideImg = JSON.parse(data);

        showSlides(slideIndex);
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* $on */])(slidesPrev, 'click', () => moveSlides(-1));
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* $on */])(slidesNext, 'click', () => moveSlides(1));
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* $delegate */])('.slides_dots', '.slides_dots > li > a', 'click', (e) => currentSlide(+e.delegateTarget.textContent));
    }

    function removeCurrentDisplay() {
        const currentIndex = slideIndex;
        slides[currentIndex].className = 'fadeout';
        setTimeout(() => {
            slides[currentIndex].style.display = 'none';
        }, 1000);
        dots[currentIndex].classList.remove('now');
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
        dots[slideIndex].className = 'now';
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
                reject('timeout');
            };
            xhr.send();
        });
    }

    async function initBanchan() {
        const url = 'http://crong.codesquad.kr:8080/woowa/best';
        const data = await request(url);
        const food = JSON.parse(data);

        const foodTab = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* qs */])('.best_food_tabs');
        const foodTabString = food.map(value => `<li><a href="#" data-category_id="${value.category_id}">${value.name}</a></li>`).join('');
        foodTab.insertAdjacentHTML('afterbegin', foodTabString);

        const foodContainer = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* qs */])('.best_food_container');
        const containerString = food.map(value => `<ul class="best_food_box_list" data-category_id="${value.category_id}"></ul>`).join('');
        foodContainer.insertAdjacentHTML('afterbegin', containerString);

        const foodList = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* qsa */])('.best_food_box_list');
        const foodBoxTemplate = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* qs */])('#foodBoxTemplate');
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

        const foodBox = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* qsa */])('.best_food_box');
        food.forEach((value, i) => {
            value.items.forEach((item, j) => {
                const badges = `<div class="badge_list">${item.badge ? item.badge.map(badge => `<div class='badge'>${badge}</div>`).join('') : ''}</div>`;
                foodBox[i * 3 + j].insertAdjacentHTML('beforeend', badges);

                const deliveryType = `<div class='food_img_hover'><ul>${item.delivery_type ? item.delivery_type.map(type => `<li><span>${type}</span></li>`).join('') : ''}</ul></div>`;
                foodBox[i * 3 + j].firstElementChild.insertAdjacentHTML('beforeend', deliveryType);
            });
        });

        const foodTabList = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* qsa */])('.best_food_tabs > li > a');
        const initNum = Math.floor(Math.random() * 6);
        foodList[initNum].style.display = 'block';
        foodTabList[initNum].className = 'now';
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* $delegate */])(foodTab, 'li > a', 'click', e => {
            Array.from(foodTabList).forEach(tab => tab.className =
                tab === e.delegateTarget ? 'now' : '');
            Array.from(foodList).forEach(food => food.style.display =
                e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none');
            e.preventDefault();
        });
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* $on */])(window, 'load', setView);
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = qs;
/* harmony export (immutable) */ __webpack_exports__["d"] = qsa;
/* harmony export (immutable) */ __webpack_exports__["b"] = $on;
/* harmony export (immutable) */ __webpack_exports__["a"] = $delegate;
/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} element Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} useCapture Capture the event
 */
function $on(element, type, callback, useCapture) {
    element.addEventListener(type, callback, useCapture);
}

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function () {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    };
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function $delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function (e) {
        e.delegateTarget = e.target.closest(selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    };
}

/***/ })
/******/ ]);