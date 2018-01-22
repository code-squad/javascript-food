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
    function _class(urlList, mainSlideView, bestBanchanView, scrollerView, autoCompleteView) {
        _classCallCheck(this, _class);

        this.urlList = urlList;
        this.mainSlideView = mainSlideView;
        this.bestBanchanView = bestBanchanView;
        this.scrollerView = scrollerView;
        this.autoCompleteView = autoCompleteView;

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

            this.bindMainSlide().fetchMainSlide(this.urlList.mainSlide);
            this.fetchBestBanchan(this.urlList.bestBanchan);
            this.bindScroller();
            this.fetchInfiniteSlide();
            this.infiniteViews.forEach(function (infiniteView) {
                infiniteView.bind('slidesPrev', _this.moveInfiniteSlides.bind(infiniteView));
                infiniteView.bind('slidesNext', _this.moveInfiniteSlides.bind(infiniteView));
                _this.fetchInfiniteBanchan(infiniteView, _this.urlList[infiniteView.state.name]);
            });
            this.bindAutoComplete();
            (0, _helpers.delegate)('body', 'a', 'click', function (e) {
                return e.preventDefault();
            });
        }
    }, {
        key: 'bindMainSlide',
        value: function bindMainSlide() {
            this.mainSlideView.bind('slidesPrev', this.moveSlides.bind(this));
            this.mainSlideView.bind('slidesNext', this.moveSlides.bind(this));
            this.mainSlideView.bind('slidesDots', this.currentSlide.bind(this));
            return this;
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
        key: 'bindScroller',
        value: function bindScroller() {
            this.scrollerView.bind('click', this.moveScroller.bind(this));
            this.scrollerView.bind('hide', this.moveScroller.bind(this));
        }
    }, {
        key: 'bindAutoComplete',
        value: function bindAutoComplete() {
            this.autoCompleteView.bind('press', this.pressAutoComplete.bind(this));
            this.autoCompleteView.bind('submit', this.submitHistory.bind(this));
            this.autoCompleteView.bind('history', this.showHistory.bind(this));
            this.autoCompleteView.bind('click');
            this.autoCompleteView.bind('nonClick');
            this.autoCompleteView.bind('hover');
        }
    }, {
        key: 'moveScroller',
        value: function moveScroller(direction) {
            direction === 'up' ? (0, _helpers.moveScroll)(0) : (0, _helpers.moveScroll)(document.body.clientHeight);
        }
    }, {
        key: 'pressAutoComplete',
        value: async function pressAutoComplete(term, key, isSeleted) {
            var isString = !key || (key < 35 || key > 40) && key !== 13 && key !== 27;
            var isUpdown = key === 40 || key === 38;
            var isESC = key === 27;
            var isEnter = key === 13;

            if (isString) {
                if (term) {
                    var suggestions = await this.checkLocalStorage('https://ko.wikipedia.org/w/api.php?action=opensearch&search=' + term, true);
                    this.autoCompleteView.render('autoComplete', term, suggestions);
                } else {
                    this.autoCompleteView.emptyAutoComplete();
                }
            } else if (isUpdown) {
                this.autoCompleteView.moveAutoComplete(key);
            } else if (isESC) {
                this.autoCompleteView.emptyAutoComplete();
            } else if (isEnter) {
                isSeleted ? this.autoCompleteView.enterAutoComplete() : this.submitHistory(term);
            }
        }
    }, {
        key: 'submitHistory',
        value: function submitHistory(keyword) {
            if (keyword) {
                var history = new Set((0, _helpers.getLocalStorage)('history'));
                history.add(keyword);
                (0, _helpers.setLocalStorage)('history', [].concat(_toConsumableArray(history)));
                this.autoCompleteView.emptyAutoComplete();
                this.autoCompleteView.emptySearchbar();
            }
        }
    }, {
        key: 'showHistory',
        value: async function showHistory(check) {
            if (check) {
                var history = await (0, _helpers.getLocalStorage)('history');
                history && this.autoCompleteView.render('history', history.slice(-5).reverse());
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
            return this;
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

        this.updownButton = (0, _helpers.qs)('.page_up_down_list');
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd, handler) {
            var _this = this;

            var bindCommands = {
                click: function click() {
                    (0, _helpers.delegate)(_this.updownButton, '.page_up_down_list > li > a', 'click', function (e) {
                        return handler(e.delegateTarget.dataset.direction);
                    });
                },
                hide: function hide() {
                    (0, _helpers.on)(window, 'scroll', function () {
                        _this.updownButton.style.display = window.scrollY > 90 ? 'block' : 'none';
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
                history: function history() {
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
            var suggestionsComponent = suggestions.map(function (suggestion) {
                return (0, _autocompleteTpl2.default)({
                    keyword: suggestion,
                    renderKeyword: suggestion.replace(target, '<b>' + term + '</b>')
                });
            }).join('');
            this.suggestionsEl.insertAdjacentHTML('afterbegin', suggestionsComponent);
        }
    }, {
        key: 'renderSearches',
        value: function renderSearches(searches) {
            var historyComponent = searches.map(function (search) {
                return (0, _autocompleteTpl2.default)({
                    class: 'searches',
                    keyword: search,
                    renderKeyword: search
                });
            }).join('');
            this.suggestionsEl.insertAdjacentHTML('afterbegin', historyComponent);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDk5OWY3ZjljZjgyMDI5MWI3MmMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIl0sIm5hbWVzIjpbInFzIiwicXNhIiwib24iLCJkZWxlZ2F0ZSIsInJlcXVlc3QiLCJ0aHJvdHRsZSIsImdldExvY2FsU3RvcmFnZSIsInNldExvY2FsU3RvcmFnZSIsImlzVmFsaWQiLCJtb3ZlU2Nyb2xsIiwic2VsZWN0b3IiLCJzY29wZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwidHlwZSIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGVsZWdhdGUiLCJsaXN0ZW5lckZuIiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwiZSIsImRlbGVnYXRlVGFyZ2V0IiwidGFyZ2V0IiwiY2xvc2VzdCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJvbnRpbWVvdXQiLCJzZW5kIiwiZnVuYyIsImxpbWl0Iiwid2FpdCIsInNldFRpbWVvdXQiLCJlYXNlSW5PdXRRdWFkIiwidCIsImIiLCJjIiwiZCIsImVhc2VJblF1YWQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidmFsdWUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGF0YSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInVuaXF1ZSIsIm1hdGNoIiwic3JjIiwid2luZG93IiwianNvbiIsInJlbW92ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZSIsIm1haW4iLCJjb3Vyc2UiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwiYXV0b0NvbXBsZXRlVmlldyIsImluZmluaXRlVmlld3MiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kTWFpblNsaWRlIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiYmluZFNjcm9sbGVyIiwiZmV0Y2hJbmZpbml0ZVNsaWRlIiwiZm9yRWFjaCIsImluZmluaXRlVmlldyIsIm1vdmVJbmZpbml0ZVNsaWRlcyIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwic3RhdGUiLCJiaW5kQXV0b0NvbXBsZXRlIiwicHJldmVudERlZmF1bHQiLCJtb3ZlU2xpZGVzIiwiY3VycmVudFNsaWRlIiwic2xpZGVJbWdzIiwiY2hlY2tMb2NhbFN0b3JhZ2UiLCJzbGlkZXNFbmQiLCJsZW5ndGgiLCJzaG93U2xpZGUiLCJuIiwiaGlkZVNsaWRlIiwiaW5kZXgiLCJtb3ZlU2Nyb2xsZXIiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdEhpc3RvcnkiLCJzaG93SGlzdG9yeSIsImRpcmVjdGlvbiIsImNsaWVudEhlaWdodCIsInRlcm0iLCJpc1NlbGV0ZWQiLCJpc1N0cmluZyIsImlzVXBkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwic3VnZ2VzdGlvbnMiLCJyZW5kZXIiLCJlbXB0eUF1dG9Db21wbGV0ZSIsIm1vdmVBdXRvQ29tcGxldGUiLCJlbnRlckF1dG9Db21wbGV0ZSIsImtleXdvcmQiLCJoaXN0b3J5IiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJjaGVjayIsInNsaWNlIiwicmV2ZXJzZSIsImJhbmNoYW4iLCJ0YXJnZXRWaWV3IiwiZm9vZERhdGEiLCJ0aHJlc2hvbGQiLCJyZXNldEluZmluaXRlU2xpZGVzIiwibW92ZSIsInNob3dTbGlkZXMiLCJlbCIsInRocmVzaG9sZExlZnQiLCJ0aHJlc2hvbGRSaWdodCIsImciLCJGdW5jdGlvbiIsImV2YWwiLCJzbGlkZXNQcmV2RWwiLCJzbGlkZXNOZXh0RWwiLCJzbGlkZXNFbCIsImRvdHNFbCIsImJpbmRDbWQiLCJoYW5kbGVyIiwiYmluZENvbW1hbmRzIiwic2xpZGVzUHJldiIsInNsaWRlc05leHQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJjdXJyZW50SW5kZXgiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiZGlzcGxheSIsImRhdGFzZXQiLCJjYXRlZ29yeV9pZCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlckZvb2RUYWJMaXN0IiwiZmxvb3IiLCJyYW5kb20iLCJqb2luIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZm9vZENvbnRhaW5lciIsImkiLCJmb29kQm94TGlzdCIsIml0ZW1zIiwiaW1hZ2UiLCJpdGVtIiwiYWx0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIm9sZF9wcmljZSIsIm5fcHJpY2UiLCJuZXdfcHJpY2UiLCJzX3ByaWNlIiwid29uIiwiZm9vZEJveEVsIiwibGVuIiwiaiIsImJhZGdlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkZWxpdmVyeV90eXBlIiwiaW5pdE51bSIsInVwZG93bkJ1dHRvbiIsImNsaWNrIiwiaGlkZSIsInNsaWRlcyIsInJlbmRlckJhbmNoYW4iLCJyZW5kZXJTbGlkZXMiLCJwcmRCb3giLCJTbGlkZXMiLCJsYXN0U2xpZGVzIiwiU2xpZGUiLCJjbG9uZU5vZGUiLCJpbnNlcnRCZWZvcmUiLCJsYXN0U2xpZGUiLCJjaGlsZE5vZGVzIiwiSW1tZWRpYXRlbHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJ0cmFuc2Zvcm0iLCJzZWFyY2hFbCIsInN1Z2dlc3Rpb25zRWwiLCJzZWFyY2hCdXR0b25FbCIsInByZXNzIiwia2V5Q29kZSIsInNlbCIsInN1Ym1pdCIsImlubmVySFRNTCIsInVwZGF0ZUF1dG9Db21wbGV0ZSIsIm5vbkNsaWNrIiwiaG92ZXIiLCJhdXRvQ29tcGxldGUiLCJyZW5kZXJBdXRvQ29tcGxldGUiLCJyZW5kZXJTZWFyY2hlcyIsIlJlZ0V4cCIsInN1Z2dlc3Rpb25zQ29tcG9uZW50Iiwic3VnZ2VzdGlvbiIsInJlbmRlcktleXdvcmQiLCJyZXBsYWNlIiwic2VhcmNoZXMiLCJoaXN0b3J5Q29tcG9uZW50IiwiY2xhc3MiLCJzZWFyY2giLCJuZXh0U2libGluZyIsInByZXZpb3VzU2libGluZyIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJuZXh0RWwiLCJwcmV2RWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxl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LEdBQUwsQ0FBU2tCLFdBQVYsRUFBdUIsS0FBS2xCLEdBQUwsQ0FBU21CLGVBQWhDLENBQVgsR0FBOEQsQ0FBQyxLQUFLdkIsYUFBTCxDQUFtQndCLFVBQXBCLEVBQWdDLEtBQUt4QixhQUFMLENBQW1CeUIsU0FBbkQsQ0FGckU7QUFBQTtBQUFBLGdCQUVYQyxNQUZXO0FBQUEsZ0JBRUhDLE1BRkc7O0FBR2xCLGdCQUFNN1AsU0FBUzBCLFFBQVEsRUFBUixHQUFha08sTUFBYixHQUFzQkMsTUFBckM7QUFDQSxpQkFBS3BCLGtCQUFMLENBQXdCek8sTUFBeEI7QUFDSDs7OzJDQUVrQkEsTSxFQUFRO0FBQ3ZCLGlCQUFLc08sR0FBTCxJQUFZLEtBQUtBLEdBQUwsQ0FBU3RFLFNBQVQsQ0FBbUJwRyxNQUFuQixDQUEwQixVQUExQixDQUFaO0FBQ0EsaUJBQUswSyxHQUFMLEdBQVd0TyxNQUFYO0FBQ0EsaUJBQUtzTyxHQUFMLENBQVN0RSxTQUFULENBQW1CL0IsR0FBbkIsQ0FBdUIsVUFBdkI7QUFDSDs7OzRDQUVtQjtBQUNoQixpQkFBS2lHLGFBQUwsQ0FBbUJNLFNBQW5CLEdBQStCLEVBQS9CO0FBQ0g7Ozt5Q0FFZ0I7QUFDYixpQkFBS1AsUUFBTCxDQUFjcE0sS0FBZCxHQUFzQixFQUF0QjtBQUNIIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ5OTlmN2Y5Y2Y4MjAyOTFiNzJjIiwiY29uc3QgZXNjYXBlID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgJ2AnOiAnJiN4NjA7JyxcbiAgJz0nOiAnJiN4M0Q7J1xufTtcblxuY29uc3QgYmFkQ2hhcnMgPSAvWyY8PlwiJ2A9XS9nLFxuICAgICAgcG9zc2libGUgPSAvWyY8PlwiJ2A9XS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChvYmovKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGxldCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtc3R5bGUgKi9cbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4vLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG5leHBvcnQge2lzRnVuY3Rpb259O1xuLyogZXNsaW50LWVuYWJsZSBmdW5jLXN0eWxlICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuXG4vLyBPbGRlciBJRSB2ZXJzaW9ucyBkbyBub3QgZGlyZWN0bHkgc3VwcG9ydCBpbmRleE9mIHNvIHdlIG11c3QgaW1wbGVtZW50IG91ciBvd24sIHNhZGx5LlxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgICBpZiAoc3RyaW5nICYmIHN0cmluZy50b0hUTUwpIHtcbiAgICAgIHJldHVybiBzdHJpbmcudG9IVE1MKCk7XG4gICAgfSBlbHNlIGlmIChzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZyArICcnO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAgIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nO1xuICB9XG5cbiAgaWYgKCFwb3NzaWJsZS50ZXN0KHN0cmluZykpIHsgcmV0dXJuIHN0cmluZzsgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGcmFtZShvYmplY3QpIHtcbiAgbGV0IGZyYW1lID0gZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9ja1BhcmFtcyhwYXJhbXMsIGlkcykge1xuICBwYXJhbXMucGF0aCA9IGlkcztcbiAgcmV0dXJuIHBhcmFtcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy91dGlscy5qcyIsIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCIvKipcclxuICogcXVlcnlTZWxlY3RvciB3cmFwcGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBTZWxlY3RvciB0byBxdWVyeVxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IFtzY29wZV0gT3B0aW9uYWwgc2NvcGUgZWxlbWVudCBmb3IgdGhlIHNlbGVjdG9yXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcXMoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcXNhKHNlbGVjdG9yLCBzY29wZSkge1xyXG4gICAgcmV0dXJuIChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhZGRFdmVudExpc3RlbmVyIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fFdpbmRvd30gZWxlbWVudCBUYXJnZXQgRWxlbWVudFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBFdmVudCBuYW1lIHRvIGJpbmQgdG9cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgRXZlbnQgY2FsbGJhY2tcclxuICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlIENhcHR1cmUgdGhlIGV2ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gb24oZWxlbWVudCwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZnVuY3Rpb24gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ3xBcnJheX0gW2VsZW1lbnRzXVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50cywgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cy5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBFbGVtZW50LWxlc3MgdXNhZ2UsIGl0IGRlZmF1bHRzIHRvIGdsb2JhbCBkZWxlZ2F0aW9uXHJcbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBVc2UgYGRvY3VtZW50YCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCB0aGVuIGFwcGx5IGFyZ3VtZW50c1xyXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydCB3YXkgdG8gLnVuc2hpZnQgYGFyZ3VtZW50c2Agd2l0aG91dCBydW5uaW5nIGludG8gZGVvcHRpbWl6YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBBcnJheS1saWtlIGJhc2VkIHVzYWdlXHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQUpBWCByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4gKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApID9cclxuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZSkpIDogcmVqZWN0KHhoci5zdGF0dXMpO1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiByZWplY3QoJ3RpbWVvdXQnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gdGhhdCwgd2hlbiBpbnZva2VkLCBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gdG8gd3JhcC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGxpbWl0IE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IGVsYXBzZSBiZXR3ZWVuIGBmdW5jYCBpbnZvY2F0aW9ucy5cclxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd3JhcHMgdGhlIGBmdW5jYCBmdW5jdGlvbiBwYXNzZWQgaW4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XHJcbiAgICBsZXQgd2FpdCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXdhaXQpIHtcclxuICAgICAgICAgICAgZnVuYy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB3YWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBzdGFydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYyBjaGFuZ2UgaW4gdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfSBuZXcgc2Nyb2xsWVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xyXG4gICAgdCAvPSBkIC8gMjtcclxuICAgIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG4gICAgdC0tO1xyXG4gICAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKGtleSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgcmV0dXJuIHZhbHVlLmRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKHJlY2VpdmVkVGltZSwgdGhyZXNob2xkSG91cikge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSAoY3VycmVudFRpbWUgLSByZWNlaXZlZFRpbWUpIC8gMTAwMCAvIDYwIC8gNjA7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWUgPCB0aHJlc2hvbGRIb3VyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVNjcm9sbCh0bykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzY3JvbGxZO1xyXG4gICAgY29uc3QgY2hhbmdlID0gdG8gLSBzdGFydDtcclxuICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC5hYnMoY2hhbmdlIC8gNCk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnQgPSAyMDtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZVNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBjdXJyZW50VGltZSArPSBpbmNyZW1lbnQ7XHJcbiAgICAgICAgbGV0IG5ld1kgPSBlYXNlSW5RdWFkKGN1cnJlbnRUaW1lLCBzdGFydCwgY2hhbmdlLCBkdXJhdGlvbik7XHJcbiAgICAgICAgc2Nyb2xsVG8oMCwgbmV3WSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hKU09OUCA9ICh1bmlxdWUgPT4gdXJsID0+XHJcbiAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gYF9qc29ucF8ke3VuaXF1ZSsrfWA7XHJcbiAgICAgICAgdXJsICs9IHVybC5tYXRjaCgvXFw/LykgPyBgJmNhbGxiYWNrPSR7bmFtZX1gIDogYD9jYWxsYmFjaz0ke25hbWV9YDtcclxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xyXG4gICAgICAgIHdpbmRvd1tuYW1lXSA9IGpzb24gPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGpzb24pO1xyXG4gICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbbmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9KVxyXG4pKDApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMuanMiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiaW1wb3J0IHtjcmVhdGVGcmFtZSwgZXh0ZW5kLCB0b1N0cmluZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0SGVscGVyc30gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9yc30gZnJvbSAnLi9kZWNvcmF0b3JzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9ICc0LjAuMTEnO1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1JFVklTSU9OID0gNztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuICA3OiAnPj0gNC4wLjAnXG59O1xuXG5jb25zdCBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nZ2VyLmxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgZXh0ZW5kKHRoaXMucGFydGlhbHMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIiR7bmFtZX1cIiBhcyB1bmRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuZGVjb3JhdG9yc1tuYW1lXTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBsb2cgPSBsb2dnZXIubG9nO1xuXG5leHBvcnQge2NyZWF0ZUZyYW1lLCBsb2dnZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQge1xyXG4gICAgb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgTWFpblNsaWRlVmlldyBmcm9tICcuL3ZpZXcvTWFpblNsaWRlVmlldyc7XHJcbmltcG9ydCBCZXN0QmFuY2hhblZpZXcgZnJvbSAnLi92aWV3L0Jlc3RCYW5jaGFuVmlldyc7XHJcbmltcG9ydCBTY3JvbGxlclZpZXcgZnJvbSAnLi92aWV3L1Njcm9sbGVyVmlldyc7XHJcbmltcG9ydCBJbmZpbml0ZVNsaWRlVmlldyBmcm9tICcuL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcnO1xyXG5pbXBvcnQgQXV0b21Db21wbGV0ZVZpZXcgZnJvbSAnLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcnO1xyXG5cclxuY29uc3QgdXJsTGlzdCA9IHtcclxuICAgIG1haW5TbGlkZTogJ2h0dHA6Ly9ob21lLmRvdG9sLnh5ei9waHAvdGVzdF9hcGkucGhwJyxcclxuICAgIGJlc3RCYW5jaGFuOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL2Jlc3QnLFxyXG4gICAgc2lkZTogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9zaWRlJyxcclxuICAgIG1haW46ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2EvbWFpbicsXHJcbiAgICBjb3Vyc2U6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2Evc291cCdcclxufTtcclxuXHJcbmNvbnN0IG1haW5TbGlkZVZpZXcgPSBuZXcgTWFpblNsaWRlVmlldygpO1xyXG5jb25zdCBiZXN0QmFuY2hhblZpZXcgPSBuZXcgQmVzdEJhbmNoYW5WaWV3KCk7XHJcbmNvbnN0IHNjcm9sbGVyVmlldyA9IG5ldyBTY3JvbGxlclZpZXcoKTtcclxuY29uc3Qgc2lkZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdzaWRlJyk7XHJcbmNvbnN0IG1haW5CYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnbWFpbicpO1xyXG5jb25zdCBjb3Vyc2VCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnY291cnNlJyk7XHJcbmNvbnN0IGF1dG9tQ29tcGxldGVWaWV3ID0gbmV3IEF1dG9tQ29tcGxldGVWaWV3KCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtDb250cm9sbGVyfVxyXG4gKi9cclxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHVybExpc3QsIG1haW5TbGlkZVZpZXcsIGJlc3RCYW5jaGFuVmlldywgc2Nyb2xsZXJWaWV3LCBhdXRvbUNvbXBsZXRlVmlldywgc2lkZUJhbmNoYW5WaWV3LCBtYWluQmFuY2hhblZpZXcsIGNvdXJzZUJhbmNoYW5WaWV3KTtcclxuXHJcbmNvbnN0IHNldFZpZXcgPSAoKSA9PiBjb250cm9sbGVyLnNldFZpZXcoKTtcclxub24od2luZG93LCAnbG9hZCcsIHNldFZpZXcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyIsImltcG9ydCB7XHJcbiAgICByZXF1ZXN0LFxyXG4gICAgZGVsZWdhdGUsXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBpc1ZhbGlkLFxyXG4gICAgbW92ZVNjcm9sbCxcclxuICAgIGZldGNoSlNPTlBcclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9Db21wbGV0ZVZpZXcsIC4uLmluZmluaXRlVmlld3MpIHtcclxuICAgICAgICB0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldyA9IG1haW5TbGlkZVZpZXc7XHJcbiAgICAgICAgdGhpcy5iZXN0QmFuY2hhblZpZXcgPSBiZXN0QmFuY2hhblZpZXc7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlclZpZXcgPSBzY3JvbGxlclZpZXc7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3ID0gYXV0b0NvbXBsZXRlVmlldztcclxuICAgICAgICB0aGlzLmluZmluaXRlVmlld3MgPSBpbmZpbml0ZVZpZXdzO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNoZWNrTG9jYWxTdG9yYWdlKGtleSwgaXNKU09OUCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gZ2V0TG9jYWxTdG9yYWdlKGtleSk7XHJcbiAgICAgICAgaWYgKGNhY2hlICYmIGlzVmFsaWQoY2FjaGUudGltZSwgNikpIHJldHVybiBjYWNoZS5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBpc0pTT05QID8gKGF3YWl0IGZldGNoSlNPTlAoa2V5KSlbMV0gOiBhd2FpdCByZXF1ZXN0KGtleSksXHJcbiAgICAgICAgICAgIHRpbWU6IERhdGUubm93KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5kYXRhLmhhc093blByb3BlcnR5KCdlcnJvcicpID8gZmFsc2UgOiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmlldygpIHtcclxuICAgICAgICB0aGlzLmJpbmRNYWluU2xpZGUoKS5mZXRjaE1haW5TbGlkZSh0aGlzLnVybExpc3QubWFpblNsaWRlKTtcclxuICAgICAgICB0aGlzLmZldGNoQmVzdEJhbmNoYW4odGhpcy51cmxMaXN0LmJlc3RCYW5jaGFuKTtcclxuICAgICAgICB0aGlzLmJpbmRTY3JvbGxlcigpO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hJbmZpbml0ZVNsaWRlKCk7XHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzLmZvckVhY2goaW5maW5pdGVWaWV3ID0+IHtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgICAgICBpbmZpbml0ZVZpZXcuYmluZCgnc2xpZGVzTmV4dCcsIHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmJpbmQoaW5maW5pdGVWaWV3KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJbmZpbml0ZUJhbmNoYW4oaW5maW5pdGVWaWV3LCB0aGlzLnVybExpc3RbaW5maW5pdGVWaWV3LnN0YXRlLm5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJpbmRBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICdhJywgJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNYWluU2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc0RvdHMnLCB0aGlzLmN1cnJlbnRTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaE1haW5TbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnNob3dTbGlkZSgwLCB0aGlzLnNsaWRlSW1nc1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlcyh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGFyZ2V0LmluZGV4ICs9IG47XHJcbiAgICAgICAgaWYgKHRhcmdldC5pbmRleCA+IHRoaXMuc2xpZGVzRW5kKSB0YXJnZXQuaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPCAwKSB0YXJnZXQuaW5kZXggPSB0aGlzLnNsaWRlc0VuZDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCwgdGhpcy5zbGlkZUltZ3NbdGFyZ2V0LmluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudFNsaWRlKHRhcmdldCwgbikge1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5oaWRlU2xpZGUodGFyZ2V0LmluZGV4KTtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCA9IG4sIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTY3JvbGxlcigpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldy5iaW5kKCdjbGljaycsIHRoaXMubW92ZVNjcm9sbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3LmJpbmQoJ2hpZGUnLCB0aGlzLm1vdmVTY3JvbGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5iaW5kKCdwcmVzcycsIHRoaXMucHJlc3NBdXRvQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGlzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuYmluZCgnaGlzdG9yeScsIHRoaXMuc2hvd0hpc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ2NsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ25vbkNsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ2hvdmVyJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vdmVTY3JvbGxlcihkaXJlY3Rpb24pIHtcclxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCcgPyBtb3ZlU2Nyb2xsKDApIDogbW92ZVNjcm9sbChkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcHJlc3NBdXRvQ29tcGxldGUodGVybSwga2V5LCBpc1NlbGV0ZWQpIHtcclxuICAgICAgICBjb25zdCBpc1N0cmluZyA9ICgha2V5IHx8IChrZXkgPCAzNSB8fCBrZXkgPiA0MCkgJiYga2V5ICE9PSAxMyAmJiBrZXkgIT09IDI3KTtcclxuICAgICAgICBjb25zdCBpc1VwZG93biA9IChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG4gICAgICAgIGNvbnN0IGlzRVNDID0ga2V5ID09PSAyNztcclxuICAgICAgICBjb25zdCBpc0VudGVyID0ga2V5ID09PSAxMztcclxuXHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9ucyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UoYGh0dHBzOi8va28ud2lraXBlZGlhLm9yZy93L2FwaS5waHA/YWN0aW9uPW9wZW5zZWFyY2gmc2VhcmNoPSR7dGVybX1gLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1VwZG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcubW92ZUF1dG9Db21wbGV0ZShrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0MpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKSB7XHJcbiAgICAgICAgICAgIGlzU2VsZXRlZCA/IHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbnRlckF1dG9Db21wbGV0ZSgpIDogdGhpcy5zdWJtaXRIaXN0b3J5KHRlcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRIaXN0b3J5KGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5U2VhcmNoYmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNob3dIaXN0b3J5KGNoZWNrKSB7XHJcbiAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKTtcclxuICAgICAgICAgICAgaGlzdG9yeSAmJiB0aGlzLmF1dG9Db21wbGV0ZVZpZXcucmVuZGVyKCdoaXN0b3J5JywgaGlzdG9yeS5zbGljZSgtNSkucmV2ZXJzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hCZXN0QmFuY2hhbih1cmwpIHtcclxuICAgICAgICBjb25zdCBiYW5jaGFuID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3LnJlbmRlcignYmVzdEJhbmNoYW4nLCBiYW5jaGFuKTtcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldy5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hJbmZpbml0ZUJhbmNoYW4odGFyZ2V0VmlldywgdXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGFyZ2V0Vmlldy5yZW5kZXIoJ2JhbmNoYW4nLCBmb29kRGF0YSk7XHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZm9vZERhdGEubGVuZ3RoICogMi41O1xyXG4gICAgICAgIHRhcmdldFZpZXcuYmluZCgnc2xpZGVzJywgdGhpcy5yZXNldEluZmluaXRlU2xpZGVzLmJpbmQodGFyZ2V0VmlldywgLTIwIC0gdGhyZXNob2xkLCAtMjAgKyB0aHJlc2hvbGQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlSW5maW5pdGVTbGlkZXModGFyZ2V0LCBtb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRhcmdldC5lbCwgdGFyZ2V0LmRpcmVjdGlvbiArPSBtb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEluZmluaXRlU2xpZGVzKHRocmVzaG9sZExlZnQsIHRocmVzaG9sZFJpZ2h0LCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmRpcmVjdGlvbiA9PT0gdGhyZXNob2xkTGVmdCB8fCB0YXJnZXQuZGlyZWN0aW9uID09PSB0aHJlc2hvbGRSaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXModGFyZ2V0LmVsLCB0YXJnZXQuZGlyZWN0aW9uID0gLTIwLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29udHJvbGxlci5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgPGRpdiBjbGFzcz0nYmFkZ2UnPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJiYWRnZV9saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5iYWRnZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgIDxzcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgPC9saT5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2Zvb2RfaW1nX2hvdmVyJz5cXHJcXG4gICAgPHVsPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlbGl2ZXJ5X3R5cGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvdWw+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGk+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X2xpc3RcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoJy5zbGlkZXNfcHJldicpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoJy5zbGlkZXNfbmV4dCcpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSBxc2EoJy5tYWluX3NsaWRlc19saXN0ID4gbGknKTtcclxuICAgICAgICB0aGlzLmRvdHNFbCA9IHFzYSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1ByZXY6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzUHJldkVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIC0xKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNEb3RzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnLnNsaWRlc19kb3RzJywgJy5zbGlkZXNfZG90cyA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgdGhyb3R0bGUoZSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50KSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVNsaWRlKGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbY3VycmVudEluZGV4XS5jbGFzc05hbWUgPSAnZmFkZW91dCc7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbY3VycmVudEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdub3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2xpZGUoc2xpZGVJbmRleCwgc2xpZGVJbWcpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3NsaWRlSW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlaW4nO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbc2xpZGVJbmRleF0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7c2xpZGVJbWd9XCIpYDtcclxuICAgICAgICB0aGlzLmRvdHNFbFtzbGlkZUluZGV4XS5jbGFzc05hbWUgPSAnbm93JztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L01haW5TbGlkZVZpZXcuanMiLCJpbXBvcnQgZm9vZEJveFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZm9vZFRhYlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWwnO1xyXG5pbXBvcnQgY29udGFpbmVyVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgcXNhLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsID0gcXMoJy5iZXN0X2Zvb2RfdGFicycpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgZm9vZFRhYjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5mb29kVGFiRWwsICdsaSA+IGEnLCAnY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZFRhYkxpc3RFbCkuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYiA9PT0gZS5kZWxlZ2F0ZVRhcmdldCA/ICdub3cnIDogJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kQm94TGlzdEVsKS5mb3JFYWNoKGZvb2QgPT4gZm9vZC5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldC5kYXRhc2V0LmNhdGVnb3J5X2lkID09PSBmb29kLmRhdGFzZXQuY2F0ZWdvcnlfaWQgPyAnYmxvY2snIDogJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYmVzdEJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdEJhbmNoYW4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJlc3RCYW5jaGFuKGZvb2QpIHtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWIoZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQ29udGFpbmVyKGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QoZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94KGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZFRhYkxpc3QoZm9vZCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RUYWIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RUYWIgPSBmb29kLm1hcCh2YWx1ZSA9PiBmb29kVGFiVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWVcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZFRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZENvbnRhaW5lcihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGZvb2QubWFwKHZhbHVlID0+IGNvbnRhaW5lclRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHFzKCcuYmVzdF9mb29kX2NvbnRhaW5lcicpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGZvb2QpIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwgPSBxc2EoJy5iZXN0X2Zvb2RfYm94X2xpc3QnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gdmFsdWUuaXRlbXMubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgICAgIGZvb2RCb3hUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveEVsID0gcXNhKCcuYmVzdF9mb29kX2JveCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGVuID0gdmFsdWUuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YWx1ZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RUYWJMaXN0KGZvb2QsIGluaXROdW0pIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWwgPSBxc2EoJy5iZXN0X2Zvb2RfdGFicyA+IGxpID4gYScpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbFtpbml0TnVtXS5jbGFzc05hbWUgPSAnbm93JztcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaW5pdE51bV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJpbXBvcnQge1xyXG4gICAgb24sXHJcbiAgICBxcyxcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnVwZG93bkJ1dHRvbiA9IHFzKCcucGFnZV91cF9kb3duX2xpc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSh0aGlzLnVwZG93bkJ1dHRvbiwgJy5wYWdlX3VwX2Rvd25fbGlzdCA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiBoYW5kbGVyKGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb24pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24od2luZG93LCAnc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkb3duQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSB3aW5kb3cuc2Nyb2xsWSA+IDkwID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9TY3JvbGxlclZpZXcuanMiLCJpbXBvcnQgZm9vZEJveEluZmluaXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgcXNhLFxyXG4gICAgb24sXHJcbiAgICB0aHJvdHRsZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLmluZmluaXRlX2Zvb2RfYm94X2xpc3RgKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKGAuJHtuYW1lfV9mb29kIC5zbGlkZXNfcHJldmApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19uZXh0YCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGVsOiB0aGlzLmZvb2RCb3hFbCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAtMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgc2xpZGVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLmZvb2RCb3hFbCwgJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzUHJldjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNQcmV2RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgLTEwKSwgNjAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgcGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJhbmNoYW4ocGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QodGhpcy5zdGF0ZS5lbCwgZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94KGZvb2QsIHFzYShgLiR7dGhpcy5zdGF0ZS5uYW1lfV9mb29kIC5wcmRfYm94PmFgKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZXModGhpcy5zdGF0ZS5lbCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3hgKSk7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRoaXMuc3RhdGUuZWwsIHRoaXMuc3RhdGUuZGlyZWN0aW9uLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChlbGVtZW50LCBmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSBmb29kLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgIGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kLCBwcmRCb3gpIHtcclxuICAgICAgICBmb29kLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2xpZGVzKGVsZW1lbnQsIFNsaWRlcykge1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZXMgPSBBcnJheS5mcm9tKFNsaWRlcykuc2xpY2UoLTQpO1xyXG5cclxuICAgICAgICBTbGlkZXMuZm9yRWFjaChTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFNsaWRlLmNsb25lTm9kZSh0cnVlKSkpO1xyXG4gICAgICAgIGxhc3RTbGlkZXMucmV2ZXJzZSgpLmZvckVhY2gobGFzdFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGxhc3RTbGlkZS5jbG9uZU5vZGUodHJ1ZSksIGVsZW1lbnQuY2hpbGROb2Rlc1swXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZXMoZWxlbWVudCwgZGlyZWN0aW9uLCBJbW1lZGlhdGVseSkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gSW1tZWRpYXRlbHkgPyAnMHMnIDogJzAuNXMnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtkaXJlY3Rpb259JSlgO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9JbmZpbml0ZVNsaWRlVmlldy5qcyIsImltcG9ydCBhdXRvY29tcGxldGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBvbixcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwgPSBxcygnI3NlYXJjaF9zdHInKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwgPSBxcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucycpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQnV0dG9uRWwgPSBxcygnLnNlYXJjaF9idG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHByZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEVsLCAna2V5dXAnLCBlID0+IGhhbmRsZXIoZS50YXJnZXQudmFsdWUsIGUua2V5Q29kZSwgdGhpcy5zZWwpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEJ1dHRvbkVsLCAnY2xpY2snLCAoKSA9PiBoYW5kbGVyKHRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlzdG9yeTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zZWFyY2hFbCwgJ2NsaWNrJywgKCkgPT4gaGFuZGxlcighdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCAmJiAhdGhpcy5zZWFyY2hFbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5zdWdnZXN0aW9uc0VsLCAnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBdXRvQ29tcGxldGUoZS5kZWxlZ2F0ZVRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICcqJywgJ2NsaWNrJywgZSA9PiBlLnRhcmdldCAhPT0gdGhpcy5zZWFyY2hFbCAmJiB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBob3ZlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5zdWdnZXN0aW9uc0VsLCAnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uJywgJ21vdXNlb3ZlcicsIGUgPT4gdGhpcy51cGRhdGVBdXRvQ29tcGxldGUoZS5kZWxlZ2F0ZVRhcmdldCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckF1dG9Db21wbGV0ZSguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaXN0b3J5OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlYXJjaGVzKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBdXRvQ29tcGxldGUodGVybSwgc3VnZ2VzdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IFJlZ0V4cCh0ZXJtLCAnaWcnKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc0NvbXBvbmVudCA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlDb21wb25lbnQgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoZXMnLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc2VhcmNoXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaGlzdG9yeUNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsICYmIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9IHRoaXMuc2VsLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlQXV0b0NvbXBsZXRlKGtleSkge1xyXG4gICAgICAgIHRoaXMuc2VsID0gcXMoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbi5zZWxlY3RlZCcpO1xyXG4gICAgICAgIGNvbnN0IFtuZXh0RWwsIHByZXZFbF0gPSB0aGlzLnNlbCA/IFt0aGlzLnNlbC5uZXh0U2libGluZywgdGhpcy5zZWwucHJldmlvdXNTaWJsaW5nXSA6IFt0aGlzLnN1Z2dlc3Rpb25zRWwuZmlyc3RDaGlsZCwgdGhpcy5zdWdnZXN0aW9uc0VsLmxhc3RDaGlsZF07XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0ga2V5ID09PSA0MCA/IG5leHRFbCA6IHByZXZFbDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZSh0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUF1dG9Db21wbGV0ZSh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnNlbCAmJiB0aGlzLnNlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuc2VsID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSAnJztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9