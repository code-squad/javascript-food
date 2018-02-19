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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
module.exports = __webpack_require__(17)['default'];

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(el) {
        _classCallCheck(this, _class);

        if (!el) throw el;
        this.name = el.slice(1);
        this.el = document.querySelector(el);
    }

    _createClass(_class, [{
        key: 'qs',
        value: function qs(selector) {
            return this.el.querySelector(selector);
        }
    }, {
        key: 'qsa',
        value: function qsa(selector) {
            return this.el.querySelectorAll(selector);
        }
    }, {
        key: 'on',
        value: function on(event, handler, useCapture) {
            this.el.addEventListener(event, handler, useCapture);
            return this;
        }
    }, {
        key: 'delegate',
        value: function delegate(selector, type, callback, useCapture) {
            var _this = this;

            var listenerFn = function listenerFn(e) {
                e.delegateTarget = e.target.closest(selector);
                e.delegateTarget && callback.call(_this.el, e);
            };
            this.on(type, listenerFn, useCapture);
            return this;
        }
    }, {
        key: 'emit',
        value: function emit(event, data) {
            var evt = new CustomEvent(event, {
                detail: data
            });
            this.el.dispatchEvent(evt);
            return this;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.el.style.display = 'none';
            return this;
        }
    }, {
        key: 'show',
        value: function show() {
            this.el.style.display = 'block';
            return this;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delegate = delegate;
exports.request = request;
exports.throttle = throttle;
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
exports.isValid = isValid;
exports.moveScroll = moveScroll;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(18);

var _decorators = __webpack_require__(26);

var _logger = __webpack_require__(28);

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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _controller = __webpack_require__(14);

var _controller2 = _interopRequireDefault(_controller);

var _MainSlideView = __webpack_require__(15);

var _MainSlideView2 = _interopRequireDefault(_MainSlideView);

var _BestBanchanView = __webpack_require__(33);

var _BestBanchanView2 = _interopRequireDefault(_BestBanchanView);

var _ScrollerView = __webpack_require__(37);

var _ScrollerView2 = _interopRequireDefault(_ScrollerView);

var _InfiniteSlideView = __webpack_require__(38);

var _InfiniteSlideView2 = _interopRequireDefault(_InfiniteSlideView);

var _AutoCompleteView = __webpack_require__(40);

var _AutoCompleteView2 = _interopRequireDefault(_AutoCompleteView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    side_food: 'http://crong.codesquad.kr:8080/woowa/side',
    main_food: 'http://crong.codesquad.kr:8080/woowa/main',
    course_food: 'http://crong.codesquad.kr:8080/woowa/soup',
    autoComplete: 'https://ko.wikipedia.org/w/api.php?action=opensearch&search='
};

var mainSlideView = new _MainSlideView2.default('.main_slide');
var bestBanchanView = new _BestBanchanView2.default('.best_food');
var scrollerView = new _ScrollerView2.default('.scroller');
var sideBanchanView = new _InfiniteSlideView2.default('.side_food');
var mainBanchanView = new _InfiniteSlideView2.default('.main_food');
var courseBanchanView = new _InfiniteSlideView2.default('.course_food');
var automCompleteView = new _AutoCompleteView2.default('.searchbar');

/**
 * @type {Controller}
 */
var controller = new _controller2.default(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

var setView = function setView() {
    return controller.setView();
};
window.addEventListener('load', setView);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/earlyaccess/nanumgothic.css);", ""]);

// module
exports.push([module.i, "/* reset styles */\n*,\n*:after,\n*:before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nhtml,\nbody {\n  font-family: 'Nanum Gothic';\n  font-size: 12px; }\n\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n  background: transparent; }\n\ndt {\n  font-weight: bold; }\n\nol,\nul,\ndl {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\n.best_food_box > .badge_list, .prd_box > a > .badge_list {\n  height: 24px;\n  display: flex; }\n  .best_food_box > .badge_list > .badge, .prd_box > a > .badge_list > .badge {\n    padding: 4px 2px 5px;\n    margin-right: 3px;\n    color: #fff;\n    background: #a974bf;\n    width: 62px; }\n\n.best_food_box > .food_detail > .food_price, .prd_detail > .prd_price {\n  display: flex;\n  align-items: center; }\n  .best_food_box > .food_detail > .food_price > .old_price, .prd_detail > .prd_price > .old_price {\n    text-decoration: line-through;\n    font-size: 14px;\n    color: #888; }\n  .best_food_box > .food_detail > .food_price > .new_price, .prd_detail > .prd_price > .new_price {\n    font-family: 'Montserrat', sans-serif;\n    letter-spacing: -2px;\n    margin-left: 9px;\n    color: #2ac1bc;\n    font-size: 26px;\n    font-weight: bold;\n    vertical-align: middle; }\n    .best_food_box > .food_detail > .food_price > .new_price > .won, .prd_detail > .prd_price > .new_price > .won {\n      margin-left: -6px;\n      font-size: 15px;\n      font-weight: bold;\n      top: -3px; }\n\n.best_food_box:hover .food_img_hover,\n.best_food_box:focus .food_img_hover, .prd_box:hover .food_img_hover,\n.prd_box:focus .food_img_hover {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6); }\n\n.lnb_wrap {\n  position: relative;\n  background: #fff;\n  border-bottom: 1px solid #e9e9e9; }\n  .lnb_wrap > .lnb_content {\n    display: flex;\n    justify-content: space-between;\n    background: #fff;\n    height: 36px;\n    letter-spacing: -0.2px;\n    width: 980px;\n    margin: 0 auto; }\n    .lnb_wrap > .lnb_content span.ic {\n      display: inline-block;\n      zoom: 1;\n      width: 7px;\n      height: 11px;\n      background: url(https://cdn.bmf.kr/web/common/bul_arr_down.png) no-repeat center 1px;\n      margin-left: 4px; }\n\n.link_app > a {\n  display: block;\n  font-size: 12px;\n  height: 100%;\n  padding: 10px 11px 9px;\n  text-align: center;\n  color: #666; }\n  .link_app > a:hover {\n    color: #2ac1bc; }\n\n.lnb_list {\n  display: flex; }\n  .lnb_list > li > a {\n    display: block;\n    font-size: 12px;\n    padding: 10px 10px 9px 10px;\n    color: #666;\n    background: url(https://cdn.bmf.kr/web/common/util_bar.gif) no-repeat 0 12px; }\n    .lnb_list > li > a:hover {\n      color: #2ac1bc; }\n  .lnb_list > li:first-child > a {\n    background: none; }\n  .lnb_list > li:last-child > a {\n    color: #333;\n    font-weight: bold; }\n\n.header_wrap {\n  display: flex;\n  height: 98px;\n  width: 980px;\n  margin: 0 auto; }\n  .header_wrap > .logo {\n    margin: 16px 0 0 5px; }\n\n.gnb_top {\n  display: flex;\n  margin: 0 5px 0 auto; }\n  .gnb_top > li > a {\n    display: block;\n    margin: 25px 0 25px 50px; }\n\n.navi_wrap {\n  position: relative;\n  z-index: 1;\n  background: #483f35; }\n  .navi_wrap > .navi_content {\n    width: 980px;\n    height: 52px;\n    margin: 0 auto; }\n\n.gnb {\n  display: flex; }\n  .gnb > li {\n    width: 124px;\n    height: 52px;\n    position: relative;\n    text-align: left; }\n    .gnb > li > a {\n      display: block;\n      padding: 5px 0 0 1px; }\n      .gnb > li > a > span {\n        display: inline-block;\n        color: white;\n        font-size: 16px;\n        height: 52px;\n        font-weight: bold;\n        padding: 11px 25px 0px; }\n    .gnb > li:first-child {\n      width: 100px; }\n    .gnb > li:nth-child(7) {\n      width: 120px; }\n    .gnb > li:nth-child(8) {\n      width: 140px;\n      background: #362d25;\n      text-align: center; }\n    .gnb > li:hover > a > span, .gnb > li:focus > a > span {\n      background: #fff;\n      color: #2ac1bc; }\n    .gnb > li:hover > ul, .gnb > li:focus > ul {\n      display: block; }\n\n.sub_list {\n  display: none;\n  width: 162px;\n  position: absolute;\n  left: 0;\n  top: 52px;\n  padding: 20px 0 31px;\n  background: #fff;\n  border: 1px solid rgba(72, 63, 53, 0.6);\n  border-top: 0; }\n  .sub_list a {\n    display: block;\n    color: #555;\n    font-size: 14px;\n    line-height: 20px;\n    padding: 6px 0 3px 25px;\n    text-align: left; }\n    .sub_list a:hover > span,\n    .sub_list a:focus > span {\n      font-size: 16px;\n      color: #2ac1bc;\n      font-weight: bold;\n      text-decoration: underline; }\n\n.searchbar {\n  position: relative;\n  margin: 30px 0 0 46px; }\n  .searchbar > input {\n    width: 210px;\n    height: 40px;\n    color: #888888;\n    border: 1px solid #cfd0d2;\n    padding: 0px 38px 0px 15px; }\n  .searchbar > button {\n    background: url(https://cdn.bmf.kr/web/common/ic_search.png) no-repeat center 0;\n    width: 38px;\n    height: 38px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    border: 0;\n    cursor: pointer; }\n    .searchbar > button:hover {\n      background-position: center 100%; }\n\n.autocomplete_suggestions {\n  width: 210px;\n  text-align: left;\n  cursor: pointer;\n  z-index: 9999;\n  background: #fff;\n  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);\n  display: block;\n  position: absolute;\n  overflow: hidden; }\n  .autocomplete_suggestions > .autocomplete_suggestion {\n    position: relative;\n    padding: 6px 0 3px 25px;\n    line-height: 23px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1.2em;\n    color: #333; }\n    .autocomplete_suggestions > .autocomplete_suggestion b {\n      font-weight: bold;\n      color: #fe1a1a; }\n    .autocomplete_suggestions > .autocomplete_suggestion.selected {\n      background: #f0f0f0bd; }\n    .autocomplete_suggestions > .autocomplete_suggestion.history {\n      color: #52188c; }\n\n.main_slide {\n  position: relative;\n  overflow: hidden;\n  text-align: center;\n  max-width: 1920px; }\n\n.main_slides_list {\n  position: relative;\n  height: 420px; }\n  .main_slides_list > li {\n    position: absolute;\n    width: 100%;\n    background: no-repeat center top; }\n    .main_slides_list > li > a {\n      display: block;\n      width: 980px;\n      height: 420px;\n      margin: 0 auto; }\n\n.slides_navi > a {\n  width: 60px;\n  height: 92px;\n  position: absolute;\n  top: 50%;\n  margin-top: -46px;\n  background: url(https://cdn.bmf.kr/web/common/main_slides_navi.png) no-repeat center center; }\n\n.slides_navi > .slides_prev {\n  right: 50%;\n  margin-right: 530px;\n  background-position: left center; }\n\n.slides_navi > .slides_next {\n  left: 50%;\n  margin-left: 530px;\n  background-position: right center; }\n\n.slides_dots {\n  position: relative;\n  bottom: 40px;\n  height: 0; }\n  .slides_dots > li {\n    display: inline-block;\n    vertical-align: top;\n    padding: 0 4px; }\n    .slides_dots > li > a {\n      display: block;\n      width: 10px;\n      height: 0;\n      padding-top: 10px;\n      overflow: hidden;\n      background: #FFF;\n      border-radius: 50%;\n      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n      opacity: 0.6; }\n      .slides_dots > li > a.now {\n        opacity: 1; }\n\n/* Fading animation */\n.fadein {\n  opacity: 1;\n  transition: opacity 2s; }\n\n.fadeout {\n  opacity: 0;\n  transition: opacity 2s; }\n\n.best_food {\n  background: #eee;\n  text-align: center; }\n  .best_food > .best_food_content {\n    width: 980px;\n    margin: 0 auto; }\n    .best_food > .best_food_content > .best_food_title {\n      padding: 40px 0 30px;\n      position: relative; }\n\n.best_food_tabs {\n  height: 48px; }\n  .best_food_tabs > li {\n    display: inline-block;\n    background-color: #fff;\n    height: 48px; }\n    .best_food_tabs > li > a {\n      display: block;\n      width: 159px;\n      padding-top: 17px;\n      font-weight: bold;\n      height: 100%;\n      font-size: 15px;\n      line-height: 1.2;\n      color: #777; }\n    .best_food_tabs > li:focus > a,\n    .best_food_tabs > li:hover > a,\n    .best_food_tabs > li > a.now {\n      background: #1fcbc7;\n      color: #fff; }\n\n.best_food_container {\n  padding-bottom: 45px; }\n  .best_food_container > .best_food_box_list {\n    display: none;\n    width: 960px;\n    margin-top: 25px;\n    margin-left: 10px; }\n    .best_food_container > .best_food_box_list > .best_food_box_wrap {\n      position: relative;\n      margin: 0 24px 10px 0;\n      color: #000;\n      background: #fff; }\n      .best_food_container > .best_food_box_list > .best_food_box_wrap:last-child {\n        margin: 0; }\n\n.food_img_hover {\n  display: none; }\n  .food_img_hover > ul {\n    position: relative;\n    top: 50%;\n    transform: translateY(-50%); }\n    .food_img_hover > ul > li {\n      margin: 0 15px 8px;\n      font-size: 20px;\n      color: #fff;\n      font-weight: bold;\n      text-align: center; }\n      .food_img_hover > ul > li > span {\n        display: inline-block;\n        padding: 13px 0 4px; }\n      .food_img_hover > ul > li:last-child > span {\n        background: url(https://cdn.bmf.kr/web/main/delivery_line.png) repeat-x 0 0; }\n\n.best_food_box {\n  width: 304px;\n  height: 429px; }\n  .best_food_box:hover .food_img_hover,\n  .best_food_box:focus .food_img_hover {\n    height: 304px; }\n  .best_food_box > .food_img > img {\n    max-width: 100%;\n    position: relative; }\n  .best_food_box > .badge_list {\n    position: absolute;\n    top: 273px;\n    justify-content: flex-start;\n    margin: 0 0 10px 10px; }\n  .best_food_box > .food_detail {\n    padding: 18px 20px 15px;\n    height: 90px;\n    text-align: left; }\n    .best_food_box > .food_detail > .food_title {\n      letter-spacing: -1.2px;\n      font-size: 17px;\n      margin-bottom: 6px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_description {\n      margin-bottom: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_price {\n      justify-content: flex-end; }\n\n.infinite_food {\n  text-align: center;\n  overflow: hidden;\n  position: relative; }\n  .infinite_food > .infinite_food_content {\n    width: 980px;\n    height: 670px;\n    margin: 0 auto;\n    overflow: hidden; }\n    .infinite_food > .infinite_food_content > .infinite_food_title {\n      margin: 70px 0 37px; }\n    .infinite_food > .infinite_food_content > .infinite_food_container {\n      height: 346px;\n      overflow: hidden; }\n      .infinite_food > .infinite_food_content > .infinite_food_container > .infinite_food_box_list {\n        width: 1000%;\n        display: flex;\n        justify-content: flex-start; }\n    .infinite_food > .infinite_food_content .infinite_btn {\n      display: block;\n      margin: 38px auto;\n      padding: 15px 0 17px;\n      width: 980px;\n      text-align: center;\n      font-size: 15px;\n      color: #333;\n      border: 1px solid #d7d7d7; }\n      .infinite_food > .infinite_food_content .infinite_btn > span {\n        padding-right: 14px;\n        background: url(https://cdn.bmf.kr/web/main/btn_arr_more.png) no-repeat right; }\n\n.infinite_food_slides_navi > a {\n  position: absolute;\n  top: 257px;\n  width: 28px;\n  height: 52px;\n  background: url(https://cdn.bmf.kr/web/common/btn_prds_thumb_slides_navi.png) no-repeat center center; }\n\n.infinite_food_slides_navi > .slides_prev {\n  left: 50%;\n  margin-left: -558px;\n  background-position: left top; }\n  .infinite_food_slides_navi > .slides_prev:hover, .infinite_food_slides_navi > .slides_prev:focus {\n    background-position: left -52px; }\n\n.infinite_food_slides_navi > .slides_next {\n  right: 50%;\n  margin-right: -558px;\n  background-position: right top; }\n  .infinite_food_slides_navi > .slides_next:hover, .infinite_food_slides_navi > .slides_next:focus {\n    background-position: right -52px; }\n\n.side_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/171214/1513243712683_1e0a6312599e.jpg); }\n  .side_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.main_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170628/1498639751272_e6cadbda65b4.jpg); }\n  .main_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.course_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170425/1493082744401_ba9831e4e2bb.png); }\n  .course_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.thumb_img {\n  position: relative;\n  height: 215px;\n  border-radius: 50%;\n  overflow: hidden; }\n  .thumb_img > p > img {\n    max-width: 100%; }\n  .thumb_img > .circle_mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: url(https://cdn.bmf.kr/web/common/circle_mask.png) no-repeat center center;\n    width: 215px;\n    height: 215px; }\n\n.prd_box {\n  position: relative;\n  width: 215px;\n  margin: 0px 15px 8px; }\n  .prd_box > a > .badge_list {\n    justify-content: center; }\n    .prd_box > a > .badge_list > .badge {\n      padding: 0; }\n\n.prd_detail {\n  padding: 18px 10px 12px 10px; }\n  .prd_detail > .prd_title {\n    color: #000;\n    letter-spacing: -1.2px;\n    font-size: 16px;\n    margin-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_description {\n    font-size: 13px;\n    letter-spacing: -1.2px;\n    margin-bottom: 5px;\n    color: #666;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_price {\n    justify-content: center; }\n\n.scroller {\n  display: none;\n  position: fixed;\n  bottom: 70px;\n  left: 79%; }\n  .scroller > li > a {\n    display: block;\n    width: 50px;\n    height: 50px;\n    background: url(https://cdn.bmf.kr/web/common/btn_page_up_down_new.png) no-repeat; }\n  .scroller > .page_up > a {\n    background-position: 0 top; }\n    .scroller > .page_up > a:hover, .scroller > .page_up > a:focus {\n      background-position: -50px top; }\n  .scroller > .page_down > a {\n    background-position: 0 -50px; }\n    .scroller > .page_down > a:hover, .scroller > .page_down > a:focus {\n      background-position: -50px -50px; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(4);

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
        key: 'setView',
        value: function setView() {
            var _this = this;

            this.fetchMainSlide(this.urlList.mainSlide);
            this.fetchBestBanchan(this.urlList.bestBanchan);

            this.infiniteViews.forEach(function (infiniteView) {
                return _this.fetchInfiniteSlide(infiniteView, _this.urlList[infiniteView.name]);
            });

            this.scrollerView.bind('click').bind('hide').on('@move', function (e) {
                return _this.moveScroller(e.detail.direction);
            });

            this.autoCompleteView.bind('press').bind('submit').bind('history').bind('clickSuggestion').bind('nonClick').bind('hover').on('@press', function (e) {
                return _this.pressAutoComplete(e.detail);
            }).on('@submit', function (e) {
                return _this.submitKeyword(e.detail.keyword);
            }).on('@history', function () {
                return _this.fetchHistory();
            });

            (0, _helpers.delegate)('body', 'a', 'click', function (e) {
                return e.preventDefault();
            });
        }
    }, {
        key: 'fetchMainSlide',
        value: async function fetchMainSlide(url) {
            var _this2 = this;

            this.slideImgs = await this.checkLocalStorage(url);
            this.mainSlideView.render('mainSlide', this.slideImgs).bind('slidesNavi').bind('slidesDots').on('@selectDot', function (e) {
                return _this2.selectSlide(e.detail.index);
            }).on('@move', function (e) {
                return _this2.moveSlide(e.detail);
            });
        }
    }, {
        key: 'moveSlide',
        value: function moveSlide(_ref) {
            var index = _ref.index,
                direction = _ref.direction;

            var slidesEnd = this.slideImgs.length - 1;
            index += direction;
            if (index > slidesEnd) index = 0;
            if (index < 0) index = slidesEnd;

            this.selectSlide(index);
        }
    }, {
        key: 'selectSlide',
        value: function selectSlide(index) {
            this.mainSlideView.hideSlide().setIndex(index).showSlide();
        }
    }, {
        key: 'moveScroller',
        value: function moveScroller(direction) {
            direction === 'up' ? (0, _helpers.moveScroll)(0) : (0, _helpers.moveScroll)(document.body.clientHeight);
        }
    }, {
        key: 'pressAutoComplete',
        value: function pressAutoComplete(_ref2) {
            var term = _ref2.term,
                key = _ref2.key,
                isSelected = _ref2.isSelected;

            var isUp = function isUp(key) {
                return key === 38;
            };
            var isdown = function isdown(key) {
                return key === 40;
            };
            var isESC = function isESC(key) {
                return key === 27;
            };
            var isEnter = function isEnter(key) {
                return key === 13;
            };
            var isString = function isString(key) {
                return key < 35 || key > 40;
            };

            if (isUp(key)) {
                this.autoCompleteView.upSel();
            } else if (isdown(key)) {
                this.autoCompleteView.downSel();
            } else if (isESC(key)) {
                this.autoCompleteView.emptyAutoComplete();
            } else if (isEnter(key)) {
                isSelected ? this.autoCompleteView.setSearchbar() : this.submitKeyword(term);
            } else if (isString(key)) {
                term ? this.fetchAutoComplete(term) : this.autoCompleteView.emptyAutoComplete();
            }
        }
    }, {
        key: 'fetchAutoComplete',
        value: async function fetchAutoComplete(term) {
            var suggestions = await this.checkLocalStorage(this.urlList.autoComplete + term, true);
            this.autoCompleteView.emptyAutoComplete().render('autoComplete', term, suggestions);
        }
    }, {
        key: 'submitKeyword',
        value: function submitKeyword(keyword) {
            if (keyword) {
                var history = new Set((0, _helpers.getLocalStorage)('history'));
                history.add(keyword);
                (0, _helpers.setLocalStorage)('history', [].concat(_toConsumableArray(history)));
                this.autoCompleteView.emptyAutoComplete().emptySearchbar();
            }
        }
    }, {
        key: 'fetchHistory',
        value: async function fetchHistory() {
            var history = await (0, _helpers.getLocalStorage)('history');
            history && this.autoCompleteView.render('history', history.slice(-5).reverse());
        }
    }, {
        key: 'fetchBestBanchan',
        value: async function fetchBestBanchan(url) {
            var foodData = await this.checkLocalStorage(url);
            this.bestBanchanView.render('bestBanchan', foodData).bind('foodTab');
        }
    }, {
        key: 'fetchInfiniteSlide',
        value: async function fetchInfiniteSlide(targetView, url) {
            var _this3 = this;

            var foodData = await this.checkLocalStorage(url);
            var threshold = foodData.length * 2.5;
            targetView.setThreshold(threshold).render('banchan', foodData).bind('transitionend').bind('slidesNavi').bind('touch').on('@move', function (e) {
                return _this3.moveInfiniteSlides.call(targetView, e.detail.direction);
            }).on('@transitionend', function () {
                return _this3.resetInfiniteSlides.call(targetView);
            }).on('@touchmove', function (e) {
                return _this3.checkMoveType.call(targetView, e.detail.x, e.detail.y);
            }).on('@touchend', function (e) {
                targetView.state.moveType < 0 && _this3.checkMoveType.call(targetView, e.detail.x, e.detail.y);
                _this3.checkDistance(targetView);
                targetView.initTouchInfo();
            });
        }
    }, {
        key: 'checkDistance',
        value: function checkDistance(targetView) {
            var _targetView$state = targetView.state,
                index = _targetView$state.index,
                startIndex = _targetView$state.startIndex;

            var Hdistance = startIndex - index;
            if (Hdistance > 2) {
                this.moveInfiniteSlides.call(targetView, Hdistance - 10);
            } else if (Hdistance < -2) {
                this.moveInfiniteSlides.call(targetView, Hdistance + 10);
            } else {
                this.moveInfiniteSlides.call(targetView, Hdistance);
            }
        }
    }, {
        key: 'checkMoveType',
        value: function checkMoveType(x, y) {
            var _state = this.state,
                startX = _state.startX,
                startY = _state.startY,
                startIndex = _state.startIndex,
                HSlope = _state.HSlope;

            var Hdistance = (startX - x) / 100;
            this.setIndex(startIndex - Hdistance).showSlides({
                Immediately: true
            });

            var moveX = Math.abs(startX - x);
            var moveY = Math.abs(startY - y);
            var distance = moveX + moveY;
            if (distance < 25) {
                return this;
            }
            var slope = parseFloat((moveY / moveX).toFixed(2), 10);
            slope > HSlope ? this.setMoveType(1) : this.setMoveType(0);
        }
    }, {
        key: 'moveInfiniteSlides',
        value: function moveInfiniteSlides(direction) {
            this.setIndex(this.state.index += direction).showSlides({
                Immediately: false
            });
        }
    }, {
        key: 'resetInfiniteSlides',
        value: function resetInfiniteSlides() {
            var _state2 = this.state,
                index = _state2.index,
                thresholdL = _state2.thresholdL,
                thresholdR = _state2.thresholdR;

            if (index <= thresholdL || index >= thresholdR) {
                this.setIndex(-20).showSlides({
                    Immediately: true
                });
            }
        }
    }, {
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
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mainSlideTpl = __webpack_require__(16);

var _mainSlideTpl2 = _interopRequireDefault(_mainSlideTpl);

var _helpers = __webpack_require__(4);

var _View2 = __webpack_require__(3);

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_View) {
    _inherits(_class, _View);

    function _class(el) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));

        _this.state = {
            index: 0
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this2 = this;

            var bindCommands = {
                slidesNavi: function slidesNavi() {
                    _this2.delegate('.slides_navi > a', 'click', (0, _helpers.throttle)(function (e) {
                        return _this2.emit('@move', {
                            index: _this2.state.index,
                            direction: +e.delegateTarget.dataset.direction
                        });
                    }, 1000));
                },
                slidesDots: function slidesDots() {
                    _this2.delegate('.slides_dots > li > a', 'click', (0, _helpers.throttle)(function (e) {
                        return _this2.emit('@selectDot', {
                            index: +e.delegateTarget.textContent
                        });
                    }, 1000));
                }
            };

            bindCommands[bindCmd]();
            return this;
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this3 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                mainSlide: function mainSlide() {
                    _this3.mainSlide.apply(_this3, params);
                }
            };

            viewCommands[viewCmd]();
            return this;
        }
    }, {
        key: 'mainSlide',
        value: function mainSlide(slideImgs) {
            this.renderMainSlide(slideImgs).showSlide();
        }
    }, {
        key: 'renderMainSlide',
        value: function renderMainSlide(slideImgs) {
            var mainSlideStr = (0, _mainSlideTpl2.default)({
                slideImgs: slideImgs
            });
            this.el.insertAdjacentHTML('afterbegin', mainSlideStr);
            this.slidesEl = this.qsa('.main_slides_list > li');
            this.dotsEl = this.qsa('.slides_dots > li > a');
            return this;
        }
    }, {
        key: 'hideSlide',
        value: function hideSlide() {
            this.slidesEl[this.state.index].className = 'fadeout';
            this.dotsEl[this.state.index].classList.remove('now');
            return this;
        }
    }, {
        key: 'showSlide',
        value: function showSlide() {
            this.slidesEl[this.state.index].className = 'fadein';
            this.dotsEl[this.state.index].className = 'now';
            return this;
        }
    }, {
        key: 'setIndex',
        value: function setIndex(index) {
            this.state.index = index;
            return this;
        }
    }]);

    return _class;
}(_View3.default);

