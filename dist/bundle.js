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
    var wait = false;
    return function () {
        if (!wait) {
            func.apply(null, arguments);
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

            (0, _helpers.delegate)('body', 'a', 'click', function (e) {
                return e.preventDefault();
            });
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
                    (0, _helpers.delegate)('.slides_dots', '.slides_dots > li > a', 'click', (0, _helpers.throttle)(function (e) {
                        return handler(_this.state, +e.delegateTarget.textContent);
                    }, 1000));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGY3MTFmZWMwNjQxZmJjYmY0ZjIiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIl0sIm5hbWVzIjpbInFzIiwicXNhIiwib24iLCJkZWxlZ2F0ZSIsInJlcXVlc3QiLCJ0aHJvdHRsZSIsImdldExvY2FsU3RvcmFnZSIsInNldExvY2FsU3RvcmFnZSIsImlzVmFsaWQiLCJtb3ZlU2Nyb2xsIiwiaXNTdHJpbmciLCJpc1VwZG93biIsImlzRVNDIiwiaXNFbnRlciIsInNlbGVjdG9yIiwic2NvcGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudCIsInR5cGUiLCJjYWxsYmFjayIsInVzZUNhcHR1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwiX2RlbGVnYXRlIiwibGlzdGVuZXJGbiIsImxpc3RlbmVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkZXN0cm95IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnRzIiwiYmluZCIsIkFycmF5IiwicHJvdG90eXBlIiwibWFwIiwiY2FsbCIsImUiLCJkZWxlZ2F0ZVRhcmdldCIsInRhcmdldCIsImNsb3Nlc3QiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRhdGEiLCJyZWNlaXZlZFRpbWUiLCJ0aHJlc2hvbGRIb3VyIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiZWxhcHNlZFRpbWUiLCJ0byIsInN0YXJ0Iiwic2Nyb2xsWSIsImNoYW5nZSIsImR1cmF0aW9uIiwiTWF0aCIsImFicyIsImluY3JlbWVudCIsImFuaW1hdGVTY3JvbGwiLCJuZXdZIiwic2Nyb2xsVG8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmZXRjaEpTT05QIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsIm5hbWUiLCJ1bmlxdWUiLCJtYXRjaCIsInNyYyIsIndpbmRvdyIsImpzb24iLCJyZW1vdmUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsInVybExpc3QiLCJtYWluU2xpZGUiLCJiZXN0QmFuY2hhbiIsInNpZGUiLCJtYWluIiwiY291cnNlIiwibWFpblNsaWRlVmlldyIsImJlc3RCYW5jaGFuVmlldyIsInNjcm9sbGVyVmlldyIsInNpZGVCYW5jaGFuVmlldyIsIm1haW5CYW5jaGFuVmlldyIsImNvdXJzZUJhbmNoYW5WaWV3IiwiYXV0b21Db21wbGV0ZVZpZXciLCJjb250cm9sbGVyIiwic2V0VmlldyIsImluZmluaXRlVmlld3MiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJmZXRjaE1haW5TbGlkZSIsIm1vdmVTbGlkZXMiLCJjdXJyZW50U2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwibW92ZVNjcm9sbGVyIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwiaW5maW5pdGVWaWV3Iiwic3RhdGUiLCJtb3ZlSW5maW5pdGVTbGlkZXMiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdEhpc3RvcnkiLCJzaG93SGlzdG9yeSIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVJbWdzIiwiY2hlY2tMb2NhbFN0b3JhZ2UiLCJzbGlkZXNFbmQiLCJsZW5ndGgiLCJzaG93U2xpZGUiLCJuIiwiaGlkZVNsaWRlIiwiaW5kZXgiLCJkaXJlY3Rpb24iLCJjbGllbnRIZWlnaHQiLCJ0ZXJtIiwiaXNTZWxldGVkIiwic3VnZ2VzdGlvbnMiLCJyZW5kZXIiLCJlbXB0eUF1dG9Db21wbGV0ZSIsIm1vdmVBdXRvQ29tcGxldGUiLCJlbnRlckF1dG9Db21wbGV0ZSIsImtleXdvcmQiLCJoaXN0b3J5IiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJjaGVjayIsInNsaWNlIiwicmV2ZXJzZSIsImJhbmNoYW4iLCJ0YXJnZXRWaWV3IiwiZm9vZERhdGEiLCJ0aHJlc2hvbGQiLCJyZXNldEluZmluaXRlU2xpZGVzIiwibW92ZSIsInNob3dTbGlkZXMiLCJlbCIsInRocmVzaG9sZExlZnQiLCJ0aHJlc2hvbGRSaWdodCIsImciLCJGdW5jdGlvbiIsImV2YWwiLCJzbGlkZXNQcmV2RWwiLCJzbGlkZXNOZXh0RWwiLCJzbGlkZXNFbCIsImRvdHNFbCIsImJpbmRDbWQiLCJoYW5kbGVyIiwiYmluZENvbW1hbmRzIiwic2xpZGVzUHJldiIsInNsaWRlc05leHQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJjdXJyZW50SW5kZXgiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiZGlzcGxheSIsImRhdGFzZXQiLCJjYXRlZ29yeV9pZCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlckZvb2RUYWJMaXN0IiwiZmxvb3IiLCJyYW5kb20iLCJqb2luIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZm9vZENvbnRhaW5lciIsImkiLCJmb29kQm94TGlzdCIsIml0ZW1zIiwiaW1hZ2UiLCJpdGVtIiwiYWx0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIm9sZF9wcmljZSIsIm5fcHJpY2UiLCJuZXdfcHJpY2UiLCJzX3ByaWNlIiwid29uIiwiZm9vZEJveEVsIiwibGVuIiwiaiIsImJhZGdlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkZWxpdmVyeV90eXBlIiwiaW5pdE51bSIsImNsaWNrIiwic2xpZGVzIiwicmVuZGVyQmFuY2hhbiIsInJlbmRlclNsaWRlcyIsInByZEJveCIsIlNsaWRlcyIsImxhc3RTbGlkZXMiLCJTbGlkZSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsImxhc3RTbGlkZSIsImNoaWxkTm9kZXMiLCJJbW1lZGlhdGVseSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsInNlYXJjaEVsIiwic3VnZ2VzdGlvbnNFbCIsInNlYXJjaEJ1dHRvbkVsIiwicHJlc3MiLCJrZXlDb2RlIiwic2VsIiwic3VibWl0IiwiaW5uZXJIVE1MIiwidXBkYXRlQXV0b0NvbXBsZXRlIiwibm9uQ2xpY2siLCJob3ZlciIsImF1dG9Db21wbGV0ZSIsInJlbmRlckF1dG9Db21wbGV0ZSIsInNlYXJjaGVzIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc1N0ciIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwicmVwbGFjZSIsInNlYXJjaGVzU3RyIiwiY2xhc3MiLCJzZWFyY2giLCJuZXh0U2libGluZyIsInByZXZpb3VzU2libGluZyIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJuZXh0RWwiLCJwcmV2RWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBWTtBQUNQLE9BQ0g7QUFBRyxPQUNIO0FBQUcs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QSxpQkFBSytKLEdBQUwsR0FBVzNOLE1BQVg7QUFDQSxpQkFBSzJOLEdBQUwsQ0FBU3BFLFNBQVQsQ0FBbUIvQixHQUFuQixDQUF1QixVQUF2QjtBQUNIOzs7NENBRW1CO0FBQ2hCLGlCQUFLK0YsYUFBTCxDQUFtQk0sU0FBbkIsR0FBK0IsRUFBL0I7QUFDSDs7O3lDQUVnQjtBQUNiLGlCQUFLUCxRQUFMLENBQWN6TCxLQUFkLEdBQXNCLEVBQXRCO0FBQ0giLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGY3MTFmZWMwNjQxZmJjYmY0ZjIiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIi8qKlxyXG4gKiBxdWVyeVNlbGVjdG9yIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIHRvIHF1ZXJ5XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3Njb3BlXSBPcHRpb25hbCBzY29wZSBlbGVtZW50IGZvciB0aGUgc2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxcyhzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBxc2Eoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8V2luZG93fSBlbGVtZW50IFRhcmdldCBFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IG5hbWUgdG8gYmluZCB0b1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBFdmVudCBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgQ2FwdHVyZSB0aGUgZXZlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhrZXkpIHtcclxuICAgIHJldHVybiAoIWtleSB8fCAoa2V5IDwgMzUgfHwga2V5ID4gNDApICYmIGtleSAhPT0gMTMgJiYga2V5ICE9PSAyNyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VwZG93bihrZXkpIHtcclxuICAgIC8vIGRvd24gKDQwKSwgdXAgKDM4KVxyXG4gICAgcmV0dXJuIChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFU0Moa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAyNztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50ZXIoa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAxMztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoSlNPTlAgPSAodW5pcXVlID0+IHVybCA9PlxyXG4gICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGBfanNvbnBfJHt1bmlxdWUrK31gO1xyXG4gICAgICAgIHVybCArPSB1cmwubWF0Y2goL1xcPy8pID8gYCZjYWxsYmFjaz0ke25hbWV9YCA6IGA/Y2FsbGJhY2s9JHtuYW1lfWA7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgICAgICB3aW5kb3dbbmFtZV0gPSBqc29uID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfSlcclxuKSgwKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9iYXNlLmpzIiwiaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcclxuaW1wb3J0IHtcclxuICAgIG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IE1haW5TbGlkZVZpZXcgZnJvbSAnLi92aWV3L01haW5TbGlkZVZpZXcnO1xyXG5pbXBvcnQgQmVzdEJhbmNoYW5WaWV3IGZyb20gJy4vdmlldy9CZXN0QmFuY2hhblZpZXcnO1xyXG5pbXBvcnQgU2Nyb2xsZXJWaWV3IGZyb20gJy4vdmlldy9TY3JvbGxlclZpZXcnO1xyXG5pbXBvcnQgSW5maW5pdGVTbGlkZVZpZXcgZnJvbSAnLi92aWV3L0luZmluaXRlU2xpZGVWaWV3JztcclxuaW1wb3J0IEF1dG9tQ29tcGxldGVWaWV3IGZyb20gJy4vdmlldy9BdXRvQ29tcGxldGVWaWV3JztcclxuXHJcbmNvbnN0IHVybExpc3QgPSB7XHJcbiAgICBtYWluU2xpZGU6ICdodHRwOi8vaG9tZS5kb3RvbC54eXovcGhwL3Rlc3RfYXBpLnBocCcsXHJcbiAgICBiZXN0QmFuY2hhbjogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9iZXN0JyxcclxuICAgIHNpZGU6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2Evc2lkZScsXHJcbiAgICBtYWluOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL21haW4nLFxyXG4gICAgY291cnNlOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NvdXAnXHJcbn07XHJcblxyXG5jb25zdCBtYWluU2xpZGVWaWV3ID0gbmV3IE1haW5TbGlkZVZpZXcoKTtcclxuY29uc3QgYmVzdEJhbmNoYW5WaWV3ID0gbmV3IEJlc3RCYW5jaGFuVmlldygpO1xyXG5jb25zdCBzY3JvbGxlclZpZXcgPSBuZXcgU2Nyb2xsZXJWaWV3KCk7XHJcbmNvbnN0IHNpZGVCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnc2lkZScpO1xyXG5jb25zdCBtYWluQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ21haW4nKTtcclxuY29uc3QgY291cnNlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ2NvdXJzZScpO1xyXG5jb25zdCBhdXRvbUNvbXBsZXRlVmlldyA9IG5ldyBBdXRvbUNvbXBsZXRlVmlldygpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7Q29udHJvbGxlcn1cclxuICovXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih1cmxMaXN0LCBtYWluU2xpZGVWaWV3LCBiZXN0QmFuY2hhblZpZXcsIHNjcm9sbGVyVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIHNpZGVCYW5jaGFuVmlldywgbWFpbkJhbmNoYW5WaWV3LCBjb3Vyc2VCYW5jaGFuVmlldyk7XHJcblxyXG5jb25zdCBzZXRWaWV3ID0gKCkgPT4gY29udHJvbGxlci5zZXRWaWV3KCk7XHJcbm9uKHdpbmRvdywgJ2xvYWQnLCBzZXRWaWV3KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGRlbGVnYXRlLFxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgc2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgaXNWYWxpZCxcclxuICAgIG1vdmVTY3JvbGwsXHJcbiAgICBpc1N0cmluZyxcclxuICAgIGlzVXBkb3duLFxyXG4gICAgaXNFU0MsXHJcbiAgICBpc0VudGVyLFxyXG4gICAgZmV0Y2hKU09OUFxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmxMaXN0LCBtYWluU2xpZGVWaWV3LCBiZXN0QmFuY2hhblZpZXcsIHNjcm9sbGVyVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIC4uLmluZmluaXRlVmlld3MpIHtcclxuICAgICAgICB0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldyA9IG1haW5TbGlkZVZpZXc7XHJcbiAgICAgICAgdGhpcy5iZXN0QmFuY2hhblZpZXcgPSBiZXN0QmFuY2hhblZpZXc7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlclZpZXcgPSBzY3JvbGxlclZpZXc7XHJcbiAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldyA9IGF1dG9tQ29tcGxldGVWaWV3O1xyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cyA9IGluZmluaXRlVmlld3M7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tMb2NhbFN0b3JhZ2Uoa2V5LCBpc0pTT05QKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBnZXRMb2NhbFN0b3JhZ2Uoa2V5KTtcclxuICAgICAgICBpZiAoY2FjaGUgJiYgaXNWYWxpZChjYWNoZS50aW1lLCA2KSkgcmV0dXJuIGNhY2hlLmRhdGE7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IGlzSlNPTlAgPyAoYXdhaXQgZmV0Y2hKU09OUChrZXkpKVsxXSA6IGF3YWl0IHJlcXVlc3Qoa2V5KSxcclxuICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGEuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgPyBmYWxzZSA6IHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hNYWluU2xpZGUodGhpcy51cmxMaXN0Lm1haW5TbGlkZSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc0RvdHMnLCB0aGlzLmN1cnJlbnRTbGlkZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5mZXRjaEJlc3RCYW5jaGFuKHRoaXMudXJsTGlzdC5iZXN0QmFuY2hhbik7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3LmJpbmQoJ2NsaWNrJywgdGhpcy5tb3ZlU2Nyb2xsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cy5mb3JFYWNoKGluZmluaXRlVmlldyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJbmZpbml0ZUJhbmNoYW4oaW5maW5pdGVWaWV3LCB0aGlzLnVybExpc3RbaW5maW5pdGVWaWV3LnN0YXRlLm5hbWVdKTtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgICAgICBpbmZpbml0ZVZpZXcuYmluZCgnc2xpZGVzTmV4dCcsIHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmJpbmQoaW5maW5pdGVWaWV3KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuYmluZCgncHJlc3MnLCB0aGlzLnByZXNzQXV0b0NvbXBsZXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnc3VibWl0JywgdGhpcy5zdWJtaXRIaXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnaGlzdG9yeScsIHRoaXMuc2hvd0hpc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnbm9uQ2xpY2snKTtcclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ2hvdmVyJyk7XHJcblxyXG4gICAgICAgIGRlbGVnYXRlKCdib2R5JywgJ2EnLCAnY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hNYWluU2xpZGUodXJsKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUltZ3MgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbmQgPSB0aGlzLnNsaWRlSW1ncy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5zaG93U2xpZGUoMCwgdGhpcy5zbGlkZUltZ3NbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTbGlkZXModGFyZ2V0LCBuKSB7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmhpZGVTbGlkZSh0YXJnZXQuaW5kZXgpO1xyXG4gICAgICAgIHRhcmdldC5pbmRleCArPSBuO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPiB0aGlzLnNsaWRlc0VuZCkgdGFyZ2V0LmluZGV4ID0gMDtcclxuICAgICAgICBpZiAodGFyZ2V0LmluZGV4IDwgMCkgdGFyZ2V0LmluZGV4ID0gdGhpcy5zbGlkZXNFbmQ7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnNob3dTbGlkZSh0YXJnZXQuaW5kZXgsIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRTbGlkZSh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnNob3dTbGlkZSh0YXJnZXQuaW5kZXggPSBuLCB0aGlzLnNsaWRlSW1nc1t0YXJnZXQuaW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2Nyb2xsZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZGlyZWN0aW9uID09PSAndXAnID8gbW92ZVNjcm9sbCgwKSA6IG1vdmVTY3JvbGwoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHByZXNzQXV0b0NvbXBsZXRlKHRlcm0sIGtleSwgaXNTZWxldGVkKSB7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGtleSkpIHtcclxuICAgICAgICAgICAgaWYgKHRlcm0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZShgaHR0cHM6Ly9rby53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249b3BlbnNlYXJjaCZzZWFyY2g9JHt0ZXJtfWAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNVcGRvd24oa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3Lm1vdmVBdXRvQ29tcGxldGUoa2V5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRVNDKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFbnRlcihrZXkpKSB7XHJcbiAgICAgICAgICAgIGlzU2VsZXRlZCA/IHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW50ZXJBdXRvQ29tcGxldGUoKSA6IHRoaXMuc3VibWl0SGlzdG9yeSh0ZXJtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0SGlzdG9yeShrZXl3b3JkKSB7XHJcbiAgICAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IG5ldyBTZXQoZ2V0TG9jYWxTdG9yYWdlKCdoaXN0b3J5JykpO1xyXG4gICAgICAgICAgICBoaXN0b3J5LmFkZChrZXl3b3JkKTtcclxuICAgICAgICAgICAgc2V0TG9jYWxTdG9yYWdlKCdoaXN0b3J5JywgWy4uLmhpc3RvcnldKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5U2VhcmNoYmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNob3dIaXN0b3J5KGNoZWNrKSB7XHJcbiAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKTtcclxuICAgICAgICAgICAgaGlzdG9yeSAmJiB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LnJlbmRlcignaGlzdG9yeScsIGhpc3Rvcnkuc2xpY2UoLTUpLnJldmVyc2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoQmVzdEJhbmNoYW4odXJsKSB7XHJcbiAgICAgICAgY29uc3QgYmFuY2hhbiA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldy5yZW5kZXIoJ2Jlc3RCYW5jaGFuJywgYmFuY2hhbik7XHJcbiAgICAgICAgdGhpcy5iZXN0QmFuY2hhblZpZXcuYmluZCgnZm9vZFRhYicpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoSW5maW5pdGVCYW5jaGFuKHRhcmdldFZpZXcsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRhcmdldFZpZXcucmVuZGVyKCdiYW5jaGFuJywgZm9vZERhdGEpO1xyXG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZvb2REYXRhLmxlbmd0aCAqIDIuNTtcclxuICAgICAgICB0YXJnZXRWaWV3LmJpbmQoJ3NsaWRlcycsIHRoaXMucmVzZXRJbmZpbml0ZVNsaWRlcy5iaW5kKHRhcmdldFZpZXcsIC0yMCAtIHRocmVzaG9sZCwgLTIwICsgdGhyZXNob2xkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUluZmluaXRlU2xpZGVzKHRhcmdldCwgbW92ZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1NsaWRlcyh0YXJnZXQuZWwsIHRhcmdldC5kaXJlY3Rpb24gKz0gbW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRJbmZpbml0ZVNsaWRlcyh0aHJlc2hvbGRMZWZ0LCB0aHJlc2hvbGRSaWdodCwgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC5kaXJlY3Rpb24gPT09IHRocmVzaG9sZExlZnQgfHwgdGFyZ2V0LmRpcmVjdGlvbiA9PT0gdGhyZXNob2xkUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRhcmdldC5lbCwgdGFyZ2V0LmRpcmVjdGlvbiA9IC0yMCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXIuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwicHJkX2JveFxcXCI+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidGh1bWJfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8cD5cXHJcXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgICAgIDwvcD5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjaXJjbGVfbWFza1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbD5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcInByZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcInByZF9kZXNjcmlwdGlvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmRlc2NyaXB0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZXNjcmlwdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiZGVzY3JpcHRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kZD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcInByZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vbGliL2hhbmRsZWJhcnMucnVudGltZS5qcyIsImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBjcmVhdGVGcmFtZSwgaXNBcnJheX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGxldCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBsZXQgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIG9wdGlvbnMgPSB7ZGF0YTogZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzQXJyYXksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuLFxuICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmV0ID0gJycsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHRQYXRoO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjSXRlcmF0aW9uKGZpZWxkLCBpbmRleCwgbGFzdCkge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5rZXkgPSBmaWVsZDtcbiAgICAgICAgZGF0YS5pbmRleCA9IGluZGV4O1xuICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgIGRhdGEubGFzdCA9ICEhbGFzdDtcblxuICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGNvbnRleHQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHByaW9yS2V5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgLy8gV2UncmUgcnVubmluZyB0aGUgaXRlcmF0aW9ucyBvbmUgc3RlcCBvdXQgb2Ygc3luYyBzbyB3ZSBjYW4gZGV0ZWN0XG4gICAgICAgICAgICAvLyB0aGUgbGFzdCBpdGVyYXRpb24gd2l0aG91dCBoYXZlIHRvIHNjYW4gdGhlIG9iamVjdCB0d2ljZSBhbmQgY3JlYXRlXG4gICAgICAgICAgICAvLyBhbiBpdGVybWVkaWF0ZSBrZXlzIGFycmF5LlxuICAgICAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJpb3JLZXkgPSBrZXk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwiaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKC8qIFthcmdzLCBdb3B0aW9ucyAqLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0cnVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWlzc2luZyBoZWxwZXI6IFwiJyArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0ubmFtZSArICdcIicpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2lmLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gb2JqICYmIG9ialtmaWVsZF07XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIWlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRdLCBbZGF0YSAmJiBkYXRhLmNvbnRleHRQYXRoXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwiaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uKGZuLCBwcm9wcywgY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgbGV0IHJldCA9IGZuO1xuICAgIGlmICghcHJvcHMucGFydGlhbHMpIHtcbiAgICAgIHByb3BzLnBhcnRpYWxzID0ge307XG4gICAgICByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwYXJ0aWFscyBzdGFjayBmcmFtZSBwcmlvciB0byBleGVjLlxuICAgICAgICBsZXQgb3JpZ2luYWwgPSBjb250YWluZXIucGFydGlhbHM7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgbGV0IHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBDT01QSUxFUl9SRVZJU0lPTiwgUkVWSVNJT05fQ0hBTkdFUywgY3JlYXRlRnJhbWUgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgY29uc3QgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mbyAmJiBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICBjb25zdCBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBydW50aW1lVmVyc2lvbnMgKyAnKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKCcgKyBjb21waWxlclZlcnNpb25zICsgJykuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBjb21waWxlckluZm9bMV0gKyAnKS4nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlJyk7XG4gIH1cbiAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgfVxuXG4gIHRlbXBsYXRlU3BlYy5tYWluLmRlY29yYXRvciA9IHRlbXBsYXRlU3BlYy5tYWluX2Q7XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICBvcHRpb25zLmlkc1swXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGxldCByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJPcHRpb25zLCBlbnYpO1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuICAgICAgICBsZXQgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICBsZXQgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICBpZiAoIShuYW1lIGluIG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgY29uc3QgbGVuID0gZGVwdGhzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGRlcHRoc1tpXSAmJiBkZXB0aHNbaV1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBkZXB0aHNbaV1bbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxhbWJkYTogZnVuY3Rpb24oY3VycmVudCwgY29udGV4dCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICB9LFxuXG4gICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgIGZuOiBmdW5jdGlvbihpKSB7XG4gICAgICBsZXQgcmV0ID0gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBwcm9ncmFtczogW10sXG4gICAgcHJvZ3JhbTogZnVuY3Rpb24oaSwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgICAgbGV0IHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMgfHwgYmxvY2tQYXJhbXMgfHwgZGVjbGFyZWRCbG9ja1BhcmFtcykge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9ncmFtV3JhcHBlcjtcbiAgICB9LFxuXG4gICAgZGF0YTogZnVuY3Rpb24odmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgbGV0IG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgb2JqID0gVXRpbHMuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIC8vIEFuIGVtcHR5IG9iamVjdCB0byB1c2UgYXMgcmVwbGFjZW1lbnQgZm9yIG51bGwtY29udGV4dHNcbiAgICBudWxsQ29udGV4dDogT2JqZWN0LnNlYWwoe30pLFxuXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJcbiAgfTtcblxuICBmdW5jdGlvbiByZXQoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIGxldCBkZXB0aHMsXG4gICAgICAgIGJsb2NrUGFyYW1zID0gdGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zID8gW10gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBjb250ZXh0ICE9IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQvKiwgb3B0aW9ucyovKSB7XG4gICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIH1cbiAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcbiAgICByZXR1cm4gbWFpbihjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT0gZGVwdGhzWzBdICYmICEoY29udGV4dCA9PT0gY29udGFpbmVyLm51bGxDb250ZXh0ICYmIGRlcHRoc1swXSA9PT0gbnVsbCkpIHtcbiAgICAgIGN1cnJlbnREZXB0aHMgPSBbY29udGV4dF0uY29uY2F0KGRlcHRocyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuKGNvbnRhaW5lcixcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscyxcbiAgICAgICAgb3B0aW9ucy5kYXRhIHx8IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zICYmIFtvcHRpb25zLmJsb2NrUGFyYW1zXS5jb25jYXQoYmxvY2tQYXJhbXMpLFxuICAgICAgICBjdXJyZW50RGVwdGhzKTtcbiAgfVxuXG4gIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBpZiAoIXBhcnRpYWwpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnQHBhcnRpYWwtYmxvY2snKSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuICAgIC8vIFRoaXMgaXMgYSBkeW5hbWljIHBhcnRpYWwgdGhhdCByZXR1cm5lZCBhIHN0cmluZ1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnRpYWw7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG4gIH1cbiAgcmV0dXJuIHBhcnRpYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgLy8gVXNlIHRoZSBjdXJyZW50IGNsb3N1cmUgY29udGV4dCB0byBzYXZlIHRoZSBwYXJ0aWFsLWJsb2NrIGlmIHRoaXMgcGFydGlhbFxuICBjb25zdCBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICBsZXQgcGFydGlhbEJsb2NrO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcbiAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGZ1bmN0aW9uIHBhcnRpYWxCbG9ja1dyYXBwZXIoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcbiAgICAgIC8vIGkuZS4gdGhlIHBhcnQgaW5zaWRlIHRoZSBibG9jayBvZiB0aGUgcGFydGlhbCBjYWxsLlxuICAgICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIGlmIChmbi5wYXJ0aWFscykge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFscyA9IFV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucy5wYXJ0aWFscywgZm4ucGFydGlhbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuICcnOyB9XG5cbmZ1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpIHtcbiAgaWYgKGZuLmRlY29yYXRvcikge1xuICAgIGxldCBwcm9wcyA9IHt9O1xuICAgIHByb2cgPSBmbi5kZWNvcmF0b3IocHJvZywgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGhzICYmIGRlcHRoc1swXSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcbiAgfVxuICByZXR1cm4gcHJvZztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgIDxkaXYgY2xhc3M9J2JhZGdlJz5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvZGl2PlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwiYmFkZ2VfbGlzdFxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYmFkZ2UgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICA8c3Bhbj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdmb29kX2ltZ19ob3Zlcic+XFxyXFxuICAgIDx1bD5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZWxpdmVyeV90eXBlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8L3VsPlxcclxcbjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcImF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVyc1tcImNsYXNzXCJdIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMFtcImNsYXNzXCJdIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjbGFzc1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtdmFsdWU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5rZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5rZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJrZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArICgoc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5yZW5kZXJLZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZW5kZXJLZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJyZW5kZXJLZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfd3JhcFxcXCI+XFxyXFxuICAgIDxsaSBjbGFzcz1cXFwiYmVzdF9mb29kX2JveFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb29kX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcImZvb2RfZGV0YWlsXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcImZvb2RfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwiZm9vZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9saT5cXHJcXG48L2E+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uYW1lIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYT5cXHJcXG48L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIjx1bCBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF9saXN0XFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPjwvdWw+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgcXNhLFxyXG4gICAgb24sXHJcbiAgICB0aHJvdHRsZSxcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKCcuc2xpZGVzX3ByZXYnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHFzKCcuc2xpZGVzX25leHQnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsID0gcXNhKCcubWFpbl9zbGlkZXNfbGlzdCA+IGxpJyk7XHJcbiAgICAgICAgdGhpcy5kb3RzRWwgPSBxc2EoJy5zbGlkZXNfZG90cyA+IGxpID4gYScpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5zbGlkZXNfZG90cycsICcuc2xpZGVzX2RvdHMgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIHRocm90dGxlKGUgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCArZS5kZWxlZ2F0ZVRhcmdldC50ZXh0Q29udGVudCksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVTbGlkZShjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW2N1cnJlbnRJbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVvdXQnO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlKHNsaWRlSW5kZXgsIHNsaWRlSW1nKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtzbGlkZUluZGV4XS5jbGFzc05hbWUgPSAnZmFkZWluJztcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3NsaWRlSW5kZXhdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke3NsaWRlSW1nfVwiKWA7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbc2xpZGVJbmRleF0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbCA9IHFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuZm9vZFRhYkVsLCAnbGkgPiBhJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RUYWJMaXN0RWwpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIgPT09IGUuZGVsZWdhdGVUYXJnZXQgPyAnbm93JyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZEJveExpc3RFbCkuZm9yRWFjaChmb29kID0+IGZvb2Quc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5jYXRlZ29yeV9pZCA9PT0gZm9vZC5kYXRhc2V0LmNhdGVnb3J5X2lkID8gJ2Jsb2NrJyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJlc3RCYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3RCYW5jaGFuKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICBiZXN0QmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiKGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZENvbnRhaW5lcihmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveChmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWJMaXN0KGZvb2QsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kVGFiID0gZm9vZC5tYXAodmFsdWUgPT4gZm9vZFRhYlRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RDb250YWluZXIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RDb250YWluZXIgPSBmb29kLm1hcCh2YWx1ZSA9PiBjb250YWluZXJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZFxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBxcygnLmJlc3RfZm9vZF9jb250YWluZXInKS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChmb29kKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX2JveF9saXN0Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IHZhbHVlLml0ZW1zLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgICAgICBmb29kQm94VGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3goZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hFbCA9IHFzYSgnLmJlc3RfZm9vZF9ib3gnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFsdWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiTGlzdChmb29kLCBpbml0TnVtKSB7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwiaW1wb3J0IHtcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5wYWdlX3VwX2Rvd25fbGlzdCcsICcucGFnZV91cF9kb3duX2xpc3QgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcihlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsImltcG9ydCBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQgYmFkZ2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCc7XHJcbmltcG9ydCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuaW5maW5pdGVfZm9vZF9ib3hfbGlzdGApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19wcmV2YCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNOZXh0RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuc2xpZGVzX25leHRgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgZWw6IHRoaXMuZm9vZEJveEVsLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IC0yMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuZm9vZEJveEVsLCAndHJhbnNpdGlvbmVuZCcsICgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxMCksIDYwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCBwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQmFuY2hhbihwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdCh0aGlzLnN0YXRlLmVsLCBmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3goZm9vZCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3g+YWApKTtcclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlcyh0aGlzLnN0YXRlLmVsLCBxc2EoYC4ke3RoaXMuc3RhdGUubmFtZX1fZm9vZCAucHJkX2JveGApKTtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXModGhpcy5zdGF0ZS5lbCwgdGhpcy5zdGF0ZS5kaXJlY3Rpb24sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGVsZW1lbnQsIGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IGZvb2QubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgZm9vZEJveEluZmluaXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QsIHByZEJveCkge1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTbGlkZXMoZWxlbWVudCwgU2xpZGVzKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlcyA9IEFycmF5LmZyb20oU2xpZGVzKS5zbGljZSgtNCk7XHJcblxyXG4gICAgICAgIFNsaWRlcy5mb3JFYWNoKFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoU2xpZGUuY2xvbmVOb2RlKHRydWUpKSk7XHJcbiAgICAgICAgbGFzdFNsaWRlcy5yZXZlcnNlKCkuZm9yRWFjaChsYXN0U2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobGFzdFNsaWRlLmNsb25lTm9kZSh0cnVlKSwgZWxlbWVudC5jaGlsZE5vZGVzWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlcyhlbGVtZW50LCBkaXJlY3Rpb24sIEltbWVkaWF0ZWx5KSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBJbW1lZGlhdGVseSA/ICcwcycgOiAnMC41cyc7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2RpcmVjdGlvbn0lKWA7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwiaW1wb3J0IGF1dG9jb21wbGV0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIG9uLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IHFzKCcjc2VhcmNoX3N0cicpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdXR0b25FbCA9IHFzKCcuc2VhcmNoX2J0bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgcHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdrZXl1cCcsIGUgPT4gaGFuZGxlcihlLnRhcmdldC52YWx1ZSwgZS5rZXlDb2RlLCB0aGlzLnNlbCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoQnV0dG9uRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIodGhpcy5zZWFyY2hFbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaXN0b3J5OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEVsLCAnY2xpY2snLCAoKSA9PiBoYW5kbGVyKCF0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MICYmICF0aGlzLnNlYXJjaEVsLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSh0aGlzLnN1Z2dlc3Rpb25zRWwsICcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZShlLmRlbGVnYXRlVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyQXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKCdib2R5JywgJyonLCAnY2xpY2snLCBlID0+IGUudGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEVsICYmIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSh0aGlzLnN1Z2dlc3Rpb25zRWwsICcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdmVyJywgZSA9PiB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZShlLmRlbGVnYXRlVGFyZ2V0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXV0b0NvbXBsZXRlKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXJjaGVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlYXJjaGVzKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBdXRvQ29tcGxldGUodGVybSwgc3VnZ2VzdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IFJlZ0V4cCh0ZXJtLCAnaWcnKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc1N0ciA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zU3RyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGVzU3RyID0gc2VhcmNoZXMubWFwKHNlYXJjaCA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaGVzJyxcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHNlYXJjaCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHNlYXJjaFxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHNlYXJjaGVzU3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlckF1dG9Db21wbGV0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWwgJiYgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gdGhpcy5zZWwuZGF0YXNldC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVBdXRvQ29tcGxldGUoa2V5KSB7XHJcbiAgICAgICAgdGhpcy5zZWwgPSBxcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uLnNlbGVjdGVkJyk7XHJcbiAgICAgICAgY29uc3QgW25leHRFbCwgcHJldkVsXSA9IHRoaXMuc2VsID8gW3RoaXMuc2VsLm5leHRTaWJsaW5nLCB0aGlzLnNlbC5wcmV2aW91c1NpYmxpbmddIDogW3RoaXMuc3VnZ2VzdGlvbnNFbC5maXJzdENoaWxkLCB0aGlzLnN1Z2dlc3Rpb25zRWwubGFzdENoaWxkXTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBrZXkgPT09IDQwID8gbmV4dEVsIDogcHJldkVsO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQXV0b0NvbXBsZXRlKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuc2VsICYmIHRoaXMuc2VsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5zZWwgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5zZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eUF1dG9Db21wbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlTZWFyY2hiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldy5qcyJdLCJzb3VyY2VSb290IjoiIn0=