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
            this.renderFoodTab(food).renderFoodContainer(food).renderFoodBoxList(food).renderFoodBox(food).renderSelectedFood(food, Math.floor(Math.random() * 6));
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
            return this;
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
            return this;
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
            return this;
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
            return this;
        }
    }, {
        key: 'renderSelectedFood',
        value: function renderSelectedFood(food, initNum) {
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
            this.renderFoodBoxList(this.state.el, food).renderFoodBox(food, (0, _helpers.qsa)('.' + this.state.name + '_food .prd_box>a')).renderSlides(this.state.el, (0, _helpers.qsa)('.' + this.state.name + '_food .prd_box')).showSlides(this.state.el, this.state.direction, true);
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
            return this;
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
            return this;
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
            return this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY4ZTQ3NGJjOWQzMDc3YzU1Y2IiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIl0sIm5hbWVzIjpbInFzIiwicXNhIiwib24iLCJkZWxlZ2F0ZSIsInJlcXVlc3QiLCJ0aHJvdHRsZSIsImdldExvY2FsU3RvcmFnZSIsInNldExvY2FsU3RvcmFnZSIsImlzVmFsaWQiLCJtb3ZlU2Nyb2xsIiwic2VsZWN0b3IiLCJzY29wZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwidHlwZSIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGVsZWdhdGUiLCJsaXN0ZW5lckZuIiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwiZSIsImRlbGVnYXRlVGFyZ2V0IiwidGFyZ2V0IiwiY2xvc2VzdCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJvbnRpbWVvdXQiLCJzZW5kIiwiZnVuYyIsImxpbWl0Iiwid2FpdCIsInNldFRpbWVvdXQiLCJlYXNlSW5PdXRRdWFkIiwidCIsImIiLCJjIiwiZCIsImVhc2VJblF1YWQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidmFsdWUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGF0YSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInVuaXF1ZSIsIm1hdGNoIiwic3JjIiwid2luZG93IiwianNvbiIsInJlbW92ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZSIsIm1haW4iLCJjb3Vyc2UiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwiYXV0b0NvbXBsZXRlVmlldyIsImluZmluaXRlVmlld3MiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJiaW5kTWFpblNsaWRlIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiYmluZFNjcm9sbGVyIiwiZm9yRWFjaCIsImluZmluaXRlVmlldyIsIm1vdmVJbmZpbml0ZVNsaWRlcyIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwic3RhdGUiLCJiaW5kQXV0b0NvbXBsZXRlIiwicHJldmVudERlZmF1bHQiLCJtb3ZlU2xpZGVzIiwiY3VycmVudFNsaWRlIiwic2xpZGVJbWdzIiwiY2hlY2tMb2NhbFN0b3JhZ2UiLCJzbGlkZXNFbmQiLCJsZW5ndGgiLCJzaG93U2xpZGUiLCJuIiwiaGlkZVNsaWRlIiwiaW5kZXgiLCJtb3ZlU2Nyb2xsZXIiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdEhpc3RvcnkiLCJzaG93SGlzdG9yeSIsImRpcmVjdGlvbiIsImNsaWVudEhlaWdodCIsInRlcm0iLCJpc1NlbGV0ZWQiLCJpc1N0cmluZyIsImlzVXBkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwic3VnZ2VzdGlvbnMiLCJyZW5kZXIiLCJlbXB0eUF1dG9Db21wbGV0ZSIsIm1vdmVBdXRvQ29tcGxldGUiLCJlbnRlckF1dG9Db21wbGV0ZSIsImtleXdvcmQiLCJoaXN0b3J5IiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJjaGVjayIsInNsaWNlIiwicmV2ZXJzZSIsImJhbmNoYW4iLCJ0YXJnZXRWaWV3IiwiZm9vZERhdGEiLCJ0aHJlc2hvbGQiLCJyZXNldEluZmluaXRlU2xpZGVzIiwibW92ZSIsInNob3dTbGlkZXMiLCJlbCIsInRocmVzaG9sZExlZnQiLCJ0aHJlc2hvbGRSaWdodCIsImciLCJGdW5jdGlvbiIsImV2YWwiLCJzbGlkZXNQcmV2RWwiLCJzbGlkZXNOZXh0RWwiLCJzbGlkZXNFbCIsImRvdHNFbCIsImJpbmRDbWQiLCJoYW5kbGVyIiwiYmluZENvbW1hbmRzIiwic2xpZGVzUHJldiIsInNsaWRlc05leHQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJjdXJyZW50SW5kZXgiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiZGlzcGxheSIsImRhdGFzZXQiLCJjYXRlZ29yeV9pZCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlclNlbGVjdGVkRm9vZCIsImZsb29yIiwicmFuZG9tIiwiam9pbiIsImluc2VydEFkamFjZW50SFRNTCIsImZvb2RDb250YWluZXIiLCJpIiwiZm9vZEJveExpc3QiLCJpdGVtcyIsImltYWdlIiwiaXRlbSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJ1cGRvd25CdXR0b24iLCJjbGljayIsImhpZGUiLCJzbGlkZXMiLCJyZW5kZXJCYW5jaGFuIiwicmVuZGVyU2xpZGVzIiwicHJkQm94IiwiU2xpZGVzIiwibGFzdFNsaWRlcyIsIlNsaWRlIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwibGFzdFNsaWRlIiwiY2hpbGROb2RlcyIsIkltbWVkaWF0ZWx5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNmb3JtIiwic2VhcmNoRWwiLCJzdWdnZXN0aW9uc0VsIiwic2VhcmNoQnV0dG9uRWwiLCJwcmVzcyIsImtleUNvZGUiLCJzZWwiLCJzdWJtaXQiLCJpbm5lckhUTUwiLCJ1cGRhdGVBdXRvQ29tcGxldGUiLCJub25DbGljayIsImhvdmVyIiwiYXV0b0NvbXBsZXRlIiwicmVuZGVyQXV0b0NvbXBsZXRlIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc0NvbXBvbmVudCIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwicmVwbGFjZSIsInNlYXJjaGVzIiwiaGlzdG9yeUNvbXBvbmVudCIsImNsYXNzIiwic2VhcmNoIiwibmV4dFNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwibmV4dEVsIiwicHJldkVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7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dUJBRU8sS0FBS0EsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTCxDQUFTa0IsV0FBVixFQUF1QixLQUFLbEIsR0FBTCxDQUFTbUIsZUFBaEMsQ0FBWCxHQUE4RCxDQUFDLEtBQUt2QixhQUFMLENBQW1Cd0IsVUFBcEIsRUFBZ0MsS0FBS3hCLGFBQUwsQ0FBbUJ5QixTQUFuRCxDQUZyRTtBQUFBO0FBQUEsZ0JBRVhDLE1BRlc7QUFBQSxnQkFFSEMsTUFGRzs7QUFHbEIsZ0JBQU01UCxTQUFTMEIsUUFBUSxFQUFSLEdBQWFpTyxNQUFiLEdBQXNCQyxNQUFyQztBQUNBLGlCQUFLcEIsa0JBQUwsQ0FBd0J4TyxNQUF4QjtBQUNIOzs7MkNBRWtCQSxNLEVBQVE7QUFDdkIsaUJBQUtxTyxHQUFMLElBQVksS0FBS0EsR0FBTCxDQUFTdEUsU0FBVCxDQUFtQm5HLE1BQW5CLENBQTBCLFVBQTFCLENBQVo7QUFDQSxpQkFBS3lLLEdBQUwsR0FBV3JPLE1BQVg7QUFDQSxpQkFBS3FPLEdBQUwsQ0FBU3RFLFNBQVQsQ0FBbUIvQixHQUFuQixDQUF1QixVQUF2QjtBQUNIOzs7NENBRW1CO0FBQ2hCLGlCQUFLaUcsYUFBTCxDQUFtQk0sU0FBbkIsR0FBK0IsRUFBL0I7QUFDSDs7O3lDQUVnQjtBQUNiLGlCQUFLUCxRQUFMLENBQWNuTSxLQUFkLEdBQXNCLEVBQXRCO0FBQ0giLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGY4ZTQ3NGJjOWQzMDc3YzU1Y2IiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIi8qKlxyXG4gKiBxdWVyeVNlbGVjdG9yIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIHRvIHF1ZXJ5XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3Njb3BlXSBPcHRpb25hbCBzY29wZSBlbGVtZW50IGZvciB0aGUgc2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxcyhzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBxc2Eoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8V2luZG93fSBlbGVtZW50IFRhcmdldCBFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IG5hbWUgdG8gYmluZCB0b1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBFdmVudCBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgQ2FwdHVyZSB0aGUgZXZlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEpTT05QID0gKHVuaXF1ZSA9PiB1cmwgPT5cclxuICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBgX2pzb25wXyR7dW5pcXVlKyt9YDtcclxuICAgICAgICB1cmwgKz0gdXJsLm1hdGNoKC9cXD8vKSA/IGAmY2FsbGJhY2s9JHtuYW1lfWAgOiBgP2NhbGxiYWNrPSR7bmFtZX1gO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XHJcbiAgICAgICAgd2luZG93W25hbWVdID0ganNvbiA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoanNvbik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHdpbmRvd1tuYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH0pXHJcbikoMCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy5qcyIsIi8vIENyZWF0ZSBhIHNpbXBsZSBwYXRoIGFsaWFzIHRvIGFsbG93IGJyb3dzZXJpZnkgdG8gcmVzb2x2ZVxuLy8gdGhlIHJ1bnRpbWUgb24gYSBzdXBwb3J0ZWQgcGF0aC5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUnKVsnZGVmYXVsdCddO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJpbXBvcnQge2NyZWF0ZUZyYW1lLCBleHRlbmQsIHRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHRIZWxwZXJzfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzfSBmcm9tICcuL2RlY29yYXRvcnMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzQuMC4xMSc7XG5leHBvcnQgY29uc3QgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmNvbnN0IG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2dnZXIubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBleHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihgQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJHtuYW1lfVwiIGFzIHVuZGVmaW5lZGApO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydCB7Y3JlYXRlRnJhbWUsIGxvZ2dlcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsImltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbmltcG9ydCB7XHJcbiAgICBvblxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBNYWluU2xpZGVWaWV3IGZyb20gJy4vdmlldy9NYWluU2xpZGVWaWV3JztcclxuaW1wb3J0IEJlc3RCYW5jaGFuVmlldyBmcm9tICcuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3JztcclxuaW1wb3J0IFNjcm9sbGVyVmlldyBmcm9tICcuL3ZpZXcvU2Nyb2xsZXJWaWV3JztcclxuaW1wb3J0IEluZmluaXRlU2xpZGVWaWV3IGZyb20gJy4vdmlldy9JbmZpbml0ZVNsaWRlVmlldyc7XHJcbmltcG9ydCBBdXRvbUNvbXBsZXRlVmlldyBmcm9tICcuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldyc7XHJcblxyXG5jb25zdCB1cmxMaXN0ID0ge1xyXG4gICAgbWFpblNsaWRlOiAnaHR0cDovL2hvbWUuZG90b2wueHl6L3BocC90ZXN0X2FwaS5waHAnLFxyXG4gICAgYmVzdEJhbmNoYW46ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2EvYmVzdCcsXHJcbiAgICBzaWRlOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NpZGUnLFxyXG4gICAgbWFpbjogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9tYWluJyxcclxuICAgIGNvdXJzZTogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9zb3VwJ1xyXG59O1xyXG5cclxuY29uc3QgbWFpblNsaWRlVmlldyA9IG5ldyBNYWluU2xpZGVWaWV3KCk7XHJcbmNvbnN0IGJlc3RCYW5jaGFuVmlldyA9IG5ldyBCZXN0QmFuY2hhblZpZXcoKTtcclxuY29uc3Qgc2Nyb2xsZXJWaWV3ID0gbmV3IFNjcm9sbGVyVmlldygpO1xyXG5jb25zdCBzaWRlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ3NpZGUnKTtcclxuY29uc3QgbWFpbkJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdtYWluJyk7XHJcbmNvbnN0IGNvdXJzZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdjb3Vyc2UnKTtcclxuY29uc3QgYXV0b21Db21wbGV0ZVZpZXcgPSBuZXcgQXV0b21Db21wbGV0ZVZpZXcoKTtcclxuXHJcblxyXG4vKipcclxuICogQHR5cGUge0NvbnRyb2xsZXJ9XHJcbiAqL1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCBzaWRlQmFuY2hhblZpZXcsIG1haW5CYW5jaGFuVmlldywgY291cnNlQmFuY2hhblZpZXcpO1xyXG5cclxuY29uc3Qgc2V0VmlldyA9ICgpID0+IGNvbnRyb2xsZXIuc2V0VmlldygpO1xyXG5vbih3aW5kb3csICdsb2FkJywgc2V0Vmlldyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiaW1wb3J0IHtcclxuICAgIHJlcXVlc3QsXHJcbiAgICBkZWxlZ2F0ZSxcclxuICAgIGdldExvY2FsU3RvcmFnZSxcclxuICAgIHNldExvY2FsU3RvcmFnZSxcclxuICAgIGlzVmFsaWQsXHJcbiAgICBtb3ZlU2Nyb2xsLFxyXG4gICAgZmV0Y2hKU09OUFxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmxMaXN0LCBtYWluU2xpZGVWaWV3LCBiZXN0QmFuY2hhblZpZXcsIHNjcm9sbGVyVmlldywgYXV0b0NvbXBsZXRlVmlldywgLi4uaW5maW5pdGVWaWV3cykge1xyXG4gICAgICAgIHRoaXMudXJsTGlzdCA9IHVybExpc3Q7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3ID0gbWFpblNsaWRlVmlldztcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldyA9IGJlc3RCYW5jaGFuVmlldztcclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldyA9IHNjcm9sbGVyVmlldztcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcgPSBhdXRvQ29tcGxldGVWaWV3O1xyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cyA9IGluZmluaXRlVmlld3M7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tMb2NhbFN0b3JhZ2Uoa2V5LCBpc0pTT05QKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBnZXRMb2NhbFN0b3JhZ2Uoa2V5KTtcclxuICAgICAgICBpZiAoY2FjaGUgJiYgaXNWYWxpZChjYWNoZS50aW1lLCA2KSkgcmV0dXJuIGNhY2hlLmRhdGE7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IGlzSlNPTlAgPyAoYXdhaXQgZmV0Y2hKU09OUChrZXkpKVsxXSA6IGF3YWl0IHJlcXVlc3Qoa2V5KSxcclxuICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGEuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgPyBmYWxzZSA6IHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYmluZE1haW5TbGlkZSgpLmZldGNoTWFpblNsaWRlKHRoaXMudXJsTGlzdC5tYWluU2xpZGUpO1xyXG4gICAgICAgIHRoaXMuZmV0Y2hCZXN0QmFuY2hhbih0aGlzLnVybExpc3QuYmVzdEJhbmNoYW4pO1xyXG4gICAgICAgIHRoaXMuYmluZFNjcm9sbGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzLmZvckVhY2goaW5maW5pdGVWaWV3ID0+IHtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgICAgICBpbmZpbml0ZVZpZXcuYmluZCgnc2xpZGVzTmV4dCcsIHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmJpbmQoaW5maW5pdGVWaWV3KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJbmZpbml0ZUJhbmNoYW4oaW5maW5pdGVWaWV3LCB0aGlzLnVybExpc3RbaW5maW5pdGVWaWV3LnN0YXRlLm5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJpbmRBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICdhJywgJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNYWluU2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LmJpbmQoJ3NsaWRlc0RvdHMnLCB0aGlzLmN1cnJlbnRTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaE1haW5TbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnNob3dTbGlkZSgwLCB0aGlzLnNsaWRlSW1nc1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlcyh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGFyZ2V0LmluZGV4ICs9IG47XHJcbiAgICAgICAgaWYgKHRhcmdldC5pbmRleCA+IHRoaXMuc2xpZGVzRW5kKSB0YXJnZXQuaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPCAwKSB0YXJnZXQuaW5kZXggPSB0aGlzLnNsaWRlc0VuZDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCwgdGhpcy5zbGlkZUltZ3NbdGFyZ2V0LmluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudFNsaWRlKHRhcmdldCwgbikge1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5oaWRlU2xpZGUodGFyZ2V0LmluZGV4KTtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCA9IG4sIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTY3JvbGxlcigpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldy5iaW5kKCdjbGljaycsIHRoaXMubW92ZVNjcm9sbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3LmJpbmQoJ2hpZGUnLCB0aGlzLm1vdmVTY3JvbGxlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5iaW5kKCdwcmVzcycsIHRoaXMucHJlc3NBdXRvQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGlzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuYmluZCgnaGlzdG9yeScsIHRoaXMuc2hvd0hpc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ2NsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ25vbkNsaWNrJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ2hvdmVyJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vdmVTY3JvbGxlcihkaXJlY3Rpb24pIHtcclxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCcgPyBtb3ZlU2Nyb2xsKDApIDogbW92ZVNjcm9sbChkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcHJlc3NBdXRvQ29tcGxldGUodGVybSwga2V5LCBpc1NlbGV0ZWQpIHtcclxuICAgICAgICBjb25zdCBpc1N0cmluZyA9ICgha2V5IHx8IChrZXkgPCAzNSB8fCBrZXkgPiA0MCkgJiYga2V5ICE9PSAxMyAmJiBrZXkgIT09IDI3KTtcclxuICAgICAgICBjb25zdCBpc1VwZG93biA9IChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG4gICAgICAgIGNvbnN0IGlzRVNDID0ga2V5ID09PSAyNztcclxuICAgICAgICBjb25zdCBpc0VudGVyID0ga2V5ID09PSAxMztcclxuXHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9ucyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UoYGh0dHBzOi8va28ud2lraXBlZGlhLm9yZy93L2FwaS5waHA/YWN0aW9uPW9wZW5zZWFyY2gmc2VhcmNoPSR7dGVybX1gLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1VwZG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcubW92ZUF1dG9Db21wbGV0ZShrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0MpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKSB7XHJcbiAgICAgICAgICAgIGlzU2VsZXRlZCA/IHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbnRlckF1dG9Db21wbGV0ZSgpIDogdGhpcy5zdWJtaXRIaXN0b3J5KHRlcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRIaXN0b3J5KGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5U2VhcmNoYmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNob3dIaXN0b3J5KGNoZWNrKSB7XHJcbiAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKTtcclxuICAgICAgICAgICAgaGlzdG9yeSAmJiB0aGlzLmF1dG9Db21wbGV0ZVZpZXcucmVuZGVyKCdoaXN0b3J5JywgaGlzdG9yeS5zbGljZSgtNSkucmV2ZXJzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hCZXN0QmFuY2hhbih1cmwpIHtcclxuICAgICAgICBjb25zdCBiYW5jaGFuID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3LnJlbmRlcignYmVzdEJhbmNoYW4nLCBiYW5jaGFuKTtcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldy5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hJbmZpbml0ZUJhbmNoYW4odGFyZ2V0VmlldywgdXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGFyZ2V0Vmlldy5yZW5kZXIoJ2JhbmNoYW4nLCBmb29kRGF0YSk7XHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZm9vZERhdGEubGVuZ3RoICogMi41O1xyXG4gICAgICAgIHRhcmdldFZpZXcuYmluZCgnc2xpZGVzJywgdGhpcy5yZXNldEluZmluaXRlU2xpZGVzLmJpbmQodGFyZ2V0VmlldywgLTIwIC0gdGhyZXNob2xkLCAtMjAgKyB0aHJlc2hvbGQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlSW5maW5pdGVTbGlkZXModGFyZ2V0LCBtb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRhcmdldC5lbCwgdGFyZ2V0LmRpcmVjdGlvbiArPSBtb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEluZmluaXRlU2xpZGVzKHRocmVzaG9sZExlZnQsIHRocmVzaG9sZFJpZ2h0LCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAodGFyZ2V0LmRpcmVjdGlvbiA9PT0gdGhyZXNob2xkTGVmdCB8fCB0YXJnZXQuZGlyZWN0aW9uID09PSB0aHJlc2hvbGRSaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXModGFyZ2V0LmVsLCB0YXJnZXQuZGlyZWN0aW9uID0gLTIwLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29udHJvbGxlci5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgPGRpdiBjbGFzcz0nYmFkZ2UnPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJiYWRnZV9saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5iYWRnZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgIDxzcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgPC9saT5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2Zvb2RfaW1nX2hvdmVyJz5cXHJcXG4gICAgPHVsPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlbGl2ZXJ5X3R5cGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvdWw+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGk+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X2xpc3RcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoJy5zbGlkZXNfcHJldicpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoJy5zbGlkZXNfbmV4dCcpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSBxc2EoJy5tYWluX3NsaWRlc19saXN0ID4gbGknKTtcclxuICAgICAgICB0aGlzLmRvdHNFbCA9IHFzYSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1ByZXY6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzUHJldkVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIC0xKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNEb3RzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnLnNsaWRlc19kb3RzJywgJy5zbGlkZXNfZG90cyA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgdGhyb3R0bGUoZSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50KSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVNsaWRlKGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbY3VycmVudEluZGV4XS5jbGFzc05hbWUgPSAnZmFkZW91dCc7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbY3VycmVudEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdub3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2xpZGUoc2xpZGVJbmRleCwgc2xpZGVJbWcpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3NsaWRlSW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlaW4nO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbc2xpZGVJbmRleF0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7c2xpZGVJbWd9XCIpYDtcclxuICAgICAgICB0aGlzLmRvdHNFbFtzbGlkZUluZGV4XS5jbGFzc05hbWUgPSAnbm93JztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L01haW5TbGlkZVZpZXcuanMiLCJpbXBvcnQgZm9vZEJveFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZm9vZFRhYlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWwnO1xyXG5pbXBvcnQgY29udGFpbmVyVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgcXNhLFxyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsID0gcXMoJy5iZXN0X2Zvb2RfdGFicycpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgZm9vZFRhYjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5mb29kVGFiRWwsICdsaSA+IGEnLCAnY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZFRhYkxpc3RFbCkuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYiA9PT0gZS5kZWxlZ2F0ZVRhcmdldCA/ICdub3cnIDogJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kQm94TGlzdEVsKS5mb3JFYWNoKGZvb2QgPT4gZm9vZC5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldC5kYXRhc2V0LmNhdGVnb3J5X2lkID09PSBmb29kLmRhdGFzZXQuY2F0ZWdvcnlfaWQgPyAnYmxvY2snIDogJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYmVzdEJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdEJhbmNoYW4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJlc3RCYW5jaGFuKGZvb2QpIHtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWIoZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlckZvb2RDb250YWluZXIoZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJGb29kQm94KGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJTZWxlY3RlZEZvb2QoZm9vZCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RUYWIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RUYWIgPSBmb29kLm1hcCh2YWx1ZSA9PiBmb29kVGFiVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWVcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZFRhYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZENvbnRhaW5lcihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGZvb2QubWFwKHZhbHVlID0+IGNvbnRhaW5lclRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHFzKCcuYmVzdF9mb29kX2NvbnRhaW5lcicpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RDb250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGZvb2QpIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwgPSBxc2EoJy5iZXN0X2Zvb2RfYm94X2xpc3QnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gdmFsdWUuaXRlbXMubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgICAgIGZvb2RCb3hUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveEVsID0gcXNhKCcuYmVzdF9mb29kX2JveCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGVuID0gdmFsdWUuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YWx1ZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNlbGVjdGVkRm9vZChmb29kLCBpbml0TnVtKSB7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwiaW1wb3J0IHtcclxuICAgIG9uLFxyXG4gICAgcXMsXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51cGRvd25CdXR0b24gPSBxcygnLnBhZ2VfdXBfZG93bl9saXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy51cGRvd25CdXR0b24sICcucGFnZV91cF9kb3duX2xpc3QgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcihlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHdpbmRvdywgJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZG93bkJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gd2luZG93LnNjcm9sbFkgPiA5MCA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwiaW1wb3J0IGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIG9uLFxyXG4gICAgdGhyb3R0bGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hFbCA9IHFzKGAuJHtuYW1lfV9mb29kIC5pbmZpbml0ZV9mb29kX2JveF9saXN0YCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNQcmV2RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuc2xpZGVzX3ByZXZgKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHFzKGAuJHtuYW1lfV9mb29kIC5zbGlkZXNfbmV4dGApO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBlbDogdGhpcy5mb29kQm94RWwsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogLTIwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5mb29kQm94RWwsICd0cmFuc2l0aW9uZW5kJywgKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNsaWRlc1ByZXY6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzUHJldkVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIDEwKSwgNjAwKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNsaWRlc05leHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzTmV4dEVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIC0xMCksIDYwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIHBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYmFuY2hhbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJCYW5jaGFuKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJCYW5jaGFuKGZvb2QpIHtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3hMaXN0KHRoaXMuc3RhdGUuZWwsIGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJGb29kQm94KGZvb2QsIHFzYShgLiR7dGhpcy5zdGF0ZS5uYW1lfV9mb29kIC5wcmRfYm94PmFgKSlcclxuICAgICAgICAgICAgLnJlbmRlclNsaWRlcyh0aGlzLnN0YXRlLmVsLCBxc2EoYC4ke3RoaXMuc3RhdGUubmFtZX1fZm9vZCAucHJkX2JveGApKVxyXG4gICAgICAgICAgICAuc2hvd1NsaWRlcyh0aGlzLnN0YXRlLmVsLCB0aGlzLnN0YXRlLmRpcmVjdGlvbiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZWxlbWVudCwgZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gZm9vZC5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3goZm9vZCwgcHJkQm94KSB7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNsaWRlcyhlbGVtZW50LCBTbGlkZXMpIHtcclxuICAgICAgICBjb25zdCBsYXN0U2xpZGVzID0gQXJyYXkuZnJvbShTbGlkZXMpLnNsaWNlKC00KTtcclxuXHJcbiAgICAgICAgU2xpZGVzLmZvckVhY2goU2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChTbGlkZS5jbG9uZU5vZGUodHJ1ZSkpKTtcclxuICAgICAgICBsYXN0U2xpZGVzLnJldmVyc2UoKS5mb3JFYWNoKGxhc3RTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShsYXN0U2xpZGUuY2xvbmVOb2RlKHRydWUpLCBlbGVtZW50LmNoaWxkTm9kZXNbMF0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2xpZGVzKGVsZW1lbnQsIGRpcmVjdGlvbiwgSW1tZWRpYXRlbHkpIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IEltbWVkaWF0ZWx5ID8gJzBzJyA6ICcwLjVzJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7ZGlyZWN0aW9ufSUpYDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJpbXBvcnQgYXV0b2NvbXBsZXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgb24sXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsID0gcXMoJyNzZWFyY2hfc3RyJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsID0gcXMoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMnKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEJ1dHRvbkVsID0gcXMoJy5zZWFyY2hfYnRuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBwcmVzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zZWFyY2hFbCwgJ2tleXVwJywgZSA9PiBoYW5kbGVyKGUudGFyZ2V0LnZhbHVlLCBlLmtleUNvZGUsIHRoaXMuc2VsKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Ym1pdDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zZWFyY2hCdXR0b25FbCwgJ2NsaWNrJywgKCkgPT4gaGFuZGxlcih0aGlzLnNlYXJjaEVsLnZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIoIXRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgJiYgIXRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnKicsICdjbGljaycsIGUgPT4gZS50YXJnZXQgIT09IHRoaXMuc2VhcmNoRWwgJiYgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaG92ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW92ZXInLCBlID0+IHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGF1dG9Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBdXRvQ29tcGxldGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlzdG9yeTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWFyY2hlcyguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQXV0b0NvbXBsZXRlKHRlcm0sIHN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBSZWdFeHAodGVybSwgJ2lnJyk7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnNDb21wb25lbnQgPSBzdWdnZXN0aW9ucy5tYXAoc3VnZ2VzdGlvbiA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBzdWdnZXN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc3VnZ2VzdGlvbi5yZXBsYWNlKHRhcmdldCwgYDxiPiR7dGVybX08L2I+YClcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBzdWdnZXN0aW9uc0NvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2VhcmNoZXMoc2VhcmNoZXMpIHtcclxuICAgICAgICBjb25zdCBoaXN0b3J5Q29tcG9uZW50ID0gc2VhcmNoZXMubWFwKHNlYXJjaCA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaGVzJyxcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHNlYXJjaCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHNlYXJjaFxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGhpc3RvcnlDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbCAmJiB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSB0aGlzLnNlbC5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUF1dG9Db21wbGV0ZShrZXkpIHtcclxuICAgICAgICB0aGlzLnNlbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VsZWN0ZWQnKTtcclxuICAgICAgICBjb25zdCBbbmV4dEVsLCBwcmV2RWxdID0gdGhpcy5zZWwgPyBbdGhpcy5zZWwubmV4dFNpYmxpbmcsIHRoaXMuc2VsLnByZXZpb3VzU2libGluZ10gOiBbdGhpcy5zdWdnZXN0aW9uc0VsLmZpcnN0Q2hpbGQsIHRoaXMuc3VnZ2VzdGlvbnNFbC5sYXN0Q2hpbGRdO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGtleSA9PT0gNDAgPyBuZXh0RWwgOiBwcmV2RWw7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZWwgJiYgdGhpcy5zZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eVNlYXJjaGJhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==