exports.default = _class;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <li class=\"fadeout\" style='background-image: url("
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ")'>\r\n        <a href=\"#\"></a>\r\n    </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <li>\r\n        <a href=\"#\">"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data}) : helper)))
    + "</a>\r\n    </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<ul class=\"main_slides_list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.slideImgs : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n<ul class=\"slides_dots\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.slideImgs : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

/***/ }),
/* 17 */
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

var _handlebarsBase = __webpack_require__(5);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(29);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(2);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(30);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(31);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(19);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(20);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(21);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(22);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(23);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(24);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(25);

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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(2);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(2);

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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(27);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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

var _exception = __webpack_require__(2);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(5);

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
/* 31 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxTpl = __webpack_require__(34);

var _foodBoxTpl2 = _interopRequireDefault(_foodBoxTpl);

var _foodTabTpl = __webpack_require__(35);

var _foodTabTpl2 = _interopRequireDefault(_foodTabTpl);

var _containerTpl = __webpack_require__(36);

var _containerTpl2 = _interopRequireDefault(_containerTpl);

var _badgeTpl = __webpack_require__(6);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(7);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _View2 = __webpack_require__(3);

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_View) {
    _inherits(_class, _View);

    function _class(el) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this2 = this;

            var bindCommands = {
                foodTab: function foodTab() {
                    _this2.delegate('li > a', 'click', function (e) {
                        Array.from(_this2.foodTabListEl).forEach(function (tab) {
                            return tab.className = tab === e.delegateTarget ? 'now' : '';
                        });
                        Array.from(_this2.foodBoxListEl).forEach(function (food) {
                            return food.style.display = e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'flex' : 'none';
                        });
                    });
                }
            };

            bindCommands[bindCmd]();
            return this;
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this3 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                bestBanchan: function bestBanchan() {
                    _this3.bestBanchan.apply(_this3, params);
                }
            };

            viewCommands[viewCmd]();
            return this;
        }
    }, {
        key: 'bestBanchan',
        value: function bestBanchan(food) {
            this.renderFoodTab(food).renderFoodContainer(food).renderFoodBoxList(food).renderFoodBox(food).renderSelectedFood(food, Math.floor(Math.random() * 6));
        }
    }, {
        key: 'renderFoodTab',
        value: function renderFoodTab(food) {
            var foodTabEl = this.qs('.best_food_tabs');
            var foodTab = food.map(function (value) {
                return (0, _foodTabTpl2.default)({
                    category_id: value.category_id,
                    name: value.name
                });
            }).join('');
            foodTabEl.insertAdjacentHTML('afterbegin', foodTab);
            return this;
        }
    }, {
        key: 'renderFoodContainer',
        value: function renderFoodContainer(food) {
            var foodContainerEl = this.qs('.best_food_container');
            var foodContainer = food.map(function (value) {
                return (0, _containerTpl2.default)({
                    category_id: value.category_id
                });
            }).join('');
            foodContainerEl.insertAdjacentHTML('afterbegin', foodContainer);
            return this;
        }
    }, {
        key: 'renderFoodBoxList',
        value: function renderFoodBoxList(food) {
            var _this4 = this;

            this.foodBoxListEl = this.qsa('.best_food_box_list');
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
                _this4.foodBoxListEl[i].insertAdjacentHTML('afterbegin', foodBoxList);
            });
            return this;
        }
    }, {
        key: 'renderFoodBox',
        value: function renderFoodBox(food) {
            var foodBoxEl = this.qsa('.best_food_box');
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
            this.foodTabListEl = this.qsa('.best_food_tabs > li > a');
            this.foodTabListEl[initNum].className = 'now';
            this.foodBoxListEl[initNum].style.display = 'flex';
        }
    }]);

    return _class;
}(_View3.default);

exports.default = _class;

/***/ }),
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = __webpack_require__(3);

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_View) {
    _inherits(_class, _View);

    function _class(el) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this2 = this;

            var bindCommands = {
                click: function click() {
                    _this2.delegate('.scroller > li > a', 'click', function (e) {
                        return _this2.emit('@move', {
                            direction: e.delegateTarget.dataset.direction
                        });
                    });
                },
                hide: function hide() {
                    window.addEventListener('scroll', function () {
                        return window.scrollY > 90 ? _this2.show() : _this2.hide();
                    });
                }
            };

            bindCommands[bindCmd]();
            return this;
        }
    }]);

    return _class;
}(_View3.default);

