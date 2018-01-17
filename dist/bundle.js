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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(11)['default'];

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

var _exception = __webpack_require__(3);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(12);

var _decorators = __webpack_require__(20);

var _logger = __webpack_require__(22);

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

var Handlebars = __webpack_require__(1);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _controller = __webpack_require__(8);

var _controller2 = _interopRequireDefault(_controller);

var _helpers = __webpack_require__(2);

var _commonView = __webpack_require__(9);

var _commonView2 = _interopRequireDefault(_commonView);

var _infiniteSlideView = __webpack_require__(29);

var _infiniteSlideView2 = _interopRequireDefault(_infiniteSlideView);

var _autoCompleteView = __webpack_require__(31);

var _autoCompleteView2 = _interopRequireDefault(_autoCompleteView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlList = {
    mainSlide: 'http://52.79.148.74:3000/mainSlide',
    bestBanchan: 'http://52.79.148.74:3000/best',
    side: 'http://52.79.148.74:3000/side',
    main: 'http://52.79.148.74:3000/main',
    course: 'http://52.79.148.74:3000/soup'
};

var commonView = new _commonView2.default();
var sideBanchanView = new _infiniteSlideView2.default('side');
var mainBanchanView = new _infiniteSlideView2.default('main');
var courseBanchanView = new _infiniteSlideView2.default('course');
var automCompleteView = new _autoCompleteView2.default();

/**
 * @type {Controller}
 */
var controller = new _controller2.default(urlList, commonView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

var setView = function setView() {
    return controller.setView();
};
(0, _helpers.on)(window, 'load', setView);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(urlList, commonView, automCompleteView) {
        var _this = this;

        _classCallCheck(this, Controller);

        this.urlList = urlList;
        this.commonView = commonView;
        this.automCompleteView = automCompleteView;

        commonView.bind('slidesPrev', this.moveSlides.bind(this));
        commonView.bind('slidesNext', this.moveSlides.bind(this));
        commonView.bind('slidesDots', this.currentSlide.bind(this));
        commonView.bind('scroller', this.moveScroller.bind(this));

        automCompleteView.bind('press', this.pressAutoComplete.bind(this));
        automCompleteView.bind('submit', this.submitSearches.bind(this));
        automCompleteView.bind('searches', this.showSearches.bind(this));
        automCompleteView.bind('click');
        automCompleteView.bind('nonClick');
        automCompleteView.bind('hover');

        for (var _len = arguments.length, infiniteViews = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            infiniteViews[_key - 3] = arguments[_key];
        }

        infiniteViews.forEach(function (infiniteView) {
            infiniteView.bind('slidesPrev', _this.moveInfiniteSlides.bind(infiniteView));
            infiniteView.bind('slidesNext', _this.moveInfiniteSlides.bind(infiniteView));
            _this.initInfiniteBanchan(infiniteView, _this.urlList[infiniteView.state.name]);
        });
    }

    _createClass(Controller, [{
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
            this.initSlide(this.urlList.mainSlide);
            this.initBestBanchan(this.urlList.bestBanchan);
            this.commonView.bind('preventDefault');
        }
    }, {
        key: 'initSlide',
        value: async function initSlide(url) {
            this.slideImgs = await this.checkLocalStorage(url);
            this.slidesEnd = this.slideImgs.length - 1;
            this.commonView.showSlide(0, this.slideImgs[0]);
        }
    }, {
        key: 'moveSlides',
        value: function moveSlides(target, n) {
            this.commonView.hideSlide(target.index);
            target.index += n;
            if (target.index > this.slidesEnd) target.index = 0;
            if (target.index < 0) target.index = this.slidesEnd;
            this.commonView.showSlide(target.index, this.slideImgs[target.index]);
        }
    }, {
        key: 'currentSlide',
        value: function currentSlide(target, n) {
            this.commonView.hideSlide(target.index);
            this.commonView.showSlide(target.index = n, this.slideImgs[target.index]);
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
                isSeleted ? this.automCompleteView.enterAutoComplete() : this.submitSearches(term);
            }
        }
    }, {
        key: 'submitSearches',
        value: function submitSearches(keyword) {
            if (keyword) {
                var searches = new Set((0, _helpers.getLocalStorage)('searches'));
                searches.add(keyword);
                (0, _helpers.setLocalStorage)('searches', [].concat(_toConsumableArray(searches)));
                this.automCompleteView.emptyAutoComplete();
                this.automCompleteView.emptySearchbar();
            }
        }
    }, {
        key: 'showSearches',
        value: async function showSearches(check) {
            if (check) {
                var searches = await (0, _helpers.getLocalStorage)('searches');
                searches && this.automCompleteView.render('searches', searches.slice(-5).reverse());
            }
        }
    }, {
        key: 'initBestBanchan',
        value: async function initBestBanchan(url) {
            var banchan = await this.checkLocalStorage(url);
            this.commonView.render('bestBanchan', banchan);
            this.commonView.bind('foodTab');
        }
    }, {
        key: 'initInfiniteBanchan',
        value: async function initInfiniteBanchan(targetView, url) {
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

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxTpl = __webpack_require__(10);

var _foodBoxTpl2 = _interopRequireDefault(_foodBoxTpl);

var _foodTabTpl = __webpack_require__(27);

var _foodTabTpl2 = _interopRequireDefault(_foodTabTpl);

var _containerTpl = __webpack_require__(28);

var _containerTpl2 = _interopRequireDefault(_containerTpl);

var _badgeTpl = __webpack_require__(5);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(6);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);

        this.foodTabEl = (0, _helpers.qs)('.best_food_tabs');
        this.slidesPrevEl = (0, _helpers.qs)('.slides_prev');
        this.slidesNextEl = (0, _helpers.qs)('.slides_next');
        this.slidesEl = (0, _helpers.qsa)('.main_slides_list > li');
        this.dotsEl = (0, _helpers.qsa)('.slides_dots > li > a');

        this.state = {
            index: 0
        };
    }

    _createClass(View, [{
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
                scroller: function scroller() {
                    (0, _helpers.delegate)('.page_up_down_list', '.page_up_down_list > li > a', 'click', function (e) {
                        return handler(e.delegateTarget.dataset.direction);
                    });
                },
                foodTab: function foodTab() {
                    (0, _helpers.delegate)(_this.foodTabEl, 'li > a', 'click', function (e) {
                        Array.from(_this.foodTabListEl).forEach(function (tab) {
                            return tab.className = tab === e.delegateTarget ? 'now' : '';
                        });
                        Array.from(_this.foodBoxListEl).forEach(function (food) {
                            return food.style.display = e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none';
                        });
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

    return View;
}();

exports.default = View;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
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
/* 11 */
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

var _handlebarsSafeString = __webpack_require__(23);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(3);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(24);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(25);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(13);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(14);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(15);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(16);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(17);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(18);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(19);

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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(3);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(3);

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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(21);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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

var _exception = __webpack_require__(3);

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
/* 25 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<ul class=\"best_food_box_list\" data-category_id=\""
    + container.escapeExpression(((helper = (helper = helpers.category_id || (depth0 != null ? depth0.category_id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"category_id","hash":{},"data":data}) : helper)))
    + "\"></ul>";
},"useData":true});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxInfiniteTpl = __webpack_require__(30);

var _foodBoxInfiniteTpl2 = _interopRequireDefault(_foodBoxInfiniteTpl);

var _badgeTpl = __webpack_require__(5);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(6);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteView = function () {
    function InfiniteView(name) {
        _classCallCheck(this, InfiniteView);

        this.foodBoxEl = (0, _helpers.qs)('.' + name + '_food .infinite_food_box_list');
        this.slidesPrevEl = (0, _helpers.qs)('.' + name + '_food .slides_prev');
        this.slidesNextEl = (0, _helpers.qs)('.' + name + '_food .slides_next');

        this.state = {
            name: name,
            el: this.foodBoxEl,
            direction: -20
        };
    }

    _createClass(InfiniteView, [{
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

    return InfiniteView;
}();

exports.default = InfiniteView;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autocompleteTpl = __webpack_require__(32);

var _autocompleteTpl2 = _interopRequireDefault(_autocompleteTpl);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoCompleteView = function () {
    function AutoCompleteView() {
        _classCallCheck(this, AutoCompleteView);

        this.searchEl = (0, _helpers.qs)('#search_str');
        this.suggestionsEl = (0, _helpers.qs)('.autocomplete_suggestions');
        this.searchButtonEl = (0, _helpers.qs)('.search_btn');
    }

    _createClass(AutoCompleteView, [{
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
                searches: function searches() {
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

    return AutoCompleteView;
}();

exports.default = AutoCompleteView;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzg3NTEwYzVjYjU0ZTQ1YWZjMzEiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9jb21tb25WaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicXMiLCJxc2EiLCJvbiIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJpc1N0cmluZyIsImlzVXBkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwic2VsZWN0b3IiLCJzY29wZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwidHlwZSIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGVsZWdhdGUiLCJsaXN0ZW5lckZuIiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwiZSIsImRlbGVnYXRlVGFyZ2V0IiwidGFyZ2V0IiwiY2xvc2VzdCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJvbnRpbWVvdXQiLCJzZW5kIiwiZnVuYyIsImxpbWl0Iiwid2FpdCIsInNldFRpbWVvdXQiLCJlYXNlSW5PdXRRdWFkIiwidCIsImIiLCJjIiwiZCIsImVhc2VJblF1YWQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidmFsdWUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGF0YSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInVuaXF1ZSIsIm1hdGNoIiwic3JjIiwid2luZG93IiwianNvbiIsInJlbW92ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInVybExpc3QiLCJtYWluU2xpZGUiLCJiZXN0QmFuY2hhbiIsInNpZGUiLCJtYWluIiwiY291cnNlIiwiY29tbW9uVmlldyIsInNpZGVCYW5jaGFuVmlldyIsIm1haW5CYW5jaGFuVmlldyIsImNvdXJzZUJhbmNoYW5WaWV3IiwiYXV0b21Db21wbGV0ZVZpZXciLCJjb250cm9sbGVyIiwic2V0VmlldyIsIkNvbnRyb2xsZXIiLCJtb3ZlU2xpZGVzIiwiY3VycmVudFNsaWRlIiwibW92ZVNjcm9sbGVyIiwicHJlc3NBdXRvQ29tcGxldGUiLCJzdWJtaXRTZWFyY2hlcyIsInNob3dTZWFyY2hlcyIsImluZmluaXRlVmlld3MiLCJmb3JFYWNoIiwiaW5maW5pdGVWaWV3IiwibW92ZUluZmluaXRlU2xpZGVzIiwiaW5pdEluZmluaXRlQmFuY2hhbiIsInN0YXRlIiwiaXNKU09OUCIsImNhY2hlIiwidGltZSIsImhhc093blByb3BlcnR5IiwiaW5pdFNsaWRlIiwiaW5pdEJlc3RCYW5jaGFuIiwic2xpZGVJbWdzIiwiY2hlY2tMb2NhbFN0b3JhZ2UiLCJzbGlkZXNFbmQiLCJsZW5ndGgiLCJzaG93U2xpZGUiLCJuIiwiaGlkZVNsaWRlIiwiaW5kZXgiLCJkaXJlY3Rpb24iLCJjbGllbnRIZWlnaHQiLCJ0ZXJtIiwiaXNTZWxldGVkIiwic3VnZ2VzdGlvbnMiLCJyZW5kZXIiLCJlbXB0eUF1dG9Db21wbGV0ZSIsIm1vdmVBdXRvQ29tcGxldGUiLCJlbnRlckF1dG9Db21wbGV0ZSIsImtleXdvcmQiLCJzZWFyY2hlcyIsIlNldCIsImFkZCIsImVtcHR5U2VhcmNoYmFyIiwiY2hlY2siLCJzbGljZSIsInJldmVyc2UiLCJiYW5jaGFuIiwidGFyZ2V0VmlldyIsImZvb2REYXRhIiwidGhyZXNob2xkIiwicmVzZXRJbmZpbml0ZVNsaWRlcyIsIm1vdmUiLCJzaG93U2xpZGVzIiwiZWwiLCJ0aHJlc2hvbGRMZWZ0IiwidGhyZXNob2xkUmlnaHQiLCJWaWV3IiwiZm9vZFRhYkVsIiwic2xpZGVzUHJldkVsIiwic2xpZGVzTmV4dEVsIiwic2xpZGVzRWwiLCJkb3RzRWwiLCJiaW5kQ21kIiwiaGFuZGxlciIsImJpbmRDb21tYW5kcyIsInNsaWRlc1ByZXYiLCJzbGlkZXNOZXh0Iiwic2xpZGVzRG90cyIsInRleHRDb250ZW50Iiwic2Nyb2xsZXIiLCJkYXRhc2V0IiwiZm9vZFRhYiIsImZyb20iLCJmb29kVGFiTGlzdEVsIiwidGFiIiwiY2xhc3NOYW1lIiwiZm9vZEJveExpc3RFbCIsImZvb2QiLCJzdHlsZSIsImRpc3BsYXkiLCJjYXRlZ29yeV9pZCIsInByZXZlbnREZWZhdWx0Iiwidmlld0NtZCIsInBhcmFtcyIsInZpZXdDb21tYW5kcyIsInJlbmRlckZvb2RUYWIiLCJyZW5kZXJGb29kQ29udGFpbmVyIiwicmVuZGVyRm9vZEJveExpc3QiLCJyZW5kZXJGb29kQm94IiwicmVuZGVyRm9vZFRhYkxpc3QiLCJmbG9vciIsInJhbmRvbSIsImpvaW4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmb29kQ29udGFpbmVyIiwiaSIsImZvb2RCb3hMaXN0IiwiaXRlbXMiLCJpbWFnZSIsIml0ZW0iLCJhbHQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwib2xkX3ByaWNlIiwibl9wcmljZSIsIm5ld19wcmljZSIsInNfcHJpY2UiLCJ3b24iLCJmb29kQm94RWwiLCJsZW4iLCJqIiwiYmFkZ2UiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRlbGl2ZXJ5X3R5cGUiLCJpbml0TnVtIiwiY3VycmVudEluZGV4IiwiY2xhc3NMaXN0Iiwic2xpZGVJbmRleCIsInNsaWRlSW1nIiwiYmFja2dyb3VuZEltYWdlIiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsIkluZmluaXRlVmlldyIsInNsaWRlcyIsInJlbmRlckJhbmNoYW4iLCJyZW5kZXJTbGlkZXMiLCJwcmRCb3giLCJTbGlkZXMiLCJsYXN0U2xpZGVzIiwiU2xpZGUiLCJjbG9uZU5vZGUiLCJpbnNlcnRCZWZvcmUiLCJsYXN0U2xpZGUiLCJjaGlsZE5vZGVzIiwiSW1tZWRpYXRlbHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJ0cmFuc2Zvcm0iLCJBdXRvQ29tcGxldGVWaWV3Iiwic2VhcmNoRWwiLCJzdWdnZXN0aW9uc0VsIiwic2VhcmNoQnV0dG9uRWwiLCJwcmVzcyIsImtleUNvZGUiLCJzZWwiLCJzdWJtaXQiLCJpbm5lckhUTUwiLCJjbGljayIsInVwZGF0ZUF1dG9Db21wbGV0ZSIsIm5vbkNsaWNrIiwiaG92ZXIiLCJhdXRvQ29tcGxldGUiLCJyZW5kZXJBdXRvQ29tcGxldGUiLCJyZW5kZXJTZWFyY2hlcyIsIlJlZ0V4cCIsInN1Z2dlc3Rpb25zU3RyIiwic3VnZ2VzdGlvbiIsInJlbmRlcktleXdvcmQiLCJyZXBsYWNlIiwic2VhcmNoZXNTdHIiLCJjbGFzcyIsInNlYXJjaCIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsIm5leHRFbCIsInByZXZFbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFZO0FBQ1AsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQVBBOztBQVNGLElBQWMsV0FB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QW5ELENBRnJFO0FBQUE7QUFBQSxnQkFFWEMsTUFGVztBQUFBLGdCQUVIQyxNQUZHOztBQUdsQixnQkFBTWpQLFNBQVMwQixRQUFRLEVBQVIsR0FBYXNOLE1BQWIsR0FBc0JDLE1BQXJDO0FBQ0EsaUJBQUtuQixrQkFBTCxDQUF3QjlOLE1BQXhCO0FBQ0g7OzsyQ0FFa0JBLE0sRUFBUTtBQUN2QixpQkFBSzBOLEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVM1QixTQUFULENBQW1CbEksTUFBbkIsQ0FBMEIsVUFBMUIsQ0FBWjtBQUNBLGlCQUFLOEosR0FBTCxHQUFXMU4sTUFBWDtBQUNBLGlCQUFLME4sR0FBTCxDQUFTNUIsU0FBVCxDQUFtQjNFLEdBQW5CLENBQXVCLFVBQXZCO0FBQ0g7Ozs0Q0FFbUI7QUFDaEIsaUJBQUttRyxhQUFMLENBQW1CTSxTQUFuQixHQUErQixFQUEvQjtBQUNIOzs7eUNBRWdCO0FBQ2IsaUJBQUtQLFFBQUwsQ0FBY3hMLEtBQWQsR0FBc0IsRUFBdEI7QUFDSDs7Ozs7O2tCQWhHZ0J1TCxnQjs7Ozs7O0FDTnJCO0FBQ0EseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDhLQUE4Syx3QkFBd0IsYUFBYTtBQUNuTjtBQUNBLDRLQUE0SywwQkFBMEIsYUFBYTtBQUNuTjtBQUNBLDRMQUE0TCxnQ0FBZ0MsYUFBYTtBQUN6TztBQUNBLENBQUMsZ0JBQWdCLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzg3NTEwYzVjYjU0ZTQ1YWZjMzEiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIi8qKlxyXG4gKiBxdWVyeVNlbGVjdG9yIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIHRvIHF1ZXJ5XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3Njb3BlXSBPcHRpb25hbCBzY29wZSBlbGVtZW50IGZvciB0aGUgc2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxcyhzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBxc2Eoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8V2luZG93fSBlbGVtZW50IFRhcmdldCBFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IG5hbWUgdG8gYmluZCB0b1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBFdmVudCBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgQ2FwdHVyZSB0aGUgZXZlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhrZXkpIHtcclxuICAgIHJldHVybiAoIWtleSB8fCAoa2V5IDwgMzUgfHwga2V5ID4gNDApICYmIGtleSAhPT0gMTMgJiYga2V5ICE9PSAyNyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VwZG93bihrZXkpIHtcclxuICAgIC8vIGRvd24gKDQwKSwgdXAgKDM4KVxyXG4gICAgcmV0dXJuIChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFU0Moa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAyNztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50ZXIoa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAxMztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoSlNPTlAgPSAodW5pcXVlID0+IHVybCA9PlxyXG4gICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGBfanNvbnBfJHt1bmlxdWUrK31gO1xyXG4gICAgICAgIHVybCArPSB1cmwubWF0Y2goL1xcPy8pID8gYCZjYWxsYmFjaz0ke25hbWV9YCA6IGA/Y2FsbGJhY2s9JHtuYW1lfWA7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgICAgICB3aW5kb3dbbmFtZV0gPSBqc29uID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfSlcclxuKSgwKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzLmpzIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9iYXNlLmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgIDxkaXYgY2xhc3M9J2JhZGdlJz5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvZGl2PlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwiYmFkZ2VfbGlzdFxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYmFkZ2UgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgIDxzcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgPC9saT5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2Zvb2RfaW1nX2hvdmVyJz5cXHJcXG4gICAgPHVsPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlbGl2ZXJ5X3R5cGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvdWw+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQge1xyXG4gICAgb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgQ29tbW9uVmlldyBmcm9tICcuL3ZpZXcvY29tbW9uVmlldyc7XHJcbmltcG9ydCBJbmZpbml0ZVNsaWRlVmlldyBmcm9tICcuL3ZpZXcvaW5maW5pdGVTbGlkZVZpZXcnO1xyXG5pbXBvcnQgQXV0b21Db21wbGV0ZVZpZXcgZnJvbSAnLi92aWV3L2F1dG9Db21wbGV0ZVZpZXcnO1xyXG5cclxuY29uc3QgdXJsTGlzdCA9IHtcclxuICAgIG1haW5TbGlkZTogJ2h0dHA6Ly81Mi43OS4xNDguNzQ6MzAwMC9tYWluU2xpZGUnLFxyXG4gICAgYmVzdEJhbmNoYW46ICdodHRwOi8vNTIuNzkuMTQ4Ljc0OjMwMDAvYmVzdCcsXHJcbiAgICBzaWRlOiAnaHR0cDovLzUyLjc5LjE0OC43NDozMDAwL3NpZGUnLFxyXG4gICAgbWFpbjogJ2h0dHA6Ly81Mi43OS4xNDguNzQ6MzAwMC9tYWluJyxcclxuICAgIGNvdXJzZTogJ2h0dHA6Ly81Mi43OS4xNDguNzQ6MzAwMC9zb3VwJ1xyXG59O1xyXG5cclxuY29uc3QgY29tbW9uVmlldyA9IG5ldyBDb21tb25WaWV3KCk7XHJcbmNvbnN0IHNpZGVCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnc2lkZScpO1xyXG5jb25zdCBtYWluQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ21haW4nKTtcclxuY29uc3QgY291cnNlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ2NvdXJzZScpO1xyXG5jb25zdCBhdXRvbUNvbXBsZXRlVmlldyA9IG5ldyBBdXRvbUNvbXBsZXRlVmlldygpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7Q29udHJvbGxlcn1cclxuICovXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih1cmxMaXN0LCBjb21tb25WaWV3LCBhdXRvbUNvbXBsZXRlVmlldywgc2lkZUJhbmNoYW5WaWV3LCBtYWluQmFuY2hhblZpZXcsIGNvdXJzZUJhbmNoYW5WaWV3KTtcclxuXHJcbmNvbnN0IHNldFZpZXcgPSAoKSA9PiBjb250cm9sbGVyLnNldFZpZXcoKTtcclxub24od2luZG93LCAnbG9hZCcsIHNldFZpZXcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyIsImltcG9ydCB7XHJcbiAgICByZXF1ZXN0LFxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgc2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgaXNWYWxpZCxcclxuICAgIG1vdmVTY3JvbGwsXHJcbiAgICBpc1N0cmluZyxcclxuICAgIGlzVXBkb3duLFxyXG4gICAgaXNFU0MsXHJcbiAgICBpc0VudGVyLFxyXG4gICAgZmV0Y2hKU09OUFxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybExpc3QsIGNvbW1vblZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCAuLi5pbmZpbml0ZVZpZXdzKSB7XHJcbiAgICAgICAgdGhpcy51cmxMaXN0ID0gdXJsTGlzdDtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcgPSBjb21tb25WaWV3O1xyXG4gICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcgPSBhdXRvbUNvbXBsZXRlVmlldztcclxuXHJcbiAgICAgICAgY29tbW9uVmlldy5iaW5kKCdzbGlkZXNQcmV2JywgdGhpcy5tb3ZlU2xpZGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGNvbW1vblZpZXcuYmluZCgnc2xpZGVzTmV4dCcsIHRoaXMubW92ZVNsaWRlcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjb21tb25WaWV3LmJpbmQoJ3NsaWRlc0RvdHMnLCB0aGlzLmN1cnJlbnRTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjb21tb25WaWV3LmJpbmQoJ3Njcm9sbGVyJywgdGhpcy5tb3ZlU2Nyb2xsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ3ByZXNzJywgdGhpcy5wcmVzc0F1dG9Db21wbGV0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdFNlYXJjaGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ3NlYXJjaGVzJywgdGhpcy5zaG93U2VhcmNoZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnY2xpY2snKTtcclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdub25DbGljaycpO1xyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ2hvdmVyJyk7XHJcblxyXG5cclxuICAgICAgICBpbmZpbml0ZVZpZXdzLmZvckVhY2goaW5maW5pdGVWaWV3ID0+IHtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgICAgICBpbmZpbml0ZVZpZXcuYmluZCgnc2xpZGVzTmV4dCcsIHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmJpbmQoaW5maW5pdGVWaWV3KSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEluZmluaXRlQmFuY2hhbihpbmZpbml0ZVZpZXcsIHRoaXMudXJsTGlzdFtpbmZpbml0ZVZpZXcuc3RhdGUubmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNoZWNrTG9jYWxTdG9yYWdlKGtleSwgaXNKU09OUCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gZ2V0TG9jYWxTdG9yYWdlKGtleSk7XHJcbiAgICAgICAgaWYgKGNhY2hlICYmIGlzVmFsaWQoY2FjaGUudGltZSwgNikpIHJldHVybiBjYWNoZS5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBpc0pTT05QID8gKGF3YWl0IGZldGNoSlNPTlAoa2V5KSlbMV0gOiBhd2FpdCByZXF1ZXN0KGtleSksXHJcbiAgICAgICAgICAgIHRpbWU6IERhdGUubm93KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5kYXRhLmhhc093blByb3BlcnR5KCdlcnJvcicpID8gZmFsc2UgOiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmlldygpIHtcclxuICAgICAgICB0aGlzLmluaXRTbGlkZSh0aGlzLnVybExpc3QubWFpblNsaWRlKTtcclxuICAgICAgICB0aGlzLmluaXRCZXN0QmFuY2hhbih0aGlzLnVybExpc3QuYmVzdEJhbmNoYW4pO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5iaW5kKCdwcmV2ZW50RGVmYXVsdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXRTbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LnNob3dTbGlkZSgwLCB0aGlzLnNsaWRlSW1nc1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlcyh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGFyZ2V0LmluZGV4ICs9IG47XHJcbiAgICAgICAgaWYgKHRhcmdldC5pbmRleCA+IHRoaXMuc2xpZGVzRW5kKSB0YXJnZXQuaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPCAwKSB0YXJnZXQuaW5kZXggPSB0aGlzLnNsaWRlc0VuZDtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCwgdGhpcy5zbGlkZUltZ3NbdGFyZ2V0LmluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VycmVudFNsaWRlKHRhcmdldCwgbikge1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5oaWRlU2xpZGUodGFyZ2V0LmluZGV4KTtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuc2hvd1NsaWRlKHRhcmdldC5pbmRleCA9IG4sIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTY3JvbGxlcihkaXJlY3Rpb24pIHtcclxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCcgPyBtb3ZlU2Nyb2xsKDApIDogbW92ZVNjcm9sbChkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcHJlc3NBdXRvQ29tcGxldGUodGVybSwga2V5LCBpc1NlbGV0ZWQpIHtcclxuICAgICAgICBpZiAoaXNTdHJpbmcoa2V5KSkge1xyXG4gICAgICAgICAgICBpZiAodGVybSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKGBodHRwczovL2tvLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwP2FjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD0ke3Rlcm19YCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LnJlbmRlcignYXV0b0NvbXBsZXRlJywgdGVybSwgc3VnZ2VzdGlvbnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1VwZG93bihrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcubW92ZUF1dG9Db21wbGV0ZShrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0Moa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKGtleSkpIHtcclxuICAgICAgICAgICAgaXNTZWxldGVkID8gdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbnRlckF1dG9Db21wbGV0ZSgpIDogdGhpcy5zdWJtaXRTZWFyY2hlcyh0ZXJtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoZXMoa2V5d29yZCkge1xyXG4gICAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaGVzID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ3NlYXJjaGVzJykpO1xyXG4gICAgICAgICAgICBzZWFyY2hlcy5hZGQoa2V5d29yZCk7XHJcbiAgICAgICAgICAgIHNldExvY2FsU3RvcmFnZSgnc2VhcmNoZXMnLCBbLi4uc2VhcmNoZXNdKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5U2VhcmNoYmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNob3dTZWFyY2hlcyhjaGVjaykge1xyXG4gICAgICAgIGlmIChjaGVjaykge1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hlcyA9IGF3YWl0IGdldExvY2FsU3RvcmFnZSgnc2VhcmNoZXMnKTtcclxuICAgICAgICAgICAgc2VhcmNoZXMgJiYgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5yZW5kZXIoJ3NlYXJjaGVzJywgc2VhcmNoZXMuc2xpY2UoLTUpLnJldmVyc2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXRCZXN0QmFuY2hhbih1cmwpIHtcclxuICAgICAgICBjb25zdCBiYW5jaGFuID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5yZW5kZXIoJ2Jlc3RCYW5jaGFuJywgYmFuY2hhbik7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LmJpbmQoJ2Zvb2RUYWInKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0SW5maW5pdGVCYW5jaGFuKHRhcmdldFZpZXcsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRhcmdldFZpZXcucmVuZGVyKCdiYW5jaGFuJywgZm9vZERhdGEpO1xyXG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZvb2REYXRhLmxlbmd0aCAqIDIuNTtcclxuICAgICAgICB0YXJnZXRWaWV3LmJpbmQoJ3NsaWRlcycsIHRoaXMucmVzZXRJbmZpbml0ZVNsaWRlcy5iaW5kKHRhcmdldFZpZXcsIC0yMCAtIHRocmVzaG9sZCwgLTIwICsgdGhyZXNob2xkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUluZmluaXRlU2xpZGVzKHRhcmdldCwgbW92ZSkge1xyXG4gICAgICAgIHRoaXMuc2hvd1NsaWRlcyh0YXJnZXQuZWwsIHRhcmdldC5kaXJlY3Rpb24gKz0gbW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRJbmZpbml0ZVNsaWRlcyh0aHJlc2hvbGRMZWZ0LCB0aHJlc2hvbGRSaWdodCwgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldC5kaXJlY3Rpb24gPT09IHRocmVzaG9sZExlZnQgfHwgdGFyZ2V0LmRpcmVjdGlvbiA9PT0gdGhyZXNob2xkUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRhcmdldC5lbCwgdGFyZ2V0LmRpcmVjdGlvbiA9IC0yMCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXIuanMiLCJpbXBvcnQgZm9vZEJveFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZm9vZFRhYlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWwnO1xyXG5pbXBvcnQgY29udGFpbmVyVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgcXNhLFxyXG4gICAgb24sXHJcbiAgICB0aHJvdHRsZSxcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsID0gcXMoJy5iZXN0X2Zvb2RfdGFicycpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoJy5zbGlkZXNfcHJldicpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoJy5zbGlkZXNfbmV4dCcpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSBxc2EoJy5tYWluX3NsaWRlc19saXN0ID4gbGknKTtcclxuICAgICAgICB0aGlzLmRvdHNFbCA9IHFzYSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1ByZXY6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2xpZGVzUHJldkVsLCAnY2xpY2snLCB0aHJvdHRsZSgoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsIC0xKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxKSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNEb3RzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnLnNsaWRlc19kb3RzJywgJy5zbGlkZXNfZG90cyA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUsICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnLnBhZ2VfdXBfZG93bl9saXN0JywgJy5wYWdlX3VwX2Rvd25fbGlzdCA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiBoYW5kbGVyKGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb24pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9vZFRhYjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5mb29kVGFiRWwsICdsaSA+IGEnLCAnY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZFRhYkxpc3RFbCkuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTmFtZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYiA9PT0gZS5kZWxlZ2F0ZVRhcmdldCA/ICdub3cnIDogJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kQm94TGlzdEVsKS5mb3JFYWNoKGZvb2QgPT4gZm9vZC5zdHlsZS5kaXNwbGF5ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldC5kYXRhc2V0LmNhdGVnb3J5X2lkID09PSBmb29kLmRhdGFzZXQuY2F0ZWdvcnlfaWQgPyAnYmxvY2snIDogJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnYScsICdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJlc3RCYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3RCYW5jaGFuKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICBiZXN0QmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiKGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZENvbnRhaW5lcihmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveChmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWJMaXN0KGZvb2QsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kVGFiID0gZm9vZC5tYXAodmFsdWUgPT4gZm9vZFRhYlRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RDb250YWluZXIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RDb250YWluZXIgPSBmb29kLm1hcCh2YWx1ZSA9PiBjb250YWluZXJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZFxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBxcygnLmJlc3RfZm9vZF9jb250YWluZXInKS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChmb29kKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX2JveF9saXN0Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IHZhbHVlLml0ZW1zLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgICAgICBmb29kQm94VGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3goZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hFbCA9IHFzYSgnLmJlc3RfZm9vZF9ib3gnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFsdWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiTGlzdChmb29kLCBpbml0TnVtKSB7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsID0gcXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVTbGlkZShjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW2N1cnJlbnRJbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVvdXQnO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlKHNsaWRlSW5kZXgsIHNsaWRlSW1nKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtzbGlkZUluZGV4XS5jbGFzc05hbWUgPSAnZmFkZWluJztcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3NsaWRlSW5kZXhdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke3NsaWRlSW1nfVwiKWA7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbc2xpZGVJbmRleF0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9jb21tb25WaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYmFzZSBmcm9tICcuL2hhbmRsZWJhcnMvYmFzZSc7XG5cbi8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbi8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG5pbXBvcnQgU2FmZVN0cmluZyBmcm9tICcuL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2hhbmRsZWJhcnMvZXhjZXB0aW9uJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vaGFuZGxlYmFycy91dGlscyc7XG5pbXBvcnQgKiBhcyBydW50aW1lIGZyb20gJy4vaGFuZGxlYmFycy9ydW50aW1lJztcblxuaW1wb3J0IG5vQ29uZmxpY3QgZnJvbSAnLi9oYW5kbGViYXJzL25vLWNvbmZsaWN0JztcblxuLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gIGxldCBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gIGhiLlNhZmVTdHJpbmcgPSBTYWZlU3RyaW5nO1xuICBoYi5FeGNlcHRpb24gPSBFeGNlcHRpb247XG4gIGhiLlV0aWxzID0gVXRpbHM7XG4gIGhiLmVzY2FwZUV4cHJlc3Npb24gPSBVdGlscy5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICB9O1xuXG4gIHJldHVybiBoYjtcbn1cblxubGV0IGluc3QgPSBjcmVhdGUoKTtcbmluc3QuY3JlYXRlID0gY3JlYXRlO1xuXG5ub0NvbmZsaWN0KGluc3QpO1xuXG5pbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJpbXBvcnQgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlckVhY2ggZnJvbSAnLi9oZWxwZXJzL2VhY2gnO1xuaW1wb3J0IHJlZ2lzdGVySGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVySWYgZnJvbSAnLi9oZWxwZXJzL2lmJztcbmltcG9ydCByZWdpc3RlckxvZyBmcm9tICcuL2hlbHBlcnMvbG9nJztcbmltcG9ydCByZWdpc3Rlckxvb2t1cCBmcm9tICcuL2hlbHBlcnMvbG9va3VwJztcbmltcG9ydCByZWdpc3RlcldpdGggZnJvbSAnLi9oZWxwZXJzL3dpdGgnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyRWFjaChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySWYoaW5zdGFuY2UpO1xuICByZWdpc3RlckxvZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9va3VwKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJXaXRoKGluc3RhbmNlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgY3JlYXRlRnJhbWUsIGlzQXJyYXl9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBsZXQgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0FycmF5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTXVzdCBwYXNzIGl0ZXJhdG9yIHRvICNlYWNoJyk7XG4gICAgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbixcbiAgICAgICAgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHJldCA9ICcnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjb250ZXh0UGF0aDtcblxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhlY0l0ZXJhdGlvbihmaWVsZCwgaW5kZXgsIGxhc3QpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEua2V5ID0gZmllbGQ7XG4gICAgICAgIGRhdGEuaW5kZXggPSBpbmRleDtcbiAgICAgICAgZGF0YS5maXJzdCA9IGluZGV4ID09PSAwO1xuICAgICAgICBkYXRhLmxhc3QgPSAhIWxhc3Q7XG5cbiAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG4gICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoICsgZmllbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtmaWVsZF0sIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0W2ZpZWxkXSwgZmllbGRdLCBbY29udGV4dFBhdGggKyBmaWVsZCwgbnVsbF0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24oaSwgaSwgaSA9PT0gY29udGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwcmlvcktleTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmIChjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuICAgICAgICAgICAgLy8gdGhlIGxhc3QgaXRlcmF0aW9uIHdpdGhvdXQgaGF2ZSB0byBzY2FuIHRoZSBvYmplY3QgdHdpY2UgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYW4gaXRlcm1lZGlhdGUga2V5cyBhcnJheS5cbiAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiLCJpbXBvcnQge2lzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb25kaXRpb25hbCkpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJlbmRlciB0aGUgcG9zaXRpdmUgcGF0aCBpZiB0aGUgdmFsdWUgaXMgdHJ1dGh5IGFuZCBub3QgZW1wdHkuXG4gICAgLy8gVGhlIGBpbmNsdWRlWmVyb2Agb3B0aW9uIG1heSBiZSBzZXQgdG8gdHJlYXQgdGhlIGNvbmR0aW9uYWwgYXMgcHVyZWx5IG5vdCBlbXB0eSBiYXNlZCBvbiB0aGVcbiAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuICAgIGlmICgoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwpIHx8IGlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2h9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbigvKiBtZXNzYWdlLCBvcHRpb25zICovKSB7XG4gICAgbGV0IGFyZ3MgPSBbdW5kZWZpbmVkXSxcbiAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgbGV2ZWwgPSAxO1xuICAgIGlmIChvcHRpb25zLmhhc2gubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmhhc2gubGV2ZWw7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5kYXRhLmxldmVsO1xuICAgIH1cbiAgICBhcmdzWzBdID0gbGV2ZWw7XG5cbiAgICBpbnN0YW5jZS5sb2coLi4uIGFyZ3MpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFpc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0XSwgW2RhdGEgJiYgZGF0YS5jb250ZXh0UGF0aF0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyIsImltcG9ydCByZWdpc3RlcklubGluZSBmcm9tICcuL2RlY29yYXRvcnMvaW5saW5lJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJJbmxpbmUoaW5zdGFuY2UpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZGVjb3JhdG9ycy5qcyIsImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZGVjb3JhdG9ycy9pbmxpbmUuanMiLCJpbXBvcnQge2luZGV4T2Z9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG4gIGxldmVsOiAnaW5mbycsXG5cbiAgLy8gTWFwcyBhIGdpdmVuIGxldmVsIHZhbHVlIHRvIHRoZSBgbWV0aG9kTWFwYCBpbmRleGVzIGFib3ZlLlxuICBsb29rdXBMZXZlbDogZnVuY3Rpb24obGV2ZWwpIHtcbiAgICBpZiAodHlwZW9mIGxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGxldmVsTWFwID0gaW5kZXhPZihsb2dnZXIubWV0aG9kTWFwLCBsZXZlbC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChsZXZlbE1hcCA+PSAwKSB7XG4gICAgICAgIGxldmVsID0gbGV2ZWxNYXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXZlbCA9IHBhcnNlSW50KGxldmVsLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9LFxuXG4gIC8vIENhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIC4uLm1lc3NhZ2UpIHtcbiAgICBsZXZlbCA9IGxvZ2dlci5sb29rdXBMZXZlbChsZXZlbCk7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGxvZ2dlci5sb29rdXBMZXZlbChsb2dnZXIubGV2ZWwpIDw9IGxldmVsKSB7XG4gICAgICBsZXQgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAoIWNvbnNvbGVbbWV0aG9kXSkgeyAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBtZXRob2QgPSAnbG9nJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5tZXNzYWdlKTsgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwiLy8gQnVpbGQgb3V0IG91ciBiYXNpYyBTYWZlU3RyaW5nIHR5cGVcbmZ1bmN0aW9uIFNhZmVTdHJpbmcoc3RyaW5nKSB7XG4gIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xufVxuXG5TYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IFNhZmVTdHJpbmcucHJvdG90eXBlLnRvSFRNTCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJycgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNhZmVTdHJpbmc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbGV0IHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyxcbiAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBIYW5kbGViYXJzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocm9vdC5IYW5kbGViYXJzID09PSBIYW5kbGViYXJzKSB7XG4gICAgICByb290LkhhbmRsZWJhcnMgPSAkSGFuZGxlYmFycztcbiAgICB9XG4gICAgcmV0dXJuIEhhbmRsZWJhcnM7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QuanMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uYW1lIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYT5cXHJcXG48L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIjx1bCBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF9saXN0XFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPjwvdWw+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIG9uLFxyXG4gICAgdGhyb3R0bGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZmluaXRlVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuaW5maW5pdGVfZm9vZF9ib3hfbGlzdGApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzUHJldkVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19wcmV2YCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNOZXh0RWwgPSBxcyhgLiR7bmFtZX1fZm9vZCAuc2xpZGVzX25leHRgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgZWw6IHRoaXMuZm9vZEJveEVsLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IC0yMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuZm9vZEJveEVsLCAndHJhbnNpdGlvbmVuZCcsICgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAxMCksIDYwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNOZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc05leHRFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCBwYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQmFuY2hhbihwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdCh0aGlzLnN0YXRlLmVsLCBmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3goZm9vZCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3g+YWApKTtcclxuICAgICAgICB0aGlzLnJlbmRlclNsaWRlcyh0aGlzLnN0YXRlLmVsLCBxc2EoYC4ke3RoaXMuc3RhdGUubmFtZX1fZm9vZCAucHJkX2JveGApKTtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXModGhpcy5zdGF0ZS5lbCwgdGhpcy5zdGF0ZS5kaXJlY3Rpb24sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGVsZW1lbnQsIGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IGZvb2QubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgZm9vZEJveEluZmluaXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QsIHByZEJveCkge1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTbGlkZXMoZWxlbWVudCwgU2xpZGVzKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlcyA9IEFycmF5LmZyb20oU2xpZGVzKS5zbGljZSgtNCk7XHJcblxyXG4gICAgICAgIFNsaWRlcy5mb3JFYWNoKFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoU2xpZGUuY2xvbmVOb2RlKHRydWUpKSk7XHJcbiAgICAgICAgbGFzdFNsaWRlcy5yZXZlcnNlKCkuZm9yRWFjaChsYXN0U2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobGFzdFNsaWRlLmNsb25lTm9kZSh0cnVlKSwgZWxlbWVudC5jaGlsZE5vZGVzWzBdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlcyhlbGVtZW50LCBkaXJlY3Rpb24sIEltbWVkaWF0ZWx5KSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBJbW1lZGlhdGVseSA/ICcwcycgOiAnMC41cyc7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2RpcmVjdGlvbn0lKWA7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L2luZmluaXRlU2xpZGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcInByZF9ib3hcXFwiPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRodW1iX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGFsdD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmFsdCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYWx0IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJhbHRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgICAgICAgICA8L3A+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2lyY2xlX21hc2tcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGw+XFxyXFxuICAgICAgICAgICAgPGR0IGNsYXNzPVxcXCJwcmRfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJwcmRfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJwcmRfcHJpY2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwib2xkX3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMub2xkX3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5vbGRfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm9sZF9wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJuZXdfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uZXdfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5ld19wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmV3X3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLndvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAud29uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ3b25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwvZGw+XFxyXFxuICAgIDwvYT5cXHJcXG48L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhdXRvY29tcGxldGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBvbixcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Db21wbGV0ZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IHFzKCcjc2VhcmNoX3N0cicpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdXR0b25FbCA9IHFzKCcuc2VhcmNoX2J0bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgcHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdrZXl1cCcsIGUgPT4gaGFuZGxlcihlLnRhcmdldC52YWx1ZSwgZS5rZXlDb2RlLCB0aGlzLnNlbCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoQnV0dG9uRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIodGhpcy5zZWFyY2hFbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWFyY2hlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zZWFyY2hFbCwgJ2NsaWNrJywgKCkgPT4gaGFuZGxlcighdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCAmJiAhdGhpcy5zZWFyY2hFbC52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5zdWdnZXN0aW9uc0VsLCAnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBdXRvQ29tcGxldGUoZS5kZWxlZ2F0ZVRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICcqJywgJ2NsaWNrJywgZSA9PiBlLnRhcmdldCAhPT0gdGhpcy5zZWFyY2hFbCAmJiB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBob3ZlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUodGhpcy5zdWdnZXN0aW9uc0VsLCAnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uJywgJ21vdXNlb3ZlcicsIGUgPT4gdGhpcy51cGRhdGVBdXRvQ29tcGxldGUoZS5kZWxlZ2F0ZVRhcmdldCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckF1dG9Db21wbGV0ZSguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWFyY2hlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWFyY2hlcyguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQXV0b0NvbXBsZXRlKHRlcm0sIHN1Z2dlc3Rpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBSZWdFeHAodGVybSwgJ2lnJyk7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnNTdHIgPSBzdWdnZXN0aW9ucy5tYXAoc3VnZ2VzdGlvbiA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBzdWdnZXN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc3VnZ2VzdGlvbi5yZXBsYWNlKHRhcmdldCwgYDxiPiR7dGVybX08L2I+YClcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBzdWdnZXN0aW9uc1N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2VhcmNoZXMoc2VhcmNoZXMpIHtcclxuICAgICAgICBjb25zdCBzZWFyY2hlc1N0ciA9IHNlYXJjaGVzLm1hcChzZWFyY2ggPT5cclxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzZWFyY2hlcycsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBzZWFyY2gsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzZWFyY2hcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBzZWFyY2hlc1N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsICYmIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9IHRoaXMuc2VsLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlQXV0b0NvbXBsZXRlKGtleSkge1xyXG4gICAgICAgIHRoaXMuc2VsID0gcXMoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbi5zZWxlY3RlZCcpO1xyXG4gICAgICAgIGNvbnN0IFtuZXh0RWwsIHByZXZFbF0gPSB0aGlzLnNlbCA/IFt0aGlzLnNlbC5uZXh0U2libGluZywgdGhpcy5zZWwucHJldmlvdXNTaWJsaW5nXSA6IFt0aGlzLnN1Z2dlc3Rpb25zRWwuZmlyc3RDaGlsZCwgdGhpcy5zdWdnZXN0aW9uc0VsLmxhc3RDaGlsZF07XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0ga2V5ID09PSA0MCA/IG5leHRFbCA6IHByZXZFbDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUF1dG9Db21wbGV0ZSh0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUF1dG9Db21wbGV0ZSh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnNlbCAmJiB0aGlzLnNlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuc2VsID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSAnJztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L2F1dG9Db21wbGV0ZVZpZXcuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJhdXRvY29tcGxldGVfc3VnZ2VzdGlvbiBcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnNbXCJjbGFzc1wiXSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDBbXCJjbGFzc1wiXSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY2xhc3NcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBkYXRhLXZhbHVlPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMua2V5d29yZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAua2V5d29yZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwia2V5d29yZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlwiXG4gICAgKyAoKHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMucmVuZGVyS2V5d29yZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVuZGVyS2V5d29yZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwicmVuZGVyS2V5d29yZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9