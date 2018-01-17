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
        return new Promise(function (response) {
            var script = document.createElement('script');
            var name = '_jsonp_' + unique++;

            url += url.match(/\?/) ? '&callback=' + name : '?callback=' + name;

            script.src = url;
            window[name] = function (json) {
                response(new Response(JSON.stringify(json)));
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
        value: async function checkLocalStorage(key) {
            var cache = (0, _helpers.getLocalStorage)(key);
            if (cache && (0, _helpers.isValid)(cache.time, 6)) return cache.data;
            var value = {
                data: await (0, _helpers.request)(key),
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
            var _this2 = this;

            if ((0, _helpers.isString)(key)) {
                !term && this.automCompleteView.emptyAutoComplete();
                (0, _helpers.fetchJSONP)('https://ko.wikipedia.org/w/api.php?action=opensearch&search=' + term).then(function (response) {
                    return response.json();
                }).then(function (suggestions) {
                    return _this2.automCompleteView.render('autoComplete', term, suggestions[1]);
                });
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
                this.automCompleteView.emptySearchbar();
            }
        }
    }, {
        key: 'showSearches',
        value: async function showSearches(check) {
            if (check) {
                var searches = await (0, _helpers.getLocalStorage)('searches');
                this.automCompleteView.render('searches', searches.slice(-5).reverse());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWIzZjZmZGQ4OGMzYjIzNjdiNjEiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9jb21tb25WaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicXMiLCJxc2EiLCJvbiIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJpc1N0cmluZyIsImlzVXBkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwic2VsZWN0b3IiLCJzY29wZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwidHlwZSIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGVsZWdhdGUiLCJsaXN0ZW5lckZuIiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwiZSIsImRlbGVnYXRlVGFyZ2V0IiwidGFyZ2V0IiwiY2xvc2VzdCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJvbnRpbWVvdXQiLCJzZW5kIiwiZnVuYyIsImxpbWl0Iiwid2FpdCIsInNldFRpbWVvdXQiLCJlYXNlSW5PdXRRdWFkIiwidCIsImIiLCJjIiwiZCIsImVhc2VJblF1YWQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidmFsdWUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGF0YSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInVuaXF1ZSIsIm1hdGNoIiwic3JjIiwid2luZG93IiwiUmVzcG9uc2UiLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZSIsIm1haW4iLCJjb3Vyc2UiLCJjb21tb25WaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwiQ29udHJvbGxlciIsIm1vdmVTbGlkZXMiLCJjdXJyZW50U2xpZGUiLCJtb3ZlU2Nyb2xsZXIiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdFNlYXJjaGVzIiwic2hvd1NlYXJjaGVzIiwiaW5maW5pdGVWaWV3cyIsImZvckVhY2giLCJpbmZpbml0ZVZpZXciLCJtb3ZlSW5maW5pdGVTbGlkZXMiLCJpbml0SW5maW5pdGVCYW5jaGFuIiwic3RhdGUiLCJjYWNoZSIsInRpbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImluaXRTbGlkZSIsImluaXRCZXN0QmFuY2hhbiIsInNsaWRlSW1ncyIsImNoZWNrTG9jYWxTdG9yYWdlIiwic2xpZGVzRW5kIiwibGVuZ3RoIiwic2hvd1NsaWRlIiwibiIsImhpZGVTbGlkZSIsImluZGV4IiwiZGlyZWN0aW9uIiwiY2xpZW50SGVpZ2h0IiwidGVybSIsImlzU2VsZXRlZCIsImVtcHR5QXV0b0NvbXBsZXRlIiwidGhlbiIsInN1Z2dlc3Rpb25zIiwicmVuZGVyIiwibW92ZUF1dG9Db21wbGV0ZSIsImVudGVyQXV0b0NvbXBsZXRlIiwia2V5d29yZCIsInNlYXJjaGVzIiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJjaGVjayIsInNsaWNlIiwicmV2ZXJzZSIsImJhbmNoYW4iLCJ0YXJnZXRWaWV3IiwiZm9vZERhdGEiLCJ0aHJlc2hvbGQiLCJyZXNldEluZmluaXRlU2xpZGVzIiwibW92ZSIsInNob3dTbGlkZXMiLCJlbCIsInRocmVzaG9sZExlZnQiLCJ0aHJlc2hvbGRSaWdodCIsIlZpZXciLCJmb29kVGFiRWwiLCJzbGlkZXNQcmV2RWwiLCJzbGlkZXNOZXh0RWwiLCJzbGlkZXNFbCIsImRvdHNFbCIsImJpbmRDbWQiLCJoYW5kbGVyIiwiYmluZENvbW1hbmRzIiwic2xpZGVzUHJldiIsInNsaWRlc05leHQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJzY3JvbGxlciIsImRhdGFzZXQiLCJmb29kVGFiIiwiZnJvbSIsImZvb2RUYWJMaXN0RWwiLCJ0YWIiLCJjbGFzc05hbWUiLCJmb29kQm94TGlzdEVsIiwiZm9vZCIsInN0eWxlIiwiZGlzcGxheSIsImNhdGVnb3J5X2lkIiwicHJldmVudERlZmF1bHQiLCJ2aWV3Q21kIiwicGFyYW1zIiwidmlld0NvbW1hbmRzIiwicmVuZGVyRm9vZFRhYiIsInJlbmRlckZvb2RDb250YWluZXIiLCJyZW5kZXJGb29kQm94TGlzdCIsInJlbmRlckZvb2RCb3giLCJyZW5kZXJGb29kVGFiTGlzdCIsImZsb29yIiwicmFuZG9tIiwiam9pbiIsImluc2VydEFkamFjZW50SFRNTCIsImZvb2RDb250YWluZXIiLCJpIiwiZm9vZEJveExpc3QiLCJpdGVtcyIsImltYWdlIiwiaXRlbSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJjdXJyZW50SW5kZXgiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnIiwiRnVuY3Rpb24iLCJldmFsIiwiSW5maW5pdGVWaWV3Iiwic2xpZGVzIiwicmVuZGVyQmFuY2hhbiIsInJlbmRlclNsaWRlcyIsInByZEJveCIsIlNsaWRlcyIsImxhc3RTbGlkZXMiLCJTbGlkZSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsImxhc3RTbGlkZSIsImNoaWxkTm9kZXMiLCJJbW1lZGlhdGVseSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsIkF1dG9Db21wbGV0ZVZpZXciLCJzZWFyY2hFbCIsInN1Z2dlc3Rpb25zRWwiLCJzZWFyY2hCdXR0b25FbCIsInByZXNzIiwia2V5Q29kZSIsInNlbCIsInN1Ym1pdCIsImlubmVySFRNTCIsImNsaWNrIiwidXBkYXRlQXV0b0NvbXBsZXRlIiwibm9uQ2xpY2siLCJob3ZlciIsImF1dG9Db21wbGV0ZSIsInJlbmRlckF1dG9Db21wbGV0ZSIsInJlbmRlclNlYXJjaGVzIiwiUmVnRXhwIiwic3VnZ2VzdGlvbnNTdHIiLCJzdWdnZXN0aW9uIiwicmVuZGVyS2V5d29yZCIsInJlcGxhY2UiLCJzZWFyY2hlc1N0ciIsImNsYXNzIiwic2VhcmNoIiwibmV4dFNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwibmV4dEVsIiwicHJldkVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQVk7QUFDUCxPQUNIO0FBQUcsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBUEE7O0FBU0Ys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U0FBbkQsQ0FGckU7QUFBQTtBQUFBLGdCQUVYQyxNQUZXO0FBQUEsZ0JBRUhDLE1BRkc7O0FBR2xCLGdCQUFNbFAsU0FBUzBCLFFBQVEsRUFBUixHQUFhdU4sTUFBYixHQUFzQkMsTUFBckM7QUFDQSxpQkFBS25CLGtCQUFMLENBQXdCL04sTUFBeEI7QUFDSDs7OzJDQUVrQkEsTSxFQUFRO0FBQ3ZCLGlCQUFLMk4sR0FBTCxJQUFZLEtBQUtBLEdBQUwsQ0FBUzVCLFNBQVQsQ0FBbUJsSSxNQUFuQixDQUEwQixVQUExQixDQUFaO0FBQ0EsaUJBQUs4SixHQUFMLEdBQVczTixNQUFYO0FBQ0EsaUJBQUsyTixHQUFMLENBQVM1QixTQUFULENBQW1CM0UsR0FBbkIsQ0FBdUIsVUFBdkI7QUFDSDs7OzRDQUVtQjtBQUNoQixpQkFBS21HLGFBQUwsQ0FBbUJNLFNBQW5CLEdBQStCLEVBQS9CO0FBQ0g7Ozt5Q0FFZ0I7QUFDYixpQkFBS1AsUUFBTCxDQUFjekwsS0FBZCxHQUFzQixFQUF0QjtBQUNIOzs7Ozs7a0JBaEdnQndMLGdCOzs7Ozs7QUNOckI7QUFDQSx5QkFBeUIsdURBQXVEO0FBQ2hGLGlFQUFpRTtBQUNqRSxxRkFBcUY7O0FBRXJGO0FBQ0EsOEtBQThLLHdCQUF3QixhQUFhO0FBQ25OO0FBQ0EsNEtBQTRLLDBCQUEwQixhQUFhO0FBQ25OO0FBQ0EsNExBQTRMLGdDQUFnQyxhQUFhO0FBQ3pPO0FBQ0EsQ0FBQyxnQkFBZ0IsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlYjNmNmZkZDg4YzNiMjM2N2I2MSIsImNvbnN0IGVzY2FwZSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjeDI3OycsXG4gICdgJzogJyYjeDYwOycsXG4gICc9JzogJyYjeDNEOydcbn07XG5cbmNvbnN0IGJhZENoYXJzID0gL1smPD5cIidgPV0vZyxcbiAgICAgIHBvc3NpYmxlID0gL1smPD5cIidgPV0vO1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQob2JqLyogLCAuLi5zb3VyY2UgKi8pIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tpXSwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBsZXQgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLXN0eWxlICovXG5sZXQgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9O1xufVxuZXhwb3J0IHtpc0Z1bmN0aW9ufTtcbi8qIGVzbGludC1lbmFibGUgZnVuYy1zdHlsZSAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcblxuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVFeHByZXNzaW9uKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyAmJiBzdHJpbmcudG9IVE1MKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnRvSFRNTCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZztcbiAgfVxuXG4gIGlmICghcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnJhbWUob2JqZWN0KSB7XG4gIGxldCBmcmFtZSA9IGV4dGVuZCh7fSwgb2JqZWN0KTtcbiAgZnJhbWUuX3BhcmVudCA9IG9iamVjdDtcbiAgcmV0dXJuIGZyYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvdXRpbHMuanMiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiLyoqXHJcbiAqIHF1ZXJ5U2VsZWN0b3Igd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgU2VsZWN0b3IgdG8gcXVlcnlcclxuICogQHBhcmFtIHtFbGVtZW50fSBbc2NvcGVdIE9wdGlvbmFsIHNjb3BlIGVsZW1lbnQgZm9yIHRoZSBzZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHFzKHNlbGVjdG9yLCBzY29wZSkge1xyXG4gICAgcmV0dXJuIChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHFzYShzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogYWRkRXZlbnRMaXN0ZW5lciB3cmFwcGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudHxXaW5kb3d9IGVsZW1lbnQgVGFyZ2V0IEVsZW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgRXZlbnQgbmFtZSB0byBiaW5kIHRvXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEV2ZW50IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlQ2FwdHVyZSBDYXB0dXJlIHRoZSBldmVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG59XHJcblxyXG4vKipcclxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmZ1bmN0aW9uIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIHZhciBsaXN0ZW5lckZuID0gbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd8QXJyYXl9IFtlbGVtZW50c11cclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudHMsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgLy8gSGFuZGxlIHRoZSByZWd1bGFyIEVsZW1lbnQgdXNhZ2VcclxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgRWxlbWVudC1sZXNzIHVzYWdlLCBpdCBkZWZhdWx0cyB0byBnbG9iYWwgZGVsZWdhdGlvblxyXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gVXNlIGBkb2N1bWVudGAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgdGhlbiBhcHBseSBhcmd1bWVudHNcclxuICAgICAgICAvLyBUaGlzIGlzIGEgc2hvcnQgd2F5IHRvIC51bnNoaWZ0IGBhcmd1bWVudHNgIHdpdGhvdXQgcnVubmluZyBpbnRvIGRlb3B0aW1pemF0aW9uc1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYmluZChudWxsLCBkb2N1bWVudCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgU2VsZWN0b3ItYmFzZWQgdXNhZ2VcclxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgQXJyYXktbGlrZSBiYXNlZCB1c2FnZVxyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIGNsb3Nlc3QgbWF0Y2ggYW5kIGludm9rZXMgY2FsbGJhY2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEFKQVggcmVxdWVzdC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+ICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSA/XHJcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKSA6IHJlamVjdCh4aHIuc3RhdHVzKTtcclxuICAgICAgICB4aHIub250aW1lb3V0ID0gKCkgPT4gcmVqZWN0KCd0aW1lb3V0Jyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlciBgd2FpdGAgbWlsbGlzZWNvbmRzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIEZ1bmN0aW9uIHRvIHdyYXAuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsaW1pdCBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgbXVzdCBlbGFwc2UgYmV0d2VlbiBgZnVuY2AgaW52b2NhdGlvbnMuXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IHdyYXBzIHRoZSBgZnVuY2AgZnVuY3Rpb24gcGFzc2VkIGluLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBsaW1pdCkge1xyXG4gICAgbGV0IHdhaXQgPSBmYWxzZTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF3YWl0KSB7XHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgd2FpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBsaW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcclxuICAgIHQtLTtcclxuICAgIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBzdGFydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYyBjaGFuZ2UgaW4gdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfSBuZXcgc2Nyb2xsWVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xyXG4gICAgdCAvPSBkIC8gMjtcclxuICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZShrZXkpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIHJldHVybiB2YWx1ZS5kYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChyZWNlaXZlZFRpbWUsIHRocmVzaG9sZEhvdXIpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gKGN1cnJlbnRUaW1lIC0gcmVjZWl2ZWRUaW1lKSAvIDEwMDAgLyA2MCAvIDYwO1xyXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lIDwgdGhyZXNob2xkSG91cjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVTY3JvbGwodG8pIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gc2Nyb2xsWTtcclxuICAgIGNvbnN0IGNoYW5nZSA9IHRvIC0gc3RhcnQ7XHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGguYWJzKGNoYW5nZSAvIDQpO1xyXG4gICAgY29uc3QgaW5jcmVtZW50ID0gMjA7XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gaW5jcmVtZW50O1xyXG4gICAgICAgIGxldCBuZXdZID0gZWFzZUluUXVhZChjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIHNjcm9sbFRvKDAsIG5ld1kpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VGltZSA8IGR1cmF0aW9uKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKGtleSkge1xyXG4gICAgcmV0dXJuICgha2V5IHx8IChrZXkgPCAzNSB8fCBrZXkgPiA0MCkgJiYga2V5ICE9PSAxMyAmJiBrZXkgIT09IDI3KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVXBkb3duKGtleSkge1xyXG4gICAgLy8gZG93biAoNDApLCB1cCAoMzgpXHJcbiAgICByZXR1cm4gKGtleSA9PT0gNDAgfHwga2V5ID09PSAzOCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VTQyhrZXkpIHtcclxuICAgIHJldHVybiBrZXkgPT09IDI3O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRlcihrZXkpIHtcclxuICAgIHJldHVybiBrZXkgPT09IDEzO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hKU09OUCA9ICh1bmlxdWUgPT4gdXJsID0+XHJcbiAgICBuZXcgUHJvbWlzZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGBfanNvbnBfJHt1bmlxdWUrK31gO1xyXG5cclxuICAgICAgICB1cmwgKz0gdXJsLm1hdGNoKC9cXD8vKSA/IGAmY2FsbGJhY2s9JHtuYW1lfWAgOiBgP2NhbGxiYWNrPSR7bmFtZX1gO1xyXG5cclxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xyXG4gICAgICAgIHdpbmRvd1tuYW1lXSA9IGpzb24gPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZShuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoanNvbikpKTtcclxuICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W25hbWVdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH0pXHJcbikoMCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy5qcyIsIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJpbXBvcnQge2NyZWF0ZUZyYW1lLCBleHRlbmQsIHRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHRIZWxwZXJzfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzfSBmcm9tICcuL2RlY29yYXRvcnMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzQuMC4xMSc7XG5leHBvcnQgY29uc3QgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmNvbnN0IG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2dnZXIubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBleHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihgQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJHtuYW1lfVwiIGFzIHVuZGVmaW5lZGApO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydCB7Y3JlYXRlRnJhbWUsIGxvZ2dlcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICA8ZGl2IGNsYXNzPSdiYWRnZSc+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCI8L2Rpdj5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImJhZGdlX2xpc3RcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmJhZGdlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICA8c3Bhbj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdmb29kX2ltZ19ob3Zlcic+XFxyXFxuICAgIDx1bD5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZWxpdmVyeV90eXBlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8L3VsPlxcclxcbjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcclxuaW1wb3J0IHtcclxuICAgIG9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IENvbW1vblZpZXcgZnJvbSAnLi92aWV3L2NvbW1vblZpZXcnO1xyXG5pbXBvcnQgSW5maW5pdGVTbGlkZVZpZXcgZnJvbSAnLi92aWV3L2luZmluaXRlU2xpZGVWaWV3JztcclxuaW1wb3J0IEF1dG9tQ29tcGxldGVWaWV3IGZyb20gJy4vdmlldy9hdXRvQ29tcGxldGVWaWV3JztcclxuXHJcbmNvbnN0IHVybExpc3QgPSB7XHJcbiAgICBtYWluU2xpZGU6ICdodHRwOi8vNTIuNzkuMTQ4Ljc0OjMwMDAvbWFpblNsaWRlJyxcclxuICAgIGJlc3RCYW5jaGFuOiAnaHR0cDovLzUyLjc5LjE0OC43NDozMDAwL2Jlc3QnLFxyXG4gICAgc2lkZTogJ2h0dHA6Ly81Mi43OS4xNDguNzQ6MzAwMC9zaWRlJyxcclxuICAgIG1haW46ICdodHRwOi8vNTIuNzkuMTQ4Ljc0OjMwMDAvbWFpbicsXHJcbiAgICBjb3Vyc2U6ICdodHRwOi8vNTIuNzkuMTQ4Ljc0OjMwMDAvc291cCdcclxufTtcclxuXHJcbmNvbnN0IGNvbW1vblZpZXcgPSBuZXcgQ29tbW9uVmlldygpO1xyXG5jb25zdCBzaWRlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJ3NpZGUnKTtcclxuY29uc3QgbWFpbkJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdtYWluJyk7XHJcbmNvbnN0IGNvdXJzZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdjb3Vyc2UnKTtcclxuY29uc3QgYXV0b21Db21wbGV0ZVZpZXcgPSBuZXcgQXV0b21Db21wbGV0ZVZpZXcoKTtcclxuXHJcblxyXG4vKipcclxuICogQHR5cGUge0NvbnRyb2xsZXJ9XHJcbiAqL1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodXJsTGlzdCwgY29tbW9uVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIHNpZGVCYW5jaGFuVmlldywgbWFpbkJhbmNoYW5WaWV3LCBjb3Vyc2VCYW5jaGFuVmlldyk7XHJcblxyXG5jb25zdCBzZXRWaWV3ID0gKCkgPT4gY29udHJvbGxlci5zZXRWaWV3KCk7XHJcbm9uKHdpbmRvdywgJ2xvYWQnLCBzZXRWaWV3KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGdldExvY2FsU3RvcmFnZSxcclxuICAgIHNldExvY2FsU3RvcmFnZSxcclxuICAgIGlzVmFsaWQsXHJcbiAgICBtb3ZlU2Nyb2xsLFxyXG4gICAgaXNTdHJpbmcsXHJcbiAgICBpc1VwZG93bixcclxuICAgIGlzRVNDLFxyXG4gICAgaXNFbnRlcixcclxuICAgIGZldGNoSlNPTlBcclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmxMaXN0LCBjb21tb25WaWV3LCBhdXRvbUNvbXBsZXRlVmlldywgLi4uaW5maW5pdGVWaWV3cykge1xyXG4gICAgICAgIHRoaXMudXJsTGlzdCA9IHVybExpc3Q7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3ID0gY29tbW9uVmlldztcclxuICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3ID0gYXV0b21Db21wbGV0ZVZpZXc7XHJcblxyXG4gICAgICAgIGNvbW1vblZpZXcuYmluZCgnc2xpZGVzUHJldicsIHRoaXMubW92ZVNsaWRlcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICBjb21tb25WaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY29tbW9uVmlldy5iaW5kKCdzbGlkZXNEb3RzJywgdGhpcy5jdXJyZW50U2xpZGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY29tbW9uVmlldy5iaW5kKCdzY3JvbGxlcicsIHRoaXMubW92ZVNjcm9sbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdwcmVzcycsIHRoaXMucHJlc3NBdXRvQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnc3VibWl0JywgdGhpcy5zdWJtaXRTZWFyY2hlcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdzZWFyY2hlcycsIHRoaXMuc2hvd1NlYXJjaGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ2NsaWNrJyk7XHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnbm9uQ2xpY2snKTtcclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdob3ZlcicpO1xyXG5cclxuXHJcbiAgICAgICAgaW5maW5pdGVWaWV3cy5mb3JFYWNoKGluZmluaXRlVmlldyA9PiB7XHJcbiAgICAgICAgICAgIGluZmluaXRlVmlldy5iaW5kKCdzbGlkZXNQcmV2JywgdGhpcy5tb3ZlSW5maW5pdGVTbGlkZXMuYmluZChpbmZpbml0ZVZpZXcpKTtcclxuICAgICAgICAgICAgaW5maW5pdGVWaWV3LmJpbmQoJ3NsaWRlc05leHQnLCB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5iaW5kKGluZmluaXRlVmlldykpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRJbmZpbml0ZUJhbmNoYW4oaW5maW5pdGVWaWV3LCB0aGlzLnVybExpc3RbaW5maW5pdGVWaWV3LnN0YXRlLm5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjaGVja0xvY2FsU3RvcmFnZShrZXkpIHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IGdldExvY2FsU3RvcmFnZShrZXkpO1xyXG4gICAgICAgIGlmIChjYWNoZSAmJiBpc1ZhbGlkKGNhY2hlLnRpbWUsIDYpKSByZXR1cm4gY2FjaGUuZGF0YTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogYXdhaXQgcmVxdWVzdChrZXkpLFxyXG4gICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmFsdWUuZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSA/IGZhbHNlIDogc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U2xpZGUodGhpcy51cmxMaXN0Lm1haW5TbGlkZSk7XHJcbiAgICAgICAgdGhpcy5pbml0QmVzdEJhbmNoYW4odGhpcy51cmxMaXN0LmJlc3RCYW5jaGFuKTtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuYmluZCgncHJldmVudERlZmF1bHQnKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0U2xpZGUodXJsKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUltZ3MgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbmQgPSB0aGlzLnNsaWRlSW1ncy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5zaG93U2xpZGUoMCwgdGhpcy5zbGlkZUltZ3NbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTbGlkZXModGFyZ2V0LCBuKSB7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LmhpZGVTbGlkZSh0YXJnZXQuaW5kZXgpO1xyXG4gICAgICAgIHRhcmdldC5pbmRleCArPSBuO1xyXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggPiB0aGlzLnNsaWRlc0VuZCkgdGFyZ2V0LmluZGV4ID0gMDtcclxuICAgICAgICBpZiAodGFyZ2V0LmluZGV4IDwgMCkgdGFyZ2V0LmluZGV4ID0gdGhpcy5zbGlkZXNFbmQ7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LnNob3dTbGlkZSh0YXJnZXQuaW5kZXgsIHRoaXMuc2xpZGVJbWdzW3RhcmdldC5pbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRTbGlkZSh0YXJnZXQsIG4pIHtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuaGlkZVNsaWRlKHRhcmdldC5pbmRleCk7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LnNob3dTbGlkZSh0YXJnZXQuaW5kZXggPSBuLCB0aGlzLnNsaWRlSW1nc1t0YXJnZXQuaW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2Nyb2xsZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZGlyZWN0aW9uID09PSAndXAnID8gbW92ZVNjcm9sbCgwKSA6IG1vdmVTY3JvbGwoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHByZXNzQXV0b0NvbXBsZXRlKHRlcm0sIGtleSwgaXNTZWxldGVkKSB7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGtleSkpIHtcclxuICAgICAgICAgICAgIXRlcm0gJiYgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICBmZXRjaEpTT05QKGBodHRwczovL2tvLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwP2FjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD0ke3Rlcm19YClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzdWdnZXN0aW9ucykgPT4gdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zWzFdKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1VwZG93bihrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcubW92ZUF1dG9Db21wbGV0ZShrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0Moa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKGtleSkpIHtcclxuICAgICAgICAgICAgaXNTZWxldGVkID8gdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbnRlckF1dG9Db21wbGV0ZSgpIDogdGhpcy5zdWJtaXRTZWFyY2hlcyh0ZXJtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoZXMoa2V5d29yZCkge1xyXG4gICAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaGVzID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ3NlYXJjaGVzJykpO1xyXG4gICAgICAgICAgICBzZWFyY2hlcy5hZGQoa2V5d29yZCk7XHJcbiAgICAgICAgICAgIHNldExvY2FsU3RvcmFnZSgnc2VhcmNoZXMnLCBbLi4uc2VhcmNoZXNdKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eVNlYXJjaGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaG93U2VhcmNoZXMoY2hlY2spIHtcclxuICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoZXMgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ3NlYXJjaGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcucmVuZGVyKCdzZWFyY2hlcycsIHNlYXJjaGVzLnNsaWNlKC01KS5yZXZlcnNlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0QmVzdEJhbmNoYW4odXJsKSB7XHJcbiAgICAgICAgY29uc3QgYmFuY2hhbiA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcucmVuZGVyKCdiZXN0QmFuY2hhbicsIGJhbmNoYW4pO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdEluZmluaXRlQmFuY2hhbih0YXJnZXRWaWV3LCB1cmwpIHtcclxuICAgICAgICBjb25zdCBmb29kRGF0YSA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0YXJnZXRWaWV3LnJlbmRlcignYmFuY2hhbicsIGZvb2REYXRhKTtcclxuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmb29kRGF0YS5sZW5ndGggKiAyLjU7XHJcbiAgICAgICAgdGFyZ2V0Vmlldy5iaW5kKCdzbGlkZXMnLCB0aGlzLnJlc2V0SW5maW5pdGVTbGlkZXMuYmluZCh0YXJnZXRWaWV3LCAtMjAgLSB0aHJlc2hvbGQsIC0yMCArIHRocmVzaG9sZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVJbmZpbml0ZVNsaWRlcyh0YXJnZXQsIG1vdmUpIHtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXModGFyZ2V0LmVsLCB0YXJnZXQuZGlyZWN0aW9uICs9IG1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0SW5maW5pdGVTbGlkZXModGhyZXNob2xkTGVmdCwgdGhyZXNob2xkUmlnaHQsIHRhcmdldCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQuZGlyZWN0aW9uID09PSB0aHJlc2hvbGRMZWZ0IHx8IHRhcmdldC5kaXJlY3Rpb24gPT09IHRocmVzaG9sZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1NsaWRlcyh0YXJnZXQuZWwsIHRhcmdldC5kaXJlY3Rpb24gPSAtMjAsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb250cm9sbGVyLmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIG9uLFxyXG4gICAgdGhyb3R0bGUsXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbCA9IHFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKCcuc2xpZGVzX3ByZXYnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHFzKCcuc2xpZGVzX25leHQnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsID0gcXNhKCcubWFpbl9zbGlkZXNfbGlzdCA+IGxpJyk7XHJcbiAgICAgICAgdGhpcy5kb3RzRWwgPSBxc2EoJy5zbGlkZXNfZG90cyA+IGxpID4gYScpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5zbGlkZXNfZG90cycsICcuc2xpZGVzX2RvdHMgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCArZS5kZWxlZ2F0ZVRhcmdldC50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5wYWdlX3VwX2Rvd25fbGlzdCcsICcucGFnZV91cF9kb3duX2xpc3QgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcihlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuZm9vZFRhYkVsLCAnbGkgPiBhJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RUYWJMaXN0RWwpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIgPT09IGUuZGVsZWdhdGVUYXJnZXQgPyAnbm93JyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZEJveExpc3RFbCkuZm9yRWFjaChmb29kID0+IGZvb2Quc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5jYXRlZ29yeV9pZCA9PT0gZm9vZC5kYXRhc2V0LmNhdGVnb3J5X2lkID8gJ2Jsb2NrJyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKCdib2R5JywgJ2EnLCAnY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiZXN0QmFuY2hhbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0QmFuY2hhbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVzdEJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZFRhYihmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RDb250YWluZXIoZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdChmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3goZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiTGlzdChmb29kLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZFRhYiA9IGZvb2QubWFwKHZhbHVlID0+IGZvb2RUYWJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZCxcclxuICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZVxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQ29udGFpbmVyKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQ29udGFpbmVyID0gZm9vZC5tYXAodmFsdWUgPT4gY29udGFpbmVyVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWRcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgcXMoJy5iZXN0X2Zvb2RfY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZENvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZm9vZCkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbCA9IHFzYSgnLmJlc3RfZm9vZF9ib3hfbGlzdCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSB2YWx1ZS5pdGVtcy5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgZm9vZEJveFRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2ldLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94RWwgPSBxc2EoJy5iZXN0X2Zvb2RfYm94Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSB2YWx1ZS5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhbHVlLml0ZW1zLmZvckVhY2goKGl0ZW0sIGopID0+IHtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYkxpc3QoZm9vZCwgaW5pdE51bSkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbCA9IHFzYSgnLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsW2luaXROdW1dLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpbml0TnVtXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlU2xpZGUoY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtjdXJyZW50SW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlb3V0JztcclxuICAgICAgICB0aGlzLmRvdHNFbFtjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vdycpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZShzbGlkZUluZGV4LCBzbGlkZUltZykge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbc2xpZGVJbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVpbic7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtzbGlkZUluZGV4XS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtzbGlkZUltZ31cIilgO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3NsaWRlSW5kZXhdLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvY29tbW9uVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfd3JhcFxcXCI+XFxyXFxuICAgIDxsaSBjbGFzcz1cXFwiYmVzdF9mb29kX2JveFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb29kX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcImZvb2RfZGV0YWlsXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcImZvb2RfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwiZm9vZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9saT5cXHJcXG48L2E+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaT5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlcjtcblxuICByZXR1cm4gXCI8dWwgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfbGlzdFxcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L3VsPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQgYmFkZ2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCc7XHJcbmltcG9ydCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZpbml0ZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLmluZmluaXRlX2Zvb2RfYm94X2xpc3RgKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKGAuJHtuYW1lfV9mb29kIC5zbGlkZXNfcHJldmApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19uZXh0YCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGVsOiB0aGlzLmZvb2RCb3hFbCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAtMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgc2xpZGVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLmZvb2RCb3hFbCwgJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzUHJldjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNQcmV2RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgLTEwKSwgNjAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgcGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJhbmNoYW4ocGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QodGhpcy5zdGF0ZS5lbCwgZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94KGZvb2QsIHFzYShgLiR7dGhpcy5zdGF0ZS5uYW1lfV9mb29kIC5wcmRfYm94PmFgKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZXModGhpcy5zdGF0ZS5lbCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3hgKSk7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRoaXMuc3RhdGUuZWwsIHRoaXMuc3RhdGUuZGlyZWN0aW9uLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChlbGVtZW50LCBmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSBmb29kLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgIGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kLCBwcmRCb3gpIHtcclxuICAgICAgICBmb29kLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2xpZGVzKGVsZW1lbnQsIFNsaWRlcykge1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZXMgPSBBcnJheS5mcm9tKFNsaWRlcykuc2xpY2UoLTQpO1xyXG5cclxuICAgICAgICBTbGlkZXMuZm9yRWFjaChTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFNsaWRlLmNsb25lTm9kZSh0cnVlKSkpO1xyXG4gICAgICAgIGxhc3RTbGlkZXMucmV2ZXJzZSgpLmZvckVhY2gobGFzdFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGxhc3RTbGlkZS5jbG9uZU5vZGUodHJ1ZSksIGVsZW1lbnQuY2hpbGROb2Rlc1swXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZXMoZWxlbWVudCwgZGlyZWN0aW9uLCBJbW1lZGlhdGVseSkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gSW1tZWRpYXRlbHkgPyAnMHMnIDogJzAuNXMnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtkaXJlY3Rpb259JSlgO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9pbmZpbml0ZVNsaWRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXV0b2NvbXBsZXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgb24sXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvQ29tcGxldGVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwgPSBxcygnI3NlYXJjaF9zdHInKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwgPSBxcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucycpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQnV0dG9uRWwgPSBxcygnLnNlYXJjaF9idG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHByZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEVsLCAna2V5dXAnLCBlID0+IGhhbmRsZXIoZS50YXJnZXQudmFsdWUsIGUua2V5Q29kZSwgdGhpcy5zZWwpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEJ1dHRvbkVsLCAnY2xpY2snLCAoKSA9PiBoYW5kbGVyKHRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VhcmNoZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIoIXRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgJiYgIXRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnKicsICdjbGljaycsIGUgPT4gZS50YXJnZXQgIT09IHRoaXMuc2VhcmNoRWwgJiYgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaG92ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW92ZXInLCBlID0+IHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGF1dG9Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBdXRvQ29tcGxldGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VhcmNoZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoZXMoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckF1dG9Db21wbGV0ZSh0ZXJtLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgUmVnRXhwKHRlcm0sICdpZycpO1xyXG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zU3RyID0gc3VnZ2VzdGlvbnMubWFwKHN1Z2dlc3Rpb24gPT5cclxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc3VnZ2VzdGlvbixcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHN1Z2dlc3Rpb24ucmVwbGFjZSh0YXJnZXQsIGA8Yj4ke3Rlcm19PC9iPmApXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgc3VnZ2VzdGlvbnNTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNlYXJjaGVzKHNlYXJjaGVzKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoZXNTdHIgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoZXMnLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc2VhcmNoXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgc2VhcmNoZXNTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbCAmJiB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSB0aGlzLnNlbC5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUF1dG9Db21wbGV0ZShrZXkpIHtcclxuICAgICAgICB0aGlzLnNlbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VsZWN0ZWQnKTtcclxuICAgICAgICBjb25zdCBbbmV4dEVsLCBwcmV2RWxdID0gdGhpcy5zZWwgPyBbdGhpcy5zZWwubmV4dFNpYmxpbmcsIHRoaXMuc2VsLnByZXZpb3VzU2libGluZ10gOiBbdGhpcy5zdWdnZXN0aW9uc0VsLmZpcnN0Q2hpbGQsIHRoaXMuc3VnZ2VzdGlvbnNFbC5sYXN0Q2hpbGRdO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGtleSA9PT0gNDAgPyBuZXh0RWwgOiBwcmV2RWw7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZWwgJiYgdGhpcy5zZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eVNlYXJjaGJhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9hdXRvQ29tcGxldGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==