exports.default = _class;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foodBoxInfiniteTpl = __webpack_require__(39);

var _foodBoxInfiniteTpl2 = _interopRequireDefault(_foodBoxInfiniteTpl);

var _badgeTpl = __webpack_require__(6);

var _badgeTpl2 = _interopRequireDefault(_badgeTpl);

var _deliveryTypeTpl = __webpack_require__(7);

var _deliveryTypeTpl2 = _interopRequireDefault(_deliveryTypeTpl);

var _helpers = __webpack_require__(4);

var _View2 = __webpack_require__(3);

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_View) {
    _inherits(_class, _View);

    function _class(el) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));

        _this.foodBoxListEl = _this.qs('.infinite_food_box_list');

        _this.state = {
            HSlope: (window.innerHeight / 2 / window.innerWidth).toFixed(2) * 1,
            index: -20,
            startIndex: -20,
            moveType: -1,
            startX: -1,
            startY: -1,
            startTime: 0,
            startEvent: false
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this2 = this;

            var bindCommands = {
                transitionend: function transitionend() {
                    _this2.on('transitionend', function () {
                        return _this2.emit('@transitionend');
                    });
                },
                slidesNavi: function slidesNavi() {
                    _this2.delegate('.infinite_food_slides_navi > a', 'click', (0, _helpers.throttle)(function (e) {
                        return _this2.emit('@move', {
                            direction: +e.delegateTarget.dataset.direction
                        });
                    }, 1000));
                },
                touch: function touch() {
                    _this2.on('touchstart', (0, _helpers.throttle)(function (e) {
                        _this2.initTouchInfo();
                        _this2.state.startIndex = Math.ceil(_this2.state.index / 10) * 10;
                        _this2.state.startX = e.changedTouches[0].pageX;
                        _this2.state.startY = e.changedTouches[0].pageY;
                        _this2.state.startTime = e.timeStamp;
                        _this2.state.startEvent = true;
                    }, 1000));
                    _this2.on('touchmove', function (e) {
                        return _this2.state.startEvent && _this2.emit('@touchmove', {
                            x: e.changedTouches[0].pageX,
                            y: e.changedTouches[0].pageY
                        });
                    });
                    _this2.on('touchend', function (e) {
                        return _this2.state.startEvent && _this2.emit('@touchend', {
                            x: e.changedTouches[0].pageX,
                            y: e.changedTouches[0].pageY
                        });
                    });
                }
            };

            bindCommands[bindCmd]();
            return this;
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this3 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                banchan: function banchan() {
                    _this3.banchan.apply(_this3, params);
                }
            };

            viewCommands[viewCmd]();
            return this;
        }
    }, {
        key: 'banchan',
        value: function banchan(food) {
            this.renderFoodBoxList(food).renderFoodBoxOption(food).renderSlides().showSlides({
                Immediately: true
            });
        }
    }, {
        key: 'renderFoodBoxList',
        value: function renderFoodBoxList(food) {
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
            this.foodBoxListEl.insertAdjacentHTML('afterbegin', foodBoxList);
            return this;
        }
    }, {
        key: 'renderFoodBoxOption',
        value: function renderFoodBoxOption(food) {
            var prdBox = this.qsa('.prd_box>a');
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
        value: function renderSlides() {
            var _this4 = this;

            var slides = this.qsa('.prd_box');
            var lastSlides = Array.from(slides).slice(-4);

            slides.forEach(function (slide) {
                return _this4.foodBoxListEl.appendChild(slide.cloneNode(true));
            });
            lastSlides.reverse().forEach(function (lastSlide) {
                return _this4.foodBoxListEl.insertBefore(lastSlide.cloneNode(true), _this4.foodBoxListEl.childNodes[0]);
            });
            return this;
        }
    }, {
        key: 'showSlides',
        value: function showSlides(_ref) {
            var Immediately = _ref.Immediately;

            this.foodBoxListEl.style.transitionDuration = Immediately ? '0s' : '0.5s';
            this.foodBoxListEl.style.transform = 'translateX(' + this.state.index + '%)';
            return this;
        }
    }, {
        key: 'initTouchInfo',
        value: function initTouchInfo() {
            this.state.moveType = -1;
            this.state.startX = -1;
            this.state.startY = -1;
            this.state.startTime = 0;
            this.state.startEvent = false;
        }
    }, {
        key: 'setIndex',
        value: function setIndex(index) {
            this.state.index = index;
            return this;
        }
    }, {
        key: 'setMoveType',
        value: function setMoveType(type) {
            this.state.moveType = type;
            return this;
        }
    }, {
        key: 'setThreshold',
        value: function setThreshold(threshold) {
            this.state.thresholdL = -20 - threshold;
            this.state.thresholdR = -20 + threshold;
            return this;
        }
    }]);

    return _class;
}(_View3.default);

exports.default = _class;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"prd_box\">\r\n    <a href=\"#\">\r\n        <div class=\"thumb_img\">\r\n            <p>\r\n                <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.alt || (depth0 != null ? depth0.alt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data}) : helper)))
    + "\">\r\n            </p>\r\n            <div class=\"circle_mask\"></div>\r\n        </div>\r\n        <dl class=\"prd_detail\">\r\n            <dt class=\"prd_title\">"
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autocompleteTpl = __webpack_require__(41);

var _autocompleteTpl2 = _interopRequireDefault(_autocompleteTpl);

var _helpers = __webpack_require__(4);

var _View2 = __webpack_require__(3);

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_View) {
    _inherits(_class, _View);

    function _class(el) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));

        _this.searchEl = _this.qs('#search_str');
        _this.suggestionsEl = _this.qs('.autocomplete_suggestions');
        _this.searchButtonEl = _this.qs('.search_btn');
        return _this;
    }

    _createClass(_class, [{
        key: 'bind',
        value: function bind(bindCmd) {
            var _this2 = this;

            var bindCommands = {
                press: function press() {
                    _this2.on('keyup', function (e) {
                        return _this2.emit('@press', {
                            term: e.target.value,
                            key: e.keyCode,
                            isSelected: !!_this2.sel
                        });
                    });
                },
                submit: function submit() {
                    _this2.delegate('.search_btn', 'click', function () {
                        return _this2.emit('@submit', {
                            keyword: _this2.searchEl.value
                        });
                    });
                },
                history: function history() {
                    _this2.delegate('#search_str', 'click', function () {
                        return !_this2.isOpen() && !_this2.searchEl.value && _this2.emit('@history');
                    });
                },
                clickSuggestion: function clickSuggestion() {
                    _this2.delegate('.autocomplete_suggestion', 'click', function (e) {
                        return _this2.setSel(e.delegateTarget).setSearchbar();
                    });
                },
                nonClick: function nonClick() {
                    (0, _helpers.delegate)('body', '*', 'click', function (e) {
                        return e.target !== _this2.searchEl && _this2.emptyAutoComplete();
                    });
                },
                hover: function hover() {
                    _this2.delegate('.autocomplete_suggestion', 'mouseover', function (e) {
                        return _this2.setSel(e.delegateTarget);
                    }).delegate('.autocomplete_suggestion', 'mouseout', function () {
                        return _this2.emptySel();
                    });
                }
            };

            bindCommands[bindCmd]();
            return this;
        }
    }, {
        key: 'render',
        value: function render(viewCmd) {
            var _this3 = this;

            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var viewCommands = {
                autoComplete: function autoComplete() {
                    _this3.renderAutoComplete.apply(_this3, params);
                },
                history: function history() {
                    _this3.renderSearches.apply(_this3, params);
                }
            };

            viewCommands[viewCmd]();
            return this;
        }
    }, {
        key: 'renderAutoComplete',
        value: function renderAutoComplete(term, suggestions) {
            var target = new RegExp(term, 'i');
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
                    class: 'history',
                    keyword: search,
                    renderKeyword: search
                });
            }).join('');
            this.suggestionsEl.insertAdjacentHTML('afterbegin', historyComponent);
        }
    }, {
        key: 'setSearchbar',
        value: function setSearchbar() {
            this.searchEl.value = this.sel.dataset.value;
            this.emptySel().emptyAutoComplete();
            return this;
        }
    }, {
        key: 'emptySearchbar',
        value: function emptySearchbar() {
            this.searchEl.value = '';
            return this;
        }
    }, {
        key: 'upSel',
        value: function upSel() {
            var target = this.sel ? this.sel.previousSibling : this.suggestionsEl.lastChild;
            this.emptySel().setSel(target);
            return this;
        }
    }, {
        key: 'downSel',
        value: function downSel() {
            var target = this.sel ? this.sel.nextSibling : this.suggestionsEl.firstChild;
            this.emptySel().setSel(target);
            return this;
        }
    }, {
        key: 'setSel',
        value: function setSel(target) {
            this.sel = target;
            this.sel.classList.add('selected');
            return this;
        }
    }, {
        key: 'emptySel',
        value: function emptySel() {
            this.sel && this.sel.classList.remove('selected');
            this.sel = null;
            return this;
        }
    }, {
        key: 'emptyAutoComplete',
        value: function emptyAutoComplete() {
            this.suggestionsEl.innerHTML = '';
            return this;
        }
    }, {
        key: 'isOpen',
        value: function isOpen() {
            return this.suggestionsEl.innerHTML;
        }
    }]);

    return _class;
}(_View3.default);

