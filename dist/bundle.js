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
exports.push([module.i, "/* reset styles */\n*,\n*:after,\n*:before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nhtml,\nbody {\n  font-family: 'Nanum Gothic';\n  width: 100%;\n  font-size: 12px;\n  background: #fff; }\n\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n  background: transparent; }\n\ndt {\n  font-weight: bold; }\n\nol,\nul,\ndl {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\n/* Fading animation */\n.fadein {\n  opacity: 1;\n  transition: opacity 2s; }\n\n.fadeout {\n  opacity: 0;\n  transition: opacity 2s; }\n\n/* components styles */\n.food {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto; }\n\n.lnb_wrap {\n  position: relative;\n  background: #fff;\n  border-bottom: 1px solid #e9e9e9; }\n  .lnb_wrap > .lnb_content {\n    background: #fff;\n    height: 36px;\n    letter-spacing: -0.2px;\n    width: 980px;\n    margin: 0 auto; }\n    .lnb_wrap > .lnb_content span.ic {\n      display: inline-block;\n      zoom: 1;\n      width: 7px;\n      height: 11px;\n      background: url(https://cdn.bmf.kr/web/common/bul_arr_down.png) no-repeat center 1px;\n      margin-left: 4px; }\n\n.link_app {\n  float: left;\n  height: 100%; }\n  .link_app > a {\n    display: block;\n    font-size: 12px;\n    height: 100%;\n    padding: 10px 11px 9px;\n    text-align: center;\n    color: #666; }\n    .link_app > a:hover {\n      color: #2ac1bc; }\n\n.lnb_list {\n  float: right;\n  height: 100%; }\n  .lnb_list > li {\n    float: left;\n    height: 100%; }\n    .lnb_list > li.util_cart > a {\n      color: #333;\n      font-weight: bold; }\n    .lnb_list > li > a {\n      display: block;\n      font-size: 12px;\n      height: 100%;\n      padding: 10px 10px 9px 10px;\n      text-align: center;\n      color: #666;\n      background: url(https://cdn.bmf.kr/web/common/util_bar.gif) no-repeat 0 12px; }\n      .lnb_list > li > a:hover {\n        color: #2ac1bc; }\n\n.header_wrap {\n  position: relative;\n  height: 98px;\n  width: 980px;\n  margin: 0 auto; }\n  .header_wrap > .logo {\n    float: left;\n    margin: 16px 0 0 5px; }\n\n.searchbar {\n  position: relative;\n  float: left;\n  margin: 30px 0 0 46px; }\n  .searchbar > input {\n    width: 210px;\n    height: 40px;\n    color: #888888;\n    border: 1px solid #cfd0d2;\n    padding: 0px 38px 0px 15px; }\n  .searchbar > button {\n    background: url(https://cdn.bmf.kr/web/common/ic_search.png) no-repeat center 0;\n    width: 38px;\n    height: 38px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    border: 0;\n    cursor: pointer; }\n    .searchbar > button:hover {\n      background-position: center 100%; }\n\n.autocomplete_suggestions {\n  width: 210px;\n  text-align: left;\n  cursor: pointer;\n  z-index: 9999;\n  background: #fff;\n  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);\n  display: block;\n  position: absolute;\n  overflow: hidden; }\n  .autocomplete_suggestions > .autocomplete_suggestion {\n    position: relative;\n    padding: 6px 0 3px 25px;\n    line-height: 23px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1.2em;\n    color: #333; }\n    .autocomplete_suggestions > .autocomplete_suggestion b {\n      font-weight: bold;\n      color: #fe1a1a; }\n    .autocomplete_suggestions > .autocomplete_suggestion.selected {\n      background: #f0f0f0bd; }\n    .autocomplete_suggestions > .autocomplete_suggestion.searches {\n      color: #52188c; }\n\n.gnb_top {\n  overflow: hidden;\n  float: right;\n  margin-right: 5px; }\n  .gnb_top > li {\n    float: left; }\n    .gnb_top > li > a {\n      display: block;\n      height: 48px;\n      margin: 25px 0 25px 50px; }\n\n.navi_wrap {\n  position: relative;\n  z-index: 1;\n  background: #483f35; }\n  .navi_wrap > .navi_content {\n    width: 980px;\n    height: 52px;\n    margin: 0 auto; }\n\n.gnb > li {\n  width: 124px;\n  height: 52px;\n  float: left;\n  position: relative;\n  text-align: left; }\n  .gnb > li > a {\n    display: block;\n    padding: 5px 0 0 1px; }\n    .gnb > li > a > span {\n      display: inline-block;\n      color: white;\n      font-size: 16px;\n      font-weight: bold;\n      text-align: center;\n      height: 47px;\n      padding: 11px 25px 0px; }\n  .gnb > li:first-child {\n    width: 100px; }\n  .gnb > li:nth-child(7) {\n    width: 120px; }\n  .gnb > li:nth-child(8) {\n    width: 140px;\n    background: #362d25;\n    text-align: center; }\n  .gnb > li:hover > a > span, .gnb > li:focus > a > span {\n    background: #fff;\n    color: #2ac1bc; }\n  .gnb > li:hover > ul, .gnb > li:focus > ul {\n    display: block; }\n\n.sub_list {\n  display: none;\n  width: 162px;\n  position: absolute;\n  left: 0;\n  top: 52px;\n  padding: 20px 0 31px;\n  background: #fff;\n  border: 1px solid rgba(72, 63, 53, 0.6);\n  border-top: 0; }\n  .sub_list a {\n    display: block;\n    color: #555;\n    font-size: 14px;\n    line-height: 20px;\n    padding: 6px 0 3px 25px;\n    text-align: left; }\n    .sub_list a:hover > span,\n    .sub_list a:focus > span {\n      font-size: 16px;\n      color: #2ac1bc;\n      font-weight: bold;\n      text-decoration: underline; }\n\n.main_slide {\n  position: relative;\n  text-align: center;\n  max-width: 1920px; }\n\n.main_slides_list {\n  width: auto;\n  position: relative;\n  overflow: hidden;\n  height: 420px; }\n  .main_slides_list > li {\n    float: left;\n    position: absolute;\n    display: block;\n    width: 100%;\n    background: no-repeat center top; }\n    .main_slides_list > li > a {\n      display: block;\n      width: 980px;\n      height: 420px;\n      margin: 0 auto;\n      overflow: hidden; }\n\n.slides_navi > a {\n  width: 60px;\n  height: 92px;\n  position: absolute;\n  top: 50%;\n  margin-top: -46px;\n  background: url(https://cdn.bmf.kr/web/common/main_slides_navi.png) no-repeat center center; }\n\n.slides_navi > .slides_prev {\n  right: 50%;\n  margin-right: 530px;\n  background-position: left center; }\n\n.slides_navi > .slides_next {\n  left: 50%;\n  margin-left: 530px;\n  background-position: right center; }\n\n.slides_dots {\n  position: relative;\n  bottom: 40px;\n  height: 0; }\n  .slides_dots > li {\n    display: inline-block;\n    vertical-align: top;\n    padding: 0 4px; }\n    .slides_dots > li > a {\n      display: block;\n      width: 10px;\n      height: 0;\n      padding-top: 10px;\n      overflow: hidden;\n      background: #FFF;\n      border-radius: 50%;\n      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n      opacity: 0.6; }\n      .slides_dots > li > a.now {\n        opacity: 1; }\n\n.best_food {\n  background: #eee;\n  text-align: center; }\n  .best_food > .best_food_content {\n    width: 980px;\n    margin: 0 auto; }\n    .best_food > .best_food_content > .best_food_title {\n      padding: 40px 0 30px;\n      position: relative; }\n\n.best_food_tabs {\n  height: 48px; }\n  .best_food_tabs > li {\n    display: inline-block;\n    background-color: #fff;\n    height: 48px; }\n    .best_food_tabs > li > a {\n      display: block;\n      width: 159px;\n      padding-top: 17px;\n      font-weight: bold;\n      height: 100%;\n      font-size: 15px;\n      line-height: 1.2;\n      color: #777; }\n    .best_food_tabs > li:focus > a,\n    .best_food_tabs > li:hover > a,\n    .best_food_tabs > li > a.now {\n      background: #1fcbc7;\n      color: #fff; }\n\n.best_food_container {\n  overflow: hidden;\n  padding-bottom: 45px; }\n  .best_food_container > .best_food_box_list {\n    display: none;\n    overflow: hidden;\n    width: 960px;\n    margin-top: 25px;\n    margin-left: 10px; }\n    .best_food_container > .best_food_box_list > .best_food_box_wrap {\n      position: relative;\n      float: left;\n      margin: 0 24px 10px 0;\n      color: #000;\n      background: #fff; }\n      .best_food_container > .best_food_box_list > .best_food_box_wrap:last-child {\n        margin: 0; }\n\n.food_img_hover {\n  display: none; }\n  .food_img_hover > ul {\n    position: relative;\n    top: 50%;\n    transform: translateY(-50%); }\n    .food_img_hover > ul > li {\n      margin: 0 15px 8px;\n      font-size: 20px;\n      color: #fff;\n      font-weight: bold;\n      text-align: center; }\n      .food_img_hover > ul > li > span {\n        display: inline-block;\n        padding: 13px 0 4px; }\n      .food_img_hover > ul > li:last-child > span {\n        background: url(https://cdn.bmf.kr/web/main/delivery_line.png) repeat-x 0 0; }\n\n.best_food_box > .badge_list, .prd_box > a > .badge_list {\n  height: 24px;\n  display: flex;\n  justify-content: space-around; }\n  .best_food_box > .badge_list > .badge, .prd_box > a > .badge_list > .badge {\n    padding: 4px 2px 5px;\n    margin-right: 3px;\n    color: #fff;\n    background: #a974bf;\n    width: 62px; }\n\n.best_food_box > .food_detail > .food_price > .old_price, .prd_detail > .prd_price > .old_price {\n  text-decoration: line-through;\n  font-size: 14px;\n  color: #888;\n  vertical-align: middle; }\n\n.best_food_box > .food_detail > .food_price > .new_price, .prd_detail > .prd_price > .new_price {\n  font-family: 'Montserrat', sans-serif;\n  letter-spacing: -2px;\n  margin-left: 9px;\n  color: #2ac1bc;\n  font-size: 26px;\n  font-weight: bold;\n  vertical-align: middle; }\n  .best_food_box > .food_detail > .food_price > .new_price > .won, .prd_detail > .prd_price > .new_price > .won {\n    margin-left: -6px;\n    font-size: 15px;\n    font-weight: bold;\n    top: -3px; }\n\n.best_food_box:hover .food_img_hover,\n.best_food_box:focus .food_img_hover, .prd_box:hover .food_img_hover,\n.prd_box:focus .food_img_hover {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6); }\n\n.best_food_box {\n  width: 304px;\n  height: 429px; }\n  .best_food_box:hover .food_img_hover,\n  .best_food_box:focus .food_img_hover {\n    height: 304px; }\n  .best_food_box > .food_img > img {\n    max-width: 100%;\n    position: relative; }\n  .best_food_box > .badge_list {\n    position: absolute;\n    top: 273px;\n    justify-content: flex-start;\n    margin: 0 0 10px 10px; }\n  .best_food_box > .food_detail {\n    padding: 18px 20px 15px;\n    height: 90px;\n    text-align: left; }\n    .best_food_box > .food_detail > .food_title {\n      letter-spacing: -1.2px;\n      font-size: 17px;\n      margin-bottom: 6px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_description {\n      margin-bottom: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_price {\n      float: right; }\n\n.infinite_food {\n  text-align: center;\n  position: relative; }\n  .infinite_food > .infinite_food_content {\n    width: 980px;\n    height: 670px;\n    margin: 0 auto;\n    overflow: hidden; }\n    .infinite_food > .infinite_food_content > .infinite_food_title {\n      margin: 70px 0 37px; }\n    .infinite_food > .infinite_food_content > .infinite_food_container {\n      height: 346px;\n      overflow: hidden; }\n      .infinite_food > .infinite_food_content > .infinite_food_container > .infinite_food_box_list {\n        width: 1000%; }\n    .infinite_food > .infinite_food_content .infinite_btn {\n      display: block;\n      margin: 38px auto;\n      padding: 15px 0 17px;\n      width: 980px;\n      text-align: center;\n      font-size: 15px;\n      color: #333;\n      border: 1px solid #d7d7d7; }\n      .infinite_food > .infinite_food_content .infinite_btn > span {\n        padding-right: 14px;\n        background: url(https://cdn.bmf.kr/web/main/btn_arr_more.png) no-repeat right; }\n\n.infinite_food_slides_navi > a {\n  position: absolute;\n  top: 257px;\n  width: 28px;\n  height: 52px;\n  background: url(https://cdn.bmf.kr/web/common/btn_prds_thumb_slides_navi.png) no-repeat center center; }\n\n.infinite_food_slides_navi > .slides_prev {\n  left: 50%;\n  margin-left: -558px;\n  background-position: left top; }\n  .infinite_food_slides_navi > .slides_prev:hover, .infinite_food_slides_navi > .slides_prev:focus {\n    background-position: left -52px; }\n\n.infinite_food_slides_navi > .slides_next {\n  right: 50%;\n  margin-right: -558px;\n  background-position: right top; }\n  .infinite_food_slides_navi > .slides_next:hover, .infinite_food_slides_navi > .slides_next:focus {\n    background-position: right -52px; }\n\n.side_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/171214/1513243712683_1e0a6312599e.jpg); }\n  .side_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.main_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170628/1498639751272_e6cadbda65b4.jpg); }\n  .main_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.course_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170425/1493082744401_ba9831e4e2bb.png); }\n  .course_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.thumb_img {\n  position: relative;\n  height: 215px;\n  border-radius: 50%;\n  overflow: hidden; }\n  .thumb_img > p > img {\n    max-width: 100%; }\n  .thumb_img > .circle_mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: url(https://cdn.bmf.kr/web/common/circle_mask.png) no-repeat center center;\n    width: 215px;\n    height: 215px; }\n\n.prd_box {\n  float: left;\n  list-style: none;\n  position: relative;\n  width: 215px;\n  margin: 0px 15px 8px; }\n\n.prd_detail {\n  padding: 18px 10px 12px 10px; }\n  .prd_detail > .prd_title {\n    color: #000;\n    letter-spacing: -1.2px;\n    font-size: 16px;\n    margin-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_description {\n    font-size: 13px;\n    letter-spacing: -1.2px;\n    margin-bottom: 5px;\n    color: #666;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n\n.scroller {\n  display: none;\n  position: fixed;\n  bottom: 70px;\n  left: 79%; }\n  .scroller > li > a {\n    display: block;\n    width: 50px;\n    height: 50px;\n    background: url(https://cdn.bmf.kr/web/common/btn_page_up_down_new.png) no-repeat; }\n  .scroller > .page_up > a {\n    background-position: 0 top; }\n    .scroller > .page_up > a:hover, .scroller > .page_up > a:focus {\n      background-position: -50px top; }\n  .scroller > .page_down > a {\n    background-position: 0 -50px; }\n    .scroller > .page_down > a:hover, .scroller > .page_down > a:focus {\n      background-position: -50px -50px; }\n", ""]);

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
                            return food.style.display = e.delegateTarget.dataset.category_id === food.dataset.category_id ? 'block' : 'none';
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
            this.foodBoxListEl[initNum].style.display = 'block';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODY1ZTYwNzFjZTkwZjE5MjQxOTAiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9WaWV3LmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS5zY3NzPzAxYTkiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L01haW5TbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sIiwid2VicGFjazovLy8uLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZWwiLCJuYW1lIiwic2xpY2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVudCIsImhhbmRsZXIiLCJ1c2VDYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJjYWxsYmFjayIsImxpc3RlbmVyRm4iLCJlIiwiZGVsZWdhdGVUYXJnZXQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FsbCIsIm9uIiwiZGF0YSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZGlzcGF0Y2hFdmVudCIsInN0eWxlIiwiZGlzcGxheSIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJfZGVsZWdhdGUiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidW5pcXVlIiwibWF0Y2giLCJzcmMiLCJ3aW5kb3ciLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZV9mb29kIiwibWFpbl9mb29kIiwiY291cnNlX2Zvb2QiLCJhdXRvQ29tcGxldGUiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImNzcyIsImxvY2F0aW9uIiwiRXJyb3IiLCJiYXNlVXJsIiwicHJvdG9jb2wiLCJob3N0IiwiY3VycmVudERpciIsInBhdGhuYW1lIiwicmVwbGFjZSIsImZpeGVkQ3NzIiwiZnVsbE1hdGNoIiwib3JpZ1VybCIsInVucXVvdGVkT3JpZ1VybCIsInRyaW0iLCJvIiwiJDEiLCJ0ZXN0IiwibmV3VXJsIiwiaW5kZXhPZiIsImF1dG9Db21wbGV0ZVZpZXciLCJpbmZpbml0ZVZpZXdzIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwiaW5maW5pdGVWaWV3IiwibW92ZVNjcm9sbGVyIiwiZGlyZWN0aW9uIiwicHJlc3NBdXRvQ29tcGxldGUiLCJzdWJtaXRLZXl3b3JkIiwia2V5d29yZCIsInNob3dIaXN0b3J5IiwicHJldmVudERlZmF1bHQiLCJzbGlkZUltZ3MiLCJjaGVja0xvY2FsU3RvcmFnZSIsInJlbmRlciIsInNlbGVjdFNsaWRlIiwiaW5kZXgiLCJtb3ZlU2xpZGUiLCJzbGlkZXNFbmQiLCJoaWRlQ3VycmVudFNsaWRlIiwic2V0SW5kZXgiLCJzaG93U2xpZGUiLCJjbGllbnRIZWlnaHQiLCJ0ZXJtIiwiaXNTZWxldGVkIiwiaXNVcCIsImlzZG93biIsImlzRVNDIiwiaXNFbnRlciIsImlzU3RyaW5nIiwidXBTZWwiLCJkb3duU2VsIiwiZW1wdHlBdXRvQ29tcGxldGUiLCJzZXRTZWFyY2hiYXIiLCJmZXRjaEF1dG9Db21wbGV0ZSIsInN1Z2dlc3Rpb25zIiwiaGlzdG9yeSIsIlNldCIsImFkZCIsImVtcHR5U2VhcmNoYmFyIiwicmV2ZXJzZSIsImZvb2REYXRhIiwidGFyZ2V0VmlldyIsInRocmVzaG9sZCIsIm1vdmVJbmZpbml0ZVNsaWRlcyIsInJlc2V0SW5maW5pdGVTbGlkZXMiLCJzaG93U2xpZGVzIiwiSW1tZWRpYXRlbHkiLCJ0aHJlc2hvbGRMZWZ0IiwidGhyZXNob2xkUmlnaHQiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJzbGlkZXNQcmV2RWwiLCJxcyIsInNsaWRlc05leHRFbCIsInN0YXRlIiwiYmluZENtZCIsImJpbmRDb21tYW5kcyIsInNsaWRlc05hdmkiLCJlbWl0IiwiZGF0YXNldCIsInNsaWRlc0RvdHMiLCJ0ZXh0Q29udGVudCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJNYWluU2xpZGUiLCJzbGlkZXNFbCIsInFzYSIsImRvdHNFbCIsIm1haW5TbGlkZVN0ciIsInNsaWRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiY2F0ZWdvcnlfaWQiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlclNlbGVjdGVkRm9vZCIsImZsb29yIiwicmFuZG9tIiwiZm9vZENvbnRhaW5lckVsIiwiZm9vZENvbnRhaW5lciIsImZvb2RCb3hMaXN0IiwiaXRlbXMiLCJpbWFnZSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJjbGljayIsImhpZGUiLCJzaG93IiwidHJhbnNpdGlvbmVuZCIsImJhbmNoYW4iLCJyZW5kZXJGb29kQm94T3B0aW9uIiwicmVuZGVyU2xpZGVzIiwicHJkQm94IiwiU2xpZGVzIiwibGFzdFNsaWRlcyIsIlNsaWRlIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwibGFzdFNsaWRlIiwiY2hpbGROb2RlcyIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsInNlYXJjaEVsIiwic3VnZ2VzdGlvbnNFbCIsInNlYXJjaEJ1dHRvbkVsIiwicHJlc3MiLCJrZXlDb2RlIiwic2VsIiwic3VibWl0IiwiaXNPcGVuIiwiY2xpY2tTdWdnZXN0aW9uIiwic2V0U2VsIiwibm9uQ2xpY2siLCJob3ZlciIsImVtcHR5U2VsIiwicmVuZGVyQXV0b0NvbXBsZXRlIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc0NvbXBvbmVudCIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwic2VhcmNoZXMiLCJoaXN0b3J5Q29tcG9uZW50IiwiY2xhc3MiLCJzZWFyY2giLCJwcmV2aW91c1NpYmxpbmciLCJsYXN0Q2hpbGQiLCJuZXh0U2libGluZyIsImZpcnN0Q2hpbGQiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBWTtBQUNQLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9B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YixpQkFBSzNCLFFBQUwsQ0FBY3BPLEtBQWQsR0FBc0IsRUFBdEI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUTtBQUNMLG1CQUFPLEtBQUtxTyxhQUFMLENBQW1CMEIsU0FBMUI7QUFDSDs7Ozs7Ozs7Ozs7O0FDOUhMO0FBQ0EseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDhLQUE4Syx3QkFBd0IsYUFBYTtBQUNuTjtBQUNBLDRLQUE0SywwQkFBMEIsYUFBYTtBQUNuTjtBQUNBLDRMQUE0TCxnQ0FBZ0MsYUFBYTtBQUN6TztBQUNBLENBQUMsZ0JBQWdCLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODY1ZTYwNzFjZTkwZjE5MjQxOTAiLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIGlmICghZWwpIHRocm93IGVsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGVsLnNsaWNlKDEpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBxcyhzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHFzYShzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxlZ2F0ZShzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICBjb25zdCBsaXN0ZW5lckZuID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCAmJiBjYWxsYmFjay5jYWxsKHRoaXMuZWwsIGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbWl0KGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XHJcbiAgICAgICAgICAgIGRldGFpbDogZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvVmlldy5qcyIsIi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZnVuY3Rpb24gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ3xBcnJheX0gW2VsZW1lbnRzXVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50cywgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cy5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBFbGVtZW50LWxlc3MgdXNhZ2UsIGl0IGRlZmF1bHRzIHRvIGdsb2JhbCBkZWxlZ2F0aW9uXHJcbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBVc2UgYGRvY3VtZW50YCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCB0aGVuIGFwcGx5IGFyZ3VtZW50c1xyXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydCB3YXkgdG8gLnVuc2hpZnQgYGFyZ3VtZW50c2Agd2l0aG91dCBydW5uaW5nIGludG8gZGVvcHRpbWl6YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50cyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBBcnJheS1saWtlIGJhc2VkIHVzYWdlXHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQsIGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQUpBWCByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4gKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApID9cclxuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZSkpIDogcmVqZWN0KHhoci5zdGF0dXMpO1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiByZWplY3QoJ3RpbWVvdXQnKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gdGhhdCwgd2hlbiBpbnZva2VkLCBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgRnVuY3Rpb24gdG8gd3JhcC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGxpbWl0IE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IGVsYXBzZSBiZXR3ZWVuIGBmdW5jYCBpbnZvY2F0aW9ucy5cclxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd3JhcHMgdGhlIGBmdW5jYCBmdW5jdGlvbiBwYXNzZWQgaW4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XHJcbiAgICBsZXQgd2FpdCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXdhaXQpIHtcclxuICAgICAgICAgICAgZnVuYy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB3YWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIGxpbWl0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW9uIHVudGlsIGhhbGZ3YXksIHRoZW4gZGVjZWxlcmF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBzdGFydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYyBjaGFuZ2UgaW4gdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfSBuZXcgc2Nyb2xsWVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xyXG4gICAgdCAvPSBkIC8gMjtcclxuICAgIGlmICh0IDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG4gICAgdC0tO1xyXG4gICAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHlcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKGtleSkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgcmV0dXJuIHZhbHVlLmRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKHJlY2VpdmVkVGltZSwgdGhyZXNob2xkSG91cikge1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSAoY3VycmVudFRpbWUgLSByZWNlaXZlZFRpbWUpIC8gMTAwMCAvIDYwIC8gNjA7XHJcbiAgICByZXR1cm4gZWxhcHNlZFRpbWUgPCB0aHJlc2hvbGRIb3VyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVNjcm9sbCh0bykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzY3JvbGxZO1xyXG4gICAgY29uc3QgY2hhbmdlID0gdG8gLSBzdGFydDtcclxuICAgIGNvbnN0IGR1cmF0aW9uID0gTWF0aC5hYnMoY2hhbmdlIC8gNCk7XHJcbiAgICBjb25zdCBpbmNyZW1lbnQgPSAyMDtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgY29uc3QgYW5pbWF0ZVNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBjdXJyZW50VGltZSArPSBpbmNyZW1lbnQ7XHJcbiAgICAgICAgbGV0IG5ld1kgPSBlYXNlSW5RdWFkKGN1cnJlbnRUaW1lLCBzdGFydCwgY2hhbmdlLCBkdXJhdGlvbik7XHJcbiAgICAgICAgc2Nyb2xsVG8oMCwgbmV3WSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlU2Nyb2xsKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hKU09OUCA9ICh1bmlxdWUgPT4gdXJsID0+XHJcbiAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gYF9qc29ucF8ke3VuaXF1ZSsrfWA7XHJcbiAgICAgICAgdXJsICs9IHVybC5tYXRjaCgvXFw/LykgPyBgJmNhbGxiYWNrPSR7bmFtZX1gIDogYD9jYWxsYmFjaz0ke25hbWV9YDtcclxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xyXG4gICAgICAgIHdpbmRvd1tuYW1lXSA9IGpzb24gPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGpzb24pO1xyXG4gICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbbmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9KVxyXG4pKDApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2hlbHBlcnMuanMiLCJpbXBvcnQge2NyZWF0ZUZyYW1lLCBleHRlbmQsIHRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHRIZWxwZXJzfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzfSBmcm9tICcuL2RlY29yYXRvcnMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzQuMC4xMSc7XG5leHBvcnQgY29uc3QgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmNvbnN0IG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2dnZXIubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBleHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihgQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJHtuYW1lfVwiIGFzIHVuZGVmaW5lZGApO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydCB7Y3JlYXRlRnJhbWUsIGxvZ2dlcn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICA8ZGl2IGNsYXNzPSdiYWRnZSc+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCI8L2Rpdj5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImJhZGdlX2xpc3RcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmJhZGdlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICA8c3Bhbj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvbGk+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPSdmb29kX2ltZ19ob3Zlcic+XFxyXFxuICAgIDx1bD5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZWxpdmVyeV90eXBlIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8L3VsPlxcclxcbjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQgTWFpblNsaWRlVmlldyBmcm9tICcuL3ZpZXcvTWFpblNsaWRlVmlldyc7XHJcbmltcG9ydCBCZXN0QmFuY2hhblZpZXcgZnJvbSAnLi92aWV3L0Jlc3RCYW5jaGFuVmlldyc7XHJcbmltcG9ydCBTY3JvbGxlclZpZXcgZnJvbSAnLi92aWV3L1Njcm9sbGVyVmlldyc7XHJcbmltcG9ydCBJbmZpbml0ZVNsaWRlVmlldyBmcm9tICcuL3ZpZXcvSW5maW5pdGVTbGlkZVZpZXcnO1xyXG5pbXBvcnQgQXV0b21Db21wbGV0ZVZpZXcgZnJvbSAnLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcnO1xyXG5cclxuY29uc3QgdXJsTGlzdCA9IHtcclxuICAgIG1haW5TbGlkZTogJ2h0dHA6Ly9ob21lLmRvdG9sLnh5ei9waHAvdGVzdF9hcGkucGhwJyxcclxuICAgIGJlc3RCYW5jaGFuOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL2Jlc3QnLFxyXG4gICAgc2lkZV9mb29kOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL3NpZGUnLFxyXG4gICAgbWFpbl9mb29kOiAnaHR0cDovL2Nyb25nLmNvZGVzcXVhZC5rcjo4MDgwL3dvb3dhL21haW4nLFxyXG4gICAgY291cnNlX2Zvb2Q6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2Evc291cCcsXHJcbiAgICBhdXRvQ29tcGxldGU6ICdodHRwczovL2tvLndpa2lwZWRpYS5vcmcvdy9hcGkucGhwP2FjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD0nXHJcbn07XHJcblxyXG5jb25zdCBtYWluU2xpZGVWaWV3ID0gbmV3IE1haW5TbGlkZVZpZXcoJy5tYWluX3NsaWRlJyk7XHJcbmNvbnN0IGJlc3RCYW5jaGFuVmlldyA9IG5ldyBCZXN0QmFuY2hhblZpZXcoJy5iZXN0X2Zvb2QnKTtcclxuY29uc3Qgc2Nyb2xsZXJWaWV3ID0gbmV3IFNjcm9sbGVyVmlldygnLnNjcm9sbGVyJyk7XHJcbmNvbnN0IHNpZGVCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnLnNpZGVfZm9vZCcpO1xyXG5jb25zdCBtYWluQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJy5tYWluX2Zvb2QnKTtcclxuY29uc3QgY291cnNlQmFuY2hhblZpZXcgPSBuZXcgSW5maW5pdGVTbGlkZVZpZXcoJy5jb3Vyc2VfZm9vZCcpO1xyXG5jb25zdCBhdXRvbUNvbXBsZXRlVmlldyA9IG5ldyBBdXRvbUNvbXBsZXRlVmlldygnLnNlYXJjaGJhcicpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7Q29udHJvbGxlcn1cclxuICovXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih1cmxMaXN0LCBtYWluU2xpZGVWaWV3LCBiZXN0QmFuY2hhblZpZXcsIHNjcm9sbGVyVmlldywgYXV0b21Db21wbGV0ZVZpZXcsIHNpZGVCYW5jaGFuVmlldywgbWFpbkJhbmNoYW5WaWV3LCBjb3Vyc2VCYW5jaGFuVmlldyk7XHJcblxyXG5jb25zdCBzZXRWaWV3ID0gKCkgPT4gY29udHJvbGxlci5zZXRWaWV3KCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0Vmlldyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vZWFybHlhY2Nlc3MvbmFudW1nb3RoaWMuY3NzKTtcIiwgXCJcIl0pO1xuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIHJlc2V0IHN0eWxlcyAqL1xcbiosXFxuKjphZnRlcixcXG4qOmJlZm9yZSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYyc7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGJhY2tncm91bmQ6ICNmZmY7IH1cXG5cXG5kaXYsXFxuc3BhbixcXG5vYmplY3QsXFxuaWZyYW1lLFxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbnAsXFxuYmxvY2txdW90ZSxcXG5wcmUsXFxuYWJicixcXG5hZGRyZXNzLFxcbmNpdGUsXFxuY29kZSxcXG5kZWwsXFxuZGZuLFxcbmVtLFxcbmltZyxcXG5pbnMsXFxua2JkLFxcbnEsXFxuc2FtcCxcXG5zbWFsbCxcXG5zdHJvbmcsXFxudmFyLFxcbmIsXFxuaSxcXG5kbCxcXG5kdCxcXG5kZCxcXG5vbCxcXG51bCxcXG5saSxcXG5maWVsZHNldCxcXG5mb3JtLFxcbmxhYmVsLFxcbmxlZ2VuZCxcXG50YWJsZSxcXG5jYXB0aW9uLFxcbnRib2R5LFxcbnRmb290LFxcbnRoZWFkLFxcbnRyLFxcbnRoLFxcbnRkLFxcbmFydGljbGUsXFxuYXNpZGUsXFxuY2FudmFzLFxcbmRldGFpbHMsXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5tZW51LFxcbm5hdixcXG5zZWN0aW9uLFxcbnN1bW1hcnksXFxudGltZSxcXG5tYXJrLFxcbmF1ZGlvLFxcbnZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBvdXRsaW5lOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuXFxuZHQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG5vbCxcXG51bCxcXG5kbCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cXG4vKiBGYWRpbmcgYW5pbWF0aW9uICovXFxuLmZhZGVpbiB7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAyczsgfVxcblxcbi5mYWRlb3V0IHtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDJzOyB9XFxuXFxuLyogY29tcG9uZW50cyBzdHlsZXMgKi9cXG4uZm9vZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4ubG5iX3dyYXAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTllOWU5OyB9XFxuICAubG5iX3dyYXAgPiAubG5iX2NvbnRlbnQge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDM2cHg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMC4ycHg7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmxuYl93cmFwID4gLmxuYl9jb250ZW50IHNwYW4uaWMge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB6b29tOiAxO1xcbiAgICAgIHdpZHRoOiA3cHg7XFxuICAgICAgaGVpZ2h0OiAxMXB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idWxfYXJyX2Rvd24ucG5nKSBuby1yZXBlYXQgY2VudGVyIDFweDtcXG4gICAgICBtYXJnaW4tbGVmdDogNHB4OyB9XFxuXFxuLmxpbmtfYXBwIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuICAubGlua19hcHAgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAxMHB4IDExcHggOXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjNjY2OyB9XFxuICAgIC5saW5rX2FwcCA+IGE6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMmFjMWJjOyB9XFxuXFxuLmxuYl9saXN0IHtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgLmxuYl9saXN0ID4gbGkge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgaGVpZ2h0OiAxMDAlOyB9XFxuICAgIC5sbmJfbGlzdCA+IGxpLnV0aWxfY2FydCA+IGEge1xcbiAgICAgIGNvbG9yOiAjMzMzO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAgIC5sbmJfbGlzdCA+IGxpID4gYSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDEwcHggOXB4IDEwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi91dGlsX2Jhci5naWYpIG5vLXJlcGVhdCAwIDEycHg7IH1cXG4gICAgICAubG5iX2xpc3QgPiBsaSA+IGE6aG92ZXIge1xcbiAgICAgICAgY29sb3I6ICMyYWMxYmM7IH1cXG5cXG4uaGVhZGVyX3dyYXAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiA5OHB4O1xcbiAgd2lkdGg6IDk4MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87IH1cXG4gIC5oZWFkZXJfd3JhcCA+IC5sb2dvIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMTZweCAwIDAgNXB4OyB9XFxuXFxuLnNlYXJjaGJhciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbjogMzBweCAwIDAgNDZweDsgfVxcbiAgLnNlYXJjaGJhciA+IGlucHV0IHtcXG4gICAgd2lkdGg6IDIxMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGNvbG9yOiAjODg4ODg4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2ZkMGQyO1xcbiAgICBwYWRkaW5nOiAwcHggMzhweCAwcHggMTVweDsgfVxcbiAgLnNlYXJjaGJhciA+IGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9pY19zZWFyY2gucG5nKSBuby1yZXBlYXQgY2VudGVyIDA7XFxuICAgIHdpZHRoOiAzOHB4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxcHg7XFxuICAgIHJpZ2h0OiAxcHg7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5zZWFyY2hiYXIgPiBidXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciAxMDAlOyB9XFxuXFxuLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyB7XFxuICB3aWR0aDogMjEwcHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgei1pbmRleDogOTk5OTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3gtc2hhZG93OiAtMXB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBwYWRkaW5nOiA2cHggMCAzcHggMjVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDEuMmVtO1xcbiAgICBjb2xvcjogIzMzMzsgfVxcbiAgICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIGIge1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGNvbG9yOiAjZmUxYTFhOyB9XFxuICAgIC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMgPiAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VsZWN0ZWQge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmMGYwZjBiZDsgfVxcbiAgICAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zID4gLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uLnNlYXJjaGVzIHtcXG4gICAgICBjb2xvcjogIzUyMTg4YzsgfVxcblxcbi5nbmJfdG9wIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDsgfVxcbiAgLmduYl90b3AgPiBsaSB7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAgIC5nbmJfdG9wID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBoZWlnaHQ6IDQ4cHg7XFxuICAgICAgbWFyZ2luOiAyNXB4IDAgMjVweCA1MHB4OyB9XFxuXFxuLm5hdmlfd3JhcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAxO1xcbiAgYmFja2dyb3VuZDogIzQ4M2YzNTsgfVxcbiAgLm5hdmlfd3JhcCA+IC5uYXZpX2NvbnRlbnQge1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIGhlaWdodDogNTJweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uZ25iID4gbGkge1xcbiAgd2lkdGg6IDEyNHB4O1xcbiAgaGVpZ2h0OiA1MnB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAuZ25iID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmc6IDVweCAwIDAgMXB4OyB9XFxuICAgIC5nbmIgPiBsaSA+IGEgPiBzcGFuIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgY29sb3I6IHdoaXRlO1xcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgaGVpZ2h0OiA0N3B4O1xcbiAgICAgIHBhZGRpbmc6IDExcHggMjVweCAwcHg7IH1cXG4gIC5nbmIgPiBsaTpmaXJzdC1jaGlsZCB7XFxuICAgIHdpZHRoOiAxMDBweDsgfVxcbiAgLmduYiA+IGxpOm50aC1jaGlsZCg3KSB7XFxuICAgIHdpZHRoOiAxMjBweDsgfVxcbiAgLmduYiA+IGxpOm50aC1jaGlsZCg4KSB7XFxuICAgIHdpZHRoOiAxNDBweDtcXG4gICAgYmFja2dyb3VuZDogIzM2MmQyNTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAuZ25iID4gbGk6aG92ZXIgPiBhID4gc3BhbiwgLmduYiA+IGxpOmZvY3VzID4gYSA+IHNwYW4ge1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBjb2xvcjogIzJhYzFiYzsgfVxcbiAgLmduYiA+IGxpOmhvdmVyID4gdWwsIC5nbmIgPiBsaTpmb2N1cyA+IHVsIHtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG5cXG4uc3ViX2xpc3Qge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAxNjJweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDUycHg7XFxuICBwYWRkaW5nOiAyMHB4IDAgMzFweDtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDcyLCA2MywgNTMsIDAuNik7XFxuICBib3JkZXItdG9wOiAwOyB9XFxuICAuc3ViX2xpc3QgYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogIzU1NTtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgcGFkZGluZzogNnB4IDAgM3B4IDI1cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG4gICAgLnN1Yl9saXN0IGE6aG92ZXIgPiBzcGFuLFxcbiAgICAuc3ViX2xpc3QgYTpmb2N1cyA+IHNwYW4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICBjb2xvcjogIzJhYzFiYztcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxcblxcbi5tYWluX3NsaWRlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogMTkyMHB4OyB9XFxuXFxuLm1haW5fc2xpZGVzX2xpc3Qge1xcbiAgd2lkdGg6IGF1dG87XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgaGVpZ2h0OiA0MjBweDsgfVxcbiAgLm1haW5fc2xpZGVzX2xpc3QgPiBsaSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogbm8tcmVwZWF0IGNlbnRlciB0b3A7IH1cXG4gICAgLm1haW5fc2xpZGVzX2xpc3QgPiBsaSA+IGEge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiA5ODBweDtcXG4gICAgICBoZWlnaHQ6IDQyMHB4O1xcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uc2xpZGVzX25hdmkgPiBhIHtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA5MnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtNDZweDtcXG4gIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9tYWluX3NsaWRlc19uYXZpLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7IH1cXG5cXG4uc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXYge1xcbiAgcmlnaHQ6IDUwJTtcXG4gIG1hcmdpbi1yaWdodDogNTMwcHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dCB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogNTMwcHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7IH1cXG5cXG4uc2xpZGVzX2RvdHMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiA0MHB4O1xcbiAgaGVpZ2h0OiAwOyB9XFxuICAuc2xpZGVzX2RvdHMgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gICAgcGFkZGluZzogMCA0cHg7IH1cXG4gICAgLnNsaWRlc19kb3RzID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTBweDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgcGFkZGluZy10b3A6IDEwcHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICAgIG9wYWNpdHk6IDAuNjsgfVxcbiAgICAgIC5zbGlkZXNfZG90cyA+IGxpID4gYS5ub3cge1xcbiAgICAgICAgb3BhY2l0eTogMTsgfVxcblxcbi5iZXN0X2Zvb2Qge1xcbiAgYmFja2dyb3VuZDogI2VlZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCA+IC5iZXN0X2Zvb2RfdGl0bGUge1xcbiAgICAgIHBhZGRpbmc6IDQwcHggMCAzMHB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5iZXN0X2Zvb2RfdGFicyB7XFxuICBoZWlnaHQ6IDQ4cHg7IH1cXG4gIC5iZXN0X2Zvb2RfdGFicyA+IGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDQ4cHg7IH1cXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTU5cHg7XFxuICAgICAgcGFkZGluZy10b3A6IDE3cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIGNvbG9yOiAjNzc3OyB9XFxuICAgIC5iZXN0X2Zvb2RfdGFicyA+IGxpOmZvY3VzID4gYSxcXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGk6aG92ZXIgPiBhLFxcbiAgICAuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEubm93IHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMWZjYmM3O1xcbiAgICAgIGNvbG9yOiAjZmZmOyB9XFxuXFxuLmJlc3RfZm9vZF9jb250YWluZXIge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmctYm90dG9tOiA0NXB4OyB9XFxuICAuYmVzdF9mb29kX2NvbnRhaW5lciA+IC5iZXN0X2Zvb2RfYm94X2xpc3Qge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB3aWR0aDogOTYwcHg7XFxuICAgIG1hcmdpbi10b3A6IDI1cHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XFxuICAgIC5iZXN0X2Zvb2RfY29udGFpbmVyID4gLmJlc3RfZm9vZF9ib3hfbGlzdCA+IC5iZXN0X2Zvb2RfYm94X3dyYXAge1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBmbG9hdDogbGVmdDtcXG4gICAgICBtYXJnaW46IDAgMjRweCAxMHB4IDA7XFxuICAgICAgY29sb3I6ICMwMDA7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAgIC5iZXN0X2Zvb2RfY29udGFpbmVyID4gLmJlc3RfZm9vZF9ib3hfbGlzdCA+IC5iZXN0X2Zvb2RfYm94X3dyYXA6bGFzdC1jaGlsZCB7XFxuICAgICAgICBtYXJnaW46IDA7IH1cXG5cXG4uZm9vZF9pbWdfaG92ZXIge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmZvb2RfaW1nX2hvdmVyID4gdWwge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7IH1cXG4gICAgLmZvb2RfaW1nX2hvdmVyID4gdWwgPiBsaSB7XFxuICAgICAgbWFyZ2luOiAwIDE1cHggOHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAuZm9vZF9pbWdfaG92ZXIgPiB1bCA+IGxpID4gc3BhbiB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBwYWRkaW5nOiAxM3B4IDAgNHB4OyB9XFxuICAgICAgLmZvb2RfaW1nX2hvdmVyID4gdWwgPiBsaTpsYXN0LWNoaWxkID4gc3BhbiB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9tYWluL2RlbGl2ZXJ5X2xpbmUucG5nKSByZXBlYXQteCAwIDA7IH1cXG5cXG4uYmVzdF9mb29kX2JveCA+IC5iYWRnZV9saXN0LCAucHJkX2JveCA+IGEgPiAuYmFkZ2VfbGlzdCB7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3QgPiAuYmFkZ2UsIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0ID4gLmJhZGdlIHtcXG4gICAgcGFkZGluZzogNHB4IDJweCA1cHg7XFxuICAgIG1hcmdpbi1yaWdodDogM3B4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYmFja2dyb3VuZDogI2E5NzRiZjtcXG4gICAgd2lkdGg6IDYycHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3ByaWNlID4gLm9sZF9wcmljZSwgLnByZF9kZXRhaWwgPiAucHJkX3ByaWNlID4gLm9sZF9wcmljZSB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGNvbG9yOiAjODg4O1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcblxcbi5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAubmV3X3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAubmV3X3ByaWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCcsIHNhbnMtc2VyaWY7XFxuICBsZXR0ZXItc3BhY2luZzogLTJweDtcXG4gIG1hcmdpbi1sZWZ0OiA5cHg7XFxuICBjb2xvcjogIzJhYzFiYztcXG4gIGZvbnQtc2l6ZTogMjZweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9kZXRhaWwgPiAuZm9vZF9wcmljZSA+IC5uZXdfcHJpY2UgPiAud29uLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAubmV3X3ByaWNlID4gLndvbiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNnB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICB0b3A6IC0zcHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLmJlc3RfZm9vZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyLCAucHJkX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLnByZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjYpOyB9XFxuXFxuLmJlc3RfZm9vZF9ib3gge1xcbiAgd2lkdGg6IDMwNHB4O1xcbiAgaGVpZ2h0OiA0MjlweDsgfVxcbiAgLmJlc3RfZm9vZF9ib3g6aG92ZXIgLmZvb2RfaW1nX2hvdmVyLFxcbiAgLmJlc3RfZm9vZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyIHtcXG4gICAgaGVpZ2h0OiAzMDRweDsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9pbWcgPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuYmFkZ2VfbGlzdCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNzNweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBtYXJnaW46IDAgMCAxMHB4IDEwcHg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsIHtcXG4gICAgcGFkZGluZzogMThweCAyMHB4IDE1cHg7XFxuICAgIGhlaWdodDogOTBweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3RpdGxlIHtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogLTEuMnB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfZGVzY3JpcHRpb24ge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2Uge1xcbiAgICAgIGZsb2F0OiByaWdodDsgfVxcblxcbi5pbmZpbml0ZV9mb29kIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IHtcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDY3MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF90aXRsZSB7XFxuICAgICAgbWFyZ2luOiA3MHB4IDAgMzdweDsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF9jb250YWluZXIge1xcbiAgICAgIGhlaWdodDogMzQ2cHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCA+IC5pbmZpbml0ZV9mb29kX2NvbnRhaW5lciA+IC5pbmZpbml0ZV9mb29kX2JveF9saXN0IHtcXG4gICAgICAgIHdpZHRoOiAxMDAwJTsgfVxcbiAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgLmluZmluaXRlX2J0biB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgbWFyZ2luOiAzOHB4IGF1dG87XFxuICAgICAgcGFkZGluZzogMTVweCAwIDE3cHg7XFxuICAgICAgd2lkdGg6IDk4MHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgY29sb3I6ICMzMzM7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Q3ZDdkNzsgfVxcbiAgICAgIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCAuaW5maW5pdGVfYnRuID4gc3BhbiB7XFxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxNHB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvbWFpbi9idG5fYXJyX21vcmUucG5nKSBuby1yZXBlYXQgcmlnaHQ7IH1cXG5cXG4uaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IGEge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAyNTdweDtcXG4gIHdpZHRoOiAyOHB4O1xcbiAgaGVpZ2h0OiA1MnB4O1xcbiAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL2J0bl9wcmRzX3RodW1iX3NsaWRlc19uYXZpLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7IH1cXG5cXG4uaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldiB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogLTU1OHB4O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCB0b3A7IH1cXG4gIC5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19wcmV2OmhvdmVyLCAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfcHJldjpmb2N1cyB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgLTUycHg7IH1cXG5cXG4uaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dCB7XFxuICByaWdodDogNTAlO1xcbiAgbWFyZ2luLXJpZ2h0OiAtNTU4cHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCB0b3A7IH1cXG4gIC5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19uZXh0OmhvdmVyLCAuaW5maW5pdGVfZm9vZF9zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dDpmb2N1cyB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IC01MnB4OyB9XFxuXFxuLnNpZGVfZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci9iYW5uZXIvbWFpbl9ldmVudC8xNzEyMTQvMTUxMzI0MzcxMjY4M18xZTBhNjMxMjU5OWUuanBnKTsgfVxcbiAgLnNpZGVfZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiAxNDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4ubWFpbl9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL2Jhbm5lci9tYWluX2V2ZW50LzE3MDYyOC8xNDk4NjM5NzUxMjcyX2U2Y2FkYmRhNjViNC5qcGcpOyB9XFxuICAubWFpbl9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDE0MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5jb3Vyc2VfZm9vZCAuaW5maW5pdGVfZm9vZF9iYW5uZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci9iYW5uZXIvbWFpbl9ldmVudC8xNzA0MjUvMTQ5MzA4Mjc0NDQwMV9iYTk4MzFlNGUyYmIucG5nKTsgfVxcbiAgLmNvdXJzZV9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDE0MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi50aHVtYl9pbWcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAyMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC50aHVtYl9pbWcgPiBwID4gaW1nIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlOyB9XFxuICAudGh1bWJfaW1nID4gLmNpcmNsZV9tYXNrIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9jaXJjbGVfbWFzay5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyO1xcbiAgICB3aWR0aDogMjE1cHg7XFxuICAgIGhlaWdodDogMjE1cHg7IH1cXG5cXG4ucHJkX2JveCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMjE1cHg7XFxuICBtYXJnaW46IDBweCAxNXB4IDhweDsgfVxcblxcbi5wcmRfZGV0YWlsIHtcXG4gIHBhZGRpbmc6IDE4cHggMTBweCAxMnB4IDEwcHg7IH1cXG4gIC5wcmRfZGV0YWlsID4gLnByZF90aXRsZSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBsZXR0ZXItc3BhY2luZzogLTEuMnB4O1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gIC5wcmRfZGV0YWlsID4gLnByZF9kZXNjcmlwdGlvbiB7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0xLjJweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgICBjb2xvcjogIzY2NjtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG5cXG4uc2Nyb2xsZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogNzBweDtcXG4gIGxlZnQ6IDc5JTsgfVxcbiAgLnNjcm9sbGVyID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idG5fcGFnZV91cF9kb3duX25ldy5wbmcpIG5vLXJlcGVhdDsgfVxcbiAgLnNjcm9sbGVyID4gLnBhZ2VfdXAgPiBhIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCB0b3A7IH1cXG4gICAgLnNjcm9sbGVyID4gLnBhZ2VfdXAgPiBhOmhvdmVyLCAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGE6Zm9jdXMge1xcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC01MHB4IHRvcDsgfVxcbiAgLnNjcm9sbGVyID4gLnBhZ2VfZG93biA+IGEge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC01MHB4OyB9XFxuICAgIC5zY3JvbGxlciA+IC5wYWdlX2Rvd24gPiBhOmhvdmVyLCAuc2Nyb2xsZXIgPiAucGFnZV9kb3duID4gYTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTUwcHggLTUwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGRlbGVnYXRlLFxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgc2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgaXNWYWxpZCxcclxuICAgIG1vdmVTY3JvbGwsXHJcbiAgICBmZXRjaEpTT05QXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybExpc3QsIG1haW5TbGlkZVZpZXcsIGJlc3RCYW5jaGFuVmlldywgc2Nyb2xsZXJWaWV3LCBhdXRvQ29tcGxldGVWaWV3LCAuLi5pbmZpbml0ZVZpZXdzKSB7XHJcbiAgICAgICAgdGhpcy51cmxMaXN0ID0gdXJsTGlzdDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcgPSBtYWluU2xpZGVWaWV3O1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3ID0gYmVzdEJhbmNoYW5WaWV3O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3ID0gc2Nyb2xsZXJWaWV3O1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldyA9IGF1dG9Db21wbGV0ZVZpZXc7XHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzID0gaW5maW5pdGVWaWV3cztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hNYWluU2xpZGUodGhpcy51cmxMaXN0Lm1haW5TbGlkZSk7XHJcbiAgICAgICAgdGhpcy5mZXRjaEJlc3RCYW5jaGFuKHRoaXMudXJsTGlzdC5iZXN0QmFuY2hhbik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cy5mb3JFYWNoKGluZmluaXRlVmlldyA9PlxyXG4gICAgICAgICAgICB0aGlzLmZldGNoSW5maW5pdGVCYW5jaGFuKGluZmluaXRlVmlldywgdGhpcy51cmxMaXN0W2luZmluaXRlVmlldy5uYW1lXSkpO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldy5iaW5kKCdjbGljaycpLmJpbmQoJ2hpZGUnKVxyXG4gICAgICAgICAgICAub24oJ0Btb3ZlJywgZSA9PiB0aGlzLm1vdmVTY3JvbGxlcihlLmRldGFpbC5kaXJlY3Rpb24pKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ3ByZXNzJykuYmluZCgnc3VibWl0JykuYmluZCgnaGlzdG9yeScpXHJcbiAgICAgICAgICAgIC5iaW5kKCdjbGlja1N1Z2dlc3Rpb24nKS5iaW5kKCdub25DbGljaycpLmJpbmQoJ2hvdmVyJylcclxuICAgICAgICAgICAgLm9uKCdAcHJlc3MnLCBlID0+IHRoaXMucHJlc3NBdXRvQ29tcGxldGUoZS5kZXRhaWwpKVxyXG4gICAgICAgICAgICAub24oJ0BzdWJtaXQnLCBlID0+IHRoaXMuc3VibWl0S2V5d29yZChlLmRldGFpbC5rZXl3b3JkKSlcclxuICAgICAgICAgICAgLm9uKCdAaGlzdG9yeScsICgpID0+IHRoaXMuc2hvd0hpc3RvcnkoKSk7XHJcblxyXG4gICAgICAgIGRlbGVnYXRlKCdib2R5JywgJ2EnLCAnY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hNYWluU2xpZGUodXJsKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUltZ3MgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnJlbmRlcignbWFpblNsaWRlJywgdGhpcy5zbGlkZUltZ3MpXHJcbiAgICAgICAgICAgIC5iaW5kKCdzbGlkZXNOYXZpJykuYmluZCgnc2xpZGVzRG90cycpXHJcbiAgICAgICAgICAgIC5vbignQHNlbGVjdERvdCcsIGUgPT4gdGhpcy5zZWxlY3RTbGlkZShlLmRldGFpbC5pbmRleCkpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZVNsaWRlKGUuZGV0YWlsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlKHtcclxuICAgICAgICBpbmRleCxcclxuICAgICAgICBkaXJlY3Rpb25cclxuICAgIH0pIHtcclxuICAgICAgICBjb25zdCBzbGlkZXNFbmQgPSB0aGlzLnNsaWRlSW1ncy5sZW5ndGggLSAxO1xyXG4gICAgICAgIGluZGV4ICs9IGRpcmVjdGlvbjtcclxuICAgICAgICBpZiAoaW5kZXggPiBzbGlkZXNFbmQpIGluZGV4ID0gMDtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IHNsaWRlc0VuZDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RTbGlkZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U2xpZGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZUN1cnJlbnRTbGlkZSgpLnNldEluZGV4KGluZGV4KS5zaG93U2xpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2Nyb2xsZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZGlyZWN0aW9uID09PSAndXAnID8gbW92ZVNjcm9sbCgwKSA6IG1vdmVTY3JvbGwoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXNzQXV0b0NvbXBsZXRlKHtcclxuICAgICAgICB0ZXJtLFxyXG4gICAgICAgIGtleSxcclxuICAgICAgICBpc1NlbGV0ZWRcclxuICAgIH0pIHtcclxuICAgICAgICBjb25zdCBpc1VwID0gKGtleSkgPT4ga2V5ID09PSAzODtcclxuICAgICAgICBjb25zdCBpc2Rvd24gPSAoa2V5KSA9PiBrZXkgPT09IDQwO1xyXG4gICAgICAgIGNvbnN0IGlzRVNDID0gKGtleSkgPT4ga2V5ID09PSAyNztcclxuICAgICAgICBjb25zdCBpc0VudGVyID0gKGtleSkgPT4ga2V5ID09PSAxMztcclxuICAgICAgICBjb25zdCBpc1N0cmluZyA9IChrZXkpID0+IGtleSA8IDM1IHx8IGtleSA+IDQwO1xyXG5cclxuICAgICAgICBpZiAoaXNVcChrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy51cFNlbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNkb3duKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmRvd25TZWwoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRVNDKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKGtleSkpIHtcclxuICAgICAgICAgICAgaXNTZWxldGVkID8gdGhpcy5hdXRvQ29tcGxldGVWaWV3LnNldFNlYXJjaGJhcigpIDogdGhpcy5zdWJtaXRLZXl3b3JkKHRlcm0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoa2V5KSkge1xyXG4gICAgICAgICAgICB0ZXJtID8gdGhpcy5mZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSA6IHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSB7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHRoaXMudXJsTGlzdC5hdXRvQ29tcGxldGUgKyB0ZXJtLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRLZXl3b3JkKGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5lbXB0eVNlYXJjaGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaG93SGlzdG9yeSgpIHtcclxuICAgICAgICBjb25zdCBoaXN0b3J5ID0gYXdhaXQgZ2V0TG9jYWxTdG9yYWdlKCdoaXN0b3J5Jyk7XHJcbiAgICAgICAgaGlzdG9yeSAmJiB0aGlzLmF1dG9Db21wbGV0ZVZpZXcucmVuZGVyKCdoaXN0b3J5JywgaGlzdG9yeS5zbGljZSgtNSkucmV2ZXJzZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEJlc3RCYW5jaGFuKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3LnJlbmRlcignYmVzdEJhbmNoYW4nLCBmb29kRGF0YSkuYmluZCgnZm9vZFRhYicpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoSW5maW5pdGVCYW5jaGFuKHRhcmdldFZpZXcsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZvb2REYXRhLmxlbmd0aCAqIDIuNTtcclxuICAgICAgICB0YXJnZXRWaWV3LnJlbmRlcignYmFuY2hhbicsIGZvb2REYXRhKS5iaW5kKCd0cmFuc2l0aW9uZW5kJykuYmluZCgnc2xpZGVzTmF2aScpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmNhbGwodGFyZ2V0VmlldywgZS5kZXRhaWwpKVxyXG4gICAgICAgICAgICAub24oJ0B0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAgICAgICAgIGUgPT4gdGhpcy5yZXNldEluZmluaXRlU2xpZGVzLmNhbGwodGFyZ2V0VmlldywgdGhyZXNob2xkLCBlLmRldGFpbC5pbmRleCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVJbmZpbml0ZVNsaWRlcyh7XHJcbiAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgZGlyZWN0aW9uXHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXRJbmRleChpbmRleCArPSBkaXJlY3Rpb24pLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICBJbW1lZGlhdGVseTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEluZmluaXRlU2xpZGVzKHRocmVzaG9sZCwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBbdGhyZXNob2xkTGVmdCwgdGhyZXNob2xkUmlnaHRdID0gWy0yMCAtIHRocmVzaG9sZCwgLTIwICsgdGhyZXNob2xkXTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IHRocmVzaG9sZExlZnQgfHwgaW5kZXggPT09IHRocmVzaG9sZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoLTIwKS5zaG93U2xpZGVzKHtcclxuICAgICAgICAgICAgICAgIEltbWVkaWF0ZWx5OiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjaGVja0xvY2FsU3RvcmFnZShrZXksIGlzSlNPTlApIHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IGdldExvY2FsU3RvcmFnZShrZXkpO1xyXG4gICAgICAgIGlmIChjYWNoZSAmJiBpc1ZhbGlkKGNhY2hlLnRpbWUsIDYpKSByZXR1cm4gY2FjaGUuZGF0YTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogaXNKU09OUCA/IChhd2FpdCBmZXRjaEpTT05QKGtleSkpWzFdIDogYXdhaXQgcmVxdWVzdChrZXkpLFxyXG4gICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmFsdWUuZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSA/IGZhbHNlIDogc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXIuanMiLCJpbXBvcnQgbWFpblNsaWRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNQcmV2RWwgPSB0aGlzLnFzKCcuc2xpZGVzX3ByZXYnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHRoaXMucXMoJy5zbGlkZXNfbmV4dCcpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNOYXZpOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICtlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQHNlbGVjdERvdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6ICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIG1haW5TbGlkZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluU2xpZGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5TbGlkZShzbGlkZUltZ3MpIHtcclxuICAgICAgICB0aGlzLnJlbmRlck1haW5TbGlkZShzbGlkZUltZ3MpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSB0aGlzLnFzYSgnLm1haW5fc2xpZGVzX2xpc3QgPiBsaScpO1xyXG4gICAgICAgIHRoaXMuZG90c0VsID0gdGhpcy5xc2EoJy5zbGlkZXNfZG90cyA+IGxpID4gYScpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTWFpblNsaWRlKHNsaWRlSW1ncykge1xyXG4gICAgICAgIGNvbnN0IG1haW5TbGlkZVN0ciA9IG1haW5TbGlkZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgc2xpZGU6IHNsaWRlSW1nc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWFpblNsaWRlU3RyKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlQ3VycmVudFNsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVvdXQnO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vdycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZSgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlaW4nO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvTWFpblNsaWRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICA8bGkgY2xhc3M9XFxcImZhZGVvdXRcXFwiIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCIpJz5cXHJcXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPjwvYT5cXHJcXG4gICAgPC9saT5cXHJcXG5cIjtcbn0sXCIzXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIiAgICA8bGk+XFxyXFxuICAgICAgICA8YSBocmVmPVxcXCIjXFxcIj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbmRleCB8fCAoZGF0YSAmJiBkYXRhLmluZGV4KSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwiaW5kZXhcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbiAgICA8L2xpPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pO1xuXG4gIHJldHVybiBcIjx1bCBjbGFzcz1cXFwibWFpbl9zbGlkZXNfbGlzdFxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoYWxpYXMxLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zbGlkZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L3VsPlxcclxcbjx1bCBjbGFzcz1cXFwic2xpZGVzX2RvdHNcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGFsaWFzMSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2xpZGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMywgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vbGliL2hhbmRsZWJhcnMucnVudGltZS5qcyIsImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBjcmVhdGVGcmFtZSwgaXNBcnJheX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGxldCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBsZXQgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIG9wdGlvbnMgPSB7ZGF0YTogZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzQXJyYXksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuLFxuICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmV0ID0gJycsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHRQYXRoO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjSXRlcmF0aW9uKGZpZWxkLCBpbmRleCwgbGFzdCkge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5rZXkgPSBmaWVsZDtcbiAgICAgICAgZGF0YS5pbmRleCA9IGluZGV4O1xuICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgIGRhdGEubGFzdCA9ICEhbGFzdDtcblxuICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGNvbnRleHQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHByaW9yS2V5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgLy8gV2UncmUgcnVubmluZyB0aGUgaXRlcmF0aW9ucyBvbmUgc3RlcCBvdXQgb2Ygc3luYyBzbyB3ZSBjYW4gZGV0ZWN0XG4gICAgICAgICAgICAvLyB0aGUgbGFzdCBpdGVyYXRpb24gd2l0aG91dCBoYXZlIHRvIHNjYW4gdGhlIG9iamVjdCB0d2ljZSBhbmQgY3JlYXRlXG4gICAgICAgICAgICAvLyBhbiBpdGVybWVkaWF0ZSBrZXlzIGFycmF5LlxuICAgICAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJpb3JLZXkgPSBrZXk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwiaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKC8qIFthcmdzLCBdb3B0aW9ucyAqLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0cnVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWlzc2luZyBoZWxwZXI6IFwiJyArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0ubmFtZSArICdcIicpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2lmLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gb2JqICYmIG9ialtmaWVsZF07XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIWlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRdLCBbZGF0YSAmJiBkYXRhLmNvbnRleHRQYXRoXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwiaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uKGZuLCBwcm9wcywgY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgbGV0IHJldCA9IGZuO1xuICAgIGlmICghcHJvcHMucGFydGlhbHMpIHtcbiAgICAgIHByb3BzLnBhcnRpYWxzID0ge307XG4gICAgICByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwYXJ0aWFscyBzdGFjayBmcmFtZSBwcmlvciB0byBleGVjLlxuICAgICAgICBsZXQgb3JpZ2luYWwgPSBjb250YWluZXIucGFydGlhbHM7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgbGV0IHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBDT01QSUxFUl9SRVZJU0lPTiwgUkVWSVNJT05fQ0hBTkdFUywgY3JlYXRlRnJhbWUgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgY29uc3QgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mbyAmJiBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICBjb25zdCBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBydW50aW1lVmVyc2lvbnMgKyAnKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKCcgKyBjb21waWxlclZlcnNpb25zICsgJykuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBjb21waWxlckluZm9bMV0gKyAnKS4nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlJyk7XG4gIH1cbiAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgfVxuXG4gIHRlbXBsYXRlU3BlYy5tYWluLmRlY29yYXRvciA9IHRlbXBsYXRlU3BlYy5tYWluX2Q7XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICBvcHRpb25zLmlkc1swXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGxldCByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJPcHRpb25zLCBlbnYpO1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuICAgICAgICBsZXQgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICBsZXQgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICBpZiAoIShuYW1lIGluIG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgY29uc3QgbGVuID0gZGVwdGhzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGRlcHRoc1tpXSAmJiBkZXB0aHNbaV1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBkZXB0aHNbaV1bbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxhbWJkYTogZnVuY3Rpb24oY3VycmVudCwgY29udGV4dCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICB9LFxuXG4gICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgIGZuOiBmdW5jdGlvbihpKSB7XG4gICAgICBsZXQgcmV0ID0gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBwcm9ncmFtczogW10sXG4gICAgcHJvZ3JhbTogZnVuY3Rpb24oaSwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgICAgbGV0IHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMgfHwgYmxvY2tQYXJhbXMgfHwgZGVjbGFyZWRCbG9ja1BhcmFtcykge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9ncmFtV3JhcHBlcjtcbiAgICB9LFxuXG4gICAgZGF0YTogZnVuY3Rpb24odmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgbGV0IG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgb2JqID0gVXRpbHMuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIC8vIEFuIGVtcHR5IG9iamVjdCB0byB1c2UgYXMgcmVwbGFjZW1lbnQgZm9yIG51bGwtY29udGV4dHNcbiAgICBudWxsQ29udGV4dDogT2JqZWN0LnNlYWwoe30pLFxuXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJcbiAgfTtcblxuICBmdW5jdGlvbiByZXQoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIGxldCBkZXB0aHMsXG4gICAgICAgIGJsb2NrUGFyYW1zID0gdGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zID8gW10gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBjb250ZXh0ICE9IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQvKiwgb3B0aW9ucyovKSB7XG4gICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIH1cbiAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcbiAgICByZXR1cm4gbWFpbihjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT0gZGVwdGhzWzBdICYmICEoY29udGV4dCA9PT0gY29udGFpbmVyLm51bGxDb250ZXh0ICYmIGRlcHRoc1swXSA9PT0gbnVsbCkpIHtcbiAgICAgIGN1cnJlbnREZXB0aHMgPSBbY29udGV4dF0uY29uY2F0KGRlcHRocyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuKGNvbnRhaW5lcixcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscyxcbiAgICAgICAgb3B0aW9ucy5kYXRhIHx8IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zICYmIFtvcHRpb25zLmJsb2NrUGFyYW1zXS5jb25jYXQoYmxvY2tQYXJhbXMpLFxuICAgICAgICBjdXJyZW50RGVwdGhzKTtcbiAgfVxuXG4gIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBpZiAoIXBhcnRpYWwpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnQHBhcnRpYWwtYmxvY2snKSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuICAgIC8vIFRoaXMgaXMgYSBkeW5hbWljIHBhcnRpYWwgdGhhdCByZXR1cm5lZCBhIHN0cmluZ1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnRpYWw7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG4gIH1cbiAgcmV0dXJuIHBhcnRpYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgLy8gVXNlIHRoZSBjdXJyZW50IGNsb3N1cmUgY29udGV4dCB0byBzYXZlIHRoZSBwYXJ0aWFsLWJsb2NrIGlmIHRoaXMgcGFydGlhbFxuICBjb25zdCBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICBsZXQgcGFydGlhbEJsb2NrO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcbiAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGZ1bmN0aW9uIHBhcnRpYWxCbG9ja1dyYXBwZXIoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcbiAgICAgIC8vIGkuZS4gdGhlIHBhcnQgaW5zaWRlIHRoZSBibG9jayBvZiB0aGUgcGFydGlhbCBjYWxsLlxuICAgICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIGlmIChmbi5wYXJ0aWFscykge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFscyA9IFV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucy5wYXJ0aWFscywgZm4ucGFydGlhbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuICcnOyB9XG5cbmZ1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpIHtcbiAgaWYgKGZuLmRlY29yYXRvcikge1xuICAgIGxldCBwcm9wcyA9IHt9O1xuICAgIHByb2cgPSBmbi5kZWNvcmF0b3IocHJvZywgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGhzICYmIGRlcHRoc1swXSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcbiAgfVxuICByZXR1cm4gcHJvZztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiRWwgPSB0aGlzLnFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJ2xpID4gYScsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kVGFiTGlzdEVsKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiID09PSBlLmRlbGVnYXRlVGFyZ2V0ID8gJ25vdycgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RCb3hMaXN0RWwpLmZvckVhY2goZm9vZCA9PiBmb29kLnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnlfaWQgPT09IGZvb2QuZGF0YXNldC5jYXRlZ29yeV9pZCA/ICdibG9jaycgOiAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiZXN0QmFuY2hhbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0QmFuY2hhbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYmVzdEJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZFRhYihmb29kKS5yZW5kZXJGb29kQ29udGFpbmVyKGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJGb29kQm94TGlzdChmb29kKS5yZW5kZXJGb29kQm94KGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJTZWxlY3RlZEZvb2QoZm9vZCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RUYWIoZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RUYWIgPSBmb29kLm1hcCh2YWx1ZSA9PiBmb29kVGFiVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWVcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZFRhYik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZENvbnRhaW5lcihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZENvbnRhaW5lckVsID0gdGhpcy5xcygnLmJlc3RfZm9vZF9jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBmb29kQ29udGFpbmVyID0gZm9vZC5tYXAodmFsdWUgPT4gY29udGFpbmVyVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICBjYXRlZ29yeV9pZDogdmFsdWUuY2F0ZWdvcnlfaWRcclxuICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgZm9vZENvbnRhaW5lckVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RDb250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGZvb2QpIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwgPSB0aGlzLnFzYSgnLmJlc3RfZm9vZF9ib3hfbGlzdCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJveExpc3QgPSB2YWx1ZS5pdGVtcy5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICAgICAgZm9vZEJveFRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld19wcmljZTogaXRlbS5zX3ByaWNlLnNsaWNlKDAsIC0xKSxcclxuICAgICAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2ldLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94KGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94RWwgPSB0aGlzLnFzYSgnLmJlc3RfZm9vZF9ib3gnKTtcclxuICAgICAgICBmb29kLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFsdWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9vZEJveEVsW2kgKiBsZW4gKyBqXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5X3R5cGU6IGl0ZW0uZGVsaXZlcnlfdHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWxlY3RlZEZvb2QoZm9vZCwgaW5pdE51bSkge1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbCA9IHRoaXMucXNhKCcuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJMaXN0RWxbaW5pdE51bV0uY2xhc3NOYW1lID0gJ25vdyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsW2luaXROdW1dLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF93cmFwXFxcIj5cXHJcXG4gICAgPGxpIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImZvb2RfaW1nXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkbCBjbGFzcz1cXFwiZm9vZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwiZm9vZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcImZvb2RfZGVzY3JpcHRpb25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2xpPlxcclxcbjwvYT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGk+XFxyXFxuICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5hbWVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RUYWItdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXI7XG5cbiAgcmV0dXJuIFwiPHVsIGNsYXNzPVxcXCJiZXN0X2Zvb2RfYm94X2xpc3RcXFwiIGRhdGEtY2F0ZWdvcnlfaWQ9XFxcIlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNhdGVnb3J5X2lkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXRlZ29yeV9pZCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJzLmhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLHtcIm5hbWVcIjpcImNhdGVnb3J5X2lkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+PC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvY29udGFpbmVyLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5zY3JvbGxlciA+IGxpID4gYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJywgZSA9PiB0aGlzLmVtaXQoJ0Btb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGUuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5kaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHdpbmRvdy5zY3JvbGxZID4gOTAgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvU2Nyb2xsZXJWaWV3LmpzIiwiaW1wb3J0IGZvb2RCb3hJbmZpbml0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICB0aHJvdHRsZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbCA9IHRoaXMucXMoJy5pbmZpbml0ZV9mb29kX2JveF9saXN0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAtMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbmVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbigndHJhbnNpdGlvbmVuZCcsICgpID0+IHRoaXMuZW1pdCgnQHRyYW5zaXRpb25lbmQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuc3RhdGUuaW5kZXhcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTmF2aTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICtlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJhbmNoYW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFuY2hhbiguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlld0NvbW1hbmRzW3ZpZXdDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kQm94TGlzdCh0aGlzLmZvb2RCb3hMaXN0RWwsIGZvb2QpXHJcbiAgICAgICAgICAgIC5yZW5kZXJGb29kQm94T3B0aW9uKGZvb2QsIHRoaXMucXNhKCcucHJkX2JveD5hJykpXHJcbiAgICAgICAgICAgIC5yZW5kZXJTbGlkZXModGhpcy5mb29kQm94TGlzdEVsLCB0aGlzLnFzYSgnLnByZF9ib3gnKSlcclxuICAgICAgICAgICAgLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICAgICAgSW1tZWRpYXRlbHk6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZWxlbWVudCwgZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hMaXN0ID0gZm9vZC5tYXAoaXRlbSA9PlxyXG4gICAgICAgICAgICBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogaXRlbS5pbWFnZSxcclxuICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBuZXdfcHJpY2U6IGl0ZW0uc19wcmljZS5zbGljZSgwLCAtMSksXHJcbiAgICAgICAgICAgICAgICB3b246IGl0ZW0uc19wcmljZS5zbGljZSgtMSlcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hPcHRpb24oZm9vZCwgcHJkQm94KSB7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHByZEJveFtpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGJhZGdlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkZWxpdmVyeV90eXBlOiBpdGVtLmRlbGl2ZXJ5X3R5cGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNsaWRlcyhlbGVtZW50LCBTbGlkZXMpIHtcclxuICAgICAgICBjb25zdCBsYXN0U2xpZGVzID0gQXJyYXkuZnJvbShTbGlkZXMpLnNsaWNlKC00KTtcclxuXHJcbiAgICAgICAgU2xpZGVzLmZvckVhY2goU2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChTbGlkZS5jbG9uZU5vZGUodHJ1ZSkpKTtcclxuICAgICAgICBsYXN0U2xpZGVzLnJldmVyc2UoKS5mb3JFYWNoKGxhc3RTbGlkZSA9PlxyXG4gICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShsYXN0U2xpZGUuY2xvbmVOb2RlKHRydWUpLCBlbGVtZW50LmNoaWxkTm9kZXNbMF0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2xpZGVzKHtcclxuICAgICAgICBJbW1lZGlhdGVseVxyXG4gICAgfSkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBJbW1lZGlhdGVseSA/ICcwcycgOiAnMC41cyc7XHJcbiAgICAgICAgdGhpcy5mb29kQm94TGlzdEVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dGhpcy5zdGF0ZS5pbmRleH0lKWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcInByZF9ib3hcXFwiPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRodW1iX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaW1hZ2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmltYWdlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJpbWFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGFsdD1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmFsdCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYWx0IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJhbHRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG4gICAgICAgICAgICA8L3A+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2lyY2xlX21hc2tcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcInByZF9kZXRhaWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkdCBjbGFzcz1cXFwicHJkX3RpdGxlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2R0PlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwicHJkX3ByaWNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm9sZF9wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm9sZF9wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAub2xkX3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJvbGRfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmV3X3ByaWNlXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmV3X3ByaWNlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uZXdfcHJpY2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIm5ld19wcmljZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3b25cXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53b24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwid29uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8L2RsPlxcclxcbiAgICA8L2E+XFxyXFxuPC9saT5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvZm9vZEJveEluZmluaXRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYXV0b2NvbXBsZXRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIGRlbGVnYXRlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IHRoaXMucXMoJyNzZWFyY2hfc3RyJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsID0gdGhpcy5xcygnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucycpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQnV0dG9uRWwgPSB0aGlzLnFzKCcuc2VhcmNoX2J0bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoYmluZENtZCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgcHJlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub24oJ2tleXVwJywgZSA9PiB0aGlzLmVtaXQoJ0BwcmVzcycsIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGUua2V5Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBpc1NlbGV0ZWQ6ICEhdGhpcy5zZWxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2VhcmNoX2J0bicsICdjbGljaycsICgpID0+IHRoaXMuZW1pdCgnQHN1Ym1pdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiB0aGlzLnNlYXJjaEVsLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJyNzZWFyY2hfc3RyJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiAhdGhpcy5pc09wZW4oKSAmJiAhdGhpcy5zZWFyY2hFbC52YWx1ZSAmJiB0aGlzLmVtaXQoJ0BoaXN0b3J5JykpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGlja1N1Z2dlc3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KS5zZXRTZWFyY2hiYXIoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSgnYm9keScsICcqJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICBlID0+IGUudGFyZ2V0ICE9PSB0aGlzLnNlYXJjaEVsICYmIHRoaXMuZW1wdHlBdXRvQ29tcGxldGUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdmVyJywgZSA9PiB0aGlzLnNldFNlbChlLmRlbGVnYXRlVGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICAuZGVsZWdhdGUoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbicsICdtb3VzZW91dCcsICgpID0+IHRoaXMuZW1wdHlTZWwoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBhdXRvQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXV0b0NvbXBsZXRlKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhcmNoZXMoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckF1dG9Db21wbGV0ZSh0ZXJtLCBzdWdnZXN0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBSZWdFeHAodGVybSwgJ2knKTtcclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9uc0NvbXBvbmVudCA9IHN1Z2dlc3Rpb25zLm1hcChzdWdnZXN0aW9uID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHN1Z2dlc3Rpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJLZXl3b3JkOiBzdWdnZXN0aW9uLnJlcGxhY2UodGFyZ2V0LCBgPGI+JHt0ZXJtfTwvYj5gKVxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHN1Z2dlc3Rpb25zQ29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZWFyY2hlcyhzZWFyY2hlcykge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnlDb21wb25lbnQgPSBzZWFyY2hlcy5tYXAoc2VhcmNoID0+XHJcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhcmNoZXMnLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogc2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc2VhcmNoXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaGlzdG9yeUNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSB0aGlzLnNlbC5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuZW1wdHlTZWwoKS5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHVwU2VsKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2VsID8gdGhpcy5zZWwucHJldmlvdXNTaWJsaW5nIDogdGhpcy5zdWdnZXN0aW9uc0VsLmxhc3RDaGlsZDtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuc2V0U2VsKHRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZG93blNlbCgpe1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2VsID8gdGhpcy5zZWwubmV4dFNpYmxpbmcgOiB0aGlzLnN1Z2dlc3Rpb25zRWwuZmlyc3RDaGlsZDtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuc2V0U2VsKHRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2VsKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuc2VsID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlTZWwoKSB7XHJcbiAgICAgICAgdGhpcy5zZWwgJiYgdGhpcy5zZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB0aGlzLnNlbCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1wdHlBdXRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VhcmNoYmFyKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwudmFsdWUgPSAnJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpc09wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUw7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9BdXRvQ29tcGxldGVWaWV3LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxsaSBjbGFzcz1cXFwiYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzW1wiY2xhc3NcIl0gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwW1wiY2xhc3NcIl0gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNsYXNzXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS12YWx1ZT1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmtleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmtleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImtleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnJlbmRlcktleXdvcmQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlbmRlcktleXdvcmQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInJlbmRlcktleXdvcmRcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==