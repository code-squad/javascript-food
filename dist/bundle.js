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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
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
exports.push([module.i, "/* reset styles */\n*,\n*:after,\n*:before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nhtml,\nbody {\n  font-family: 'Nanum Gothic';\n  width: 100%;\n  font-size: 12px;\n  background: #fff; }\n\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n  background: transparent; }\n\ndt {\n  font-weight: bold; }\n\nol,\nul,\ndl {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\n/* Fading animation */\n.fadein {\n  opacity: 1;\n  transition: opacity 2s; }\n\n.fadeout {\n  opacity: 0;\n  transition: opacity 2s; }\n\n/* components styles */\n.food {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto; }\n\n.lnb_wrap {\n  position: relative;\n  background: #fff;\n  border-bottom: 1px solid #e9e9e9; }\n  .lnb_wrap > .lnb_content {\n    display: flex;\n    justify-content: space-between;\n    background: #fff;\n    height: 36px;\n    letter-spacing: -0.2px;\n    width: 980px;\n    margin: 0 auto; }\n    .lnb_wrap > .lnb_content span.ic {\n      display: inline-block;\n      zoom: 1;\n      width: 7px;\n      height: 11px;\n      background: url(https://cdn.bmf.kr/web/common/bul_arr_down.png) no-repeat center 1px;\n      margin-left: 4px; }\n\n.link_app > a {\n  display: block;\n  font-size: 12px;\n  height: 100%;\n  padding: 10px 11px 9px;\n  text-align: center;\n  color: #666; }\n  .link_app > a:hover {\n    color: #2ac1bc; }\n\n.lnb_list {\n  display: flex; }\n  .lnb_list > li > a {\n    display: block;\n    font-size: 12px;\n    padding: 10px 10px 9px 10px;\n    color: #666;\n    background: url(https://cdn.bmf.kr/web/common/util_bar.gif) no-repeat 0 12px; }\n    .lnb_list > li > a:hover {\n      color: #2ac1bc; }\n  .lnb_list > li:first-child > a {\n    background: none; }\n  .lnb_list > li:last-child > a {\n    color: #333;\n    font-weight: bold; }\n\n.header_wrap {\n  display: flex;\n  height: 98px;\n  width: 980px;\n  margin: 0 auto; }\n  .header_wrap > .logo {\n    margin: 16px 0 0 5px; }\n\n.searchbar {\n  position: relative;\n  margin: 30px 0 0 46px; }\n  .searchbar > input {\n    width: 210px;\n    height: 40px;\n    color: #888888;\n    border: 1px solid #cfd0d2;\n    padding: 0px 38px 0px 15px; }\n  .searchbar > button {\n    background: url(https://cdn.bmf.kr/web/common/ic_search.png) no-repeat center 0;\n    width: 38px;\n    height: 38px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    border: 0;\n    cursor: pointer; }\n    .searchbar > button:hover {\n      background-position: center 100%; }\n\n.autocomplete_suggestions {\n  width: 210px;\n  text-align: left;\n  cursor: pointer;\n  z-index: 9999;\n  background: #fff;\n  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);\n  display: block;\n  position: absolute;\n  overflow: hidden; }\n  .autocomplete_suggestions > .autocomplete_suggestion {\n    position: relative;\n    padding: 6px 0 3px 25px;\n    line-height: 23px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1.2em;\n    color: #333; }\n    .autocomplete_suggestions > .autocomplete_suggestion b {\n      font-weight: bold;\n      color: #fe1a1a; }\n    .autocomplete_suggestions > .autocomplete_suggestion.selected {\n      background: #f0f0f0bd; }\n    .autocomplete_suggestions > .autocomplete_suggestion.searches {\n      color: #52188c; }\n\n.gnb_top {\n  display: flex;\n  margin: 0 5px 0 auto; }\n  .gnb_top > li > a {\n    display: block;\n    margin: 25px 0 25px 50px; }\n\n.navi_wrap {\n  position: relative;\n  z-index: 1;\n  background: #483f35; }\n  .navi_wrap > .navi_content {\n    width: 980px;\n    height: 52px;\n    margin: 0 auto; }\n\n.gnb {\n  display: flex; }\n  .gnb > li {\n    width: 124px;\n    height: 52px;\n    position: relative;\n    text-align: left; }\n    .gnb > li > a {\n      display: block;\n      padding: 5px 0 0 1px; }\n      .gnb > li > a > span {\n        display: inline-block;\n        color: white;\n        font-size: 16px;\n        font-weight: bold;\n        padding: 11px 25px 0px; }\n    .gnb > li:first-child {\n      width: 100px; }\n    .gnb > li:nth-child(7) {\n      width: 120px; }\n    .gnb > li:nth-child(8) {\n      width: 140px;\n      background: #362d25;\n      text-align: center; }\n    .gnb > li:hover > a > span, .gnb > li:focus > a > span {\n      background: #fff;\n      color: #2ac1bc; }\n    .gnb > li:hover > ul, .gnb > li:focus > ul {\n      display: block; }\n\n.sub_list {\n  display: none;\n  width: 162px;\n  position: absolute;\n  left: 0;\n  top: 52px;\n  padding: 20px 0 31px;\n  background: #fff;\n  border: 1px solid rgba(72, 63, 53, 0.6);\n  border-top: 0; }\n  .sub_list a {\n    display: block;\n    color: #555;\n    font-size: 14px;\n    line-height: 20px;\n    padding: 6px 0 3px 25px;\n    text-align: left; }\n    .sub_list a:hover > span,\n    .sub_list a:focus > span {\n      font-size: 16px;\n      color: #2ac1bc;\n      font-weight: bold;\n      text-decoration: underline; }\n\n.main_slide {\n  position: relative;\n  text-align: center;\n  max-width: 1920px; }\n\n.main_slides_list {\n  position: relative;\n  height: 420px; }\n  .main_slides_list > li {\n    position: absolute;\n    width: 100%;\n    background: no-repeat center top; }\n    .main_slides_list > li > a {\n      display: block;\n      width: 980px;\n      height: 420px;\n      margin: 0 auto; }\n\n.slides_navi > a {\n  width: 60px;\n  height: 92px;\n  position: absolute;\n  top: 50%;\n  margin-top: -46px;\n  background: url(https://cdn.bmf.kr/web/common/main_slides_navi.png) no-repeat center center; }\n\n.slides_navi > .slides_prev {\n  right: 50%;\n  margin-right: 530px;\n  background-position: left center; }\n\n.slides_navi > .slides_next {\n  left: 50%;\n  margin-left: 530px;\n  background-position: right center; }\n\n.slides_dots {\n  position: relative;\n  bottom: 40px;\n  height: 0; }\n  .slides_dots > li {\n    display: inline-block;\n    vertical-align: top;\n    padding: 0 4px; }\n    .slides_dots > li > a {\n      display: block;\n      width: 10px;\n      height: 0;\n      padding-top: 10px;\n      overflow: hidden;\n      background: #FFF;\n      border-radius: 50%;\n      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n      opacity: 0.6; }\n      .slides_dots > li > a.now {\n        opacity: 1; }\n\n.best_food {\n  background: #eee;\n  text-align: center; }\n  .best_food > .best_food_content {\n    width: 980px;\n    margin: 0 auto; }\n    .best_food > .best_food_content > .best_food_title {\n      padding: 40px 0 30px;\n      position: relative; }\n\n.best_food_tabs {\n  height: 48px; }\n  .best_food_tabs > li {\n    display: inline-block;\n    background-color: #fff;\n    height: 48px; }\n    .best_food_tabs > li > a {\n      display: block;\n      width: 159px;\n      padding-top: 17px;\n      font-weight: bold;\n      height: 100%;\n      font-size: 15px;\n      line-height: 1.2;\n      color: #777; }\n    .best_food_tabs > li:focus > a,\n    .best_food_tabs > li:hover > a,\n    .best_food_tabs > li > a.now {\n      background: #1fcbc7;\n      color: #fff; }\n\n.best_food_container {\n  padding-bottom: 45px; }\n  .best_food_container > .best_food_box_list {\n    display: none;\n    width: 960px;\n    margin-top: 25px;\n    margin-left: 10px; }\n    .best_food_container > .best_food_box_list > .best_food_box_wrap {\n      position: relative;\n      margin: 0 24px 10px 0;\n      color: #000;\n      background: #fff; }\n      .best_food_container > .best_food_box_list > .best_food_box_wrap:last-child {\n        margin: 0; }\n\n.food_img_hover {\n  display: none; }\n  .food_img_hover > ul {\n    position: relative;\n    top: 50%;\n    transform: translateY(-50%); }\n    .food_img_hover > ul > li {\n      margin: 0 15px 8px;\n      font-size: 20px;\n      color: #fff;\n      font-weight: bold;\n      text-align: center; }\n      .food_img_hover > ul > li > span {\n        display: inline-block;\n        padding: 13px 0 4px; }\n      .food_img_hover > ul > li:last-child > span {\n        background: url(https://cdn.bmf.kr/web/main/delivery_line.png) repeat-x 0 0; }\n\n.best_food_box > .badge_list, .prd_box > a > .badge_list {\n  height: 24px;\n  display: flex; }\n  .best_food_box > .badge_list > .badge, .prd_box > a > .badge_list > .badge {\n    padding: 4px 2px 5px;\n    margin-right: 3px;\n    color: #fff;\n    background: #a974bf;\n    width: 62px; }\n\n.best_food_box > .food_detail > .food_price, .prd_detail > .prd_price {\n  display: flex;\n  align-items: center; }\n  .best_food_box > .food_detail > .food_price > .old_price, .prd_detail > .prd_price > .old_price {\n    text-decoration: line-through;\n    font-size: 14px;\n    color: #888; }\n  .best_food_box > .food_detail > .food_price > .new_price, .prd_detail > .prd_price > .new_price {\n    font-family: 'Montserrat', sans-serif;\n    letter-spacing: -2px;\n    margin-left: 9px;\n    color: #2ac1bc;\n    font-size: 26px;\n    font-weight: bold;\n    vertical-align: middle; }\n    .best_food_box > .food_detail > .food_price > .new_price > .won, .prd_detail > .prd_price > .new_price > .won {\n      margin-left: -6px;\n      font-size: 15px;\n      font-weight: bold;\n      top: -3px; }\n\n.best_food_box:hover .food_img_hover,\n.best_food_box:focus .food_img_hover, .prd_box:hover .food_img_hover,\n.prd_box:focus .food_img_hover {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6); }\n\n.best_food_box {\n  width: 304px;\n  height: 429px; }\n  .best_food_box:hover .food_img_hover,\n  .best_food_box:focus .food_img_hover {\n    height: 304px; }\n  .best_food_box > .food_img > img {\n    max-width: 100%;\n    position: relative; }\n  .best_food_box > .badge_list {\n    position: absolute;\n    top: 273px;\n    justify-content: flex-start;\n    margin: 0 0 10px 10px; }\n  .best_food_box > .food_detail {\n    padding: 18px 20px 15px;\n    height: 90px;\n    text-align: left; }\n    .best_food_box > .food_detail > .food_title {\n      letter-spacing: -1.2px;\n      font-size: 17px;\n      margin-bottom: 6px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_description {\n      margin-bottom: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_price {\n      justify-content: flex-end; }\n\n.infinite_food {\n  text-align: center;\n  position: relative; }\n  .infinite_food > .infinite_food_content {\n    width: 980px;\n    height: 670px;\n    margin: 0 auto;\n    overflow: hidden; }\n    .infinite_food > .infinite_food_content > .infinite_food_title {\n      margin: 70px 0 37px; }\n    .infinite_food > .infinite_food_content > .infinite_food_container {\n      height: 346px;\n      overflow: hidden; }\n      .infinite_food > .infinite_food_content > .infinite_food_container > .infinite_food_box_list {\n        width: 1000%;\n        display: flex;\n        justify-content: flex-start; }\n    .infinite_food > .infinite_food_content .infinite_btn {\n      display: block;\n      margin: 38px auto;\n      padding: 15px 0 17px;\n      width: 980px;\n      text-align: center;\n      font-size: 15px;\n      color: #333;\n      border: 1px solid #d7d7d7; }\n      .infinite_food > .infinite_food_content .infinite_btn > span {\n        padding-right: 14px;\n        background: url(https://cdn.bmf.kr/web/main/btn_arr_more.png) no-repeat right; }\n\n.infinite_food_slides_navi > a {\n  position: absolute;\n  top: 257px;\n  width: 28px;\n  height: 52px;\n  background: url(https://cdn.bmf.kr/web/common/btn_prds_thumb_slides_navi.png) no-repeat center center; }\n\n.infinite_food_slides_navi > .slides_prev {\n  left: 50%;\n  margin-left: -558px;\n  background-position: left top; }\n  .infinite_food_slides_navi > .slides_prev:hover, .infinite_food_slides_navi > .slides_prev:focus {\n    background-position: left -52px; }\n\n.infinite_food_slides_navi > .slides_next {\n  right: 50%;\n  margin-right: -558px;\n  background-position: right top; }\n  .infinite_food_slides_navi > .slides_next:hover, .infinite_food_slides_navi > .slides_next:focus {\n    background-position: right -52px; }\n\n.side_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/171214/1513243712683_1e0a6312599e.jpg); }\n  .side_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.main_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170628/1498639751272_e6cadbda65b4.jpg); }\n  .main_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.course_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170425/1493082744401_ba9831e4e2bb.png); }\n  .course_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.thumb_img {\n  position: relative;\n  height: 215px;\n  border-radius: 50%;\n  overflow: hidden; }\n  .thumb_img > p > img {\n    max-width: 100%; }\n  .thumb_img > .circle_mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: url(https://cdn.bmf.kr/web/common/circle_mask.png) no-repeat center center;\n    width: 215px;\n    height: 215px; }\n\n.prd_box {\n  position: relative;\n  width: 215px;\n  margin: 0px 15px 8px; }\n  .prd_box > a > .badge_list {\n    justify-content: center; }\n\n.prd_detail {\n  padding: 18px 10px 12px 10px; }\n  .prd_detail > .prd_title {\n    color: #000;\n    letter-spacing: -1.2px;\n    font-size: 16px;\n    margin-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_description {\n    font-size: 13px;\n    letter-spacing: -1.2px;\n    margin-bottom: 5px;\n    color: #666;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_price {\n    justify-content: center; }\n\n.scroller {\n  display: none;\n  position: fixed;\n  bottom: 70px;\n  left: 79%; }\n  .scroller > li > a {\n    display: block;\n    width: 50px;\n    height: 50px;\n    background: url(https://cdn.bmf.kr/web/common/btn_page_up_down_new.png) no-repeat; }\n  .scroller > .page_up > a {\n    background-position: 0 top; }\n    .scroller > .page_up > a:hover, .scroller > .page_up > a:focus {\n      background-position: -50px top; }\n  .scroller > .page_down > a {\n    background-position: 0 -50px; }\n    .scroller > .page_down > a:hover, .scroller > .page_down > a:focus {\n      background-position: -50px -50px; }\n", ""]);

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
                return _this.fetchInfiniteBanchan(infiniteView, _this.urlList[infiniteView.name]);
            });

            this.scrollerView.bind('click').bind('hide').on('@move', function (e) {
                return _this.moveScroller(e.detail.direction);
            });

            this.autoCompleteView.bind('press').bind('submit').bind('history').bind('clickSuggestion').bind('nonClick').bind('hover').on('@press', function (e) {
                return _this.pressAutoComplete(e.detail);
            }).on('@submit', function (e) {
                return _this.submitKeyword(e.detail.keyword);
            }).on('@history', function () {
                return _this.showHistory();
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
            this.mainSlideView.hideCurrentSlide().setIndex(index).showSlide();
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
                isSeleted = _ref2.isSeleted;

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
                isSeleted ? this.autoCompleteView.setSearchbar() : this.submitKeyword(term);
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
        key: 'showHistory',
        value: async function showHistory() {
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
        key: 'fetchInfiniteBanchan',
        value: async function fetchInfiniteBanchan(targetView, url) {
            var _this3 = this;

            var foodData = await this.checkLocalStorage(url);
            var threshold = foodData.length * 2.5;
            targetView.render('banchan', foodData).bind('transitionend').bind('slidesNavi').on('@move', function (e) {
                return _this3.moveInfiniteSlides.call(targetView, e.detail);
            }).on('@transitionend', function (e) {
                return _this3.resetInfiniteSlides.call(targetView, threshold, e.detail.index);
            });
        }
    }, {
        key: 'moveInfiniteSlides',
        value: function moveInfiniteSlides(_ref3) {
            var index = _ref3.index,
                direction = _ref3.direction;

            this.setIndex(index += direction).showSlides({
                Immediately: false
            });
        }
    }, {
        key: 'resetInfiniteSlides',
        value: function resetInfiniteSlides(threshold, index) {
            var thresholdLeft = -20 - threshold,
                thresholdRight = -20 + threshold;

            if (index === thresholdLeft || index === thresholdRight) {
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

        _this.slidesPrevEl = _this.qs('.slides_prev');
        _this.slidesNextEl = _this.qs('.slides_next');

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
            this.renderMainSlide(slideImgs);
            this.slidesEl = this.qsa('.main_slides_list > li');
            this.dotsEl = this.qsa('.slides_dots > li > a');
            this.showSlide();
        }
    }, {
        key: 'renderMainSlide',
        value: function renderMainSlide(slideImgs) {
            var mainSlideStr = (0, _mainSlideTpl2.default)({
                slide: slideImgs
            });
            this.el.insertAdjacentHTML('afterbegin', mainSlideStr);
            return this;
        }
    }, {
        key: 'hideCurrentSlide',
        value: function hideCurrentSlide() {
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
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.slide : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n<ul class=\"slides_dots\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.slide : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
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

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, el));

        _this.foodTabEl = _this.qs('.best_food_tabs');
        return _this;
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
            index: -20
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
                        return _this2.emit('@transitionend', {
                            index: _this2.state.index
                        });
                    });
                },
                slidesNavi: function slidesNavi() {
                    _this2.delegate('.infinite_food_slides_navi > a', 'click', (0, _helpers.throttle)(function (e) {
                        return _this2.emit('@move', {
                            index: _this2.state.index,
                            direction: +e.delegateTarget.dataset.direction
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
            this.renderFoodBoxList(this.foodBoxListEl, food).renderFoodBoxOption(food, this.qsa('.prd_box>a')).renderSlides(this.foodBoxListEl, this.qsa('.prd_box')).showSlides({
                Immediately: true
            });
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
        key: 'renderFoodBoxOption',
        value: function renderFoodBoxOption(food, prdBox) {
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
        value: function showSlides(_ref) {
            var Immediately = _ref.Immediately;

            this.foodBoxListEl.style.transitionDuration = Immediately ? '0s' : '0.5s';
            this.foodBoxListEl.style.transform = 'translateX(' + this.state.index + '%)';
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
                            isSeleted: !!_this2.sel
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
                    class: 'searches',
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
        key: 'emptySearchbar',
        value: function emptySearchbar() {
            this.searchEl.value = '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDU5MzI5ZDJiMzk0NGUzNDFkMjIiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9WaWV3LmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS5zY3NzPzAxYTkiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L01haW5TbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sIiwid2VicGFjazovLy8uLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZWwiLCJuYW1lIiwic2xpY2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVudCIsImhhbmRsZXIiLCJ1c2VDYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJjYWxsYmFjayIsImxpc3RlbmVyRm4iLCJlIiwiZGVsZWdhdGVUYXJnZXQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FsbCIsIm9uIiwiZGF0YSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZGlzcGF0Y2hFdmVudCIsInN0eWxlIiwiZGlzcGxheSIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJfZGVsZWdhdGUiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidW5pcXVlIiwibWF0Y2giLCJzcmMiLCJ3aW5kb3ciLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZV9mb29kIiwibWFpbl9mb29kIiwiY291cnNlX2Zvb2QiLCJhdXRvQ29tcGxldGUiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImNzcyIsImxvY2F0aW9uIiwiRXJyb3IiLCJiYXNlVXJsIiwicHJvdG9jb2wiLCJob3N0IiwiY3VycmVudERpciIsInBhdGhuYW1lIiwicmVwbGFjZSIsImZpeGVkQ3NzIiwiZnVsbE1hdGNoIiwib3JpZ1VybCIsInVucXVvdGVkT3JpZ1VybCIsInRyaW0iLCJvIiwiJDEiLCJ0ZXN0IiwibmV3VXJsIiwiaW5kZXhPZiIsImF1dG9Db21wbGV0ZVZpZXciLCJpbmZpbml0ZVZpZXdzIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwiaW5maW5pdGVWaWV3IiwibW92ZVNjcm9sbGVyIiwiZGlyZWN0aW9uIiwicHJlc3NBdXRvQ29tcGxldGUiLCJzdWJtaXRLZXl3b3JkIiwia2V5d29yZCIsInNob3dIaXN0b3J5IiwicHJldmVudERlZmF1bHQiLCJzbGlkZUltZ3MiLCJjaGVja0xvY2FsU3RvcmFnZSIsInJlbmRlciIsInNlbGVjdFNsaWRlIiwiaW5kZXgiLCJtb3ZlU2xpZGUiLCJzbGlkZXNFbmQiLCJoaWRlQ3VycmVudFNsaWRlIiwic2V0SW5kZXgiLCJzaG93U2xpZGUiLCJjbGllbnRIZWlnaHQiLCJ0ZXJtIiwiaXNTZWxldGVkIiwiaXNVcCIsImlzZG93biIsImlzRVNDIiwiaXNFbnRlciIsImlzU3RyaW5nIiwidXBTZWwiLCJkb3duU2VsIiwiZW1wdHlBdXRvQ29tcGxldGUiLCJzZXRTZWFyY2hiYXIiLCJmZXRjaEF1dG9Db21wbGV0ZSIsInN1Z2dlc3Rpb25zIiwiaGlzdG9yeSIsIlNldCIsImFkZCIsImVtcHR5U2VhcmNoYmFyIiwicmV2ZXJzZSIsImZvb2REYXRhIiwidGFyZ2V0VmlldyIsInRocmVzaG9sZCIsIm1vdmVJbmZpbml0ZVNsaWRlcyIsInJlc2V0SW5maW5pdGVTbGlkZXMiLCJzaG93U2xpZGVzIiwiSW1tZWRpYXRlbHkiLCJ0aHJlc2hvbGRMZWZ0IiwidGhyZXNob2xkUmlnaHQiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJzbGlkZXNQcmV2RWwiLCJxcyIsInNsaWRlc05leHRFbCIsInN0YXRlIiwiYmluZENtZCIsImJpbmRDb21tYW5kcyIsInNsaWRlc05hdmkiLCJlbWl0IiwiZGF0YXNldCIsInNsaWRlc0RvdHMiLCJ0ZXh0Q29udGVudCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJNYWluU2xpZGUiLCJzbGlkZXNFbCIsInFzYSIsImRvdHNFbCIsIm1haW5TbGlkZVN0ciIsInNsaWRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiY2F0ZWdvcnlfaWQiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlclNlbGVjdGVkRm9vZCIsImZsb29yIiwicmFuZG9tIiwiZm9vZENvbnRhaW5lckVsIiwiZm9vZENvbnRhaW5lciIsImZvb2RCb3hMaXN0IiwiaXRlbXMiLCJpbWFnZSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJjbGljayIsImhpZGUiLCJzaG93IiwidHJhbnNpdGlvbmVuZCIsImJhbmNoYW4iLCJyZW5kZXJGb29kQm94T3B0aW9uIiwicmVuZGVyU2xpZGVzIiwicHJkQm94IiwiU2xpZGVzIiwibGFzdFNsaWRlcyIsIlNsaWRlIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwibGFzdFNsaWRlIiwiY2hpbGROb2RlcyIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsInNlYXJjaEVsIiwic3VnZ2VzdGlvbnNFbCIsInNlYXJjaEJ1dHRvbkVsIiwicHJlc3MiLCJrZXlDb2RlIiwic2VsIiwic3VibWl0IiwiaXNPcGVuIiwiY2xpY2tTdWdnZXN0aW9uIiwic2V0U2VsIiwibm9uQ2xpY2siLCJob3ZlciIsImVtcHR5U2VsIiwicmVuZGVyQXV0b0NvbXBsZXRlIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc0NvbXBvbmVudCIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwic2VhcmNoZXMiLCJoaXN0b3J5Q29tcG9uZW50IiwiY2xhc3MiLCJzZWFyY2giLCJwcmV2aW91c1NpYmxpbmciLCJsYXN0Q2hpbGQiLCJuZXh0U2libGluZyIsImZpcnN0Q2hpbGQiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBWTtBQUNQLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9B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QjBCLFNBQTFCO0FBQ0g7Ozs7Ozs7Ozs7OztBQzlITDtBQUNBLHlCQUF5Qix1REFBdUQ7QUFDaEYsaUVBQWlFO0FBQ2pFLHFGQUFxRjs7QUFFckY7QUFDQSw4S0FBOEssd0JBQXdCLGFBQWE7QUFDbk47QUFDQSw0S0FBNEssMEJBQTBCLGFBQWE7QUFDbk47QUFDQSw0TEFBNEwsZ0NBQWdDLGFBQWE7QUFDek87QUFDQSxDQUFDLGdCQUFnQixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA1OTMyOWQyYjM5NDRlMzQxZDIyIiwiY29uc3QgZXNjYXBlID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgJ2AnOiAnJiN4NjA7JyxcbiAgJz0nOiAnJiN4M0Q7J1xufTtcblxuY29uc3QgYmFkQ2hhcnMgPSAvWyY8PlwiJ2A9XS9nLFxuICAgICAgcG9zc2libGUgPSAvWyY8PlwiJ2A9XS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChvYmovKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGxldCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtc3R5bGUgKi9cbmxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4vLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG5leHBvcnQge2lzRnVuY3Rpb259O1xuLyogZXNsaW50LWVuYWJsZSBmdW5jLXN0eWxlICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuXG4vLyBPbGRlciBJRSB2ZXJzaW9ucyBkbyBub3QgZGlyZWN0bHkgc3VwcG9ydCBpbmRleE9mIHNvIHdlIG11c3QgaW1wbGVtZW50IG91ciBvd24sIHNhZGx5LlxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgICBpZiAoc3RyaW5nICYmIHN0cmluZy50b0hUTUwpIHtcbiAgICAgIHJldHVybiBzdHJpbmcudG9IVE1MKCk7XG4gICAgfSBlbHNlIGlmIChzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZyArICcnO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAgIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nO1xuICB9XG5cbiAgaWYgKCFwb3NzaWJsZS50ZXN0KHN0cmluZykpIHsgcmV0dXJuIHN0cmluZzsgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGcmFtZShvYmplY3QpIHtcbiAgbGV0IGZyYW1lID0gZXh0ZW5kKHt9LCBvYmplY3QpO1xuICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICByZXR1cm4gZnJhbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9ja1BhcmFtcyhwYXJhbXMsIGlkcykge1xuICBwYXJhbXMucGF0aCA9IGlkcztcbiAgcmV0dXJuIHBhcmFtcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy91dGlscy5qcyIsIi8vIENyZWF0ZSBhIHNpbXBsZSBwYXRoIGFsaWFzIHRvIGFsbG93IGJyb3dzZXJpZnkgdG8gcmVzb2x2ZVxuLy8gdGhlIHJ1bnRpbWUgb24gYSBzdXBwb3J0ZWQgcGF0aC5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUnKVsnZGVmYXVsdCddO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJcbmNvbnN0IGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICBsZXQgbG9jID0gbm9kZSAmJiBub2RlLmxvYyxcbiAgICAgIGxpbmUsXG4gICAgICBjb2x1bW47XG4gIGlmIChsb2MpIHtcbiAgICBsaW5lID0gbG9jLnN0YXJ0LmxpbmU7XG4gICAgY29sdW1uID0gbG9jLnN0YXJ0LmNvbHVtbjtcblxuICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgY29sdW1uO1xuICB9XG5cbiAgbGV0IHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEV4Y2VwdGlvbik7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChsb2MpIHtcbiAgICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG5cbiAgICAgIC8vIFdvcmsgYXJvdW5kIGlzc3VlIHVuZGVyIHNhZmFyaSB3aGVyZSB3ZSBjYW4ndCBkaXJlY3RseSBzZXQgdGhlIGNvbHVtbiB2YWx1ZVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2x1bW4nLCB7XG4gICAgICAgICAgdmFsdWU6IGNvbHVtbixcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChub3ApIHtcbiAgICAvKiBJZ25vcmUgaWYgdGhlIGJyb3dzZXIgaXMgdmVyeSBwYXJ0aWN1bGFyICovXG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvZXhjZXB0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBpZiAoIWVsKSB0aHJvdyBlbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBlbC5zbGljZSgxKTtcclxuICAgICAgICB0aGlzLmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcXMoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBxc2Eoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBvbihldmVudCwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZWdhdGUoc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXJGbiA9IGUgPT4ge1xyXG4gICAgICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgJiYgY2FsbGJhY2suY2FsbCh0aGlzLmVsLCBlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub24odHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdChldmVudCwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGV2dCA9IG5ldyBDdXN0b21FdmVudChldmVudCwge1xyXG4gICAgICAgICAgICBkZXRhaWw6IGRhdGFcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L1ZpZXcuanMiLCIvKipcclxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmZ1bmN0aW9uIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIHZhciBsaXN0ZW5lckZuID0gbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudHxTdHJpbmd8QXJyYXl9IFtlbGVtZW50c11cclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudHMsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgLy8gSGFuZGxlIHRoZSByZWd1bGFyIEVsZW1lbnQgdXNhZ2VcclxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgRWxlbWVudC1sZXNzIHVzYWdlLCBpdCBkZWZhdWx0cyB0byBnbG9iYWwgZGVsZWdhdGlvblxyXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gVXNlIGBkb2N1bWVudGAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgdGhlbiBhcHBseSBhcmd1bWVudHNcclxuICAgICAgICAvLyBUaGlzIGlzIGEgc2hvcnQgd2F5IHRvIC51bnNoaWZ0IGBhcmd1bWVudHNgIHdpdGhvdXQgcnVubmluZyBpbnRvIGRlb3B0aW1pemF0aW9uc1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYmluZChudWxsLCBkb2N1bWVudCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgU2VsZWN0b3ItYmFzZWQgdXNhZ2VcclxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgQXJyYXktbGlrZSBiYXNlZCB1c2FnZVxyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIGNsb3Nlc3QgbWF0Y2ggYW5kIGludm9rZXMgY2FsbGJhY2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEFKQVggcmVxdWVzdC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+ICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSA/XHJcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKSA6IHJlamVjdCh4aHIuc3RhdHVzKTtcclxuICAgICAgICB4aHIub250aW1lb3V0ID0gKCkgPT4gcmVqZWN0KCd0aW1lb3V0Jyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlciBgd2FpdGAgbWlsbGlzZWNvbmRzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIEZ1bmN0aW9uIHRvIHdyYXAuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsaW1pdCBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgbXVzdCBlbGFwc2UgYmV0d2VlbiBgZnVuY2AgaW52b2NhdGlvbnMuXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IHdyYXBzIHRoZSBgZnVuY2AgZnVuY3Rpb24gcGFzc2VkIGluLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBsaW1pdCkge1xyXG4gICAgbGV0IHdhaXQgPSBmYWxzZTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF3YWl0KSB7XHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgd2FpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBsaW1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFjY2VsZXJhdGlvbiB1bnRpbCBoYWxmd2F5LCB0aGVuIGRlY2VsZXJhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICBpZiAodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcclxuICAgIHQtLTtcclxuICAgIHJldHVybiAtYyAvIDIgKiAodCAqICh0IC0gMikgLSAxKSArIGI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBzdGFydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYyBjaGFuZ2UgaW4gdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfSBuZXcgc2Nyb2xsWVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xyXG4gICAgdCAvPSBkIC8gMjtcclxuICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZShrZXkpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIHJldHVybiB2YWx1ZS5kYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChyZWNlaXZlZFRpbWUsIHRocmVzaG9sZEhvdXIpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gKGN1cnJlbnRUaW1lIC0gcmVjZWl2ZWRUaW1lKSAvIDEwMDAgLyA2MCAvIDYwO1xyXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lIDwgdGhyZXNob2xkSG91cjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVTY3JvbGwodG8pIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gc2Nyb2xsWTtcclxuICAgIGNvbnN0IGNoYW5nZSA9IHRvIC0gc3RhcnQ7XHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGguYWJzKGNoYW5nZSAvIDQpO1xyXG4gICAgY29uc3QgaW5jcmVtZW50ID0gMjA7XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudFRpbWUgKz0gaW5jcmVtZW50O1xyXG4gICAgICAgIGxldCBuZXdZID0gZWFzZUluUXVhZChjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIHNjcm9sbFRvKDAsIG5ld1kpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VGltZSA8IGR1cmF0aW9uKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoSlNPTlAgPSAodW5pcXVlID0+IHVybCA9PlxyXG4gICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGBfanNvbnBfJHt1bmlxdWUrK31gO1xyXG4gICAgICAgIHVybCArPSB1cmwubWF0Y2goL1xcPy8pID8gYCZjYWxsYmFjaz0ke25hbWV9YCA6IGA/Y2FsbGJhY2s9JHtuYW1lfWA7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgICAgICB3aW5kb3dbbmFtZV0gPSBqc29uID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgd2luZG93W25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfSlcclxuKSgwKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9oZWxwZXJzLmpzIiwiaW1wb3J0IHtjcmVhdGVGcmFtZSwgZXh0ZW5kLCB0b1N0cmluZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0SGVscGVyc30gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7cmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9yc30gZnJvbSAnLi9kZWNvcmF0b3JzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9ICc0LjAuMTEnO1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX1JFVklTSU9OID0gNztcblxuZXhwb3J0IGNvbnN0IFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgMzogJz09IDEuMC4wLXJjLjQnLFxuICA0OiAnPT0gMS54LngnLFxuICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuICA3OiAnPj0gNC4wLjAnXG59O1xuXG5jb25zdCBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMsIGRlY29yYXRvcnMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuICB0aGlzLmRlY29yYXRvcnMgPSBkZWNvcmF0b3JzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG59XG5cbkhhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nZ2VyLmxvZyxcblxuICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgZXh0ZW5kKHRoaXMucGFydGlhbHMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oYEF0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIiR7bmFtZX1cIiBhcyB1bmRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgfSxcblxuICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpOyB9XG4gICAgICBleHRlbmQodGhpcy5kZWNvcmF0b3JzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuZGVjb3JhdG9yc1tuYW1lXTtcbiAgfVxufTtcblxuZXhwb3J0IGxldCBsb2cgPSBsb2dnZXIubG9nO1xuXG5leHBvcnQge2NyZWF0ZUZyYW1lLCBsb2dnZXJ9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgPGRpdiBjbGFzcz0nYmFkZ2UnPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9kaXY+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJiYWRnZV9saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5iYWRnZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgPHNwYW4+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICA8L2xpPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nZm9vZF9pbWdfaG92ZXInPlxcclxcbiAgICA8dWw+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVsaXZlcnlfdHlwZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgPC91bD5cXHJcXG48L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcclxuaW1wb3J0IE1haW5TbGlkZVZpZXcgZnJvbSAnLi92aWV3L01haW5TbGlkZVZpZXcnO1xyXG5pbXBvcnQgQmVzdEJhbmNoYW5WaWV3IGZyb20gJy4vdmlldy9CZXN0QmFuY2hhblZpZXcnO1xyXG5pbXBvcnQgU2Nyb2xsZXJWaWV3IGZyb20gJy4vdmlldy9TY3JvbGxlclZpZXcnO1xyXG5pbXBvcnQgSW5maW5pdGVTbGlkZVZpZXcgZnJvbSAnLi92aWV3L0luZmluaXRlU2xpZGVWaWV3JztcclxuaW1wb3J0IEF1dG9tQ29tcGxldGVWaWV3IGZyb20gJy4vdmlldy9BdXRvQ29tcGxldGVWaWV3JztcclxuXHJcbmNvbnN0IHVybExpc3QgPSB7XHJcbiAgICBtYWluU2xpZGU6ICdodHRwOi8vaG9tZS5kb3RvbC54eXovcGhwL3Rlc3RfYXBpLnBocCcsXHJcbiAgICBiZXN0QmFuY2hhbjogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9iZXN0JyxcclxuICAgIHNpZGVfZm9vZDogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9zaWRlJyxcclxuICAgIG1haW5fZm9vZDogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9tYWluJyxcclxuICAgIGNvdXJzZV9mb29kOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NvdXAnLFxyXG4gICAgYXV0b0NvbXBsZXRlOiAnaHR0cHM6Ly9rby53aWtpcGVkaWEub3JnL3cvYXBpLnBocD9hY3Rpb249b3BlbnNlYXJjaCZzZWFyY2g9J1xyXG59O1xyXG5cclxuY29uc3QgbWFpblNsaWRlVmlldyA9IG5ldyBNYWluU2xpZGVWaWV3KCcubWFpbl9zbGlkZScpO1xyXG5jb25zdCBiZXN0QmFuY2hhblZpZXcgPSBuZXcgQmVzdEJhbmNoYW5WaWV3KCcuYmVzdF9mb29kJyk7XHJcbmNvbnN0IHNjcm9sbGVyVmlldyA9IG5ldyBTY3JvbGxlclZpZXcoJy5zY3JvbGxlcicpO1xyXG5jb25zdCBzaWRlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJy5zaWRlX2Zvb2QnKTtcclxuY29uc3QgbWFpbkJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCcubWFpbl9mb29kJyk7XHJcbmNvbnN0IGNvdXJzZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCcuY291cnNlX2Zvb2QnKTtcclxuY29uc3QgYXV0b21Db21wbGV0ZVZpZXcgPSBuZXcgQXV0b21Db21wbGV0ZVZpZXcoJy5zZWFyY2hiYXInKTtcclxuXHJcblxyXG4vKipcclxuICogQHR5cGUge0NvbnRyb2xsZXJ9XHJcbiAqL1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9tQ29tcGxldGVWaWV3LCBzaWRlQmFuY2hhblZpZXcsIG1haW5CYW5jaGFuVmlldywgY291cnNlQmFuY2hhblZpZXcpO1xyXG5cclxuY29uc3Qgc2V0VmlldyA9ICgpID0+IGNvbnRyb2xsZXIuc2V0VmlldygpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldFZpZXcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL25hbnVtZ290aGljLmNzcyk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiByZXNldCBzdHlsZXMgKi9cXG4qLFxcbio6YWZ0ZXIsXFxuKjpiZWZvcmUge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuXFxuZGl2LFxcbnNwYW4sXFxub2JqZWN0LFxcbmlmcmFtZSxcXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNixcXG5wLFxcbmJsb2NrcXVvdGUsXFxucHJlLFxcbmFiYnIsXFxuYWRkcmVzcyxcXG5jaXRlLFxcbmNvZGUsXFxuZGVsLFxcbmRmbixcXG5lbSxcXG5pbWcsXFxuaW5zLFxcbmtiZCxcXG5xLFxcbnNhbXAsXFxuc21hbGwsXFxuc3Ryb25nLFxcbnZhcixcXG5iLFxcbmksXFxuZGwsXFxuZHQsXFxuZGQsXFxub2wsXFxudWwsXFxubGksXFxuZmllbGRzZXQsXFxuZm9ybSxcXG5sYWJlbCxcXG5sZWdlbmQsXFxudGFibGUsXFxuY2FwdGlvbixcXG50Ym9keSxcXG50Zm9vdCxcXG50aGVhZCxcXG50cixcXG50aCxcXG50ZCxcXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmNhbnZhcyxcXG5kZXRhaWxzLFxcbmZpZ2NhcHRpb24sXFxuZmlndXJlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbixcXG5zdW1tYXJ5LFxcbnRpbWUsXFxubWFyayxcXG5hdWRpbyxcXG52aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgb3V0bGluZTogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxcblxcbmR0IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuXFxub2wsXFxudWwsXFxuZGwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxcblxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuXFxuLyogRmFkaW5nIGFuaW1hdGlvbiAqL1xcbi5mYWRlaW4ge1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMnM7IH1cXG5cXG4uZmFkZW91dCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAyczsgfVxcblxcbi8qIGNvbXBvbmVudHMgc3R5bGVzICovXFxuLmZvb2Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLmxuYl93cmFwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U5ZTllOTsgfVxcbiAgLmxuYl93cmFwID4gLmxuYl9jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMC4ycHg7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmxuYl93cmFwID4gLmxuYl9jb250ZW50IHNwYW4uaWMge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB6b29tOiAxO1xcbiAgICAgIHdpZHRoOiA3cHg7XFxuICAgICAgaGVpZ2h0OiAxMXB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idWxfYXJyX2Rvd24ucG5nKSBuby1yZXBlYXQgY2VudGVyIDFweDtcXG4gICAgICBtYXJnaW4tbGVmdDogNHB4OyB9XFxuXFxuLmxpbmtfYXBwID4gYSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHggMTFweCA5cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzY2NjsgfVxcbiAgLmxpbmtfYXBwID4gYTpob3ZlciB7XFxuICAgIGNvbG9yOiAjMmFjMWJjOyB9XFxuXFxuLmxuYl9saXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIC5sbmJfbGlzdCA+IGxpID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMTBweCA5cHggMTBweDtcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi91dGlsX2Jhci5naWYpIG5vLXJlcGVhdCAwIDEycHg7IH1cXG4gICAgLmxuYl9saXN0ID4gbGkgPiBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzJhYzFiYzsgfVxcbiAgLmxuYl9saXN0ID4gbGk6Zmlyc3QtY2hpbGQgPiBhIHtcXG4gICAgYmFja2dyb3VuZDogbm9uZTsgfVxcbiAgLmxuYl9saXN0ID4gbGk6bGFzdC1jaGlsZCA+IGEge1xcbiAgICBjb2xvcjogIzMzMztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4uaGVhZGVyX3dyYXAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogOThweDtcXG4gIHdpZHRoOiA5ODBweDtcXG4gIG1hcmdpbjogMCBhdXRvOyB9XFxuICAuaGVhZGVyX3dyYXAgPiAubG9nbyB7XFxuICAgIG1hcmdpbjogMTZweCAwIDAgNXB4OyB9XFxuXFxuLnNlYXJjaGJhciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW46IDMwcHggMCAwIDQ2cHg7IH1cXG4gIC5zZWFyY2hiYXIgPiBpbnB1dCB7XFxuICAgIHdpZHRoOiAyMTBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBjb2xvcjogIzg4ODg4ODtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NmZDBkMjtcXG4gICAgcGFkZGluZzogMHB4IDM4cHggMHB4IDE1cHg7IH1cXG4gIC5zZWFyY2hiYXIgPiBidXR0b24ge1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vaWNfc2VhcmNoLnBuZykgbm8tcmVwZWF0IGNlbnRlciAwO1xcbiAgICB3aWR0aDogMzhweDtcXG4gICAgaGVpZ2h0OiAzOHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMXB4O1xcbiAgICByaWdodDogMXB4O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAuc2VhcmNoYmFyID4gYnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgMTAwJTsgfVxcblxcbi5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMge1xcbiAgd2lkdGg6IDIxMHB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHotaW5kZXg6IDk5OTk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgYm94LXNoYWRvdzogLTFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyA+IC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbiB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgcGFkZGluZzogNnB4IDAgM3B4IDI1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXG4gICAgY29sb3I6ICMzMzM7IH1cXG4gICAgLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyA+IC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbiBiIHtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICBjb2xvcjogI2ZlMWExYTsgfVxcbiAgICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uLnNlbGVjdGVkIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwYmQ7IH1cXG4gICAgLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyA+IC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbi5zZWFyY2hlcyB7XFxuICAgICAgY29sb3I6ICM1MjE4OGM7IH1cXG5cXG4uZ25iX3RvcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luOiAwIDVweCAwIGF1dG87IH1cXG4gIC5nbmJfdG9wID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG1hcmdpbjogMjVweCAwIDI1cHggNTBweDsgfVxcblxcbi5uYXZpX3dyYXAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogMTtcXG4gIGJhY2tncm91bmQ6ICM0ODNmMzU7IH1cXG4gIC5uYXZpX3dyYXAgPiAubmF2aV9jb250ZW50IHtcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDUycHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLmduYiB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuICAuZ25iID4gbGkge1xcbiAgICB3aWR0aDogMTI0cHg7XFxuICAgIGhlaWdodDogNTJweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIC5nbmIgPiBsaSA+IGEge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBhZGRpbmc6IDVweCAwIDAgMXB4OyB9XFxuICAgICAgLmduYiA+IGxpID4gYSA+IHNwYW4ge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgY29sb3I6IHdoaXRlO1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgICBwYWRkaW5nOiAxMXB4IDI1cHggMHB4OyB9XFxuICAgIC5nbmIgPiBsaTpmaXJzdC1jaGlsZCB7XFxuICAgICAgd2lkdGg6IDEwMHB4OyB9XFxuICAgIC5nbmIgPiBsaTpudGgtY2hpbGQoNykge1xcbiAgICAgIHdpZHRoOiAxMjBweDsgfVxcbiAgICAuZ25iID4gbGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgICB3aWR0aDogMTQwcHg7XFxuICAgICAgYmFja2dyb3VuZDogIzM2MmQyNTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgLmduYiA+IGxpOmhvdmVyID4gYSA+IHNwYW4sIC5nbmIgPiBsaTpmb2N1cyA+IGEgPiBzcGFuIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICAgIGNvbG9yOiAjMmFjMWJjOyB9XFxuICAgIC5nbmIgPiBsaTpob3ZlciA+IHVsLCAuZ25iID4gbGk6Zm9jdXMgPiB1bCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4uc3ViX2xpc3Qge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAxNjJweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDUycHg7XFxuICBwYWRkaW5nOiAyMHB4IDAgMzFweDtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDcyLCA2MywgNTMsIDAuNik7XFxuICBib3JkZXItdG9wOiAwOyB9XFxuICAuc3ViX2xpc3QgYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogIzU1NTtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgcGFkZGluZzogNnB4IDAgM3B4IDI1cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG4gICAgLnN1Yl9saXN0IGE6aG92ZXIgPiBzcGFuLFxcbiAgICAuc3ViX2xpc3QgYTpmb2N1cyA+IHNwYW4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICBjb2xvcjogIzJhYzFiYztcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxcblxcbi5tYWluX3NsaWRlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogMTkyMHB4OyB9XFxuXFxuLm1haW5fc2xpZGVzX2xpc3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiA0MjBweDsgfVxcbiAgLm1haW5fc2xpZGVzX2xpc3QgPiBsaSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IG5vLXJlcGVhdCBjZW50ZXIgdG9wOyB9XFxuICAgIC5tYWluX3NsaWRlc19saXN0ID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogOTgwcHg7XFxuICAgICAgaGVpZ2h0OiA0MjBweDtcXG4gICAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IGEge1xcbiAgd2lkdGg6IDYwcHg7XFxuICBoZWlnaHQ6IDkycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC00NnB4O1xcbiAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL21haW5fc2xpZGVzX25hdmkucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldiB7XFxuICByaWdodDogNTAlO1xcbiAgbWFyZ2luLXJpZ2h0OiA1MzBweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgY2VudGVyOyB9XFxuXFxuLnNsaWRlc19uYXZpID4gLnNsaWRlc19uZXh0IHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiA1MzBweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfZG90cyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3R0b206IDQwcHg7XFxuICBoZWlnaHQ6IDA7IH1cXG4gIC5zbGlkZXNfZG90cyA+IGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgICBwYWRkaW5nOiAwIDRweDsgfVxcbiAgICAuc2xpZGVzX2RvdHMgPiBsaSA+IGEge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMHB4O1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGJhY2tncm91bmQ6ICNGRkY7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgICAgb3BhY2l0eTogMC42OyB9XFxuICAgICAgLnNsaWRlc19kb3RzID4gbGkgPiBhLm5vdyB7XFxuICAgICAgICBvcGFjaXR5OiAxOyB9XFxuXFxuLmJlc3RfZm9vZCB7XFxuICBiYWNrZ3JvdW5kOiAjZWVlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAuYmVzdF9mb29kID4gLmJlc3RfZm9vZF9jb250ZW50IHtcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcbiAgICAuYmVzdF9mb29kID4gLmJlc3RfZm9vZF9jb250ZW50ID4gLmJlc3RfZm9vZF90aXRsZSB7XFxuICAgICAgcGFkZGluZzogNDBweCAwIDMwcHg7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmJlc3RfZm9vZF90YWJzIHtcXG4gIGhlaWdodDogNDhweDsgfVxcbiAgLmJlc3RfZm9vZF90YWJzID4gbGkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGhlaWdodDogNDhweDsgfVxcbiAgICAuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxNTlweDtcXG4gICAgICBwYWRkaW5nLXRvcDogMTdweDtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XFxuICAgICAgY29sb3I6ICM3Nzc7IH1cXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGk6Zm9jdXMgPiBhLFxcbiAgICAuYmVzdF9mb29kX3RhYnMgPiBsaTpob3ZlciA+IGEsXFxuICAgIC5iZXN0X2Zvb2RfdGFicyA+IGxpID4gYS5ub3cge1xcbiAgICAgIGJhY2tncm91bmQ6ICMxZmNiYzc7XFxuICAgICAgY29sb3I6ICNmZmY7IH1cXG5cXG4uYmVzdF9mb29kX2NvbnRhaW5lciB7XFxuICBwYWRkaW5nLWJvdHRvbTogNDVweDsgfVxcbiAgLmJlc3RfZm9vZF9jb250YWluZXIgPiAuYmVzdF9mb29kX2JveF9saXN0IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgd2lkdGg6IDk2MHB4O1xcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDsgfVxcbiAgICAuYmVzdF9mb29kX2NvbnRhaW5lciA+IC5iZXN0X2Zvb2RfYm94X2xpc3QgPiAuYmVzdF9mb29kX2JveF93cmFwIHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgbWFyZ2luOiAwIDI0cHggMTBweCAwO1xcbiAgICAgIGNvbG9yOiAjMDAwO1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7IH1cXG4gICAgICAuYmVzdF9mb29kX2NvbnRhaW5lciA+IC5iZXN0X2Zvb2RfYm94X2xpc3QgPiAuYmVzdF9mb29kX2JveF93cmFwOmxhc3QtY2hpbGQge1xcbiAgICAgICAgbWFyZ2luOiAwOyB9XFxuXFxuLmZvb2RfaW1nX2hvdmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5mb29kX2ltZ19ob3ZlciA+IHVsIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICAgIC5mb29kX2ltZ19ob3ZlciA+IHVsID4gbGkge1xcbiAgICAgIG1hcmdpbjogMCAxNXB4IDhweDtcXG4gICAgICBmb250LXNpemU6IDIwcHg7XFxuICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgICAgLmZvb2RfaW1nX2hvdmVyID4gdWwgPiBsaSA+IHNwYW4ge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgcGFkZGluZzogMTNweCAwIDRweDsgfVxcbiAgICAgIC5mb29kX2ltZ19ob3ZlciA+IHVsID4gbGk6bGFzdC1jaGlsZCA+IHNwYW4ge1xcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvbWFpbi9kZWxpdmVyeV9saW5lLnBuZykgcmVwZWF0LXggMCAwOyB9XFxuXFxuLmJlc3RfZm9vZF9ib3ggPiAuYmFkZ2VfbGlzdCwgLnByZF9ib3ggPiBhID4gLmJhZGdlX2xpc3Qge1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuYmFkZ2VfbGlzdCA+IC5iYWRnZSwgLnByZF9ib3ggPiBhID4gLmJhZGdlX2xpc3QgPiAuYmFkZ2Uge1xcbiAgICBwYWRkaW5nOiA0cHggMnB4IDVweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzcHg7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBiYWNrZ3JvdW5kOiAjYTk3NGJmO1xcbiAgICB3aWR0aDogNjJweDsgfVxcblxcbi5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UsIC5wcmRfZGV0YWlsID4gLnByZF9wcmljZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9wcmljZSA+IC5vbGRfcHJpY2UsIC5wcmRfZGV0YWlsID4gLnByZF9wcmljZSA+IC5vbGRfcHJpY2Uge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBjb2xvcjogIzg4ODsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9wcmljZSA+IC5uZXdfcHJpY2UsIC5wcmRfZGV0YWlsID4gLnByZF9wcmljZSA+IC5uZXdfcHJpY2Uge1xcbiAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmO1xcbiAgICBsZXR0ZXItc3BhY2luZzogLTJweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDlweDtcXG4gICAgY29sb3I6ICMyYWMxYmM7XFxuICAgIGZvbnQtc2l6ZTogMjZweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG4gICAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9wcmljZSA+IC5uZXdfcHJpY2UgPiAud29uLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAubmV3X3ByaWNlID4gLndvbiB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IC02cHg7XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIHRvcDogLTNweDsgfVxcblxcbi5iZXN0X2Zvb2RfYm94OmhvdmVyIC5mb29kX2ltZ19ob3ZlcixcXG4uYmVzdF9mb29kX2JveDpmb2N1cyAuZm9vZF9pbWdfaG92ZXIsIC5wcmRfYm94OmhvdmVyIC5mb29kX2ltZ19ob3ZlcixcXG4ucHJkX2JveDpmb2N1cyAuZm9vZF9pbWdfaG92ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7IH1cXG5cXG4uYmVzdF9mb29kX2JveCB7XFxuICB3aWR0aDogMzA0cHg7XFxuICBoZWlnaHQ6IDQyOXB4OyB9XFxuICAuYmVzdF9mb29kX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuICAuYmVzdF9mb29kX2JveDpmb2N1cyAuZm9vZF9pbWdfaG92ZXIge1xcbiAgICBoZWlnaHQ6IDMwNHB4OyB9XFxuICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2ltZyA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAuYmVzdF9mb29kX2JveCA+IC5iYWRnZV9saXN0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI3M3B4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIG1hcmdpbjogMCAwIDEwcHggMTBweDsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwge1xcbiAgICBwYWRkaW5nOiAxOHB4IDIwcHggMTVweDtcXG4gICAgaGVpZ2h0OiA5MHB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfdGl0bGUge1xcbiAgICAgIGxldHRlci1zcGFjaW5nOiAtMS4ycHg7XFxuICAgICAgZm9udC1zaXplOiAxN3B4O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9kZXNjcmlwdGlvbiB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9wcmljZSB7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDsgfVxcblxcbi5pbmZpbml0ZV9mb29kIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IHtcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDY3MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF90aXRsZSB7XFxuICAgICAgbWFyZ2luOiA3MHB4IDAgMzdweDsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF9jb250YWluZXIge1xcbiAgICAgIGhlaWdodDogMzQ2cHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCA+IC5pbmZpbml0ZV9mb29kX2NvbnRhaW5lciA+IC5pbmZpbml0ZV9mb29kX2JveF9saXN0IHtcXG4gICAgICAgIHdpZHRoOiAxMDAwJTtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7IH1cXG4gICAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IC5pbmZpbml0ZV9idG4ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG1hcmdpbjogMzhweCBhdXRvO1xcbiAgICAgIHBhZGRpbmc6IDE1cHggMCAxN3B4O1xcbiAgICAgIHdpZHRoOiA5ODBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGNvbG9yOiAjMzMzO1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkN2Q3ZDc7IH1cXG4gICAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgLmluZmluaXRlX2J0biA+IHNwYW4ge1xcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTRweDtcXG4gICAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL21haW4vYnRuX2Fycl9tb3JlLnBuZykgbm8tcmVwZWF0IHJpZ2h0OyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiBhIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMjU3cHg7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogNTJweDtcXG4gIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idG5fcHJkc190aHVtYl9zbGlkZXNfbmF2aS5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyOyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXYge1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC01NThweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wOyB9XFxuICAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldjpob3ZlciwgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXY6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IC01MnB4OyB9XFxuXFxuLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX25leHQge1xcbiAgcmlnaHQ6IDUwJTtcXG4gIG1hcmdpbi1yaWdodDogLTU1OHB4O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgdG9wOyB9XFxuICAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dDpob3ZlciwgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX25leHQ6Zm9jdXMge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAtNTJweDsgfVxcblxcbi5zaWRlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5ibWYua3IvYmFubmVyL21haW5fZXZlbnQvMTcxMjE0LzE1MTMyNDM3MTI2ODNfMWUwYTYzMTI1OTllLmpwZyk7IH1cXG4gIC5zaWRlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIGhlaWdodDogMTQwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLm1haW5fZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci9iYW5uZXIvbWFpbl9ldmVudC8xNzA2MjgvMTQ5ODYzOTc1MTI3Ml9lNmNhZGJkYTY1YjQuanBnKTsgfVxcbiAgLm1haW5fZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiAxNDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uY291cnNlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5ibWYua3IvYmFubmVyL21haW5fZXZlbnQvMTcwNDI1LzE0OTMwODI3NDQ0MDFfYmE5ODMxZTRlMmJiLnBuZyk7IH1cXG4gIC5jb3Vyc2VfZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiAxNDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4udGh1bWJfaW1nIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMjE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAudGh1bWJfaW1nID4gcCA+IGltZyB7XFxuICAgIG1heC13aWR0aDogMTAwJTsgfVxcbiAgLnRodW1iX2ltZyA+IC5jaXJjbGVfbWFzayB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vY2lyY2xlX21hc2sucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcXG4gICAgd2lkdGg6IDIxNXB4O1xcbiAgICBoZWlnaHQ6IDIxNXB4OyB9XFxuXFxuLnByZF9ib3gge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDIxNXB4O1xcbiAgbWFyZ2luOiAwcHggMTVweCA4cHg7IH1cXG4gIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4ucHJkX2RldGFpbCB7XFxuICBwYWRkaW5nOiAxOHB4IDEwcHggMTJweCAxMHB4OyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfdGl0bGUge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0xLjJweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfZGVzY3JpcHRpb24ge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMS4ycHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2Uge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5zY3JvbGxlciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiA3MHB4O1xcbiAgbGVmdDogNzklOyB9XFxuICAuc2Nyb2xsZXIgPiBsaSA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL2J0bl9wYWdlX3VwX2Rvd25fbmV3LnBuZykgbm8tcmVwZWF0OyB9XFxuICAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGEge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIHRvcDsgfVxcbiAgICAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGE6aG92ZXIsIC5zY3JvbGxlciA+IC5wYWdlX3VwID4gYTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTUwcHggdG9wOyB9XFxuICAuc2Nyb2xsZXIgPiAucGFnZV9kb3duID4gYSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgLTUwcHg7IH1cXG4gICAgLnNjcm9sbGVyID4gLnBhZ2VfZG93biA+IGE6aG92ZXIsIC5zY3JvbGxlciA+IC5wYWdlX2Rvd24gPiBhOmZvY3VzIHtcXG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtNTBweCAtNTBweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsImltcG9ydCB7XHJcbiAgICByZXF1ZXN0LFxyXG4gICAgZGVsZWdhdGUsXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UsXHJcbiAgICBpc1ZhbGlkLFxyXG4gICAgbW92ZVNjcm9sbCxcclxuICAgIGZldGNoSlNPTlBcclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IodXJsTGlzdCwgbWFpblNsaWRlVmlldywgYmVzdEJhbmNoYW5WaWV3LCBzY3JvbGxlclZpZXcsIGF1dG9Db21wbGV0ZVZpZXcsIC4uLmluZmluaXRlVmlld3MpIHtcclxuICAgICAgICB0aGlzLnVybExpc3QgPSB1cmxMaXN0O1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldyA9IG1haW5TbGlkZVZpZXc7XHJcbiAgICAgICAgdGhpcy5iZXN0QmFuY2hhblZpZXcgPSBiZXN0QmFuY2hhblZpZXc7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlclZpZXcgPSBzY3JvbGxlclZpZXc7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3ID0gYXV0b0NvbXBsZXRlVmlldztcclxuICAgICAgICB0aGlzLmluZmluaXRlVmlld3MgPSBpbmZpbml0ZVZpZXdzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5mZXRjaE1haW5TbGlkZSh0aGlzLnVybExpc3QubWFpblNsaWRlKTtcclxuICAgICAgICB0aGlzLmZldGNoQmVzdEJhbmNoYW4odGhpcy51cmxMaXN0LmJlc3RCYW5jaGFuKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzLmZvckVhY2goaW5maW5pdGVWaWV3ID0+XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJbmZpbml0ZUJhbmNoYW4oaW5maW5pdGVWaWV3LCB0aGlzLnVybExpc3RbaW5maW5pdGVWaWV3Lm5hbWVdKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3LmJpbmQoJ2NsaWNrJykuYmluZCgnaGlkZScpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZVNjcm9sbGVyKGUuZGV0YWlsLmRpcmVjdGlvbikpO1xyXG5cclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuYmluZCgncHJlc3MnKS5iaW5kKCdzdWJtaXQnKS5iaW5kKCdoaXN0b3J5JylcclxuICAgICAgICAgICAgLmJpbmQoJ2NsaWNrU3VnZ2VzdGlvbicpLmJpbmQoJ25vbkNsaWNrJykuYmluZCgnaG92ZXInKVxyXG4gICAgICAgICAgICAub24oJ0BwcmVzcycsIGUgPT4gdGhpcy5wcmVzc0F1dG9Db21wbGV0ZShlLmRldGFpbCkpXHJcbiAgICAgICAgICAgIC5vbignQHN1Ym1pdCcsIGUgPT4gdGhpcy5zdWJtaXRLZXl3b3JkKGUuZGV0YWlsLmtleXdvcmQpKVxyXG4gICAgICAgICAgICAub24oJ0BoaXN0b3J5JywgKCkgPT4gdGhpcy5zaG93SGlzdG9yeSgpKTtcclxuXHJcbiAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnYScsICdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaE1haW5TbGlkZSh1cmwpIHtcclxuICAgICAgICB0aGlzLnNsaWRlSW1ncyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodXJsKTtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcucmVuZGVyKCdtYWluU2xpZGUnLCB0aGlzLnNsaWRlSW1ncylcclxuICAgICAgICAgICAgLmJpbmQoJ3NsaWRlc05hdmknKS5iaW5kKCdzbGlkZXNEb3RzJylcclxuICAgICAgICAgICAgLm9uKCdAc2VsZWN0RG90JywgZSA9PiB0aGlzLnNlbGVjdFNsaWRlKGUuZGV0YWlsLmluZGV4KSlcclxuICAgICAgICAgICAgLm9uKCdAbW92ZScsIGUgPT4gdGhpcy5tb3ZlU2xpZGUoZS5kZXRhaWwpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2xpZGUoe1xyXG4gICAgICAgIGluZGV4LFxyXG4gICAgICAgIGRpcmVjdGlvblxyXG4gICAgfSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlc0VuZCA9IHRoaXMuc2xpZGVJbWdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaW5kZXggKz0gZGlyZWN0aW9uO1xyXG4gICAgICAgIGlmIChpbmRleCA+IHNsaWRlc0VuZCkgaW5kZXggPSAwO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIGluZGV4ID0gc2xpZGVzRW5kO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdFNsaWRlKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RTbGlkZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMubWFpblNsaWRlVmlldy5oaWRlQ3VycmVudFNsaWRlKCkuc2V0SW5kZXgoaW5kZXgpLnNob3dTbGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTY3JvbGxlcihkaXJlY3Rpb24pIHtcclxuICAgICAgICBkaXJlY3Rpb24gPT09ICd1cCcgPyBtb3ZlU2Nyb2xsKDApIDogbW92ZVNjcm9sbChkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlc3NBdXRvQ29tcGxldGUoe1xyXG4gICAgICAgIHRlcm0sXHJcbiAgICAgICAga2V5LFxyXG4gICAgICAgIGlzU2VsZXRlZFxyXG4gICAgfSkge1xyXG4gICAgICAgIGNvbnN0IGlzVXAgPSAoa2V5KSA9PiBrZXkgPT09IDM4O1xyXG4gICAgICAgIGNvbnN0IGlzZG93biA9IChrZXkpID0+IGtleSA9PT0gNDA7XHJcbiAgICAgICAgY29uc3QgaXNFU0MgPSAoa2V5KSA9PiBrZXkgPT09IDI3O1xyXG4gICAgICAgIGNvbnN0IGlzRW50ZXIgPSAoa2V5KSA9PiBrZXkgPT09IDEzO1xyXG4gICAgICAgIGNvbnN0IGlzU3RyaW5nID0gKGtleSkgPT4ga2V5IDwgMzUgfHwga2V5ID4gNDA7XHJcblxyXG4gICAgICAgIGlmIChpc1VwKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LnVwU2VsKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc2Rvd24oa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZG93blNlbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNFU0Moa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRW50ZXIoa2V5KSkge1xyXG4gICAgICAgICAgICBpc1NlbGV0ZWQgPyB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuc2V0U2VhcmNoYmFyKCkgOiB0aGlzLnN1Ym1pdEtleXdvcmQodGVybSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhrZXkpKSB7XHJcbiAgICAgICAgICAgIHRlcm0gPyB0aGlzLmZldGNoQXV0b0NvbXBsZXRlKHRlcm0pIDogdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoQXV0b0NvbXBsZXRlKHRlcm0pIHtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9ucyA9IGF3YWl0IHRoaXMuY2hlY2tMb2NhbFN0b3JhZ2UodGhpcy51cmxMaXN0LmF1dG9Db21wbGV0ZSArIHRlcm0sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpLnJlbmRlcignYXV0b0NvbXBsZXRlJywgdGVybSwgc3VnZ2VzdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdEtleXdvcmQoa2V5d29yZCkge1xyXG4gICAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBuZXcgU2V0KGdldExvY2FsU3RvcmFnZSgnaGlzdG9yeScpKTtcclxuICAgICAgICAgICAgaGlzdG9yeS5hZGQoa2V5d29yZCk7XHJcbiAgICAgICAgICAgIHNldExvY2FsU3RvcmFnZSgnaGlzdG9yeScsIFsuLi5oaXN0b3J5XSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpLmVtcHR5U2VhcmNoYmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNob3dIaXN0b3J5KCkge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKTtcclxuICAgICAgICBoaXN0b3J5ICYmIHRoaXMuYXV0b0NvbXBsZXRlVmlldy5yZW5kZXIoJ2hpc3RvcnknLCBoaXN0b3J5LnNsaWNlKC01KS5yZXZlcnNlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoQmVzdEJhbmNoYW4odXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGhpcy5iZXN0QmFuY2hhblZpZXcucmVuZGVyKCdiZXN0QmFuY2hhbicsIGZvb2REYXRhKS5iaW5kKCdmb29kVGFiJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hJbmZpbml0ZUJhbmNoYW4odGFyZ2V0VmlldywgdXJsKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZERhdGEgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZm9vZERhdGEubGVuZ3RoICogMi41O1xyXG4gICAgICAgIHRhcmdldFZpZXcucmVuZGVyKCdiYW5jaGFuJywgZm9vZERhdGEpLmJpbmQoJ3RyYW5zaXRpb25lbmQnKS5iaW5kKCdzbGlkZXNOYXZpJylcclxuICAgICAgICAgICAgLm9uKCdAbW92ZScsIGUgPT4gdGhpcy5tb3ZlSW5maW5pdGVTbGlkZXMuY2FsbCh0YXJnZXRWaWV3LCBlLmRldGFpbCkpXHJcbiAgICAgICAgICAgIC5vbignQHRyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgZSA9PiB0aGlzLnJlc2V0SW5maW5pdGVTbGlkZXMuY2FsbCh0YXJnZXRWaWV3LCB0aHJlc2hvbGQsIGUuZGV0YWlsLmluZGV4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUluZmluaXRlU2xpZGVzKHtcclxuICAgICAgICBpbmRleCxcclxuICAgICAgICBkaXJlY3Rpb25cclxuICAgIH0pIHtcclxuICAgICAgICB0aGlzLnNldEluZGV4KGluZGV4ICs9IGRpcmVjdGlvbikuc2hvd1NsaWRlcyh7XHJcbiAgICAgICAgICAgIEltbWVkaWF0ZWx5OiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0SW5maW5pdGVTbGlkZXModGhyZXNob2xkLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IFt0aHJlc2hvbGRMZWZ0LCB0aHJlc2hvbGRSaWdodF0gPSBbLTIwIC0gdGhyZXNob2xkLCAtMjAgKyB0aHJlc2hvbGRdO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhyZXNob2xkTGVmdCB8fCBpbmRleCA9PT0gdGhyZXNob2xkUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgtMjApLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICAgICAgSW1tZWRpYXRlbHk6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNoZWNrTG9jYWxTdG9yYWdlKGtleSwgaXNKU09OUCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gZ2V0TG9jYWxTdG9yYWdlKGtleSk7XHJcbiAgICAgICAgaWYgKGNhY2hlICYmIGlzVmFsaWQoY2FjaGUudGltZSwgNikpIHJldHVybiBjYWNoZS5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBpc0pTT05QID8gKGF3YWl0IGZldGNoSlNPTlAoa2V5KSlbMV0gOiBhd2FpdCByZXF1ZXN0KGtleSksXHJcbiAgICAgICAgICAgIHRpbWU6IERhdGUubm93KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5kYXRhLmhhc093blByb3BlcnR5KCdlcnJvcicpID8gZmFsc2UgOiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29udHJvbGxlci5qcyIsImltcG9ydCBtYWluU2xpZGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9tYWluU2xpZGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgdGhyb3R0bGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgICAgICB0aGlzLnNsaWRlc1ByZXZFbCA9IHRoaXMucXMoJy5zbGlkZXNfcHJldicpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzTmV4dEVsID0gdGhpcy5xcygnLnNsaWRlc19uZXh0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHNsaWRlc05hdmk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5zbGlkZXNfbmF2aSA+IGEnLCAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHRocm90dGxlKGUgPT4gdGhpcy5lbWl0KCdAbW92ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuc3RhdGUuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogK2UuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9KSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbGlkZXNEb3RzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2xpZGVzX2RvdHMgPiBsaSA+IGEnLCAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHRocm90dGxlKGUgPT4gdGhpcy5lbWl0KCdAc2VsZWN0RG90Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogK2UuZGVsZWdhdGVUYXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KSwgMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgbWFpblNsaWRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5TbGlkZSguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgbWFpblNsaWRlKHNsaWRlSW1ncykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyTWFpblNsaWRlKHNsaWRlSW1ncyk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbCA9IHRoaXMucXNhKCcubWFpbl9zbGlkZXNfbGlzdCA+IGxpJyk7XHJcbiAgICAgICAgdGhpcy5kb3RzRWwgPSB0aGlzLnFzYSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJyk7XHJcbiAgICAgICAgdGhpcy5zaG93U2xpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJNYWluU2xpZGUoc2xpZGVJbWdzKSB7XHJcbiAgICAgICAgY29uc3QgbWFpblNsaWRlU3RyID0gbWFpblNsaWRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBzbGlkZTogc2xpZGVJbWdzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtYWluU2xpZGVTdHIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVDdXJyZW50U2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNFbFt0aGlzLnN0YXRlLmluZGV4XS5jbGFzc05hbWUgPSAnZmFkZW91dCc7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm93Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVpbic7XHJcbiAgICAgICAgdGhpcy5kb3RzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9NYWluU2xpZGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgIDxsaSBjbGFzcz1cXFwiZmFkZW91dFxcXCIgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6IHVybChcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIiknPlxcclxcbiAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCI+PC9hPlxcclxcbiAgICA8L2xpPlxcclxcblwiO1xufSxcIjNcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiICAgIDxsaT5cXHJcXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmluZGV4IHx8IChkYXRhICYmIGRhdGEuaW5kZXgpKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJpbmRleFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2E+XFxyXFxuICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSk7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJtYWluX3NsaWRlc19saXN0XFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChhbGlhczEsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNsaWRlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvdWw+XFxyXFxuPHVsIGNsYXNzPVxcXCJzbGlkZXNfZG90c1xcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoYWxpYXMxLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zbGlkZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgzLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L3VsPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9tYWluU2xpZGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJpbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb2cuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9sb29rdXAuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL3dpdGguanMiLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwiaW1wb3J0IHtpbmRleE9mfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGxvZ2dlciA9IHtcbiAgbWV0aG9kTWFwOiBbJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddLFxuICBsZXZlbDogJ2luZm8nLFxuXG4gIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cbiAgbG9va3VwTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBsZXZlbE1hcCA9IGluZGV4T2YobG9nZ2VyLm1ldGhvZE1hcCwgbGV2ZWwudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuICAgICAgICBsZXZlbCA9IGxldmVsTWFwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsZXZlbDtcbiAgfSxcblxuICAvLyBDYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCAuLi5tZXNzYWdlKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgbGV0IG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHsgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgbWV0aG9kID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICBjb25zb2xlW21ldGhvZF0oLi4ubWVzc2FnZSk7ICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBTYWZlU3RyaW5nLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcnICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTYWZlU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJpbXBvcnQgZm9vZEJveFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZm9vZFRhYlRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWwnO1xyXG5pbXBvcnQgY29udGFpbmVyVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sJztcclxuaW1wb3J0IGJhZGdlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwnO1xyXG5pbXBvcnQgZGVsaXZlcnlUeXBlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbCA9IHRoaXMucXMoJy5iZXN0X2Zvb2RfdGFicycpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgZm9vZFRhYjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnbGkgPiBhJywgJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RUYWJMaXN0RWwpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWIgPT09IGUuZGVsZWdhdGVUYXJnZXQgPyAnbm93JyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZm9vZEJveExpc3RFbCkuZm9yRWFjaChmb29kID0+IGZvb2Quc3R5bGUuZGlzcGxheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5jYXRlZ29yeV9pZCA9PT0gZm9vZC5kYXRhc2V0LmNhdGVnb3J5X2lkID8gJ2ZsZXgnIDogJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYmVzdEJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdEJhbmNoYW4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGJlc3RCYW5jaGFuKGZvb2QpIHtcclxuICAgICAgICB0aGlzLnJlbmRlckZvb2RUYWIoZm9vZCkucmVuZGVyRm9vZENvbnRhaW5lcihmb29kKVxyXG4gICAgICAgICAgICAucmVuZGVyRm9vZEJveExpc3QoZm9vZCkucmVuZGVyRm9vZEJveChmb29kKVxyXG4gICAgICAgICAgICAucmVuZGVyU2VsZWN0ZWRGb29kKGZvb2QsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kVGFiKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kVGFiID0gZm9vZC5tYXAodmFsdWUgPT4gZm9vZFRhYlRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RUYWIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RDb250YWluZXIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RDb250YWluZXJFbCA9IHRoaXMucXMoJy5iZXN0X2Zvb2RfY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lciA9IGZvb2QubWFwKHZhbHVlID0+IGNvbnRhaW5lclRlbXBsYXRlKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHZhbHVlLmNhdGVnb3J5X2lkXHJcbiAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIGZvb2RDb250YWluZXJFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQ29udGFpbmVyKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94TGlzdChmb29kKSB7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsID0gdGhpcy5xc2EoJy5iZXN0X2Zvb2RfYm94X2xpc3QnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gdmFsdWUuaXRlbXMubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgICAgIGZvb2RCb3hUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBpdGVtLmFsdCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBvbGRfcHJpY2U6IGl0ZW0ubl9wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kQm94TGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveChmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZEJveEVsID0gdGhpcy5xc2EoJy5iZXN0X2Zvb2RfYm94Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSB2YWx1ZS5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhbHVlLml0ZW1zLmZvckVhY2goKGl0ZW0sIGopID0+IHtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogaXRlbS5iYWRnZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGRlbGl2ZXJ5VHlwZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2VsZWN0ZWRGb29kKGZvb2QsIGluaXROdW0pIHtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWwgPSB0aGlzLnFzYSgnLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsW2luaXROdW1dLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbFtpbml0TnVtXS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGk+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X2xpc3RcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5zY3JvbGxlciA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiB0aGlzLmVtaXQoJ0Btb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHdpbmRvdy5zY3JvbGxZID4gOTAgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwiaW1wb3J0IGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICB0aHJvdHRsZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbCA9IHRoaXMucXMoJy5pbmZpbml0ZV9mb29kX2JveF9saXN0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAtMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbmVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbigndHJhbnNpdGlvbmVuZCcsICgpID0+IHRoaXMuZW1pdCgnQHRyYW5zaXRpb25lbmQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuc3RhdGUuaW5kZXhcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmF2aTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICtlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFuY2hhbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdCh0aGlzLmZvb2RCb3hMaXN0RWwsIGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJGb29kQm94T3B0aW9uKGZvb2QsIHRoaXMucXNhKCcucHJkX2JveD5hJykpXHJcbiAgICAgICAgICAgIC5yZW5kZXJTbGlkZXModGhpcy5mb29kQm94TGlzdEVsLCB0aGlzLnFzYSgnLnByZF9ib3gnKSlcclxuICAgICAgICAgICAgLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICAgICAgSW1tZWRpYXRlbHk6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZWxlbWVudCwgZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gZm9vZC5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hPcHRpb24oZm9vZCwgcHJkQm94KSB7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNsaWRlcyhlbGVtZW50LCBTbGlkZXMpIHtcclxuICAgICAgICBjb25zdCBsYXN0U2xpZGVzID0gQXJyYXkuZnJvbShTbGlkZXMpLnNsaWNlKC00KTtcclxuXHJcbiAgICAgICAgU2xpZGVzLmZvckVhY2goU2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChTbGlkZS5jbG9uZU5vZGUodHJ1ZSkpKTtcclxuICAgICAgICBsYXN0U2xpZGVzLnJldmVyc2UoKS5mb3JFYWNoKGxhc3RTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShsYXN0U2xpZGUuY2xvbmVOb2RlKHRydWUpLCBlbGVtZW50LmNoaWxkTm9kZXNbMF0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2xpZGVzKHtcclxuICAgICAgICBJbW1lZGlhdGVseVxyXG4gICAgfSkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBJbW1lZGlhdGVseSA/ICcwcycgOiAnMC41cyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dGhpcy5zdGF0ZS5pbmRleH0lKWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcInByZF9ib3hcXFwiPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRodW1iX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGFsdD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmFsdCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYWx0IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJhbHRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgICAgICAgICA8L3A+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2lyY2xlX21hc2tcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcInByZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXV0b2NvbXBsZXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IHRoaXMucXMoJyNzZWFyY2hfc3RyJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsID0gdGhpcy5xcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucycpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQnV0dG9uRWwgPSB0aGlzLnFzKCcuc2VhcmNoX2J0bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgcHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub24oJ2tleXVwJywgZSA9PiB0aGlzLmVtaXQoJ0BwcmVzcycsIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGUua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBpc1NlbGV0ZWQ6ICEhdGhpcy5zZWxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2VhcmNoX2J0bicsICdjbGljaycsICgpID0+IHRoaXMuZW1pdCgnQHN1Ym1pdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiB0aGlzLnNlYXJjaEVsLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJyNzZWFyY2hfc3RyJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiAhdGhpcy5pc09wZW4oKSAmJiAhdGhpcy5zZWFyY2hFbC52YWx1ZSAmJiB0aGlzLmVtaXQoJ0BoaXN0b3J5JykpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGlja1N1Z2dlc3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KS5zZXRTZWFyY2hiYXIoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICcqJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICBlID0+IGUudGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEVsICYmIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdmVyJywgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW91dCcsICgpID0+IHRoaXMuZW1wdHlTZWwoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXV0b0NvbXBsZXRlKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoZXMoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckF1dG9Db21wbGV0ZSh0ZXJtLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBSZWdFeHAodGVybSwgJ2knKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc0NvbXBvbmVudCA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlDb21wb25lbnQgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoZXMnLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc2VhcmNoXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaGlzdG9yeUNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSB0aGlzLnNlbC5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuZW1wdHlTZWwoKS5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHVwU2VsKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2VsID8gdGhpcy5zZWwucHJldmlvdXNTaWJsaW5nIDogdGhpcy5zdWdnZXN0aW9uc0VsLmxhc3RDaGlsZDtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuc2V0U2VsKHRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZG93blNlbCgpe1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2VsID8gdGhpcy5zZWwubmV4dFNpYmxpbmcgOiB0aGlzLnN1Z2dlc3Rpb25zRWwuZmlyc3RDaGlsZDtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuc2V0U2VsKHRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VsKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuc2VsID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlTZWwoKSB7XHJcbiAgICAgICAgdGhpcy5zZWwgJiYgdGhpcy5zZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSAnJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpc09wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUw7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==