exports.default = _class;

/***/ }),
/* 41 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGUwNTI5NjEwZWJmMWUwNTlmZjYiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9WaWV3LmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jc3Mvc3R5bGUuc2Nzcz8zZDgzIiwid2VicGFjazovLy8uL2Nzcy9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3ZpZXcvTWFpblNsaWRlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9tYWluU2xpZGUtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZWwiLCJuYW1lIiwic2xpY2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVudCIsImhhbmRsZXIiLCJ1c2VDYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJjYWxsYmFjayIsImxpc3RlbmVyRm4iLCJlIiwiZGVsZWdhdGVUYXJnZXQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FsbCIsIm9uIiwiZGF0YSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZGlzcGF0Y2hFdmVudCIsInN0eWxlIiwiZGlzcGxheSIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJfZGVsZWdhdGUiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidW5pcXVlIiwibWF0Y2giLCJzcmMiLCJ3aW5kb3ciLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZV9mb29kIiwibWFpbl9mb29kIiwiY291cnNlX2Zvb2QiLCJhdXRvQ29tcGxldGUiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImNzcyIsImxvY2F0aW9uIiwiRXJyb3IiLCJiYXNlVXJsIiwicHJvdG9jb2wiLCJob3N0IiwiY3VycmVudERpciIsInBhdGhuYW1lIiwicmVwbGFjZSIsImZpeGVkQ3NzIiwiZnVsbE1hdGNoIiwib3JpZ1VybCIsInVucXVvdGVkT3JpZ1VybCIsInRyaW0iLCJvIiwiJDEiLCJ0ZXN0IiwibmV3VXJsIiwiaW5kZXhPZiIsImF1dG9Db21wbGV0ZVZpZXciLCJpbmZpbml0ZVZpZXdzIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVTbGlkZSIsImluZmluaXRlVmlldyIsIm1vdmVTY3JvbGxlciIsImRpcmVjdGlvbiIsInByZXNzQXV0b0NvbXBsZXRlIiwic3VibWl0S2V5d29yZCIsImtleXdvcmQiLCJmZXRjaEhpc3RvcnkiLCJwcmV2ZW50RGVmYXVsdCIsInNsaWRlSW1ncyIsImNoZWNrTG9jYWxTdG9yYWdlIiwicmVuZGVyIiwic2VsZWN0U2xpZGUiLCJpbmRleCIsIm1vdmVTbGlkZSIsInNsaWRlc0VuZCIsImhpZGVTbGlkZSIsInNldEluZGV4Iiwic2hvd1NsaWRlIiwiY2xpZW50SGVpZ2h0IiwidGVybSIsImlzU2VsZWN0ZWQiLCJpc1VwIiwiaXNkb3duIiwiaXNFU0MiLCJpc0VudGVyIiwiaXNTdHJpbmciLCJ1cFNlbCIsImRvd25TZWwiLCJlbXB0eUF1dG9Db21wbGV0ZSIsInNldFNlYXJjaGJhciIsImZldGNoQXV0b0NvbXBsZXRlIiwic3VnZ2VzdGlvbnMiLCJoaXN0b3J5IiwiU2V0IiwiYWRkIiwiZW1wdHlTZWFyY2hiYXIiLCJyZXZlcnNlIiwiZm9vZERhdGEiLCJ0YXJnZXRWaWV3IiwidGhyZXNob2xkIiwic2V0VGhyZXNob2xkIiwibW92ZUluZmluaXRlU2xpZGVzIiwicmVzZXRJbmZpbml0ZVNsaWRlcyIsImNoZWNrTW92ZVR5cGUiLCJ4IiwieSIsInN0YXRlIiwibW92ZVR5cGUiLCJjaGVja0Rpc3RhbmNlIiwiaW5pdFRvdWNoSW5mbyIsInN0YXJ0SW5kZXgiLCJIZGlzdGFuY2UiLCJzdGFydFgiLCJzdGFydFkiLCJIU2xvcGUiLCJzaG93U2xpZGVzIiwiSW1tZWRpYXRlbHkiLCJtb3ZlWCIsIm1vdmVZIiwiZGlzdGFuY2UiLCJzbG9wZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwic2V0TW92ZVR5cGUiLCJ0aHJlc2hvbGRMIiwidGhyZXNob2xkUiIsImlzSlNPTlAiLCJjYWNoZSIsInRpbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImJpbmRDbWQiLCJiaW5kQ29tbWFuZHMiLCJzbGlkZXNOYXZpIiwiZW1pdCIsImRhdGFzZXQiLCJzbGlkZXNEb3RzIiwidGV4dENvbnRlbnQiLCJ2aWV3Q21kIiwicGFyYW1zIiwidmlld0NvbW1hbmRzIiwicmVuZGVyTWFpblNsaWRlIiwibWFpblNsaWRlU3RyIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2xpZGVzRWwiLCJxc2EiLCJkb3RzRWwiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJnIiwiRnVuY3Rpb24iLCJldmFsIiwiZm9vZFRhYiIsImZyb20iLCJmb29kVGFiTGlzdEVsIiwidGFiIiwiZm9vZEJveExpc3RFbCIsImZvb2QiLCJjYXRlZ29yeV9pZCIsInJlbmRlckZvb2RUYWIiLCJyZW5kZXJGb29kQ29udGFpbmVyIiwicmVuZGVyRm9vZEJveExpc3QiLCJyZW5kZXJGb29kQm94IiwicmVuZGVyU2VsZWN0ZWRGb29kIiwiZmxvb3IiLCJyYW5kb20iLCJmb29kVGFiRWwiLCJxcyIsImZvb2RDb250YWluZXJFbCIsImZvb2RDb250YWluZXIiLCJmb29kQm94TGlzdCIsIml0ZW1zIiwiaW1hZ2UiLCJhbHQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwib2xkX3ByaWNlIiwibl9wcmljZSIsIm5ld19wcmljZSIsInNfcHJpY2UiLCJ3b24iLCJmb29kQm94RWwiLCJsZW4iLCJqIiwiYmFkZ2UiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRlbGl2ZXJ5X3R5cGUiLCJpbml0TnVtIiwiY2xpY2siLCJoaWRlIiwic2hvdyIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsInN0YXJ0VGltZSIsInN0YXJ0RXZlbnQiLCJ0cmFuc2l0aW9uZW5kIiwidG91Y2giLCJjZWlsIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidGltZVN0YW1wIiwiYmFuY2hhbiIsInJlbmRlckZvb2RCb3hPcHRpb24iLCJyZW5kZXJTbGlkZXMiLCJwcmRCb3giLCJzbGlkZXMiLCJsYXN0U2xpZGVzIiwic2xpZGUiLCJjbG9uZU5vZGUiLCJpbnNlcnRCZWZvcmUiLCJsYXN0U2xpZGUiLCJjaGlsZE5vZGVzIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNmb3JtIiwic2VhcmNoRWwiLCJzdWdnZXN0aW9uc0VsIiwic2VhcmNoQnV0dG9uRWwiLCJwcmVzcyIsImtleUNvZGUiLCJzZWwiLCJzdWJtaXQiLCJpc09wZW4iLCJjbGlja1N1Z2dlc3Rpb24iLCJzZXRTZWwiLCJub25DbGljayIsImhvdmVyIiwiZW1wdHlTZWwiLCJyZW5kZXJBdXRvQ29tcGxldGUiLCJyZW5kZXJTZWFyY2hlcyIsIlJlZ0V4cCIsInN1Z2dlc3Rpb25zQ29tcG9uZW50Iiwic3VnZ2VzdGlvbiIsInJlbmRlcktleXdvcmQiLCJzZWFyY2hlcyIsImhpc3RvcnlDb21wb25lbnQiLCJjbGFzcyIsInNlYXJjaCIsInByZXZpb3VzU2libGluZyIsImxhc3RDaGlsZCIsIm5leHRTaWJsaW5nIiwiZmlyc3RDaGlsZCIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FB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QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1C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LFdBQXBCLEdBQWtDLEtBQUt4QixhQUFMLENBQW1CeUIsVUFBcEU7QUFDQSxpQkFBS2QsUUFBTCxHQUFnQkgsTUFBaEIsQ0FBdUJoVSxNQUF2QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7OytCQUVNQSxNLEVBQVE7QUFDWCxpQkFBSzRULEdBQUwsR0FBVzVULE1BQVg7QUFDQSxpQkFBSzRULEdBQUwsQ0FBU3hFLFNBQVQsQ0FBbUJyRCxHQUFuQixDQUF1QixVQUF2QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7O21DQUVVO0FBQ1AsaUJBQUs2SCxHQUFMLElBQVksS0FBS0EsR0FBTCxDQUFTeEUsU0FBVCxDQUFtQjlKLE1BQW5CLENBQTBCLFVBQTFCLENBQVo7QUFDQSxpQkFBS3NPLEdBQUwsR0FBVyxJQUFYO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7NENBRW1CO0FBQ2hCLGlCQUFLSixhQUFMLENBQW1CMEIsU0FBbkIsR0FBK0IsRUFBL0I7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FHUTtBQUNMLG1CQUFPLEtBQUsxQixhQUFMLENBQW1CMEIsU0FBMUI7QUFDSDs7Ozs7Ozs7Ozs7O0FDL0hMO0FBQ0EseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDhLQUE4Syx3QkFBd0IsYUFBYTtBQUNuTjtBQUNBLDRLQUE0SywwQkFBMEIsYUFBYTtBQUNuTjtBQUNBLDRMQUE0TCxnQ0FBZ0MsYUFBYTtBQUN6TztBQUNBLENBQUMsZ0JBQWdCLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGUwNTI5NjEwZWJmMWUwNTlmZjYiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIGlmICghZWwpIHRocm93IGVsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGVsLnNsaWNlKDEpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBxcyhzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHFzYShzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxlZ2F0ZShzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lckZuID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCAmJiBjYWxsYmFjay5jYWxsKHRoaXMuZWwsIGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbWl0KGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XHJcbiAgICAgICAgICAgIGRldGFpbDogZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvVmlldy5qcyIsIi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZnVuY3Rpb24gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ3xBcnJheX0gW2VsZW1lbnRzXVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50cywgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cy5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBFbGVtZW50LWxlc3MgdXNhZ2UsIGl0IGRlZmF1bHRzIHRvIGdsb2JhbCBkZWxlZ2F0aW9uXHJcbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBVc2UgYGRvY3VtZW50YCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCB0aGVuIGFwcGx5IGFyZ3VtZW50c1xyXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydCB3YXkgdG8gLnVuc2hpZnQgYGFyZ3VtZW50c2Agd2l0aG91dCBydW5uaW5nIGludG8gZGVvcHRpbWl6YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBBcnJheS1saWtlIGJhc2VkIHVzYWdlXHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQUpBWCByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4gKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApID9cclxuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZSkpIDogcmVqZWN0KHhoci5zdGF0dXMpO1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiByZWplY3QoJ3RpbWVvdXQnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gdGhhdCwgd2hlbiBpbnZva2VkLCBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gdG8gd3JhcC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGxpbWl0IE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IGVsYXBzZSBiZXR3ZWVuIGBmdW5jYCBpbnZvY2F0aW9ucy5cclxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd3JhcHMgdGhlIGBmdW5jYCBmdW5jdGlvbiBwYXNzZWQgaW4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XHJcbiAgICBsZXQgd2FpdCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXdhaXQpIHtcclxuICAgICAgICAgICAgZnVuYy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB3YWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBzdGFydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYyBjaGFuZ2UgaW4gdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfSBuZXcgc2Nyb2xsWVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xyXG4gICAgdCAvPSBkIC8gMjtcclxuICAgIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG4gICAgdC0tO1xyXG4gICAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKGtleSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgcmV0dXJuIHZhbHVlLmRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKHJlY2VpdmVkVGltZSwgdGhyZXNob2xkSG91cikge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSAoY3VycmVudFRpbWUgLSByZWNlaXZlZFRpbWUpIC8gMTAwMCAvIDYwIC8gNjA7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWUgPCB0aHJlc2hvbGRIb3VyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVNjcm9sbCh0bykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzY3JvbGxZO1xyXG4gICAgY29uc3QgY2hhbmdlID0gdG8gLSBzdGFydDtcclxuICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC5hYnMoY2hhbmdlIC8gNCk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnQgPSAyMDtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZVNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBjdXJyZW50VGltZSArPSBpbmNyZW1lbnQ7XHJcbiAgICAgICAgbGV0IG5ld1kgPSBlYXNlSW5RdWFkKGN1cnJlbnRUaW1lLCBzdGFydCwgY2hhbmdlLCBkdXJhdGlvbik7XHJcbiAgICAgICAgc2Nyb2xsVG8oMCwgbmV3WSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hKU09OUCA9ICh1bmlxdWUgPT4gdXJsID0+XHJcbiAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gYF9qc29ucF8ke3VuaXF1ZSsrfWA7XHJcbiAgICAgICAgdXJsICs9IHVybC5tYXRjaCgvXFw/LykgPyBgJmNhbGxiYWNrPSR7bmFtZX1gIDogYD9jYWxsYmFjaz0ke25hbWV9YDtcclxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xyXG4gICAgICAgIHdpbmRvd1tuYW1lXSA9IGpzb24gPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGpzb24pO1xyXG4gICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbbmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9KVxyXG4pKDApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMuanMiLCJpbXBvcnQge2NyZWF0ZUZyYW1lLCBleHRlbmQsIHRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHRIZWxwZXJzfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzfSBmcm9tICcuL2RlY29yYXRvcnMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzQuMC4xMSc7XG5leHBvcnQgY29uc3QgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmNvbnN0IG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2dnZXIubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBleHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihgQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJHtuYW1lfVwiIGFzIHVuZGVmaW5lZGApO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydCB7Y3JlYXRlRnJhbWUsIGxvZ2dlcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICA8ZGl2IGNsYXNzPSdiYWRnZSc+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCI8L2Rpdj5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImJhZGdlX2xpc3RcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmJhZGdlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICA8c3Bhbj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdmb29kX2ltZ19ob3Zlcic+XFxyXFxuICAgIDx1bD5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZWxpdmVyeV90eXBlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8L3VsPlxcclxcbjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL2Nzcy9zdHlsZS5zY3NzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcclxuaW1wb3J0IE1haW5TbGlkZVZpZXcgZnJvbSAnLi92aWV3L01haW5TbGlkZVZpZXcnO1xyXG5pbXBvcnQgQmVzdEJhbmNoYW5WaWV3IGZyb20gJy4vdmlldy9CZXN0QmFuY2hhblZpZXcnO1xyXG5pbXBvcnQgU2Nyb2xsZXJWaWV3IGZyb20gJy4vdmlldy9TY3JvbGxlclZpZXcnO1xyXG5pbXBvcnQgSW5maW5pdGVTbGlkZVZpZXcgZnJvbSAnLi92aWV3L0luZmluaXRlU2xpZGVWaWV3JztcclxuaW1wb3J0IEF1dG9tQ29tcGxldGVWaWV3IGZyb20gJy4vdmlldy9BdXRvQ29tcGxldGVWaWV3JztcclxuXHJcbmNvbnN0IHVybExpc3QgPSB7XHJcbiAgICBtYWluU2xpZGU6ICdodHRwOi8vaG9tZS5kb3RvbC54eXovcGhwL3Rlc3RfYXBpLnBocCcsXHJcbiAgICBiZXN0QmFuY2hhbjogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9iZXN0JyxcclxuICAgIHNpZGVfZm9vZDogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9zaWRlJyxcclxuICAgIG1haW5fZm9vZDogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9tYWluJyxcclxuICAgIGNvdXJzZV9mb29kOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NvdXAnLFxyXG4gICAgYXV0b0NvbXBsZXRlOiAnaHR0cHM6Ly9rby53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249b3BlbnNlYXJjaCZzZWFyY2g9J1xyXG59O1xyXG5cclxuY29uc3QgbWFpblNsaWRlVmlldyA9IG5ldyBNYWluU2xpZGVWaWV3KCcubWFpbl9zbGlkZScpO1xyXG5jb25zdCBiZXN0QmFuY2hhblZpZXcgPSBuZXcgQmVzdEJhbmNoYW5WaWV3KCcuYmVzdF9mb29kJyk7XHJcbmNvbnN0IHNjcm9sbGVyVmlldyA9IG5ldyBTY3JvbGxlclZpZXcoJy5zY3JvbGxlcicpO1xyXG5jb25zdCBzaWRlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJy5zaWRlX2Zvb2QnKTtcclxuY29uc3QgbWFpbkJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCcubWFpbl9mb29kJyk7XHJcbmNvbnN0IGNvdXJzZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCcuY291cnNlX2Zvb2QnKTtcclxuY29uc3QgYXV0b21Db21wbGV0ZVZpZXcgPSBuZXcgQXV0b21Db21wbGV0ZVZpZXcoJy5zZWFyY2hiYXInKTtcclxuXHJcblxyXG4vKipcclxuICogQHR5cGUge0NvbnRyb2xsZXJ9XHJcbiAqL1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCBzaWRlQmFuY2hhblZpZXcsIG1haW5CYW5jaGFuVmlldywgY291cnNlQmFuY2hhblZpZXcpO1xyXG5cclxuY29uc3Qgc2V0VmlldyA9ICgpID0+IGNvbnRyb2xsZXIuc2V0VmlldygpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldFZpZXcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9uYW51bWdvdGhpYy5jc3MpO1wiLCBcIlwiXSk7XG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcmVzZXQgc3R5bGVzICovXFxuKixcXG4qOmFmdGVyLFxcbio6YmVmb3JlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJztcXG4gIGZvbnQtc2l6ZTogMTJweDsgfVxcblxcbmRpdixcXG5zcGFuLFxcbm9iamVjdCxcXG5pZnJhbWUsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxucCxcXG5ibG9ja3F1b3RlLFxcbnByZSxcXG5hYmJyLFxcbmFkZHJlc3MsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zYW1wLFxcbnNtYWxsLFxcbnN0cm9uZyxcXG52YXIsXFxuYixcXG5pLFxcbmRsLFxcbmR0LFxcbmRkLFxcbm9sLFxcbnVsLFxcbmxpLFxcbmZpZWxkc2V0LFxcbmZvcm0sXFxubGFiZWwsXFxubGVnZW5kLFxcbnRhYmxlLFxcbmNhcHRpb24sXFxudGJvZHksXFxudGZvb3QsXFxudGhlYWQsXFxudHIsXFxudGgsXFxudGQsXFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5jYW52YXMsXFxuZGV0YWlscyxcXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5mb290ZXIsXFxuaGVhZGVyLFxcbm1lbnUsXFxubmF2LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG5cXG5kdCB7XFxuICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbm9sLFxcbnVsLFxcbmRsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbi5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3QsIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0IHtcXG4gIGhlaWdodDogMjRweDtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3QgPiAuYmFkZ2UsIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0ID4gLmJhZGdlIHtcXG4gICAgcGFkZGluZzogNHB4IDJweCA1cHg7XFxuICAgIG1hcmdpbi1yaWdodDogM3B4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYmFja2dyb3VuZDogI2E5NzRiZjtcXG4gICAgd2lkdGg6IDYycHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAub2xkX3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAub2xkX3ByaWNlIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgY29sb3I6ICM4ODg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAubmV3X3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAubmV3X3ByaWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0ycHg7XFxuICAgIG1hcmdpbi1sZWZ0OiA5cHg7XFxuICAgIGNvbG9yOiAjMmFjMWJjO1xcbiAgICBmb250LXNpemU6IDI2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAubmV3X3ByaWNlID4gLndvbiwgLnByZF9kZXRhaWwgPiAucHJkX3ByaWNlID4gLm5ld19wcmljZSA+IC53b24ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNnB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0b3A6IC0zcHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLmJlc3RfZm9vZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyLCAucHJkX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLnByZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjYpOyB9XFxuXFxuLmxuYl93cmFwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U5ZTllOTsgfVxcbiAgLmxuYl93cmFwID4gLmxuYl9jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMC4ycHg7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmxuYl93cmFwID4gLmxuYl9jb250ZW50IHNwYW4uaWMge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB6b29tOiAxO1xcbiAgICAgIHdpZHRoOiA3cHg7XFxuICAgICAgaGVpZ2h0OiAxMXB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idWxfYXJyX2Rvd24ucG5nKSBuby1yZXBlYXQgY2VudGVyIDFweDtcXG4gICAgICBtYXJnaW4tbGVmdDogNHB4OyB9XFxuXFxuLmxpbmtfYXBwID4gYSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHggMTFweCA5cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzY2NjsgfVxcbiAgLmxpbmtfYXBwID4gYTpob3ZlciB7XFxuICAgIGNvbG9yOiAjMmFjMWJjOyB9XFxuXFxuLmxuYl9saXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIC5sbmJfbGlzdCA+IGxpID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMTBweCA5cHggMTBweDtcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi91dGlsX2Jhci5naWYpIG5vLXJlcGVhdCAwIDEycHg7IH1cXG4gICAgLmxuYl9saXN0ID4gbGkgPiBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzJhYzFiYzsgfVxcbiAgLmxuYl9saXN0ID4gbGk6Zmlyc3QtY2hpbGQgPiBhIHtcXG4gICAgYmFja2dyb3VuZDogbm9uZTsgfVxcbiAgLmxuYl9saXN0ID4gbGk6bGFzdC1jaGlsZCA+IGEge1xcbiAgICBjb2xvcjogIzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4uaGVhZGVyX3dyYXAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogOThweDtcXG4gIHdpZHRoOiA5ODBweDtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuICAuaGVhZGVyX3dyYXAgPiAubG9nbyB7XFxuICAgIG1hcmdpbjogMTZweCAwIDAgNXB4OyB9XFxuXFxuLmduYl90b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbjogMCA1cHggMCBhdXRvOyB9XFxuICAuZ25iX3RvcCA+IGxpID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW46IDI1cHggMCAyNXB4IDUwcHg7IH1cXG5cXG4ubmF2aV93cmFwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDE7XFxuICBiYWNrZ3JvdW5kOiAjNDgzZjM1OyB9XFxuICAubmF2aV93cmFwID4gLm5hdmlfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiA1MnB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5nbmIge1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgLmduYiA+IGxpIHtcXG4gICAgd2lkdGg6IDEyNHB4O1xcbiAgICBoZWlnaHQ6IDUycHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAuZ25iID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwYWRkaW5nOiA1cHggMCAwIDFweDsgfVxcbiAgICAgIC5nbmIgPiBsaSA+IGEgPiBzcGFuIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGhlaWdodDogNTJweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgICAgcGFkZGluZzogMTFweCAyNXB4IDBweDsgfVxcbiAgICAuZ25iID4gbGk6Zmlyc3QtY2hpbGQge1xcbiAgICAgIHdpZHRoOiAxMDBweDsgfVxcbiAgICAuZ25iID4gbGk6bnRoLWNoaWxkKDcpIHtcXG4gICAgICB3aWR0aDogMTIwcHg7IH1cXG4gICAgLmduYiA+IGxpOm50aC1jaGlsZCg4KSB7XFxuICAgICAgd2lkdGg6IDE0MHB4O1xcbiAgICAgIGJhY2tncm91bmQ6ICMzNjJkMjU7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5nbmIgPiBsaTpob3ZlciA+IGEgPiBzcGFuLCAuZ25iID4gbGk6Zm9jdXMgPiBhID4gc3BhbiB7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBjb2xvcjogIzJhYzFiYzsgfVxcbiAgICAuZ25iID4gbGk6aG92ZXIgPiB1bCwgLmduYiA+IGxpOmZvY3VzID4gdWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnN1Yl9saXN0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMTYycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiA1MnB4O1xcbiAgcGFkZGluZzogMjBweCAwIDMxcHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg3MiwgNjMsIDUzLCAwLjYpO1xcbiAgYm9yZGVyLXRvcDogMDsgfVxcbiAgLnN1Yl9saXN0IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDZweCAwIDNweCAyNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIC5zdWJfbGlzdCBhOmhvdmVyID4gc3BhbixcXG4gICAgLnN1Yl9saXN0IGE6Zm9jdXMgPiBzcGFuIHtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgY29sb3I6ICMyYWMxYmM7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG5cXG4uc2VhcmNoYmFyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogMzBweCAwIDAgNDZweDsgfVxcbiAgLnNlYXJjaGJhciA+IGlucHV0IHtcXG4gICAgd2lkdGg6IDIxMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGNvbG9yOiAjODg4ODg4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2ZkMGQyO1xcbiAgICBwYWRkaW5nOiAwcHggMzhweCAwcHggMTVweDsgfVxcbiAgLnNlYXJjaGJhciA+IGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9pY19zZWFyY2gucG5nKSBuby1yZXBlYXQgY2VudGVyIDA7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxcHg7XFxuICAgIHJpZ2h0OiAxcHg7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5zZWFyY2hiYXIgPiBidXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciAxMDAlOyB9XFxuXFxuLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyB7XFxuICB3aWR0aDogMjEwcHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgei1pbmRleDogOTk5OTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3gtc2hhZG93OiAtMXB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBwYWRkaW5nOiA2cHggMCAzcHggMjVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDEuMmVtO1xcbiAgICBjb2xvcjogIzMzMzsgfVxcbiAgICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIGIge1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGNvbG9yOiAjZmUxYTFhOyB9XFxuICAgIC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMgPiAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VsZWN0ZWQge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmMGYwZjBiZDsgfVxcbiAgICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uLmhpc3Rvcnkge1xcbiAgICAgIGNvbG9yOiAjNTIxODhjOyB9XFxuXFxuLm1haW5fc2xpZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogMTkyMHB4OyB9XFxuXFxuLm1haW5fc2xpZGVzX2xpc3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiA0MjBweDsgfVxcbiAgLm1haW5fc2xpZGVzX2xpc3QgPiBsaSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IG5vLXJlcGVhdCBjZW50ZXIgdG9wOyB9XFxuICAgIC5tYWluX3NsaWRlc19saXN0ID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogOTgwcHg7XFxuICAgICAgaGVpZ2h0OiA0MjBweDtcXG4gICAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IGEge1xcbiAgd2lkdGg6IDYwcHg7XFxuICBoZWlnaHQ6IDkycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC00NnB4O1xcbiAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL21haW5fc2xpZGVzX25hdmkucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldiB7XFxuICByaWdodDogNTAlO1xcbiAgbWFyZ2luLXJpZ2h0OiA1MzBweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgY2VudGVyOyB9XFxuXFxuLnNsaWRlc19uYXZpID4gLnNsaWRlc19uZXh0IHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiA1MzBweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfZG90cyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3R0b206IDQwcHg7XFxuICBoZWlnaHQ6IDA7IH1cXG4gIC5zbGlkZXNfZG90cyA+IGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgICBwYWRkaW5nOiAwIDRweDsgfVxcbiAgICAuc2xpZGVzX2RvdHMgPiBsaSA+IGEge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMHB4O1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGJhY2tncm91bmQ6ICNGRkY7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgICAgb3BhY2l0eTogMC42OyB9XFxuICAgICAgLnNsaWRlc19kb3RzID4gbGkgPiBhLm5vdyB7XFxuICAgICAgICBvcGFjaXR5OiAxOyB9XFxuXFxuLyogRmFkaW5nIGFuaW1hdGlvbiAqL1xcbi5mYWRlaW4ge1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMnM7IH1cXG5cXG4uZmFkZW91dCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAyczsgfVxcblxcbi5iZXN0X2Zvb2Qge1xcbiAgYmFja2dyb3VuZDogI2VlZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCA+IC5iZXN0X2Zvb2RfdGl0bGUge1xcbiAgICAgIHBhZGRpbmc6IDQwcHggMCAzMHB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5iZXN0X2Zvb2RfdGFicyB7XFxuICBoZWlnaHQ6IDQ4cHg7IH1cXG4gIC5iZXN0X2Zvb2RfdGFicyA+IGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDQ4cHg7IH1cXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTU5cHg7XFxuICAgICAgcGFkZGluZy10b3A6IDE3cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIGNvbG9yOiAjNzc3OyB9XFxuICAgIC5iZXN0X2Zvb2RfdGFicyA+IGxpOmZvY3VzID4gYSxcXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGk6aG92ZXIgPiBhLFxcbiAgICAuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEubm93IHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMWZjYmM3O1xcbiAgICAgIGNvbG9yOiAjZmZmOyB9XFxuXFxuLmJlc3RfZm9vZF9jb250YWluZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDQ1cHg7IH1cXG4gIC5iZXN0X2Zvb2RfY29udGFpbmVyID4gLmJlc3RfZm9vZF9ib3hfbGlzdCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHdpZHRoOiA5NjBweDtcXG4gICAgbWFyZ2luLXRvcDogMjVweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG4gICAgLmJlc3RfZm9vZF9jb250YWluZXIgPiAuYmVzdF9mb29kX2JveF9saXN0ID4gLmJlc3RfZm9vZF9ib3hfd3JhcCB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIG1hcmdpbjogMCAyNHB4IDEwcHggMDtcXG4gICAgICBjb2xvcjogIzAwMDtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAgICAgLmJlc3RfZm9vZF9jb250YWluZXIgPiAuYmVzdF9mb29kX2JveF9saXN0ID4gLmJlc3RfZm9vZF9ib3hfd3JhcDpsYXN0LWNoaWxkIHtcXG4gICAgICAgIG1hcmdpbjogMDsgfVxcblxcbi5mb29kX2ltZ19ob3ZlciB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICAuZm9vZF9pbWdfaG92ZXIgPiB1bCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTsgfVxcbiAgICAuZm9vZF9pbWdfaG92ZXIgPiB1bCA+IGxpIHtcXG4gICAgICBtYXJnaW46IDAgMTVweCA4cHg7XFxuICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIC5mb29kX2ltZ19ob3ZlciA+IHVsID4gbGkgPiBzcGFuIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDEzcHggMCA0cHg7IH1cXG4gICAgICAuZm9vZF9pbWdfaG92ZXIgPiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcXG4gICAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL21haW4vZGVsaXZlcnlfbGluZS5wbmcpIHJlcGVhdC14IDAgMDsgfVxcblxcbi5iZXN0X2Zvb2RfYm94IHtcXG4gIHdpZHRoOiAzMDRweDtcXG4gIGhlaWdodDogNDI5cHg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94OmhvdmVyIC5mb29kX2ltZ19ob3ZlcixcXG4gIC5iZXN0X2Zvb2RfYm94OmZvY3VzIC5mb29kX2ltZ19ob3ZlciB7XFxuICAgIGhlaWdodDogMzA0cHg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfaW1nID4gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3Qge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjczcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgbWFyZ2luOiAwIDAgMTBweCAxMHB4OyB9XFxuICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCB7XFxuICAgIHBhZGRpbmc6IDE4cHggMjBweCAxNXB4O1xcbiAgICBoZWlnaHQ6IDkwcHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG4gICAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF90aXRsZSB7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0xLjJweDtcXG4gICAgICBmb250LXNpemU6IDE3cHg7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX2Rlc2NyaXB0aW9uIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3ByaWNlIHtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyB9XFxuXFxuLmluZmluaXRlX2Zvb2Qge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IHtcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDY3MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF90aXRsZSB7XFxuICAgICAgbWFyZ2luOiA3MHB4IDAgMzdweDsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF9jb250YWluZXIge1xcbiAgICAgIGhlaWdodDogMzQ2cHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCA+IC5pbmZpbml0ZV9mb29kX2NvbnRhaW5lciA+IC5pbmZpbml0ZV9mb29kX2JveF9saXN0IHtcXG4gICAgICAgIHdpZHRoOiAxMDAwJTtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7IH1cXG4gICAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IC5pbmZpbml0ZV9idG4ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG1hcmdpbjogMzhweCBhdXRvO1xcbiAgICAgIHBhZGRpbmc6IDE1cHggMCAxN3B4O1xcbiAgICAgIHdpZHRoOiA5ODBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGNvbG9yOiAjMzMzO1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkN2Q3ZDc7IH1cXG4gICAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgLmluZmluaXRlX2J0biA+IHNwYW4ge1xcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTRweDtcXG4gICAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL21haW4vYnRuX2Fycl9tb3JlLnBuZykgbm8tcmVwZWF0IHJpZ2h0OyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiBhIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMjU3cHg7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogNTJweDtcXG4gIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idG5fcHJkc190aHVtYl9zbGlkZXNfbmF2aS5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyOyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXYge1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC01NThweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wOyB9XFxuICAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldjpob3ZlciwgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXY6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IC01MnB4OyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX25leHQge1xcbiAgcmlnaHQ6IDUwJTtcXG4gIG1hcmdpbi1yaWdodDogLTU1OHB4O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgdG9wOyB9XFxuICAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dDpob3ZlciwgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX25leHQ6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAtNTJweDsgfVxcblxcbi5zaWRlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5ibWYua3IvYmFubmVyL21haW5fZXZlbnQvMTcxMjE0LzE1MTMyNDM3MTI2ODNfMWUwYTYzMTI1OTllLmpwZyk7IH1cXG4gIC5zaWRlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIGhlaWdodDogMTQwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLm1haW5fZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci9iYW5uZXIvbWFpbl9ldmVudC8xNzA2MjgvMTQ5ODYzOTc1MTI3Ml9lNmNhZGJkYTY1YjQuanBnKTsgfVxcbiAgLm1haW5fZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiAxNDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uY291cnNlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5ibWYua3IvYmFubmVyL21haW5fZXZlbnQvMTcwNDI1LzE0OTMwODI3NDQ0MDFfYmE5ODMxZTRlMmJiLnBuZyk7IH1cXG4gIC5jb3Vyc2VfZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiAxNDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4udGh1bWJfaW1nIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMjE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAudGh1bWJfaW1nID4gcCA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJTsgfVxcbiAgLnRodW1iX2ltZyA+IC5jaXJjbGVfbWFzayB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vY2lyY2xlX21hc2sucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcXG4gICAgd2lkdGg6IDIxNXB4O1xcbiAgICBoZWlnaHQ6IDIxNXB4OyB9XFxuXFxuLnByZF9ib3gge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDIxNXB4O1xcbiAgbWFyZ2luOiAwcHggMTVweCA4cHg7IH1cXG4gIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG4gICAgLnByZF9ib3ggPiBhID4gLmJhZGdlX2xpc3QgPiAuYmFkZ2Uge1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4ucHJkX2RldGFpbCB7XFxuICBwYWRkaW5nOiAxOHB4IDEwcHggMTJweCAxMHB4OyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfdGl0bGUge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0xLjJweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfZGVzY3JpcHRpb24ge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMS4ycHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2Uge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5zY3JvbGxlciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiA3MHB4O1xcbiAgbGVmdDogNzklOyB9XFxuICAuc2Nyb2xsZXIgPiBsaSA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL2J0bl9wYWdlX3VwX2Rvd25fbmV3LnBuZykgbm8tcmVwZWF0OyB9XFxuICAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGEge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIHRvcDsgfVxcbiAgICAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGE6aG92ZXIsIC5zY3JvbGxlciA+IC5wYWdlX3VwID4gYTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTUwcHggdG9wOyB9XFxuICAuc2Nyb2xsZXIgPiAucGFnZV9kb3duID4gYSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgLTUwcHg7IH1cXG4gICAgLnNjcm9sbGVyID4gLnBhZ2VfZG93biA+IGE6aG92ZXIsIC5zY3JvbGxlciA+IC5wYWdlX2Rvd24gPiBhOmZvY3VzIHtcXG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtNTBweCAtNTBweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vY3NzL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGRlbGVnYXRlLFxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgc2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgaXNWYWxpZCxcclxuICAgIG1vdmVTY3JvbGwsXHJcbiAgICBmZXRjaEpTT05QXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybExpc3QsIG1haW5TbGlkZVZpZXcsIGJlc3RCYW5jaGFuVmlldywgc2Nyb2xsZXJWaWV3LCBhdXRvQ29tcGxldGVWaWV3LCAuLi5pbmZpbml0ZVZpZXdzKSB7XHJcbiAgICAgICAgdGhpcy51cmxMaXN0ID0gdXJsTGlzdDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcgPSBtYWluU2xpZGVWaWV3O1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3ID0gYmVzdEJhbmNoYW5WaWV3O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3ID0gc2Nyb2xsZXJWaWV3O1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldyA9IGF1dG9Db21wbGV0ZVZpZXc7XHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzID0gaW5maW5pdGVWaWV3cztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hNYWluU2xpZGUodGhpcy51cmxMaXN0Lm1haW5TbGlkZSk7XHJcbiAgICAgICAgdGhpcy5mZXRjaEJlc3RCYW5jaGFuKHRoaXMudXJsTGlzdC5iZXN0QmFuY2hhbik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cy5mb3JFYWNoKGluZmluaXRlVmlldyA9PlxyXG4gICAgICAgICAgICB0aGlzLmZldGNoSW5maW5pdGVTbGlkZShpbmZpbml0ZVZpZXcsIHRoaXMudXJsTGlzdFtpbmZpbml0ZVZpZXcubmFtZV0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxlclZpZXcuYmluZCgnY2xpY2snKS5iaW5kKCdoaWRlJylcclxuICAgICAgICAgICAgLm9uKCdAbW92ZScsIGUgPT4gdGhpcy5tb3ZlU2Nyb2xsZXIoZS5kZXRhaWwuZGlyZWN0aW9uKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5iaW5kKCdwcmVzcycpLmJpbmQoJ3N1Ym1pdCcpLmJpbmQoJ2hpc3RvcnknKVxyXG4gICAgICAgICAgICAuYmluZCgnY2xpY2tTdWdnZXN0aW9uJykuYmluZCgnbm9uQ2xpY2snKS5iaW5kKCdob3ZlcicpXHJcbiAgICAgICAgICAgIC5vbignQHByZXNzJywgZSA9PiB0aGlzLnByZXNzQXV0b0NvbXBsZXRlKGUuZGV0YWlsKSlcclxuICAgICAgICAgICAgLm9uKCdAc3VibWl0JywgZSA9PiB0aGlzLnN1Ym1pdEtleXdvcmQoZS5kZXRhaWwua2V5d29yZCkpXHJcbiAgICAgICAgICAgIC5vbignQGhpc3RvcnknLCAoKSA9PiB0aGlzLmZldGNoSGlzdG9yeSgpKTtcclxuXHJcbiAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnYScsICdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaE1haW5TbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcucmVuZGVyKCdtYWluU2xpZGUnLCB0aGlzLnNsaWRlSW1ncylcclxuICAgICAgICAgICAgLmJpbmQoJ3NsaWRlc05hdmknKS5iaW5kKCdzbGlkZXNEb3RzJylcclxuICAgICAgICAgICAgLm9uKCdAc2VsZWN0RG90JywgZSA9PiB0aGlzLnNlbGVjdFNsaWRlKGUuZGV0YWlsLmluZGV4KSlcclxuICAgICAgICAgICAgLm9uKCdAbW92ZScsIGUgPT4gdGhpcy5tb3ZlU2xpZGUoZS5kZXRhaWwpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2xpZGUoe1xyXG4gICAgICAgIGluZGV4LFxyXG4gICAgICAgIGRpcmVjdGlvblxyXG4gICAgfSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaW5kZXggKz0gZGlyZWN0aW9uO1xyXG4gICAgICAgIGlmIChpbmRleCA+IHNsaWRlc0VuZCkgaW5kZXggPSAwO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIGluZGV4ID0gc2xpZGVzRW5kO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdFNsaWRlKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RTbGlkZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5oaWRlU2xpZGUoKS5zZXRJbmRleChpbmRleCkuc2hvd1NsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNjcm9sbGVyKGRpcmVjdGlvbikge1xyXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gJ3VwJyA/IG1vdmVTY3JvbGwoMCkgOiBtb3ZlU2Nyb2xsKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVzc0F1dG9Db21wbGV0ZSh7XHJcbiAgICAgICAgdGVybSxcclxuICAgICAgICBrZXksXHJcbiAgICAgICAgaXNTZWxlY3RlZFxyXG4gICAgfSkge1xyXG4gICAgICAgIGNvbnN0IGlzVXAgPSAoa2V5KSA9PiBrZXkgPT09IDM4O1xyXG4gICAgICAgIGNvbnN0IGlzZG93biA9IChrZXkpID0+IGtleSA9PT0gNDA7XHJcbiAgICAgICAgY29uc3QgaXNFU0MgPSAoa2V5KSA9PiBrZXkgPT09IDI3O1xyXG4gICAgICAgIGNvbnN0IGlzRW50ZXIgPSAoa2V5KSA9PiBrZXkgPT09IDEzO1xyXG4gICAgICAgIGNvbnN0IGlzU3RyaW5nID0gKGtleSkgPT4ga2V5IDwgMzUgfHwga2V5ID4gNDA7XHJcblxyXG4gICAgICAgIGlmIChpc1VwKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LnVwU2VsKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc2Rvd24oa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZG93blNlbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0Moa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRW50ZXIoa2V5KSkge1xyXG4gICAgICAgICAgICBpc1NlbGVjdGVkID8gdGhpcy5hdXRvQ29tcGxldGVWaWV3LnNldFNlYXJjaGJhcigpIDogdGhpcy5zdWJtaXRLZXl3b3JkKHRlcm0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoa2V5KSkge1xyXG4gICAgICAgICAgICB0ZXJtID8gdGhpcy5mZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSA6IHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSB7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHRoaXMudXJsTGlzdC5hdXRvQ29tcGxldGUgKyB0ZXJtLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRLZXl3b3JkKGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5lbXB0eVNlYXJjaGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEhpc3RvcnkoKSB7XHJcbiAgICAgICAgY29uc3QgaGlzdG9yeSA9IGF3YWl0IGdldExvY2FsU3RvcmFnZSgnaGlzdG9yeScpO1xyXG4gICAgICAgIGhpc3RvcnkgJiYgdGhpcy5hdXRvQ29tcGxldGVWaWV3LnJlbmRlcignaGlzdG9yeScsIGhpc3Rvcnkuc2xpY2UoLTUpLnJldmVyc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hCZXN0QmFuY2hhbih1cmwpIHtcclxuICAgICAgICBjb25zdCBmb29kRGF0YSA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLmJlc3RCYW5jaGFuVmlldy5yZW5kZXIoJ2Jlc3RCYW5jaGFuJywgZm9vZERhdGEpLmJpbmQoJ2Zvb2RUYWInKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEluZmluaXRlU2xpZGUodGFyZ2V0VmlldywgdXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZm9vZERhdGEubGVuZ3RoICogMi41O1xyXG4gICAgICAgIHRhcmdldFZpZXcuc2V0VGhyZXNob2xkKHRocmVzaG9sZClcclxuICAgICAgICAgICAgLnJlbmRlcignYmFuY2hhbicsIGZvb2REYXRhKS5iaW5kKCd0cmFuc2l0aW9uZW5kJylcclxuICAgICAgICAgICAgLmJpbmQoJ3NsaWRlc05hdmknKS5iaW5kKCd0b3VjaCcpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmNhbGwodGFyZ2V0VmlldywgZS5kZXRhaWwuZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgLm9uKCdAdHJhbnNpdGlvbmVuZCcsICgpID0+IHRoaXMucmVzZXRJbmZpbml0ZVNsaWRlcy5jYWxsKHRhcmdldFZpZXcpKVxyXG4gICAgICAgICAgICAub24oJ0B0b3VjaG1vdmUnLCBlID0+IHRoaXMuY2hlY2tNb3ZlVHlwZS5jYWxsKHRhcmdldFZpZXcsIGUuZGV0YWlsLngsIGUuZGV0YWlsLnkpKVxyXG4gICAgICAgICAgICAub24oJ0B0b3VjaGVuZCcsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Vmlldy5zdGF0ZS5tb3ZlVHlwZSA8IDAgJiYgdGhpcy5jaGVja01vdmVUeXBlLmNhbGwodGFyZ2V0VmlldywgZS5kZXRhaWwueCwgZS5kZXRhaWwueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRGlzdGFuY2UodGFyZ2V0Vmlldyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRWaWV3LmluaXRUb3VjaEluZm8oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEaXN0YW5jZSh0YXJnZXRWaWV3KSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIHN0YXJ0SW5kZXhcclxuICAgICAgICB9ID0gdGFyZ2V0Vmlldy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBIZGlzdGFuY2UgPSBzdGFydEluZGV4IC0gaW5kZXg7XHJcbiAgICAgICAgaWYgKEhkaXN0YW5jZSA+IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlSW5maW5pdGVTbGlkZXMuY2FsbCh0YXJnZXRWaWV3LCBIZGlzdGFuY2UgLSAxMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChIZGlzdGFuY2UgPCAtMikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5jYWxsKHRhcmdldFZpZXcsIEhkaXN0YW5jZSArIDEwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVJbmZpbml0ZVNsaWRlcy5jYWxsKHRhcmdldFZpZXcsIEhkaXN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrTW92ZVR5cGUoeCwgeSkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgc3RhcnRYLFxyXG4gICAgICAgICAgICBzdGFydFksXHJcbiAgICAgICAgICAgIHN0YXJ0SW5kZXgsXHJcbiAgICAgICAgICAgIEhTbG9wZVxyXG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IEhkaXN0YW5jZSA9IChzdGFydFggLSB4KSAvIDEwMDtcclxuICAgICAgICB0aGlzLnNldEluZGV4KHN0YXJ0SW5kZXggLSBIZGlzdGFuY2UpLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICBJbW1lZGlhdGVseTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtb3ZlWCA9IE1hdGguYWJzKHN0YXJ0WCAtIHgpO1xyXG4gICAgICAgIGNvbnN0IG1vdmVZID0gTWF0aC5hYnMoc3RhcnRZIC0geSk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBtb3ZlWCArIG1vdmVZO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA8IDI1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzbG9wZSA9IHBhcnNlRmxvYXQoKG1vdmVZIC8gbW92ZVgpLnRvRml4ZWQoMiksIDEwKTtcclxuICAgICAgICBzbG9wZSA+IEhTbG9wZSA/IHRoaXMuc2V0TW92ZVR5cGUoMSkgOiB0aGlzLnNldE1vdmVUeXBlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVJbmZpbml0ZVNsaWRlcyhkaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnNldEluZGV4KHRoaXMuc3RhdGUuaW5kZXggKz0gZGlyZWN0aW9uKS5zaG93U2xpZGVzKHtcclxuICAgICAgICAgICAgSW1tZWRpYXRlbHk6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRJbmZpbml0ZVNsaWRlcygpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICB0aHJlc2hvbGRMLFxyXG4gICAgICAgICAgICB0aHJlc2hvbGRSXHJcbiAgICAgICAgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKGluZGV4IDw9IHRocmVzaG9sZEwgfHwgaW5kZXggPj0gdGhyZXNob2xkUikge1xyXG4gICAgICAgICAgICB0aGlzLnNldEluZGV4KC0yMCkuc2hvd1NsaWRlcyh7XHJcbiAgICAgICAgICAgICAgICBJbW1lZGlhdGVseTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tMb2NhbFN0b3JhZ2Uoa2V5LCBpc0pTT05QKSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSBnZXRMb2NhbFN0b3JhZ2Uoa2V5KTtcclxuICAgICAgICBpZiAoY2FjaGUgJiYgaXNWYWxpZChjYWNoZS50aW1lLCA2KSkgcmV0dXJuIGNhY2hlLmRhdGE7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IGlzSlNPTlAgPyAoYXdhaXQgZmV0Y2hKU09OUChrZXkpKVsxXSA6IGF3YWl0IHJlcXVlc3Qoa2V5KSxcclxuICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmRhdGEuaGFzT3duUHJvcGVydHkoJ2Vycm9yJykgPyBmYWxzZSA6IHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb250cm9sbGVyLmpzIiwiaW1wb3J0IG1haW5TbGlkZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL21haW5TbGlkZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICB0aHJvdHRsZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNOYXZpOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICtlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQHNlbGVjdERvdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6ICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIG1haW5TbGlkZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluU2xpZGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5TbGlkZShzbGlkZUltZ3MpIHtcclxuICAgICAgICB0aGlzLnJlbmRlck1haW5TbGlkZShzbGlkZUltZ3MpLnNob3dTbGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck1haW5TbGlkZShzbGlkZUltZ3MpIHtcclxuICAgICAgICBjb25zdCBtYWluU2xpZGVTdHIgPSBtYWluU2xpZGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIHNsaWRlSW1nc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWFpblNsaWRlU3RyKTtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsID0gdGhpcy5xc2EoJy5tYWluX3NsaWRlc19saXN0ID4gbGknKTtcclxuICAgICAgICB0aGlzLmRvdHNFbCA9IHRoaXMucXNhKCcuc2xpZGVzX2RvdHMgPiBsaSA+IGEnKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlU2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFt0aGlzLnN0YXRlLmluZGV4XS5jbGFzc05hbWUgPSAnZmFkZW91dCc7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm93Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVpbic7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgIDxsaSBjbGFzcz1cXFwiZmFkZW91dFxcXCIgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIiknPlxcclxcbiAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCI+PC9hPlxcclxcbiAgICA8L2xpPlxcclxcblwiO1xufSxcIjNcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiICAgIDxsaT5cXHJcXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmluZGV4IHx8IChkYXRhICYmIGRhdGEuaW5kZXgpKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJpbmRleFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxyXFxuICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSk7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJtYWluX3NsaWRlc19saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChhbGlhczEsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNsaWRlSW1ncyA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L3VsPlxcclxcbjx1bCBjbGFzcz1cXFwic2xpZGVzX2RvdHNcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGFsaWFzMSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2xpZGVJbWdzIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDMsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvdWw+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL21haW5TbGlkZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgYmFzZSBmcm9tICcuL2hhbmRsZWJhcnMvYmFzZSc7XG5cbi8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbi8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG5pbXBvcnQgU2FmZVN0cmluZyBmcm9tICcuL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2hhbmRsZWJhcnMvZXhjZXB0aW9uJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vaGFuZGxlYmFycy91dGlscyc7XG5pbXBvcnQgKiBhcyBydW50aW1lIGZyb20gJy4vaGFuZGxlYmFycy9ydW50aW1lJztcblxuaW1wb3J0IG5vQ29uZmxpY3QgZnJvbSAnLi9oYW5kbGViYXJzL25vLWNvbmZsaWN0JztcblxuLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gIGxldCBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gIGhiLlNhZmVTdHJpbmcgPSBTYWZlU3RyaW5nO1xuICBoYi5FeGNlcHRpb24gPSBFeGNlcHRpb247XG4gIGhiLlV0aWxzID0gVXRpbHM7XG4gIGhiLmVzY2FwZUV4cHJlc3Npb24gPSBVdGlscy5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICB9O1xuXG4gIHJldHVybiBoYjtcbn1cblxubGV0IGluc3QgPSBjcmVhdGUoKTtcbmluc3QuY3JlYXRlID0gY3JlYXRlO1xuXG5ub0NvbmZsaWN0KGluc3QpO1xuXG5pbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJpbXBvcnQgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlckVhY2ggZnJvbSAnLi9oZWxwZXJzL2VhY2gnO1xuaW1wb3J0IHJlZ2lzdGVySGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVySWYgZnJvbSAnLi9oZWxwZXJzL2lmJztcbmltcG9ydCByZWdpc3RlckxvZyBmcm9tICcuL2hlbHBlcnMvbG9nJztcbmltcG9ydCByZWdpc3Rlckxvb2t1cCBmcm9tICcuL2hlbHBlcnMvbG9va3VwJztcbmltcG9ydCByZWdpc3RlcldpdGggZnJvbSAnLi9oZWxwZXJzL3dpdGgnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyRWFjaChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySGVscGVyTWlzc2luZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVySWYoaW5zdGFuY2UpO1xuICByZWdpc3RlckxvZyhpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9va3VwKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJXaXRoKGluc3RhbmNlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgY3JlYXRlRnJhbWUsIGlzQXJyYXl9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBsZXQgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0FycmF5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTXVzdCBwYXNzIGl0ZXJhdG9yIHRvICNlYWNoJyk7XG4gICAgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbixcbiAgICAgICAgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHJldCA9ICcnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjb250ZXh0UGF0aDtcblxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhlY0l0ZXJhdGlvbihmaWVsZCwgaW5kZXgsIGxhc3QpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEua2V5ID0gZmllbGQ7XG4gICAgICAgIGRhdGEuaW5kZXggPSBpbmRleDtcbiAgICAgICAgZGF0YS5maXJzdCA9IGluZGV4ID09PSAwO1xuICAgICAgICBkYXRhLmxhc3QgPSAhIWxhc3Q7XG5cbiAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG4gICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoICsgZmllbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtmaWVsZF0sIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0W2ZpZWxkXSwgZmllbGRdLCBbY29udGV4dFBhdGggKyBmaWVsZCwgbnVsbF0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24oaSwgaSwgaSA9PT0gY29udGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwcmlvcktleTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmIChjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuICAgICAgICAgICAgLy8gdGhlIGxhc3QgaXRlcmF0aW9uIHdpdGhvdXQgaGF2ZSB0byBzY2FuIHRoZSBvYmplY3QgdHdpY2UgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYW4gaXRlcm1lZGlhdGUga2V5cyBhcnJheS5cbiAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyIsImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiLCJpbXBvcnQge2lzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb25kaXRpb25hbCkpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJlbmRlciB0aGUgcG9zaXRpdmUgcGF0aCBpZiB0aGUgdmFsdWUgaXMgdHJ1dGh5IGFuZCBub3QgZW1wdHkuXG4gICAgLy8gVGhlIGBpbmNsdWRlWmVyb2Agb3B0aW9uIG1heSBiZSBzZXQgdG8gdHJlYXQgdGhlIGNvbmR0aW9uYWwgYXMgcHVyZWx5IG5vdCBlbXB0eSBiYXNlZCBvbiB0aGVcbiAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuICAgIGlmICgoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwpIHx8IGlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2h9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9pZi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbigvKiBtZXNzYWdlLCBvcHRpb25zICovKSB7XG4gICAgbGV0IGFyZ3MgPSBbdW5kZWZpbmVkXSxcbiAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICBsZXQgbGV2ZWwgPSAxO1xuICAgIGlmIChvcHRpb25zLmhhc2gubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmhhc2gubGV2ZWw7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5kYXRhLmxldmVsO1xuICAgIH1cbiAgICBhcmdzWzBdID0gbGV2ZWw7XG5cbiAgICBpbnN0YW5jZS5sb2coLi4uIGFyZ3MpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFpc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0XSwgW2RhdGEgJiYgZGF0YS5jb250ZXh0UGF0aF0pXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyIsImltcG9ydCByZWdpc3RlcklubGluZSBmcm9tICcuL2RlY29yYXRvcnMvaW5saW5lJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJJbmxpbmUoaW5zdGFuY2UpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZGVjb3JhdG9ycy5qcyIsImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZGVjb3JhdG9ycy9pbmxpbmUuanMiLCJpbXBvcnQge2luZGV4T2Z9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG4gIGxldmVsOiAnaW5mbycsXG5cbiAgLy8gTWFwcyBhIGdpdmVuIGxldmVsIHZhbHVlIHRvIHRoZSBgbWV0aG9kTWFwYCBpbmRleGVzIGFib3ZlLlxuICBsb29rdXBMZXZlbDogZnVuY3Rpb24obGV2ZWwpIHtcbiAgICBpZiAodHlwZW9mIGxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGxldmVsTWFwID0gaW5kZXhPZihsb2dnZXIubWV0aG9kTWFwLCBsZXZlbC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChsZXZlbE1hcCA+PSAwKSB7XG4gICAgICAgIGxldmVsID0gbGV2ZWxNYXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXZlbCA9IHBhcnNlSW50KGxldmVsLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9LFxuXG4gIC8vIENhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIC4uLm1lc3NhZ2UpIHtcbiAgICBsZXZlbCA9IGxvZ2dlci5sb29rdXBMZXZlbChsZXZlbCk7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGxvZ2dlci5sb29rdXBMZXZlbChsb2dnZXIubGV2ZWwpIDw9IGxldmVsKSB7XG4gICAgICBsZXQgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAoIWNvbnNvbGVbbWV0aG9kXSkgeyAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBtZXRob2QgPSAnbG9nJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5tZXNzYWdlKTsgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwiLy8gQnVpbGQgb3V0IG91ciBiYXNpYyBTYWZlU3RyaW5nIHR5cGVcbmZ1bmN0aW9uIFNhZmVTdHJpbmcoc3RyaW5nKSB7XG4gIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xufVxuXG5TYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IFNhZmVTdHJpbmcucHJvdG90eXBlLnRvSFRNTCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJycgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNhZmVTdHJpbmc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbGV0IHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyxcbiAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBIYW5kbGViYXJzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocm9vdC5IYW5kbGViYXJzID09PSBIYW5kbGViYXJzKSB7XG4gICAgICByb290LkhhbmRsZWJhcnMgPSAkSGFuZGxlYmFycztcbiAgICB9XG4gICAgcmV0dXJuIEhhbmRsZWJhcnM7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QuanMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJpbXBvcnQgZm9vZEJveFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZm9vZFRhYlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWwnO1xyXG5pbXBvcnQgY29udGFpbmVyVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJ2xpID4gYScsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kVGFiTGlzdEVsKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiID09PSBlLmRlbGVnYXRlVGFyZ2V0ID8gJ25vdycgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RCb3hMaXN0RWwpLmZvckVhY2goZm9vZCA9PiBmb29kLnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnlfaWQgPT09IGZvb2QuZGF0YXNldC5jYXRlZ29yeV9pZCA/ICdmbGV4JyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJlc3RCYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3RCYW5jaGFuKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBiZXN0QmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiKGZvb2QpLnJlbmRlckZvb2RDb250YWluZXIoZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpLnJlbmRlckZvb2RCb3goZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlclNlbGVjdGVkRm9vZChmb29kLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZFRhYkVsID0gdGhpcy5xcygnLmJlc3RfZm9vZF90YWJzJyk7XHJcbiAgICAgICAgY29uc3QgZm9vZFRhYiA9IGZvb2QubWFwKHZhbHVlID0+IGZvb2RUYWJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZCxcclxuICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZVxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBmb29kVGFiRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZFRhYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZENvbnRhaW5lcihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lckVsID0gdGhpcy5xcygnLmJlc3RfZm9vZF9jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBmb29kQ29udGFpbmVyID0gZm9vZC5tYXAodmFsdWUgPT4gY29udGFpbmVyVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWRcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgZm9vZENvbnRhaW5lckVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RDb250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGZvb2QpIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwgPSB0aGlzLnFzYSgnLmJlc3RfZm9vZF9ib3hfbGlzdCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSB2YWx1ZS5pdGVtcy5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgZm9vZEJveFRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2ldLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94RWwgPSB0aGlzLnFzYSgnLmJlc3RfZm9vZF9ib3gnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFsdWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWxlY3RlZEZvb2QoZm9vZCwgaW5pdE51bSkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbCA9IHRoaXMucXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X3dyYXBcXFwiPlxcclxcbiAgICA8bGkgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9vZF9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGFsdD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmFsdCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYWx0IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJhbHRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsIGNsYXNzPVxcXCJmb29kX2RldGFpbFxcXCI+XFxyXFxuICAgICAgICAgICAgPGR0IGNsYXNzPVxcXCJmb29kX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwiZm9vZF9kZXNjcmlwdGlvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmRlc2NyaXB0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZXNjcmlwdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiZGVzY3JpcHRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kZD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfcHJpY2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwib2xkX3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMub2xkX3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5vbGRfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm9sZF9wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJuZXdfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uZXdfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5ld19wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmV3X3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLndvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAud29uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ3b25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwvZGw+XFxyXFxuICAgIDwvbGk+XFxyXFxuPC9hPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaT5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZFRhYi10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlcjtcblxuICByZXR1cm4gXCI8dWwgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfbGlzdFxcXCIgZGF0YS1jYXRlZ29yeV9pZD1cXFwiXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwiY2F0ZWdvcnlfaWRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj48L3VsPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9jb250YWluZXItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLnNjcm9sbGVyID4gbGkgPiBhJyxcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLCBlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogZS5kZWxlZ2F0ZVRhcmdldC5kYXRhc2V0LmRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gd2luZG93LnNjcm9sbFkgPiA5MCA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9TY3JvbGxlclZpZXcuanMiLCJpbXBvcnQgZm9vZEJveEluZmluaXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsID0gdGhpcy5xcygnLmluZmluaXRlX2Zvb2RfYm94X2xpc3QnKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgSFNsb3BlOiAoKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC8gd2luZG93LmlubmVyV2lkdGgpLnRvRml4ZWQoMikgKiAxLFxyXG4gICAgICAgICAgICBpbmRleDogLTIwLFxyXG4gICAgICAgICAgICBzdGFydEluZGV4OiAtMjAsXHJcbiAgICAgICAgICAgIG1vdmVUeXBlOiAtMSxcclxuICAgICAgICAgICAgc3RhcnRYOiAtMSxcclxuICAgICAgICAgICAgc3RhcnRZOiAtMSxcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgICAgICBzdGFydEV2ZW50OiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4gdGhpcy5lbWl0KCdAdHJhbnNpdGlvbmVuZCcpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmF2aTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJywgdGhyb3R0bGUoZSA9PiB0aGlzLmVtaXQoJ0Btb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogK2UuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgIH0pLCAxMDAwKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvdWNoOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgdGhyb3R0bGUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VG91Y2hJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydEluZGV4ID0gTWF0aC5jZWlsKHRoaXMuc3RhdGUuaW5kZXggLyAxMCkgKiAxMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnRUaW1lID0gZS50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydEV2ZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub24oJ3RvdWNobW92ZScsIGUgPT4gdGhpcy5zdGF0ZS5zdGFydEV2ZW50ICYmIHRoaXMuZW1pdCgnQHRvdWNobW92ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVlcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub24oJ3RvdWNoZW5kJywgZSA9PiB0aGlzLnN0YXRlLnN0YXJ0RXZlbnQgJiYgdGhpcy5lbWl0KCdAdG91Y2hlbmQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmNoYW4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QoZm9vZCkucmVuZGVyRm9vZEJveE9wdGlvbihmb29kKS5yZW5kZXJTbGlkZXMoKS5zaG93U2xpZGVzKHtcclxuICAgICAgICAgICAgSW1tZWRpYXRlbHk6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSBmb29kLm1hcChpdGVtID0+IGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveE9wdGlvbihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgcHJkQm94ID0gdGhpcy5xc2EoJy5wcmRfYm94PmEnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2xpZGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHRoaXMucXNhKCcucHJkX2JveCcpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RTbGlkZXMgPSBBcnJheS5mcm9tKHNsaWRlcykuc2xpY2UoLTQpO1xyXG5cclxuICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB0aGlzLmZvb2RCb3hMaXN0RWwuYXBwZW5kQ2hpbGQoc2xpZGUuY2xvbmVOb2RlKHRydWUpKSk7XHJcbiAgICAgICAgbGFzdFNsaWRlcy5yZXZlcnNlKCkuZm9yRWFjaChsYXN0U2xpZGUgPT4gdGhpcy5mb29kQm94TGlzdEVsLmluc2VydEJlZm9yZShsYXN0U2xpZGUuY2xvbmVOb2RlKHRydWUpLCB0aGlzLmZvb2RCb3hMaXN0RWwuY2hpbGROb2Rlc1swXSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZXMoe1xyXG4gICAgICAgIEltbWVkaWF0ZWx5XHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IEltbWVkaWF0ZWx5ID8gJzBzJyA6ICcwLjVzJztcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0aGlzLnN0YXRlLmluZGV4fSUpYDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0VG91Y2hJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUubW92ZVR5cGUgPSAtMTtcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0WCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRZID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnRFdmVudCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vdmVUeXBlKHR5cGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLm1vdmVUeXBlID0gdHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaHJlc2hvbGQodGhyZXNob2xkKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS50aHJlc2hvbGRMID0gLTIwIC0gdGhyZXNob2xkO1xyXG4gICAgICAgIHRoaXMuc3RhdGUudGhyZXNob2xkUiA9IC0yMCArIHRocmVzaG9sZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwicHJkX2JveFxcXCI+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidGh1bWJfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8cD5cXHJcXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgICAgIDwvcD5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjaXJjbGVfbWFza1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwicHJkX2RldGFpbFxcXCI+XFxyXFxuICAgICAgICAgICAgPGR0IGNsYXNzPVxcXCJwcmRfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJwcmRfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJwcmRfcHJpY2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwib2xkX3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMub2xkX3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5vbGRfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm9sZF9wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJuZXdfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uZXdfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5ld19wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmV3X3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLndvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAud29uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ3b25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwvZGw+XFxyXFxuICAgIDwvYT5cXHJcXG48L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhdXRvY29tcGxldGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgZGVsZWdhdGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsID0gdGhpcy5xcygnI3NlYXJjaF9zdHInKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwgPSB0aGlzLnFzKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdXR0b25FbCA9IHRoaXMucXMoJy5zZWFyY2hfYnRuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBwcmVzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbigna2V5dXAnLCBlID0+IHRoaXMuZW1pdCgnQHByZXNzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleTogZS5rZXlDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICEhdGhpcy5zZWxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2VhcmNoX2J0bicsICdjbGljaycsICgpID0+IHRoaXMuZW1pdCgnQHN1Ym1pdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiB0aGlzLnNlYXJjaEVsLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJyNzZWFyY2hfc3RyJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiAhdGhpcy5pc09wZW4oKSAmJiAhdGhpcy5zZWFyY2hFbC52YWx1ZSAmJiB0aGlzLmVtaXQoJ0BoaXN0b3J5JykpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGlja1N1Z2dlc3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KS5zZXRTZWFyY2hiYXIoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICcqJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICBlID0+IGUudGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEVsICYmIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdmVyJywgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW91dCcsICgpID0+IHRoaXMuZW1wdHlTZWwoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXV0b0NvbXBsZXRlKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoZXMoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckF1dG9Db21wbGV0ZSh0ZXJtLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBSZWdFeHAodGVybSwgJ2knKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc0NvbXBvbmVudCA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlDb21wb25lbnQgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnaGlzdG9yeScsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBzZWFyY2gsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzZWFyY2hcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBoaXN0b3J5Q29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWFyY2hiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9IHRoaXMuc2VsLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5lbXB0eVNlbCgpLmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlTZWFyY2hiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHVwU2VsKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2VsID8gdGhpcy5zZWwucHJldmlvdXNTaWJsaW5nIDogdGhpcy5zdWdnZXN0aW9uc0VsLmxhc3RDaGlsZDtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuc2V0U2VsKHRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZG93blNlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNlbCA/IHRoaXMuc2VsLm5leHRTaWJsaW5nIDogdGhpcy5zdWdnZXN0aW9uc0VsLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgdGhpcy5lbXB0eVNlbCgpLnNldFNlbCh0YXJnZXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlbCh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnNlbCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VsKCkge1xyXG4gICAgICAgIHRoaXMuc2VsICYmIHRoaXMuc2VsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5zZWwgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgaXNPcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcImF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVyc1tcImNsYXNzXCJdIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMFtcImNsYXNzXCJdIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjbGFzc1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtdmFsdWU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5rZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5rZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJrZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArICgoc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5yZW5kZXJLZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZW5kZXJLZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJyZW5kZXJLZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=