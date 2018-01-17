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
                this.automCompleteView.emptyAutoComplete();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmI5ZGI4MDc3ZjMyNjJlMmI4YzQiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9jb21tb25WaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L2F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicXMiLCJxc2EiLCJvbiIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJpc1N0cmluZyIsImlzVXBkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwic2VsZWN0b3IiLCJzY29wZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwidHlwZSIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfZGVsZWdhdGUiLCJsaXN0ZW5lckZuIiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwiZSIsImRlbGVnYXRlVGFyZ2V0IiwidGFyZ2V0IiwiY2xvc2VzdCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2UiLCJvbnRpbWVvdXQiLCJzZW5kIiwiZnVuYyIsImxpbWl0Iiwid2FpdCIsInNldFRpbWVvdXQiLCJlYXNlSW5PdXRRdWFkIiwidCIsImIiLCJjIiwiZCIsImVhc2VJblF1YWQiLCJrZXkiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidmFsdWUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGF0YSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwibmFtZSIsInVuaXF1ZSIsIm1hdGNoIiwic3JjIiwid2luZG93IiwiUmVzcG9uc2UiLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZSIsIm1haW4iLCJjb3Vyc2UiLCJjb21tb25WaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwiQ29udHJvbGxlciIsIm1vdmVTbGlkZXMiLCJjdXJyZW50U2xpZGUiLCJtb3ZlU2Nyb2xsZXIiLCJwcmVzc0F1dG9Db21wbGV0ZSIsInN1Ym1pdFNlYXJjaGVzIiwic2hvd1NlYXJjaGVzIiwiaW5maW5pdGVWaWV3cyIsImZvckVhY2giLCJpbmZpbml0ZVZpZXciLCJtb3ZlSW5maW5pdGVTbGlkZXMiLCJpbml0SW5maW5pdGVCYW5jaGFuIiwic3RhdGUiLCJjYWNoZSIsInRpbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImluaXRTbGlkZSIsImluaXRCZXN0QmFuY2hhbiIsInNsaWRlSW1ncyIsImNoZWNrTG9jYWxTdG9yYWdlIiwic2xpZGVzRW5kIiwibGVuZ3RoIiwic2hvd1NsaWRlIiwibiIsImhpZGVTbGlkZSIsImluZGV4IiwiZGlyZWN0aW9uIiwiY2xpZW50SGVpZ2h0IiwidGVybSIsImlzU2VsZXRlZCIsImVtcHR5QXV0b0NvbXBsZXRlIiwidGhlbiIsInN1Z2dlc3Rpb25zIiwicmVuZGVyIiwibW92ZUF1dG9Db21wbGV0ZSIsImVudGVyQXV0b0NvbXBsZXRlIiwia2V5d29yZCIsInNlYXJjaGVzIiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJjaGVjayIsInNsaWNlIiwicmV2ZXJzZSIsImJhbmNoYW4iLCJ0YXJnZXRWaWV3IiwiZm9vZERhdGEiLCJ0aHJlc2hvbGQiLCJyZXNldEluZmluaXRlU2xpZGVzIiwibW92ZSIsInNob3dTbGlkZXMiLCJlbCIsInRocmVzaG9sZExlZnQiLCJ0aHJlc2hvbGRSaWdodCIsIlZpZXciLCJmb29kVGFiRWwiLCJzbGlkZXNQcmV2RWwiLCJzbGlkZXNOZXh0RWwiLCJzbGlkZXNFbCIsImRvdHNFbCIsImJpbmRDbWQiLCJoYW5kbGVyIiwiYmluZENvbW1hbmRzIiwic2xpZGVzUHJldiIsInNsaWRlc05leHQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJzY3JvbGxlciIsImRhdGFzZXQiLCJmb29kVGFiIiwiZnJvbSIsImZvb2RUYWJMaXN0RWwiLCJ0YWIiLCJjbGFzc05hbWUiLCJmb29kQm94TGlzdEVsIiwiZm9vZCIsInN0eWxlIiwiZGlzcGxheSIsImNhdGVnb3J5X2lkIiwicHJldmVudERlZmF1bHQiLCJ2aWV3Q21kIiwicGFyYW1zIiwidmlld0NvbW1hbmRzIiwicmVuZGVyRm9vZFRhYiIsInJlbmRlckZvb2RDb250YWluZXIiLCJyZW5kZXJGb29kQm94TGlzdCIsInJlbmRlckZvb2RCb3giLCJyZW5kZXJGb29kVGFiTGlzdCIsImZsb29yIiwicmFuZG9tIiwiam9pbiIsImluc2VydEFkamFjZW50SFRNTCIsImZvb2RDb250YWluZXIiLCJpIiwiZm9vZEJveExpc3QiLCJpdGVtcyIsImltYWdlIiwiaXRlbSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJjdXJyZW50SW5kZXgiLCJjbGFzc0xpc3QiLCJzbGlkZUluZGV4Iiwic2xpZGVJbWciLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnIiwiRnVuY3Rpb24iLCJldmFsIiwiSW5maW5pdGVWaWV3Iiwic2xpZGVzIiwicmVuZGVyQmFuY2hhbiIsInJlbmRlclNsaWRlcyIsInByZEJveCIsIlNsaWRlcyIsImxhc3RTbGlkZXMiLCJTbGlkZSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsImxhc3RTbGlkZSIsImNoaWxkTm9kZXMiLCJJbW1lZGlhdGVseSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsIkF1dG9Db21wbGV0ZVZpZXciLCJzZWFyY2hFbCIsInN1Z2dlc3Rpb25zRWwiLCJzZWFyY2hCdXR0b25FbCIsInByZXNzIiwia2V5Q29kZSIsInNlbCIsInN1Ym1pdCIsImlubmVySFRNTCIsImNsaWNrIiwidXBkYXRlQXV0b0NvbXBsZXRlIiwibm9uQ2xpY2siLCJob3ZlciIsImF1dG9Db21wbGV0ZSIsInJlbmRlckF1dG9Db21wbGV0ZSIsInJlbmRlclNlYXJjaGVzIiwiUmVnRXhwIiwic3VnZ2VzdGlvbnNTdHIiLCJzdWdnZXN0aW9uIiwicmVuZGVyS2V5d29yZCIsInJlcGxhY2UiLCJzZWFyY2hlc1N0ciIsImNsYXNzIiwic2VhcmNoIiwibmV4dFNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwibmV4dEVsIiwicHJldkVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQVk7QUFDUCxPQUNIO0FBQUcsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9BQ0g7QUFBRyxPQUNIO0FBUEE7O0FBU0Ys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QixVQUFwQixFQUFnQyxLQUFLeEIsYUFBTCxDQUFtQnlCLFNBQW5ELENBRnJFO0FBQUE7QUFBQSxnQkFFWEMsTUFGVztBQUFBLGdCQUVIQyxNQUZHOztBQUdsQixnQkFBTWxQLFNBQVMwQixRQUFRLEVBQVIsR0FBYXVOLE1BQWIsR0FBc0JDLE1BQXJDO0FBQ0EsaUJBQUtuQixrQkFBTCxDQUF3Qi9OLE1BQXhCO0FBQ0g7OzsyQ0FFa0JBLE0sRUFBUTtBQUN2QixpQkFBSzJOLEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVM1QixTQUFULENBQW1CbEksTUFBbkIsQ0FBMEIsVUFBMUIsQ0FBWjtBQUNBLGlCQUFLOEosR0FBTCxHQUFXM04sTUFBWDtBQUNBLGlCQUFLMk4sR0FBTCxDQUFTNUIsU0FBVCxDQUFtQjNFLEdBQW5CLENBQXVCLFVBQXZCO0FBQ0g7Ozs0Q0FFbUI7QUFDaEIsaUJBQUttRyxhQUFMLENBQW1CTSxTQUFuQixHQUErQixFQUEvQjtBQUNIOzs7eUNBRWdCO0FBQ2IsaUJBQUtQLFFBQUwsQ0FBY3pMLEtBQWQsR0FBc0IsRUFBdEI7QUFDSDs7Ozs7O2tCQWhHZ0J3TCxnQjs7Ozs7O0FDTnJCO0FBQ0EseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDhLQUE4Syx3QkFBd0IsYUFBYTtBQUNuTjtBQUNBLDRLQUE0SywwQkFBMEIsYUFBYTtBQUNuTjtBQUNBLDRMQUE0TCxnQ0FBZ0MsYUFBYTtBQUN6TztBQUNBLENBQUMsZ0JBQWdCLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmI5ZGI4MDc3ZjMyNjJlMmI4YzQiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIi8qKlxyXG4gKiBxdWVyeVNlbGVjdG9yIHdyYXBwZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIFNlbGVjdG9yIHRvIHF1ZXJ5XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gW3Njb3BlXSBPcHRpb25hbCBzY29wZSBlbGVtZW50IGZvciB0aGUgc2VsZWN0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxcyhzZWxlY3Rvciwgc2NvcGUpIHtcclxuICAgIHJldHVybiAoc2NvcGUgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBxc2Eoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gKHNjb3BlIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd3JhcHBlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8V2luZG93fSBlbGVtZW50IFRhcmdldCBFbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IG5hbWUgdG8gYmluZCB0b1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBFdmVudCBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgQ2FwdHVyZSB0aGUgZXZlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhrZXkpIHtcclxuICAgIHJldHVybiAoIWtleSB8fCAoa2V5IDwgMzUgfHwga2V5ID4gNDApICYmIGtleSAhPT0gMTMgJiYga2V5ICE9PSAyNyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VwZG93bihrZXkpIHtcclxuICAgIC8vIGRvd24gKDQwKSwgdXAgKDM4KVxyXG4gICAgcmV0dXJuIChrZXkgPT09IDQwIHx8IGtleSA9PT0gMzgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFU0Moa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAyNztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50ZXIoa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5ID09PSAxMztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoSlNPTlAgPSAodW5pcXVlID0+IHVybCA9PlxyXG4gICAgbmV3IFByb21pc2UocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBgX2pzb25wXyR7dW5pcXVlKyt9YDtcclxuXHJcbiAgICAgICAgdXJsICs9IHVybC5tYXRjaCgvXFw/LykgPyBgJmNhbGxiYWNrPSR7bmFtZX1gIDogYD9jYWxsYmFjaz0ke25hbWV9YDtcclxuXHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgICAgICB3aW5kb3dbbmFtZV0gPSBqc29uID0+IHtcclxuICAgICAgICAgICAgcmVzcG9uc2UobmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKSk7XHJcbiAgICAgICAgICAgIHNjcmlwdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHdpbmRvd1tuYW1lXTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9KVxyXG4pKDApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMuanMiLCJcbmNvbnN0IGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICBsZXQgbG9jID0gbm9kZSAmJiBub2RlLmxvYyxcbiAgICAgIGxpbmUsXG4gICAgICBjb2x1bW47XG4gIGlmIChsb2MpIHtcbiAgICBsaW5lID0gbG9jLnN0YXJ0LmxpbmU7XG4gICAgY29sdW1uID0gbG9jLnN0YXJ0LmNvbHVtbjtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgY29sdW1uO1xuICB9XG5cbiAgbGV0IHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEV4Y2VwdGlvbik7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChsb2MpIHtcbiAgICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG5cbiAgICAgIC8vIFdvcmsgYXJvdW5kIGlzc3VlIHVuZGVyIHNhZmFyaSB3aGVyZSB3ZSBjYW4ndCBkaXJlY3RseSBzZXQgdGhlIGNvbHVtbiB2YWx1ZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2x1bW4nLCB7XG4gICAgICAgICAgdmFsdWU6IGNvbHVtbixcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChub3ApIHtcbiAgICAvKiBJZ25vcmUgaWYgdGhlIGJyb3dzZXIgaXMgdmVyeSBwYXJ0aWN1bGFyICovXG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZXhjZXB0aW9uLmpzIiwiaW1wb3J0IHtjcmVhdGVGcmFtZSwgZXh0ZW5kLCB0b1N0cmluZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0SGVscGVyc30gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9yc30gZnJvbSAnLi9kZWNvcmF0b3JzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9ICc0LjAuMTEnO1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1JFVklTSU9OID0gNztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuICA3OiAnPj0gNC4wLjAnXG59O1xuXG5jb25zdCBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nZ2VyLmxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgZXh0ZW5kKHRoaXMucGFydGlhbHMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIiR7bmFtZX1cIiBhcyB1bmRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuZGVjb3JhdG9yc1tuYW1lXTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBsb2cgPSBsb2dnZXIubG9nO1xuXG5leHBvcnQge2NyZWF0ZUZyYW1lLCBsb2dnZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgPGRpdiBjbGFzcz0nYmFkZ2UnPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJiYWRnZV9saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5iYWRnZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgPHNwYW4+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICA8L2xpPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nZm9vZF9pbWdfaG92ZXInPlxcclxcbiAgICA8dWw+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVsaXZlcnlfdHlwZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgPC91bD5cXHJcXG48L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbmltcG9ydCB7XHJcbiAgICBvblxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBDb21tb25WaWV3IGZyb20gJy4vdmlldy9jb21tb25WaWV3JztcclxuaW1wb3J0IEluZmluaXRlU2xpZGVWaWV3IGZyb20gJy4vdmlldy9pbmZpbml0ZVNsaWRlVmlldyc7XHJcbmltcG9ydCBBdXRvbUNvbXBsZXRlVmlldyBmcm9tICcuL3ZpZXcvYXV0b0NvbXBsZXRlVmlldyc7XHJcblxyXG5jb25zdCB1cmxMaXN0ID0ge1xyXG4gICAgbWFpblNsaWRlOiAnaHR0cDovLzUyLjc5LjE0OC43NDozMDAwL21haW5TbGlkZScsXHJcbiAgICBiZXN0QmFuY2hhbjogJ2h0dHA6Ly81Mi43OS4xNDguNzQ6MzAwMC9iZXN0JyxcclxuICAgIHNpZGU6ICdodHRwOi8vNTIuNzkuMTQ4Ljc0OjMwMDAvc2lkZScsXHJcbiAgICBtYWluOiAnaHR0cDovLzUyLjc5LjE0OC43NDozMDAwL21haW4nLFxyXG4gICAgY291cnNlOiAnaHR0cDovLzUyLjc5LjE0OC43NDozMDAwL3NvdXAnXHJcbn07XHJcblxyXG5jb25zdCBjb21tb25WaWV3ID0gbmV3IENvbW1vblZpZXcoKTtcclxuY29uc3Qgc2lkZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCdzaWRlJyk7XHJcbmNvbnN0IG1haW5CYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnbWFpbicpO1xyXG5jb25zdCBjb3Vyc2VCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnY291cnNlJyk7XHJcbmNvbnN0IGF1dG9tQ29tcGxldGVWaWV3ID0gbmV3IEF1dG9tQ29tcGxldGVWaWV3KCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtDb250cm9sbGVyfVxyXG4gKi9cclxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHVybExpc3QsIGNvbW1vblZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCBzaWRlQmFuY2hhblZpZXcsIG1haW5CYW5jaGFuVmlldywgY291cnNlQmFuY2hhblZpZXcpO1xyXG5cclxuY29uc3Qgc2V0VmlldyA9ICgpID0+IGNvbnRyb2xsZXIuc2V0VmlldygpO1xyXG5vbih3aW5kb3csICdsb2FkJywgc2V0Vmlldyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiaW1wb3J0IHtcclxuICAgIHJlcXVlc3QsXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBpc1ZhbGlkLFxyXG4gICAgbW92ZVNjcm9sbCxcclxuICAgIGlzU3RyaW5nLFxyXG4gICAgaXNVcGRvd24sXHJcbiAgICBpc0VTQyxcclxuICAgIGlzRW50ZXIsXHJcbiAgICBmZXRjaEpTT05QXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IodXJsTGlzdCwgY29tbW9uVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIC4uLmluZmluaXRlVmlld3MpIHtcclxuICAgICAgICB0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldyA9IGNvbW1vblZpZXc7XHJcbiAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldyA9IGF1dG9tQ29tcGxldGVWaWV3O1xyXG5cclxuICAgICAgICBjb21tb25WaWV3LmJpbmQoJ3NsaWRlc1ByZXYnLCB0aGlzLm1vdmVTbGlkZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgY29tbW9uVmlldy5iaW5kKCdzbGlkZXNOZXh0JywgdGhpcy5tb3ZlU2xpZGVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGNvbW1vblZpZXcuYmluZCgnc2xpZGVzRG90cycsIHRoaXMuY3VycmVudFNsaWRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGNvbW1vblZpZXcuYmluZCgnc2Nyb2xsZXInLCB0aGlzLm1vdmVTY3JvbGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgncHJlc3MnLCB0aGlzLnByZXNzQXV0b0NvbXBsZXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0U2VhcmNoZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnc2VhcmNoZXMnLCB0aGlzLnNob3dTZWFyY2hlcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICBhdXRvbUNvbXBsZXRlVmlldy5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgIGF1dG9tQ29tcGxldGVWaWV3LmJpbmQoJ25vbkNsaWNrJyk7XHJcbiAgICAgICAgYXV0b21Db21wbGV0ZVZpZXcuYmluZCgnaG92ZXInKTtcclxuXHJcblxyXG4gICAgICAgIGluZmluaXRlVmlld3MuZm9yRWFjaChpbmZpbml0ZVZpZXcgPT4ge1xyXG4gICAgICAgICAgICBpbmZpbml0ZVZpZXcuYmluZCgnc2xpZGVzUHJldicsIHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmJpbmQoaW5maW5pdGVWaWV3KSk7XHJcbiAgICAgICAgICAgIGluZmluaXRlVmlldy5iaW5kKCdzbGlkZXNOZXh0JywgdGhpcy5tb3ZlSW5maW5pdGVTbGlkZXMuYmluZChpbmZpbml0ZVZpZXcpKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0SW5maW5pdGVCYW5jaGFuKGluZmluaXRlVmlldywgdGhpcy51cmxMaXN0W2luZmluaXRlVmlldy5zdGF0ZS5uYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBnZXRMb2NhbFN0b3JhZ2Uoa2V5KTtcclxuICAgICAgICBpZiAoY2FjaGUgJiYgaXNWYWxpZChjYWNoZS50aW1lLCA2KSkgcmV0dXJuIGNhY2hlLmRhdGE7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IGF3YWl0IHJlcXVlc3Qoa2V5KSxcclxuICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGEuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgPyBmYWxzZSA6IHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFNsaWRlKHRoaXMudXJsTGlzdC5tYWluU2xpZGUpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJlc3RCYW5jaGFuKHRoaXMudXJsTGlzdC5iZXN0QmFuY2hhbik7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LmJpbmQoJ3ByZXZlbnREZWZhdWx0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdFNsaWRlKHVybCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVJbWdzID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRW5kID0gdGhpcy5zbGlkZUltZ3MubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcuc2hvd1NsaWRlKDAsIHRoaXMuc2xpZGVJbWdzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2xpZGVzKHRhcmdldCwgbikge1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5oaWRlU2xpZGUodGFyZ2V0LmluZGV4KTtcclxuICAgICAgICB0YXJnZXQuaW5kZXggKz0gbjtcclxuICAgICAgICBpZiAodGFyZ2V0LmluZGV4ID4gdGhpcy5zbGlkZXNFbmQpIHRhcmdldC5pbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHRhcmdldC5pbmRleCA8IDApIHRhcmdldC5pbmRleCA9IHRoaXMuc2xpZGVzRW5kO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5zaG93U2xpZGUodGFyZ2V0LmluZGV4LCB0aGlzLnNsaWRlSW1nc1t0YXJnZXQuaW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50U2xpZGUodGFyZ2V0LCBuKSB7XHJcbiAgICAgICAgdGhpcy5jb21tb25WaWV3LmhpZGVTbGlkZSh0YXJnZXQuaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5zaG93U2xpZGUodGFyZ2V0LmluZGV4ID0gbiwgdGhpcy5zbGlkZUltZ3NbdGFyZ2V0LmluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNjcm9sbGVyKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gJ3VwJyA/IG1vdmVTY3JvbGwoMCkgOiBtb3ZlU2Nyb2xsKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwcmVzc0F1dG9Db21wbGV0ZSh0ZXJtLCBrZXksIGlzU2VsZXRlZCkge1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhrZXkpKSB7XHJcbiAgICAgICAgICAgICF0ZXJtICYmIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgZmV0Y2hKU09OUChgaHR0cHM6Ly9rby53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249b3BlbnNlYXJjaCZzZWFyY2g9JHt0ZXJtfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc3VnZ2VzdGlvbnMpID0+IHRoaXMuYXV0b21Db21wbGV0ZVZpZXcucmVuZGVyKCdhdXRvQ29tcGxldGUnLCB0ZXJtLCBzdWdnZXN0aW9uc1sxXSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNVcGRvd24oa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9tQ29tcGxldGVWaWV3Lm1vdmVBdXRvQ29tcGxldGUoa2V5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRVNDKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFbnRlcihrZXkpKSB7XHJcbiAgICAgICAgICAgIGlzU2VsZXRlZCA/IHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW50ZXJBdXRvQ29tcGxldGUoKSA6IHRoaXMuc3VibWl0U2VhcmNoZXModGVybSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdFNlYXJjaGVzKGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hlcyA9IG5ldyBTZXQoZ2V0TG9jYWxTdG9yYWdlKCdzZWFyY2hlcycpKTtcclxuICAgICAgICAgICAgc2VhcmNoZXMuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ3NlYXJjaGVzJywgWy4uLnNlYXJjaGVzXSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvbUNvbXBsZXRlVmlldy5lbXB0eVNlYXJjaGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaG93U2VhcmNoZXMoY2hlY2spIHtcclxuICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoZXMgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ3NlYXJjaGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b21Db21wbGV0ZVZpZXcucmVuZGVyKCdzZWFyY2hlcycsIHNlYXJjaGVzLnNsaWNlKC01KS5yZXZlcnNlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0QmVzdEJhbmNoYW4odXJsKSB7XHJcbiAgICAgICAgY29uc3QgYmFuY2hhbiA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLmNvbW1vblZpZXcucmVuZGVyKCdiZXN0QmFuY2hhbicsIGJhbmNoYW4pO1xyXG4gICAgICAgIHRoaXMuY29tbW9uVmlldy5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdEluZmluaXRlQmFuY2hhbih0YXJnZXRWaWV3LCB1cmwpIHtcclxuICAgICAgICBjb25zdCBmb29kRGF0YSA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0YXJnZXRWaWV3LnJlbmRlcignYmFuY2hhbicsIGZvb2REYXRhKTtcclxuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBmb29kRGF0YS5sZW5ndGggKiAyLjU7XHJcbiAgICAgICAgdGFyZ2V0Vmlldy5iaW5kKCdzbGlkZXMnLCB0aGlzLnJlc2V0SW5maW5pdGVTbGlkZXMuYmluZCh0YXJnZXRWaWV3LCAtMjAgLSB0aHJlc2hvbGQsIC0yMCArIHRocmVzaG9sZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVJbmZpbml0ZVNsaWRlcyh0YXJnZXQsIG1vdmUpIHtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXModGFyZ2V0LmVsLCB0YXJnZXQuZGlyZWN0aW9uICs9IG1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0SW5maW5pdGVTbGlkZXModGhyZXNob2xkTGVmdCwgdGhyZXNob2xkUmlnaHQsIHRhcmdldCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQuZGlyZWN0aW9uID09PSB0aHJlc2hvbGRMZWZ0IHx8IHRhcmdldC5kaXJlY3Rpb24gPT09IHRocmVzaG9sZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1NsaWRlcyh0YXJnZXQuZWwsIHRhcmdldC5kaXJlY3Rpb24gPSAtMjAsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb250cm9sbGVyLmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBxcyxcclxuICAgIHFzYSxcclxuICAgIG9uLFxyXG4gICAgdGhyb3R0bGUsXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbCA9IHFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKCcuc2xpZGVzX3ByZXYnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHFzKCcuc2xpZGVzX25leHQnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsID0gcXNhKCcubWFpbl9zbGlkZXNfbGlzdCA+IGxpJyk7XHJcbiAgICAgICAgdGhpcy5kb3RzRWwgPSBxc2EoJy5zbGlkZXNfZG90cyA+IGxpID4gYScpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNQcmV2OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNsaWRlc1ByZXZFbCwgJ2NsaWNrJywgdGhyb3R0bGUoKCkgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCAtMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5zbGlkZXNfZG90cycsICcuc2xpZGVzX2RvdHMgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcih0aGlzLnN0YXRlLCArZS5kZWxlZ2F0ZVRhcmdldC50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJy5wYWdlX3VwX2Rvd25fbGlzdCcsICcucGFnZV91cF9kb3duX2xpc3QgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gaGFuZGxlcihlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuZm9vZFRhYkVsLCAnbGkgPiBhJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RUYWJMaXN0RWwpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIgPT09IGUuZGVsZWdhdGVUYXJnZXQgPyAnbm93JyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZEJveExpc3RFbCkuZm9yRWFjaChmb29kID0+IGZvb2Quc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5jYXRlZ29yeV9pZCA9PT0gZm9vZC5kYXRhc2V0LmNhdGVnb3J5X2lkID8gJ2Jsb2NrJyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKCdib2R5JywgJ2EnLCAnY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiZXN0QmFuY2hhbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0QmFuY2hhbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVzdEJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZFRhYihmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RDb250YWluZXIoZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdChmb29kKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RCb3goZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiTGlzdChmb29kLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZFRhYiA9IGZvb2QubWFwKHZhbHVlID0+IGZvb2RUYWJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZCxcclxuICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZVxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQ29udGFpbmVyKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQ29udGFpbmVyID0gZm9vZC5tYXAodmFsdWUgPT4gY29udGFpbmVyVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWRcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgcXMoJy5iZXN0X2Zvb2RfY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZENvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZm9vZCkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbCA9IHFzYSgnLmJlc3RfZm9vZF9ib3hfbGlzdCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSB2YWx1ZS5pdGVtcy5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgZm9vZEJveFRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2ldLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94RWwgPSBxc2EoJy5iZXN0X2Zvb2RfYm94Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSB2YWx1ZS5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhbHVlLml0ZW1zLmZvckVhY2goKGl0ZW0sIGopID0+IHtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYkxpc3QoZm9vZCwgaW5pdE51bSkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbCA9IHFzYSgnLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsW2luaXROdW1dLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpbml0TnVtXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlU2xpZGUoY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtjdXJyZW50SW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlb3V0JztcclxuICAgICAgICB0aGlzLmRvdHNFbFtjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vdycpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZShzbGlkZUluZGV4LCBzbGlkZUltZykge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbc2xpZGVJbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVpbic7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFtzbGlkZUluZGV4XS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtzbGlkZUltZ31cIilgO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3NsaWRlSW5kZXhdLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvY29tbW9uVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfd3JhcFxcXCI+XFxyXFxuICAgIDxsaSBjbGFzcz1cXFwiYmVzdF9mb29kX2JveFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb29kX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcImZvb2RfZGV0YWlsXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcImZvb2RfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwiZm9vZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9saT5cXHJcXG48L2E+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaT5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlcjtcblxuICByZXR1cm4gXCI8dWwgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfbGlzdFxcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L3VsPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQgYmFkZ2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCc7XHJcbmltcG9ydCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgcXMsXHJcbiAgICBxc2EsXHJcbiAgICBvbixcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZpbml0ZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLmluZmluaXRlX2Zvb2RfYm94X2xpc3RgKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHFzKGAuJHtuYW1lfV9mb29kIC5zbGlkZXNfcHJldmApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gcXMoYC4ke25hbWV9X2Zvb2QgLnNsaWRlc19uZXh0YCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGVsOiB0aGlzLmZvb2RCb3hFbCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAtMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgc2xpZGVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLmZvb2RCb3hFbCwgJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiBoYW5kbGVyKHRoaXMuc3RhdGUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzUHJldjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNQcmV2RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgMTApLCA2MDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb24odGhpcy5zbGlkZXNOZXh0RWwsICdjbGljaycsIHRocm90dGxlKCgpID0+IGhhbmRsZXIodGhpcy5zdGF0ZSwgLTEwKSwgNjAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgcGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJhbmNoYW4ocGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QodGhpcy5zdGF0ZS5lbCwgZm9vZCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94KGZvb2QsIHFzYShgLiR7dGhpcy5zdGF0ZS5uYW1lfV9mb29kIC5wcmRfYm94PmFgKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJTbGlkZXModGhpcy5zdGF0ZS5lbCwgcXNhKGAuJHt0aGlzLnN0YXRlLm5hbWV9X2Zvb2QgLnByZF9ib3hgKSk7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGVzKHRoaXMuc3RhdGUuZWwsIHRoaXMuc3RhdGUuZGlyZWN0aW9uLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChlbGVtZW50LCBmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSBmb29kLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgIGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kLCBwcmRCb3gpIHtcclxuICAgICAgICBmb29kLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2xpZGVzKGVsZW1lbnQsIFNsaWRlcykge1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZXMgPSBBcnJheS5mcm9tKFNsaWRlcykuc2xpY2UoLTQpO1xyXG5cclxuICAgICAgICBTbGlkZXMuZm9yRWFjaChTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKFNsaWRlLmNsb25lTm9kZSh0cnVlKSkpO1xyXG4gICAgICAgIGxhc3RTbGlkZXMucmV2ZXJzZSgpLmZvckVhY2gobGFzdFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGxhc3RTbGlkZS5jbG9uZU5vZGUodHJ1ZSksIGVsZW1lbnQuY2hpbGROb2Rlc1swXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZXMoZWxlbWVudCwgZGlyZWN0aW9uLCBJbW1lZGlhdGVseSkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gSW1tZWRpYXRlbHkgPyAnMHMnIDogJzAuNXMnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtkaXJlY3Rpb259JSlgO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9pbmZpbml0ZVNsaWRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXV0b2NvbXBsZXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHFzLFxyXG4gICAgb24sXHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvQ29tcGxldGVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwgPSBxcygnI3NlYXJjaF9zdHInKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwgPSBxcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucycpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQnV0dG9uRWwgPSBxcygnLnNlYXJjaF9idG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHByZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEVsLCAna2V5dXAnLCBlID0+IGhhbmRsZXIoZS50YXJnZXQudmFsdWUsIGUua2V5Q29kZSwgdGhpcy5zZWwpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnNlYXJjaEJ1dHRvbkVsLCAnY2xpY2snLCAoKSA9PiBoYW5kbGVyKHRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VhcmNoZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uKHRoaXMuc2VhcmNoRWwsICdjbGljaycsICgpID0+IGhhbmRsZXIoIXRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgJiYgIXRoaXMuc2VhcmNoRWwudmFsdWUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnKicsICdjbGljaycsIGUgPT4gZS50YXJnZXQgIT09IHRoaXMuc2VhcmNoRWwgJiYgdGhpcy5lbXB0eUF1dG9Db21wbGV0ZSgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaG92ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlKHRoaXMuc3VnZ2VzdGlvbnNFbCwgJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW92ZXInLCBlID0+IHRoaXMudXBkYXRlQXV0b0NvbXBsZXRlKGUuZGVsZWdhdGVUYXJnZXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGF1dG9Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBdXRvQ29tcGxldGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VhcmNoZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoZXMoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckF1dG9Db21wbGV0ZSh0ZXJtLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgUmVnRXhwKHRlcm0sICdpZycpO1xyXG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zU3RyID0gc3VnZ2VzdGlvbnMubWFwKHN1Z2dlc3Rpb24gPT5cclxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc3VnZ2VzdGlvbixcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHN1Z2dlc3Rpb24ucmVwbGFjZSh0YXJnZXQsIGA8Yj4ke3Rlcm19PC9iPmApXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgc3VnZ2VzdGlvbnNTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNlYXJjaGVzKHNlYXJjaGVzKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoZXNTdHIgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoZXMnLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc2VhcmNoXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgc2VhcmNoZXNTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVudGVyQXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbCAmJiB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSB0aGlzLnNlbC5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUF1dG9Db21wbGV0ZShrZXkpIHtcclxuICAgICAgICB0aGlzLnNlbCA9IHFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VsZWN0ZWQnKTtcclxuICAgICAgICBjb25zdCBbbmV4dEVsLCBwcmV2RWxdID0gdGhpcy5zZWwgPyBbdGhpcy5zZWwubmV4dFNpYmxpbmcsIHRoaXMuc2VsLnByZXZpb3VzU2libGluZ10gOiBbdGhpcy5zdWdnZXN0aW9uc0VsLmZpcnN0Q2hpbGQsIHRoaXMuc3VnZ2VzdGlvbnNFbC5sYXN0Q2hpbGRdO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGtleSA9PT0gNDAgPyBuZXh0RWwgOiBwcmV2RWw7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBdXRvQ29tcGxldGUodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZWwgJiYgdGhpcy5zZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eVNlYXJjaGJhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9hdXRvQ29tcGxldGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==