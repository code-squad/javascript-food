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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qs = qs;
exports.qsa = qsa;
exports.on = on;
exports.delegate = delegate;
exports.request = request;
exports.throttle = throttle;
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
exports.isValid = isValid;
exports.moveScroll = moveScroll;
exports.isString = isString;
exports.isUpdown = isUpdown;
exports.isESC = isESC;
exports.isEnter = isEnter;
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
function on(element, type, callback, useCapture) {
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
        destroy: function destroy() {
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
function delegate(elements, selector, type, callback, useCapture) {
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

/**
 * AJAX request.
 *
 * @param {String} url
 * @return {Object}
 */
function request(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = function () {
            return xhr.status >= 200 && xhr.status < 400 ? resolve(JSON.parse(xhr.response)) : reject(xhr.status);
        };
        xhr.ontimeout = function () {
            return reject('timeout');
        };
        xhr.send();
    });
}
/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} limit Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

function throttle(func, limit) {
    var _arguments = arguments;

    var wait = false;
    return function () {
        if (!wait) {
            func.apply(null, _arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    };
}

/**
 * acceleration until halfway, then deceleration
 *
 * @param {Number} t current time
 * @param {Number} b start value
 * @param {Number} c change in value
 * @param {Number} d duration
 * @return {Number} new scrollY
 */

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

/**
 * accelerating from zero velocity
 *
 * @param {Number} t current time
 * @param {Number} b start value
 * @param {Number} c change in value
 * @param {Number} d duration
 * @return {Number} new scrollY
 */

function easeInQuad(t, b, c, d) {
    t /= d / 2;
    return c / 2 * t * t + b;
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value.data;
}

function isValid(receivedTime, thresholdHour) {
    var currentTime = Date.now();
    var elapsedTime = (currentTime - receivedTime) / 1000 / 60 / 60;
    return elapsedTime < thresholdHour;
}

function moveScroll(to) {
    var start = scrollY;
    var change = to - start;
    var duration = Math.abs(change / 4);
    var increment = 20;
    var currentTime = 0;

    var animateScroll = function animateScroll() {
        currentTime += increment;
        var newY = easeInQuad(currentTime, start, change, duration);
        scrollTo(0, newY);
        if (currentTime < duration) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
}

function isString(key) {
    return !key || (key < 35 || key > 40) && key !== 13 && key !== 27;
}

function isUpdown(key) {
    // down (40), up (38)
    return key === 40 || key === 38;
}

function isESC(key) {
    return key === 27;
}

function isEnter(key) {
    return key === 13;
}

var fetchJSONP = exports.fetchJSONP = function (unique) {
    return function (url) {
        return new Promise(function (resolve) {
            var script = document.createElement('script');
            var name = '_jsonp_' + unique++;
            url += url.match(/\?/) ? '&callback=' + name : '?callback=' + name;
            script.src = url;
            window[name] = function (json) {
                resolve(json);
                script.remove();
                delete window[name];
            };
            document.body.appendChild(script);
        });
    };
}(0);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(9)['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(10);

var _decorators = __webpack_require__(18);

var _logger = __webpack_require__(20);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _controller = __webpack_require__(6);

var _controller2 = _interopRequireDefault(_controller);

var _helpers = __webpack_require__(2);

var _MainSlideView = __webpack_require__(35);

var _MainSlideView2 = _interopRequireDefault(_MainSlideView);

var _BestBanchanView = __webpack_require__(36);

var _BestBanchanView2 = _interopRequireDefault(_BestBanchanView);

var _ScrollerView = __webpack_require__(37);

var _ScrollerView2 = _interopRequireDefault(_ScrollerView);

var _InfiniteSlideView = __webpack_require__(38);

var _InfiniteSlideView2 = _interopRequireDefault(_InfiniteSlideView);

var _AutoCompleteView = __webpack_require__(39);

var _AutoCompleteView2 = _interopRequireDefault(_AutoCompleteView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    side: 'http://crong.codesquad.kr:8080/woowa/side',
    main: 'http://crong.codesquad.kr:8080/woowa/main',
    course: 'http://crong.codesquad.kr:8080/woowa/soup'
};

var mainSlideView = new _MainSlideView2.default();
var bestBanchanView = new _BestBanchanView2.default();
var scrollerView = new _ScrollerView2.default();
var sideBanchanView = new _InfiniteSlideView2.default('side');
var mainBanchanView = new _InfiniteSlideView2.default('main');
var courseBanchanView = new _InfiniteSlideView2.default('course');
var automCompleteView = new _AutoCompleteView2.default();

/**
 * @type {Controller}
 */
var controller = new _controller2.default(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

var setView = function setView() {
    return controller.setView();
};
(0, _helpers.on)(window, 'load', setView);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView) {
        _classCallCheck(this, _class);

        this.urlList = urlList;
        this.mainSlideView = mainSlideView;
        this.bestBanchanView = bestBanchanView;
        this.scrollerView = scrollerView;
        this.automCompleteView = automCompleteView;

        for (var _len = arguments.length, infiniteViews = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
            infiniteViews[_key - 5] = arguments[_key];
        }

        this.infiniteViews = infiniteViews;
    }

    _createClass(_class, [{
        key: 'checkLocalStorage',
        value: async function checkLocalStorage(key, isJSONP) {
            var cache = (0, _helpers.getLocalStorage)(key);
            if (cache && (0, _helpers.isValid)(cache.time, 6)) return cache.data;
            var value = {
                data: isJSONP ? (await (0, _helpers.fetchJSONP)(key))[1] : await (0, _helpers.request)(key),
                time: Date.now()
            };
            return value.data.hasOwnProperty('error') ? false : (0, _helpers.setLocalStorage)(key, value);
        }
    }, {
        key: 'setView',
        value: function setView() {
            var _this = this;

            this.fetchMainSlide(this.urlList.mainSlide);
            this.mainSlideView.bind('slidesPrev', this.moveSlides.bind(this));
            this.mainSlideView.bind('slidesNext', this.moveSlides.bind(this));
            this.mainSlideView.bind('slidesDots', this.currentSlide.bind(this));

            this.fetchBestBanchan(this.urlList.bestBanchan);

            this.scrollerView.bind('click', this.moveScroller.bind(this));

            this.infiniteViews.forEach(function (infiniteView) {
                _this.fetchInfiniteBanchan(infiniteView, _this.urlList[infiniteView.state.name]);
                infiniteView.bind('slidesPrev', _this.moveInfiniteSlides.bind(infiniteView));
                infiniteView.bind('slidesNext', _this.moveInfiniteSlides.bind(infiniteView));
            });

            this.automCompleteView.bind('press', this.pressAutoComplete.bind(this));
            this.automCompleteView.bind('submit', this.submitHistory.bind(this));
            this.automCompleteView.bind('history', this.showHistory.bind(this));
            this.automCompleteView.bind('click');
            this.automCompleteView.bind('nonClick');
            this.automCompleteView.bind('hover');

            this.mainSlideView.bind('preventDefault');
        }
    }, {
        key: 'fetchMainSlide',
        value: async function fetchMainSlide(url) {
            this.slideImgs = await this.checkLocalStorage(url);
            this.slidesEnd = this.slideImgs.length - 1;
            this.mainSlideView.showSlide(0, this.slideImgs[0]);
        }
    }, {
        key: 'moveSlides',
        value: function moveSlides(target, n) {
            this.mainSlideView.hideSlide(target.index);
            target.index += n;
            if (target.index > this.slidesEnd) target.index = 0;
            if (target.index < 0) target.index = this.slidesEnd;
            this.mainSlideView.showSlide(target.index, this.slideImgs[target.index]);
        }
    }, {
        key: 'currentSlide',
        value: function currentSlide(target, n) {
            this.mainSlideView.hideSlide(target.index);
            this.mainSlideView.showSlide(target.index = n, this.slideImgs[target.index]);
        }
    }, {
        key: 'moveScroller',
        value: function moveScroller(direction) {
            direction === 'up' ? (0, _helpers.moveScroll)(0) : (0, _helpers.moveScroll)(document.body.clientHeight);
        }
    }, {
        key: 'pressAutoComplete',
        value: async function pressAutoComplete(term, key, isSeleted) {
            if ((0, _helpers.isString)(key)) {
                if (term) {
                    var suggestions = await this.checkLocalStorage('https://ko.wikipedia.org/w/api.php?action=opensearch&search=' + term, true);
                    this.automCompleteView.render('autoComplete', term, suggestions);
                } else {
                    this.automCompleteView.emptyAutoComplete();
                }
            } else if ((0, _helpers.isUpdown)(key)) {
                this.automCompleteView.moveAutoComplete(key);
            } else if ((0, _helpers.isESC)(key)) {
                this.automCompleteView.emptyAutoComplete();
            } else if ((0, _helpers.isEnter)(key)) {
                isSeleted ? this.automCompleteView.enterAutoComplete() : this.submitHistory(term);
            }
        }
    }, {
        key: 'submitHistory',
        value: function submitHistory(keyword) {
            if (keyword) {
                var history = new Set((0, _helpers.getLocalStorage)('history'));
                history.add(keyword);
                (0, _helpers.setLocalStorage)('history', [].concat(_toConsumableArray(history)));
                this.automCompleteView.emptyAutoComplete();
                this.automCompleteView.emptySearchbar();
            }
        }
    }, {
        key: 'showHistory',
        value: async function showHistory(check) {
            if (check) {
                var history = await (0, _helpers.getLocalStorage)('history');
                history && this.automCompleteView.render('history', history.slice(-5).reverse());
            }
        }
    }, {
        key: 'fetchBestBanchan',
        value: async function fetchBestBanchan(url) {
            var banchan = await this.checkLocalStorage(url);
            this.bestBanchanView.render('bestBanchan', banchan);
            this.bestBanchanView.bind('foodTab');
        }
    }, {
        key: 'fetchInfiniteBanchan',
        value: async function fetchInfiniteBanchan(targetView, url) {
            var foodData = await this.checkLocalStorage(url);
            targetView.render('banchan', foodData);
            var threshold = foodData.length * 2.5;
            targetView.bind('slides', this.resetInfiniteSlides.bind(targetView, -20 - threshold, -20 + threshold));
        }
    }, {
        key: 'moveInfiniteSlides',
        value: function moveInfiniteSlides(target, move) {
            this.showSlides(target.el, target.direction += move);
        }
    }, {
        key: 'resetInfiniteSlides',
        value: function resetInfiniteSlides(thresholdLeft, thresholdRight, target) {
            if (target.direction === thresholdLeft || target.direction === thresholdRight) {
                this.showSlides(target.el, target.direction = -20, true);
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"prd_box\">\r\n    <a href=\"#\">\r\n        <div class=\"thumb_img\">\r\n            <p>\r\n                <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.alt || (depth0 != null ? depth0.alt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data}) : helper)))
    + "\">\r\n            </p>\r\n            <div class=\"circle_mask\"></div>\r\n        </div>\r\n        <dl>\r\n            <dt class=\"prd_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</dt>\r\n            <dd class=\"prd_description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</dd>\r\n            <dd class=\"prd_price\">\r\n                <span class=\"old_price\">"
    + alias4(((helper = (helper = helpers.old_price || (depth0 != null ? depth0.old_price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"old_price","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span class=\"new_price\">"
    + alias4(((helper = (helper = helpers.new_price || (depth0 != null ? depth0.new_price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"new_price","hash":{},"data":data}) : helper)))
    + "\r\n                    <span class=\"won\">"
    + alias4(((helper = (helper = helpers.won || (depth0 != null ? depth0.won : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"won","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </span>\r\n            </dd>\r\n        </dl>\r\n    </a>\r\n</li>";
},"useData":true});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _handlebarsBase = __webpack_require__(4);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(21);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(1);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(22);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(23);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(11);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(12);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(13);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(14);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(15);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(16);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(17);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(19);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function ret(context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(4);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class='badge'>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"badge_list\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.badge : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "        <li>\r\n            <span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n        </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='food_img_hover'>\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.delivery_type : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true});

/***/ }),
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"autocomplete_suggestion "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" data-value=\""
    + alias4(((helper = (helper = helpers.keyword || (depth0 != null ? depth0.keyword : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"keyword","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.renderKeyword || (depth0 != null ? depth0.renderKeyword : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"renderKeyword","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</li>";
},"useData":true});

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#\" class=\"best_food_box_wrap\">\r\n    <li class=\"best_food_box\">\r\n        <div class=\"food_img\">\r\n            <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.alt || (depth0 != null ? depth0.alt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n        <dl class=\"food_detail\">\r\n            <dt class=\"food_title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</dt>\r\n            <dd class=\"food_description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</dd>\r\n            <dd class=\"food_price\">\r\n                <span class=\"old_price\">"
    + alias4(((helper = (helper = helpers.old_price || (depth0 != null ? depth0.old_price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"old_price","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span class=\"new_price\">"
    + alias4(((helper = (helper = helpers.new_price || (depth0 != null ? depth0.new_price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"new_price","hash":{},"data":data}) : helper)))
    + "\r\n                    <span class=\"won\">"
    + alias4(((helper = (helper = helpers.won || (depth0 != null ? depth0.won : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"won","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </span>\r\n            </dd>\r\n        </dl>\r\n    </li>\r\n</a>";
},"useData":true});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\r\n    <a href=\"#\" data-category_id=\""
    + alias4(((helper = (helper = helpers.category_id || (depth0 != null ? depth0.category_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n</li>";
},"useData":true});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<ul class=\"best_food_box_list\" data-category_id=\""
    + container.escapeExpression(((helper = (helper = helpers.category_id || (depth0 != null ? depth0.category_id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"category_id","hash":{},"data":data}) : helper)))
    + "\"></ul>";
},"useData":true});

/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.slidesPrevEl = (0, _helpers.qs)('.slides_prev');
        this.slidesNextEl = (0, _helpers.qs)('.slides_next');
        this.slidesEl = (0, _helpers.qsa)('.main_slides_list > li');
        this.dotsEl = (0, _helpers.qsa)('.slides_dots > li > a');

        this.state = {
            index: 0
        };
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd, handler) {
            var _this = this;

            var bindCommands = {
                slidesPrev: function slidesPrev() {
                    (0, _helpers.on)(_this.slidesPrevEl, 'click', (0, _helpers.throttle)(function () {
                        return handler(_this.state, -1);
                    }, 1000));
                },
                slidesNext: function slidesNext() {
                    (0, _helpers.on)(_this.slidesNextEl, 'click', (0, _helpers.throttle)(function () {
                        return handler(_this.state, 1);
                    }, 1000));
                },
                slidesDots: function slidesDots() {
                    (0, _helpers.delegate)('.slides_dots', '.slides_dots > li > a', 'click', function (e) {
                        return handler(_this.state, +e.delegateTarget.textContent);
                    });
                },
                preventDefault: function preventDefault() {
                    (0, _helpers.delegate)('body', 'a', 'click', function (e) {
                        return e.preventDefault();
                    });
                }

            };

            bindCommands[bindCmd]();
        }
    }, {
        key: 'hideSlide',
        value: function hideSlide(currentIndex) {
            this.slidesEl[currentIndex].className = 'fadeout';
            this.dotsEl[currentIndex].classList.remove('now');
        }
    }, {
        key: 'showSlide',
        value: function showSlide(slideIndex, slideImg) {
            this.slidesEl[slideIndex].className = 'fadein';
            this.slidesEl[slideIndex].style.backgroundImage = 'url("' + slideImg + '")';
            this.dotsEl[slideIndex].className = 'now';
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxTpl = __webpack_require__(31);

var _foodBoxTpl2 = _interopRequireDefault(_foodBoxTpl);

var _foodTabTpl = __webpack_require__(32);

var _foodTabTpl2 = _interopRequireDefault(_foodTabTpl);

var _containerTpl = __webpack_require__(33);

var _containerTpl2 = _interopRequireDefault(_containerTpl);

var _badgeTpl = __webpack_require__(25);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(26);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.foodTabEl = (0, _helpers.qs)('.best_food_tabs');
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this = this;

            var bindCommands = {
                foodTab: function foodTab() {
                    (0, _helpers.delegate)(_this.foodTabEl, 'li > a', 'click', function (e) {
                        Array.from(_this.foodTabListEl).forEach(function (tab) {
                            return tab.className = tab === e.delegateTarget ? 'now' : '';
                        });
                        Array.from(_this.foodBoxListEl).forEach(function (food) {
                            return food.style.display = e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none';
                        });
                    });
                }
            };

            bindCommands[bindCmd]();
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this2 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                bestBanchan: function bestBanchan() {
                    _this2.bestBanchan.apply(_this2, params);
                }
            };

            viewCommands[viewCmd]();
        }
    }, {
        key: 'bestBanchan',
        value: function bestBanchan(food) {
            this.renderFoodTab(food);
            this.renderFoodContainer(food);
            this.renderFoodBoxList(food);
            this.renderFoodBox(food);
            this.renderFoodTabList(food, Math.floor(Math.random() * 6));
        }
    }, {
        key: 'renderFoodTab',
        value: function renderFoodTab(food) {
            var foodTab = food.map(function (value) {
                return (0, _foodTabTpl2.default)({
                    category_id: value.category_id,
                    name: value.name
                });
            }).join('');
            this.foodTabEl.insertAdjacentHTML('afterbegin', foodTab);
        }
    }, {
        key: 'renderFoodContainer',
        value: function renderFoodContainer(food) {
            var foodContainer = food.map(function (value) {
                return (0, _containerTpl2.default)({
                    category_id: value.category_id
                });
            }).join('');
            (0, _helpers.qs)('.best_food_container').insertAdjacentHTML('afterbegin', foodContainer);
        }
    }, {
        key: 'renderFoodBoxList',
        value: function renderFoodBoxList(food) {
            var _this3 = this;

            this.foodBoxListEl = (0, _helpers.qsa)('.best_food_box_list');
            food.forEach(function (value, i) {
                var foodBoxList = value.items.map(function (item) {
                    return (0, _foodBoxTpl2.default)({
                        image: item.image,
                        alt: item.alt,
                        title: item.title,
                        description: item.description,
                        old_price: item.n_price,
                        new_price: item.s_price.slice(0, -1),
                        won: item.s_price.slice(-1)
                    });
                }).join('');
                _this3.foodBoxListEl[i].insertAdjacentHTML('afterbegin', foodBoxList);
            });
        }
    }, {
        key: 'renderFoodBox',
        value: function renderFoodBox(food) {
            var foodBoxEl = (0, _helpers.qsa)('.best_food_box');
            food.forEach(function (value, i) {
                var len = value.items.length;
                value.items.forEach(function (item, j) {
                    foodBoxEl[i * len + j].insertAdjacentHTML('beforeend', (0, _badgeTpl2.default)({
                        badge: item.badge
                    }));
                    foodBoxEl[i * len + j].firstElementChild.insertAdjacentHTML('beforeend', (0, _deliveryTypeTpl2.default)({
                        delivery_type: item.delivery_type
                    }));
                });
            });
        }
    }, {
        key: 'renderFoodTabList',
        value: function renderFoodTabList(food, initNum) {
            this.foodTabListEl = (0, _helpers.qsa)('.best_food_tabs > li > a');
            this.foodTabListEl[initNum].className = 'now';
            this.foodBoxListEl[initNum].style.display = 'block';
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd, handler) {
            var bindCommands = {
                click: function click() {
                    (0, _helpers.delegate)('.page_up_down_list', '.page_up_down_list > li > a', 'click', function (e) {
                        return handler(e.delegateTarget.dataset.direction);
                    });
                }
            };

            bindCommands[bindCmd]();
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxInfiniteTpl = __webpack_require__(8);

var _foodBoxInfiniteTpl2 = _interopRequireDefault(_foodBoxInfiniteTpl);

var _badgeTpl = __webpack_require__(25);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(26);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(name) {
        _classCallCheck(this, _class);

        this.foodBoxEl = (0, _helpers.qs)('.' + name + '_food .infinite_food_box_list');
        this.slidesPrevEl = (0, _helpers.qs)('.' + name + '_food .slides_prev');
        this.slidesNextEl = (0, _helpers.qs)('.' + name + '_food .slides_next');

        this.state = {
            name: name,
            el: this.foodBoxEl,
            direction: -20
        };
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd, handler) {
            var _this = this;

            var bindCommands = {
                slides: function slides() {
                    (0, _helpers.on)(_this.foodBoxEl, 'transitionend', function () {
                        return handler(_this.state);
                    });
                },
                slidesPrev: function slidesPrev() {
                    (0, _helpers.on)(_this.slidesPrevEl, 'click', (0, _helpers.throttle)(function () {
                        return handler(_this.state, 10);
                    }, 600));
                },
                slidesNext: function slidesNext() {
                    (0, _helpers.on)(_this.slidesNextEl, 'click', (0, _helpers.throttle)(function () {
                        return handler(_this.state, -10);
                    }, 600));
                }
            };

            bindCommands[bindCmd]();
        }
    }, {
        key: 'render',
        value: function render(viewCmd, params) {
            var _this2 = this;

            var viewCommands = {
                banchan: function banchan() {
                    _this2.renderBanchan(params);
                }
            };

            viewCommands[viewCmd]();
        }
    }, {
        key: 'renderBanchan',
        value: function renderBanchan(food) {
            this.renderFoodBoxList(this.state.el, food);
            this.renderFoodBox(food, (0, _helpers.qsa)('.' + this.state.name + '_food .prd_box>a'));
            this.renderSlides(this.state.el, (0, _helpers.qsa)('.' + this.state.name + '_food .prd_box'));
            this.showSlides(this.state.el, this.state.direction, true);
        }
    }, {
        key: 'renderFoodBoxList',
        value: function renderFoodBoxList(element, food) {
            var foodBoxList = food.map(function (item) {
                return (0, _foodBoxInfiniteTpl2.default)({
                    image: item.image,
                    alt: item.alt,
                    title: item.title,
                    description: item.description,
                    old_price: item.n_price,
                    new_price: item.s_price.slice(0, -1),
                    won: item.s_price.slice(-1)
                });
            }).join('');
            element.insertAdjacentHTML('afterbegin', foodBoxList);
        }
    }, {
        key: 'renderFoodBox',
        value: function renderFoodBox(food, prdBox) {
            food.forEach(function (item, i) {
                prdBox[i].insertAdjacentHTML('beforeend', (0, _badgeTpl2.default)({
                    badge: item.badge
                }));
                prdBox[i].firstElementChild.insertAdjacentHTML('beforeend', (0, _deliveryTypeTpl2.default)({
                    delivery_type: item.delivery_type
                }));
            });
        }
    }, {
        key: 'renderSlides',
        value: function renderSlides(element, Slides) {
            var lastSlides = Array.from(Slides).slice(-4);

            Slides.forEach(function (Slide) {
                return element.appendChild(Slide.cloneNode(true));
            });
            lastSlides.reverse().forEach(function (lastSlide) {
                return element.insertBefore(lastSlide.cloneNode(true), element.childNodes[0]);
            });
        }
    }, {
        key: 'showSlides',
        value: function showSlides(element, direction, Immediately) {
            element.style.transitionDuration = Immediately ? '0s' : '0.5s';
            element.style.transform = 'translateX(' + direction + '%)';
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autocompleteTpl = __webpack_require__(28);

var _autocompleteTpl2 = _interopRequireDefault(_autocompleteTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.searchEl = (0, _helpers.qs)('#search_str');
        this.suggestionsEl = (0, _helpers.qs)('.autocomplete_suggestions');
        this.searchButtonEl = (0, _helpers.qs)('.search_btn');
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd, handler) {
            var _this = this;

            var bindCommands = {
                press: function press() {
                    (0, _helpers.on)(_this.searchEl, 'keyup', function (e) {
                        return handler(e.target.value, e.keyCode, _this.sel);
                    });
                },
                submit: function submit() {
                    (0, _helpers.on)(_this.searchButtonEl, 'click', function () {
                        return handler(_this.searchEl.value);
                    });
                },
                history: function history() {
                    (0, _helpers.on)(_this.searchEl, 'click', function () {
                        return handler(!_this.suggestionsEl.innerHTML && !_this.searchEl.value);
                    });
                },
                click: function click() {
                    (0, _helpers.delegate)(_this.suggestionsEl, '.autocomplete_suggestion', 'click', function (e) {
                        _this.updateAutoComplete(e.delegateTarget);
                        _this.enterAutoComplete();
                    });
                },
                nonClick: function nonClick() {
                    (0, _helpers.delegate)('body', '*', 'click', function (e) {
                        return e.target !== _this.searchEl && _this.emptyAutoComplete();
                    });
                },
                hover: function hover() {
                    (0, _helpers.delegate)(_this.suggestionsEl, '.autocomplete_suggestion', 'mouseover', function (e) {
                        return _this.updateAutoComplete(e.delegateTarget);
                    });
                }
            };

            bindCommands[bindCmd]();
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this2 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                autoComplete: function autoComplete() {
                    _this2.renderAutoComplete.apply(_this2, params);
                },
                searches: function searches() {
                    _this2.renderSearches.apply(_this2, params);
                }
            };

            viewCommands[viewCmd]();
        }
    }, {
        key: 'renderAutoComplete',
        value: function renderAutoComplete(term, suggestions) {
            this.emptyAutoComplete();
            var target = new RegExp(term, 'ig');
            var suggestionsStr = suggestions.map(function (suggestion) {
                return (0, _autocompleteTpl2.default)({
                    keyword: suggestion,
                    renderKeyword: suggestion.replace(target, '<b>' + term + '</b>')
                });
            }).join('');
            this.suggestionsEl.insertAdjacentHTML('afterbegin', suggestionsStr);
        }
    }, {
        key: 'renderSearches',
        value: function renderSearches(searches) {
            var searchesStr = searches.map(function (search) {
                return (0, _autocompleteTpl2.default)({
                    class: 'searches',
                    keyword: search,
                    renderKeyword: search
                });
            }).join('');
            this.suggestionsEl.insertAdjacentHTML('afterbegin', searchesStr);
        }
    }, {
        key: 'enterAutoComplete',
        value: function enterAutoComplete() {
            if (this.sel && this.suggestionsEl.innerHTML) {
                this.searchEl.value = this.sel.dataset.value;
                this.sel = null;
                this.emptyAutoComplete();
            }
        }
    }, {
        key: 'moveAutoComplete',
        value: function moveAutoComplete(key) {
            this.sel = (0, _helpers.qs)('.autocomplete_suggestion.selected');

            var _ref = this.sel ? [this.sel.nextSibling, this.sel.previousSibling] : [this.suggestionsEl.firstChild, this.suggestionsEl.lastChild],
                _ref2 = _slicedToArray(_ref, 2),
                nextEl = _ref2[0],
                prevEl = _ref2[1];

            var target = key === 40 ? nextEl : prevEl;
            this.updateAutoComplete(target);
        }
    }, {
        key: 'updateAutoComplete',
        value: function updateAutoComplete(target) {
            this.sel && this.sel.classList.remove('selected');
            this.sel = target;
            this.sel.classList.add('selected');
        }
    }, {
        key: 'emptyAutoComplete',
        value: function emptyAutoComplete() {
            this.suggestionsEl.innerHTML = '';
        }
    }, {
        key: 'emptySearchbar',
        value: function emptySearchbar() {
            this.searchEl.value = '';
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQyMTZkYmY3YTkyYTllZjFmY2MiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIl0sIm5hbWVzIjpbInFzIiwicXNhIiwib24iLCJkZWxlZ2F0ZSIsInJlcXVlc3QiLCJ0aHJvdHRsZSIsImdldExvY2FsU3RvcmFnZSIsInNldExvY2FsU3RvcmFnZSIsImlzVmFsaWQiLCJtb3ZlU2Nyb2xsIiwiaXNTdHJpbmciLCJpc1VwZG93biIsImlzRVNDIiwiaXNFbnRlciIsInNlbGVjdG9yIiwic2NvcGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudCIsInR5cGUiLCJjYWxsYmFjayIsInVzZUNhcHR1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwiX2RlbGVnYXRlIiwibGlzdGVuZXJGbiIsImxpc3RlbmVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkZXN0cm95IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnRzIiwiYmluZCIsIkFycmF5IiwicHJvdG90eXBlIiwibWFwIiwiY2FsbCIsImUiLCJkZWxlZ2F0ZVRhcmdldCIsInRhcmdldCIsImNsb3Nlc3QiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRhdGEiLCJyZWNlaXZlZFRpbWUiLCJ0aHJlc2hvbGRIb3VyIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiZWxhcHNlZFRpbWUiLCJ0byIsInN0YXJ0Iiwic2Nyb2xsWSIsImNoYW5nZSIsImR1cmF0aW9uIiwiTWF0aCIsImFicyIsImluY3JlbWVudCIsImFuaW1hdGVTY3JvbGwiLCJuZXdZIiwic2Nyb2xsVG8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmZXRjaEpTT05QIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsIm5hbWUiLCJ1bmlxdWUiLCJtYXRjaCIsInNyYyIsIndpbmRvdyIsImpzb24iLCJyZW1vdmUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsInVybExpc3QiLCJtYWluU2xpZGUiLCJiZXN0QmFuY2hhbiIsInNpZGUiLCJtYWluIiwiY291cnNlIiwibWFpblNsaWRlVmlldyIsImJlc3RCYW5jaGFuVmlldyIsInNjcm9sbGVyVmlldyIsInNpZGVCYW5jaGFuVmlldyIsIm1haW5CYW5jaGFuVmlldyIsImNvdXJzZUJhbmNoYW5WaWV3IiwiYXV0b21Db21wbGV0ZVZpZXciLCJjb250cm9sbGVyIiwic2V0VmlldyIsImluZmluaXRlVmlld3MiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJmZXRjaE1haW5TbGlkZSIsIm1vdmVTbGlkZXMiLCJjdXJyZW50U2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwibW92ZVNjcm9sbGVyIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwiaW5maW5pdGVWaWV3Iiwic3RhdGUiLCJtb3ZlSW5maW5pdGVTbGlkZXMiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdEhpc3RvcnkiLCJzaG93SGlzdG9yeSIsInNsaWRlSW1ncyIsImNoZWNrTG9jYWxTdG9yYWdlIiwic2xpZGVzRW5kIiwibGVuZ3RoIiwic2hvd1NsaWRlIiwibiIsImhpZGVTbGlkZSIsImluZGV4IiwiZGlyZWN0aW9uIiwiY2xpZW50SGVpZ2h0IiwidGVybSIsImlzU2VsZXRlZCIsInN1Z2dlc3Rpb25zIiwicmVuZGVyIiwiZW1wdHlBdXRvQ29tcGxldGUiLCJtb3ZlQXV0b0NvbXBsZXRlIiwiZW50ZXJBdXRvQ29tcGxldGUiLCJrZXl3b3JkIiwiaGlzdG9yeSIsIlNldCIsImFkZCIsImVtcHR5U2VhcmNoYmFyIiwiY2hlY2siLCJzbGljZSIsInJldmVyc2UiLCJiYW5jaGFuIiwidGFyZ2V0VmlldyIsImZvb2REYXRhIiwidGhyZXNob2xkIiwicmVzZXRJbmZpbml0ZVNsaWRlcyIsIm1vdmUiLCJzaG93U2xpZGVzIiwiZWwiLCJ0aHJlc2hvbGRMZWZ0IiwidGhyZXNob2xkUmlnaHQiLCJnIiwiRnVuY3Rpb24iLCJldmFsIiwic2xpZGVzUHJldkVsIiwic2xpZGVzTmV4dEVsIiwic2xpZGVzRWwiLCJkb3RzRWwiLCJiaW5kQ21kIiwiaGFuZGxlciIsImJpbmRDb21tYW5kcyIsInNsaWRlc1ByZXYiLCJzbGlkZXNOZXh0Iiwic2xpZGVzRG90cyIsInRleHRDb250ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50SW5kZXgiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiZGlzcGxheSIsImRhdGFzZXQiLCJjYXRlZ29yeV9pZCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlckZvb2RUYWJMaXN0IiwiZmxvb3IiLCJyYW5kb20iLCJqb2luIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZm9vZENvbnRhaW5lciIsImkiLCJmb29kQm94TGlzdCIsIml0ZW1zIiwiaW1hZ2UiLCJpdGVtIiwiYWx0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIm9sZF9wcmljZSIsIm5fcHJpY2UiLCJuZXdfcHJpY2UiLCJzX3ByaWNlIiwid29uIiwiZm9vZEJveEVsIiwibGVuIiwiaiIsImJhZGdlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkZWxpdmVyeV90eXBlIiwiaW5pdE51bSIsImNsaWNrIiwic2xpZGVzIiwicmVuZGVyQmFuY2hhbiIsInJlbmRlclNsaWRlcyIsInByZEJveCIsIlNsaWRlcyIsImxhc3RTbGlkZXMiLCJTbGlkZSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsImxhc3RTbGlkZSIsImNoaWxkTm9kZXMiLCJJbW1lZGlhdGVseSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsInNlYXJjaEVsIiwic3VnZ2VzdGlvbnNFbCIsInNlYXJjaEJ1dHRvbkVsIiwicHJlc3MiLCJrZXlDb2RlIiwic2VsIiwic3VibWl0IiwiaW5uZXJIVE1MIiwidXBkYXRlQXV0b0NvbXBsZXRlIiwibm9uQ2xpY2siLCJob3ZlciIsImF1dG9Db21wbGV0ZSIsInJlbmRlckF1dG9Db21wbGV0ZSIsInNlYXJjaGVzIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc1N0ciIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwicmVwbGFjZSIsInNlYXJjaGVzU3RyIiwiY2xhc3MiLCJzZWFyY2giLCJuZXh0U2libGluZyIsInByZXZpb3VzU2libGluZyIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJuZXh0RWwiLCJwcmV2RWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBWTtBQUNQLE9BQ0g7QUFBRyxPQUNIO0FBQUcs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R0FBTCxDQUFTcEUsU0FBVCxDQUFtQjNGLE1BQW5CLENBQTBCLFVBQTFCLENBQVo7QUFDQSxpQkFBSytKLEdBQUwsR0FBVzNOLE1BQVg7QUFDQSxpQkFBSzJOLEdBQUwsQ0FBU3BFLFNBQVQsQ0FBbUJoQyxHQUFuQixDQUF1QixVQUF2QjtBQUNIOzs7NENBRW1CO0FBQ2hCLGlCQUFLZ0csYUFBTCxDQUFtQk0sU0FBbkIsR0FBK0IsRUFBL0I7QUFDSDs7O3lDQUVnQjtBQUNiLGlCQUFLUCxRQUFMLENBQWN6TCxLQUFkLEdBQXNCLEVBQXRCO0FBQ0giLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjQyMTZkYmY3YTkyYTllZjFmY2MiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIi8qKlxyXG4gKiBxdWVyeVNlbGVjdG9yIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIHRvIHF1ZXJ5XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3Njb3BlXSBPcHRpb25hbCBzY29wZSBlbGVtZW50IGZvciB0aGUgc2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxcyhzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBxc2Eoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8V2luZG93fSBlbGVtZW50IFRhcmdldCBFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IG5hbWUgdG8gYmluZCB0b1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBFdmVudCBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgQ2FwdHVyZSB0aGUgZXZlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhrZXkpIHtcclxuICAgIHJldHVybiAoIWtleSB8fCAoa2V5IDwgMzUgfHwga2V5ID4gNDApICYmIGtleSAhPT0gMTMgJiYga2V5ICE9PSAyNyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VwZG93bihrZXkpIHtcclxuICAgIC8vIGRvd24gKDQwKSwgdXAgKDM4KVxyXG4gICAgcmV0dXJuIChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFU0Moa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAyNztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50ZXIoa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAxMztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoSlNPTlAgPSAodW5pcXVlID0+IHVybCA9PlxyXG4gICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGBfanNvbnBfJHt1bmlxdWUrK31gO1xyXG4gICAgICAgIHVybCArPSB1cmwubWF0Y2goL1xcPy8pID8gYCZjYWxsYmFjaz0ke25hbWV9YCA6IGA/Y2FsbGJhY2s9JHtuYW1lfWA7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgICAgICB3aW5kb3dbbmFtZV0gPSBqc29uID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfSlcclxuKSgwKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9iYXNlLmpzIiwiaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcclxuaW1wb3J0IHtcclxuICAgIG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IE1haW5TbGlkZVZpZXcgZnJvbSAnLi92aWV3L01haW5TbGlkZVZpZXcnO1xyXG5pbXBvcnQgQmVzdEJhbmNoYW5WaWV3IGZyb20gJy4vdmlldy9CZXN0QmFuY2hhblZpZXcnO1xyXG5pbXBvcnQgU2Nyb2xsZXJWaWV3IGZyb20gJy4vdmlldy9TY3JvbGxlclZpZXcnO1xyXG5pbXBvcnQgSW5maW5pdGVTbGlkZVZpZXcgZnJvbSAnLi92aWV3L0luZmluaXRlU2xpZGVWaWV3JztcclxuaW1wb3J0IEF1dG9tQ29tcGxldGVWaWV3IGZyb20gJy4vdmlldy9BdXRvQ29tcGxldGVWaWV3JztcclxuXHJcbmNvbnN0IHVybExpc3QgPSB7XHJcbiAgICBtYWluU2xpZGU6ICdodHRwOi8vaG9tZS5kb3RvbC54eXovcGhwL3Rlc3RfYXBpLnBocCcsXHJcbiAgICBiZXN0QmFuY2hhbjogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9iZXN0JyxcclxuICAgIHNpZGU6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2Evc2lkZScsXHJcbiAgICBtYWluOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL21haW4nLFxyXG4gICAgY291cnNlOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NvdXAnXHJcbn07XHJcblxyXG5jb25zdCBtYWluU2xpZGVWaWV3ID0gbmV3IE1haW5TbGlkZVZpZXcoKTtcclxuY29uc3QgYmVzdEJhbmNoYW5WaWV3ID0gbmV3IEJlc3RCYW5jaGFuVmlldygpO1xyXG5jb25zdCBzY3JvbGxlclZpZXcgPSBuZXcgU2Nyb2xsZXJWaWV3KCk7XHJcbmNvbnN0IHNpZGVCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnc2lkZScpO1xyXG5jb25zdCBtYWluQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ21haW4nKTtcclxuY29uc3QgY291cnNlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ2NvdXJzZScpO1xyXG5jb25zdCBhdXRvbUNvbXBsZXRlVmlldyA9IG5ldyBBdXRvbUNvbXBsZXRlVmlldygpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7Q29udHJvbGxlcn1cclxuICovXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih1cmxMaXN0LCBtYWluU2xpZGVWaWV3LCBiZXN0QmFuY2hhblZpZXcsIHNjcm9sbGVyVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIHNpZGVCYW5jaGFuVmlldywgbWFpbkJhbmNoYW5WaWV3LCBjb3Vyc2VCYW5jaGFuVmlldyk7XHJcblxyXG5jb25zdCBzZXRWaWV3ID0gKCkgPT4gY29udHJvbGxlci5zZXRWaWV3KCk7XHJcbm9uKHdpbmRvdywgJ2xvYWQnLCBzZXRWaWV3KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGdldExvY2FsU3RvcmFnZSxcclxuICAgIHNldExvY2FsU3RvcmFnZSxcclxuICAgIGlzVmFsaWQsXHJcbiAgICBtb3ZlU2Nyb2xsLFxyXG4gICAgaXNTdHJpbmcsXHJcbiAgICBpc1VwZG93bixcclxuICAgIGlzRVNDLFxyXG4gICAgaXNFbnRlcixcclxuICAgIGZldGNoSlNPTlBcclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCAuLi5pbmZpbml0ZVZpZXdzKSB7XHJcbiAgICAgICAgdGhpcy51cmxMaXN0ID0gdXJsTGlzdDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcgPSBtYWluU2xpZGVWaWV3O1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3ID0gYmVzdEJhbmNoYW5WaWV3O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3ID0gc2Nyb2xsZXJWaWV3O1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcgPSBhdXRvbUNvbXBsZXRlVmlldztcclxuICAgICAgICB0aGlzLmluZmluaXRlVmlld3MgPSBpbmZpbml0ZVZpZXdzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNoZWNrTG9jYWxTdG9yYWdlKGtleSwgaXNKU09OUCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gZ2V0TG9jYWxTdG9yYWdlKGtleSk7XHJcbiAgICAgICAgaWYgKGNhY2hlICYmIGlzVmFsaWQoY2FjaGUudGltZSwgNikpIHJldHVybiBjYWNoZS5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBpc0pTT05QID8gKGF3YWl0IGZldGNoSlNPTlAoa2V5KSlbMV0gOiBhd2FpdCByZXF1ZXN0KGtleSksXHJcbiAgICAgICAgICAgIHRpbWU6IERhdGUubm93KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5kYXRhLmhhc093blByb3BlcnR5KCdlcnJvcicpID8gZmFsc2UgOiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmlldygpIHtcclxuICAgICAgICB0aGlzLmZldGNoTWFpblNsaWRlKHRoaXMudXJsTGlzdC5tYWluU2xpZGUpO1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5iaW5kKCdzbGlkZXNQcmV2JywgdGhpcy5tb3ZlU2xpZGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5iaW5kKCdzbGlkZXNOZXh0JywgdGhpcy5tb3ZlU2xpZGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5iaW5kKCdzbGlkZXNEb3RzJywgdGhpcy5jdXJyZW50U2xpZGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZmV0Y2hCZXN0QmFuY2hhbih0aGlzLnVybExpc3QuYmVzdEJhbmNoYW4pO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldy5iaW5kKCdjbGljaycsIHRoaXMubW92ZVNjcm9sbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLmluZmluaXRlVmlld3MuZm9yRWFjaChpbmZpbml0ZVZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoSW5maW5pdGVCYW5jaGFuKGluZmluaXRlVmlldywgdGhpcy51cmxMaXN0W2luZmluaXRlVmlldy5zdGF0ZS5uYW1lXSk7XHJcbiAgICAgICAgICAgIGluZmluaXRlVmlldy5iaW5kKCdzbGlkZXNQcmV2JywgdGhpcy5tb3ZlSW5maW5pdGVTbGlkZXMuYmluZChpbmZpbml0ZVZpZXcpKTtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ3ByZXNzJywgdGhpcy5wcmVzc0F1dG9Db21wbGV0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGlzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ2hpc3RvcnknLCB0aGlzLnNob3dIaXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnY2xpY2snKTtcclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ25vbkNsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdob3ZlcicpO1xyXG5cclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuYmluZCgncHJldmVudERlZmF1bHQnKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaE1haW5TbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnNob3dTbGlkZSgwLCB0aGlzLnNsaWRlSW1nc1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlcyh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGFyZ2V0LmluZGV4ICs9IG47XHJcbiAgICAgICAgaWYgKHRhcmdldC5pbmRleCA+IHRoaXMuc2xpZGVzRW5kKSB0YXJnZXQuaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPCAwKSB0YXJnZXQuaW5kZXggPSB0aGlzLnNsaWRlc0VuZDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCwgdGhpcy5zbGlkZUltZ3NbdGFyZ2V0LmluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudFNsaWRlKHRhcmdldCwgbikge1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5oaWRlU2xpZGUodGFyZ2V0LmluZGV4KTtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCA9IG4sIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTY3JvbGxlcihkaXJlY3Rpb24pIHtcclxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCcgPyBtb3ZlU2Nyb2xsKDApIDogbW92ZVNjcm9sbChkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcHJlc3NBdXRvQ29tcGxldGUodGVybSwga2V5LCBpc1NlbGV0ZWQpIHtcclxuICAgICAgICBpZiAoaXNTdHJpbmcoa2V5KSkge1xyXG4gICAgICAgICAgICBpZiAodGVybSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKGBodHRwczovL2tvLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwP2FjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD0ke3Rlcm19YCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LnJlbmRlcignYXV0b0NvbXBsZXRlJywgdGVybSwgc3VnZ2VzdGlvbnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1VwZG93bihrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcubW92ZUF1dG9Db21wbGV0ZShrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0Moa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKGtleSkpIHtcclxuICAgICAgICAgICAgaXNTZWxldGVkID8gdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbnRlckF1dG9Db21wbGV0ZSgpIDogdGhpcy5zdWJtaXRIaXN0b3J5KHRlcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRIaXN0b3J5KGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW1wdHlTZWFyY2hiYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2hvd0hpc3RvcnkoY2hlY2spIHtcclxuICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IGF3YWl0IGdldExvY2FsU3RvcmFnZSgnaGlzdG9yeScpO1xyXG4gICAgICAgICAgICBoaXN0b3J5ICYmIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcucmVuZGVyKCdoaXN0b3J5JywgaGlzdG9yeS5zbGljZSgtNSkucmV2ZXJzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hCZXN0QmFuY2hhbih1cmwpIHtcclxuICAgICAgICBjb25zdCBiYW5jaGFuID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3LnJlbmRlcignYmVzdEJhbmNoYW4nLCBiYW5jaGFuKTtcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldy5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hJbmZpbml0ZUJhbmNoYW4odGFyZ2V0VmlldywgdXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGFyZ2V0Vmlldy5yZW5kZXIoJ2JhbmNoYW4nLCBmb29kRGF0YSk7XHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZm9vZERhdGEubGVuZ3RoICogMi41O1xyXG4gICAgICAgIHRhcmdldFZpZXcuYmluZCgnc2xpZGVzJywgdGhpcy5yZXNldEluZmluaXRlU2xpZGVzLmJpbmQodGFyZ2V0VmlldywgLTIwIC0gdGhyZXNob2xkLCAtMjAgKyB0aHJlc2hvbGQpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlSW5maW5pdGVTbGlkZXModGFyZ2V0LCBtb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRhcmdldC5lbCwgdGFyZ2V0LmRpcmVjdGlvbiArPSBtb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEluZmluaXRlU2xpZGVzKHRocmVzaG9sZExlZnQsIHRocmVzaG9sZFJpZ2h0LCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmRpcmVjdGlvbiA9PT0gdGhyZXNob2xkTGVmdCB8fCB0YXJnZXQuZGlyZWN0aW9uID09PSB0aHJlc2hvbGRSaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXModGFyZ2V0LmVsLCB0YXJnZXQuZGlyZWN0aW9uID0gLTIwLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29udHJvbGxlci5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgPGRpdiBjbGFzcz0nYmFkZ2UnPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJiYWRnZV9saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5iYWRnZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgIDxzcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgPC9saT5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2Zvb2RfaW1nX2hvdmVyJz5cXHJcXG4gICAgPHVsPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlbGl2ZXJ5X3R5cGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvdWw+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGk+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X2xpc3RcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoJy5zbGlkZXNfcHJldicpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoJy5zbGlkZXNfbmV4dCcpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSBxc2EoJy5tYWluX3NsaWRlc19saXN0ID4gbGknKTtcclxuICAgICAgICB0aGlzLmRvdHNFbCA9IHFzYSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1ByZXY6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzUHJldkVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIC0xKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNEb3RzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnLnNsaWRlc19kb3RzJywgJy5zbGlkZXNfZG90cyA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICdhJywgJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVTbGlkZShjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW2N1cnJlbnRJbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVvdXQnO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlKHNsaWRlSW5kZXgsIHNsaWRlSW1nKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtzbGlkZUluZGV4XS5jbGFzc05hbWUgPSAnZmFkZWluJztcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3NsaWRlSW5kZXhdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke3NsaWRlSW1nfVwiKWA7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbc2xpZGVJbmRleF0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbCA9IHFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuZm9vZFRhYkVsLCAnbGkgPiBhJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RUYWJMaXN0RWwpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIgPT09IGUuZGVsZWdhdGVUYXJnZXQgPyAnbm93JyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZEJveExpc3RFbCkuZm9yRWFjaChmb29kID0+IGZvb2Quc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5jYXRlZ29yeV9pZCA9PT0gZm9vZC5kYXRhc2V0LmNhdGVnb3J5X2lkID8gJ2Jsb2NrJyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJlc3RCYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3RCYW5jaGFuKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICBiZXN0QmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiKGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZENvbnRhaW5lcihmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveChmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWJMaXN0KGZvb2QsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kVGFiID0gZm9vZC5tYXAodmFsdWUgPT4gZm9vZFRhYlRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RDb250YWluZXIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RDb250YWluZXIgPSBmb29kLm1hcCh2YWx1ZSA9PiBjb250YWluZXJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZFxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBxcygnLmJlc3RfZm9vZF9jb250YWluZXInKS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChmb29kKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX2JveF9saXN0Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IHZhbHVlLml0ZW1zLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgICAgICBmb29kQm94VGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3goZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hFbCA9IHFzYSgnLmJlc3RfZm9vZF9ib3gnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFsdWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiTGlzdChmb29kLCBpbml0TnVtKSB7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwiaW1wb3J0IHtcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5wYWdlX3VwX2Rvd25fbGlzdCcsICcucGFnZV91cF9kb3duX2xpc3QgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcihlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsImltcG9ydCBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQgYmFkZ2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCc7XHJcbmltcG9ydCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuaW5maW5pdGVfZm9vZF9ib3hfbGlzdGApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19wcmV2YCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNOZXh0RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuc2xpZGVzX25leHRgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgZWw6IHRoaXMuZm9vZEJveEVsLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IC0yMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuZm9vZEJveEVsLCAndHJhbnNpdGlvbmVuZCcsICgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxMCksIDYwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCBwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQmFuY2hhbihwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdCh0aGlzLnN0YXRlLmVsLCBmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3goZm9vZCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3g+YWApKTtcclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlcyh0aGlzLnN0YXRlLmVsLCBxc2EoYC4ke3RoaXMuc3RhdGUubmFtZX1fZm9vZCAucHJkX2JveGApKTtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXModGhpcy5zdGF0ZS5lbCwgdGhpcy5zdGF0ZS5kaXJlY3Rpb24sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGVsZW1lbnQsIGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IGZvb2QubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgZm9vZEJveEluZmluaXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QsIHByZEJveCkge1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTbGlkZXMoZWxlbWVudCwgU2xpZGVzKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlcyA9IEFycmF5LmZyb20oU2xpZGVzKS5zbGljZSgtNCk7XHJcblxyXG4gICAgICAgIFNsaWRlcy5mb3JFYWNoKFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoU2xpZGUuY2xvbmVOb2RlKHRydWUpKSk7XHJcbiAgICAgICAgbGFzdFNsaWRlcy5yZXZlcnNlKCkuZm9yRWFjaChsYXN0U2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobGFzdFNsaWRlLmNsb25lTm9kZSh0cnVlKSwgZWxlbWVudC5jaGlsZE5vZGVzWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlcyhlbGVtZW50LCBkaXJlY3Rpb24sIEltbWVkaWF0ZWx5KSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBJbW1lZGlhdGVseSA/ICcwcycgOiAnMC41cyc7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2RpcmVjdGlvbn0lKWA7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwiaW1wb3J0IGF1dG9jb21wbGV0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIG9uLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IHFzKCcjc2VhcmNoX3N0cicpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdXR0b25FbCA9IHFzKCcuc2VhcmNoX2J0bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgcHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdrZXl1cCcsIGUgPT4gaGFuZGxlcihlLnRhcmdldC52YWx1ZSwgZS5rZXlDb2RlLCB0aGlzLnNlbCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoQnV0dG9uRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIodGhpcy5zZWFyY2hFbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaXN0b3J5OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEVsLCAnY2xpY2snLCAoKSA9PiBoYW5kbGVyKCF0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MICYmICF0aGlzLnNlYXJjaEVsLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSh0aGlzLnN1Z2dlc3Rpb25zRWwsICcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZShlLmRlbGVnYXRlVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyQXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKCdib2R5JywgJyonLCAnY2xpY2snLCBlID0+IGUudGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEVsICYmIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSh0aGlzLnN1Z2dlc3Rpb25zRWwsICcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdmVyJywgZSA9PiB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZShlLmRlbGVnYXRlVGFyZ2V0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXV0b0NvbXBsZXRlKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXJjaGVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlYXJjaGVzKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBdXRvQ29tcGxldGUodGVybSwgc3VnZ2VzdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IFJlZ0V4cCh0ZXJtLCAnaWcnKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc1N0ciA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zU3RyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGVzU3RyID0gc2VhcmNoZXMubWFwKHNlYXJjaCA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaGVzJyxcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHNlYXJjaCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHNlYXJjaFxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHNlYXJjaGVzU3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlckF1dG9Db21wbGV0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWwgJiYgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gdGhpcy5zZWwuZGF0YXNldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVBdXRvQ29tcGxldGUoa2V5KSB7XHJcbiAgICAgICAgdGhpcy5zZWwgPSBxcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uLnNlbGVjdGVkJyk7XHJcbiAgICAgICAgY29uc3QgW25leHRFbCwgcHJldkVsXSA9IHRoaXMuc2VsID8gW3RoaXMuc2VsLm5leHRTaWJsaW5nLCB0aGlzLnNlbC5wcmV2aW91c1NpYmxpbmddIDogW3RoaXMuc3VnZ2VzdGlvbnNFbC5maXJzdENoaWxkLCB0aGlzLnN1Z2dlc3Rpb25zRWwubGFzdENoaWxkXTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBrZXkgPT09IDQwID8gbmV4dEVsIDogcHJldkVsO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQXV0b0NvbXBsZXRlKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuc2VsICYmIHRoaXMuc2VsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5zZWwgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5zZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eUF1dG9Db21wbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlTZWFyY2hiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldy5qcyJdLCJzb3VyY2VSb290IjoiIn0=