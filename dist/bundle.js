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
exports.push([module.i, "/* reset styles */\n*,\n*:after,\n*:before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nhtml,\nbody {\n  font-family: 'Nanum Gothic';\n  width: 100%;\n  font-size: 12px;\n  background: #fff; }\n\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  font-weight: normal;\n  vertical-align: baseline;\n  background: transparent; }\n\ndt {\n  font-weight: bold; }\n\nol,\nul,\ndl {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\n/* Fading animation */\n.fadein {\n  opacity: 1;\n  transition: opacity 2s; }\n\n.fadeout {\n  opacity: 0;\n  transition: opacity 2s; }\n\n/* components styles */\n.food {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto; }\n\n.lnb_wrap {\n  position: relative;\n  background: #fff;\n  border-bottom: 1px solid #e9e9e9; }\n  .lnb_wrap > .lnb_content {\n    display: flex;\n    justify-content: space-between;\n    background: #fff;\n    height: 36px;\n    letter-spacing: -0.2px;\n    width: 980px;\n    margin: 0 auto; }\n    .lnb_wrap > .lnb_content span.ic {\n      display: inline-block;\n      zoom: 1;\n      width: 7px;\n      height: 11px;\n      background: url(https://cdn.bmf.kr/web/common/bul_arr_down.png) no-repeat center 1px;\n      margin-left: 4px; }\n\n.link_app > a {\n  display: block;\n  font-size: 12px;\n  height: 100%;\n  padding: 10px 11px 9px;\n  text-align: center;\n  color: #666; }\n  .link_app > a:hover {\n    color: #2ac1bc; }\n\n.lnb_list {\n  display: flex; }\n  .lnb_list > li > a {\n    display: block;\n    font-size: 12px;\n    padding: 10px 10px 9px 10px;\n    color: #666;\n    background: url(https://cdn.bmf.kr/web/common/util_bar.gif) no-repeat 0 12px; }\n    .lnb_list > li > a:hover {\n      color: #2ac1bc; }\n  .lnb_list > li:first-child > a {\n    background: none; }\n  .lnb_list > li:last-child > a {\n    color: #333;\n    font-weight: bold; }\n\n.header_wrap {\n  display: flex;\n  height: 98px;\n  width: 980px;\n  margin: 0 auto; }\n  .header_wrap > .logo {\n    margin: 16px 0 0 5px; }\n\n.searchbar {\n  position: relative;\n  margin: 30px 0 0 46px; }\n  .searchbar > input {\n    width: 210px;\n    height: 40px;\n    color: #888888;\n    border: 1px solid #cfd0d2;\n    padding: 0px 38px 0px 15px; }\n  .searchbar > button {\n    background: url(https://cdn.bmf.kr/web/common/ic_search.png) no-repeat center 0;\n    width: 38px;\n    height: 38px;\n    position: absolute;\n    top: 1px;\n    right: 1px;\n    border: 0;\n    cursor: pointer; }\n    .searchbar > button:hover {\n      background-position: center 100%; }\n\n.autocomplete_suggestions {\n  width: 210px;\n  text-align: left;\n  cursor: pointer;\n  z-index: 9999;\n  background: #fff;\n  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);\n  display: block;\n  position: absolute;\n  overflow: hidden; }\n  .autocomplete_suggestions > .autocomplete_suggestion {\n    position: relative;\n    padding: 6px 0 3px 25px;\n    line-height: 23px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1.2em;\n    color: #333; }\n    .autocomplete_suggestions > .autocomplete_suggestion b {\n      font-weight: bold;\n      color: #fe1a1a; }\n    .autocomplete_suggestions > .autocomplete_suggestion.selected {\n      background: #f0f0f0bd; }\n    .autocomplete_suggestions > .autocomplete_suggestion.searches {\n      color: #52188c; }\n\n.gnb_top {\n  display: flex;\n  margin: 0 5px 0 auto; }\n  .gnb_top > li > a {\n    display: block;\n    margin: 25px 0 25px 50px; }\n\n.navi_wrap {\n  position: relative;\n  z-index: 1;\n  background: #483f35; }\n  .navi_wrap > .navi_content {\n    width: 980px;\n    height: 52px;\n    margin: 0 auto; }\n\n.gnb {\n  display: flex; }\n  .gnb > li {\n    width: 124px;\n    height: 52px;\n    position: relative;\n    text-align: left; }\n    .gnb > li > a {\n      display: block;\n      padding: 5px 0 0 1px; }\n      .gnb > li > a > span {\n        display: inline-block;\n        color: white;\n        font-size: 16px;\n        height: 52px;\n        font-weight: bold;\n        padding: 11px 25px 0px; }\n    .gnb > li:first-child {\n      width: 100px; }\n    .gnb > li:nth-child(7) {\n      width: 120px; }\n    .gnb > li:nth-child(8) {\n      width: 140px;\n      background: #362d25;\n      text-align: center; }\n    .gnb > li:hover > a > span, .gnb > li:focus > a > span {\n      background: #fff;\n      color: #2ac1bc; }\n    .gnb > li:hover > ul, .gnb > li:focus > ul {\n      display: block; }\n\n.sub_list {\n  display: none;\n  width: 162px;\n  position: absolute;\n  left: 0;\n  top: 52px;\n  padding: 20px 0 31px;\n  background: #fff;\n  border: 1px solid rgba(72, 63, 53, 0.6);\n  border-top: 0; }\n  .sub_list a {\n    display: block;\n    color: #555;\n    font-size: 14px;\n    line-height: 20px;\n    padding: 6px 0 3px 25px;\n    text-align: left; }\n    .sub_list a:hover > span,\n    .sub_list a:focus > span {\n      font-size: 16px;\n      color: #2ac1bc;\n      font-weight: bold;\n      text-decoration: underline; }\n\n.main_slide {\n  position: relative;\n  text-align: center;\n  max-width: 1920px; }\n\n.main_slides_list {\n  position: relative;\n  height: 420px; }\n  .main_slides_list > li {\n    position: absolute;\n    width: 100%;\n    background: no-repeat center top; }\n    .main_slides_list > li > a {\n      display: block;\n      width: 980px;\n      height: 420px;\n      margin: 0 auto; }\n\n.slides_navi > a {\n  width: 60px;\n  height: 92px;\n  position: absolute;\n  top: 50%;\n  margin-top: -46px;\n  background: url(https://cdn.bmf.kr/web/common/main_slides_navi.png) no-repeat center center; }\n\n.slides_navi > .slides_prev {\n  right: 50%;\n  margin-right: 530px;\n  background-position: left center; }\n\n.slides_navi > .slides_next {\n  left: 50%;\n  margin-left: 530px;\n  background-position: right center; }\n\n.slides_dots {\n  position: relative;\n  bottom: 40px;\n  height: 0; }\n  .slides_dots > li {\n    display: inline-block;\n    vertical-align: top;\n    padding: 0 4px; }\n    .slides_dots > li > a {\n      display: block;\n      width: 10px;\n      height: 0;\n      padding-top: 10px;\n      overflow: hidden;\n      background: #FFF;\n      border-radius: 50%;\n      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n      opacity: 0.6; }\n      .slides_dots > li > a.now {\n        opacity: 1; }\n\n.best_food {\n  background: #eee;\n  text-align: center; }\n  .best_food > .best_food_content {\n    width: 980px;\n    margin: 0 auto; }\n    .best_food > .best_food_content > .best_food_title {\n      padding: 40px 0 30px;\n      position: relative; }\n\n.best_food_tabs {\n  height: 48px; }\n  .best_food_tabs > li {\n    display: inline-block;\n    background-color: #fff;\n    height: 48px; }\n    .best_food_tabs > li > a {\n      display: block;\n      width: 159px;\n      padding-top: 17px;\n      font-weight: bold;\n      height: 100%;\n      font-size: 15px;\n      line-height: 1.2;\n      color: #777; }\n    .best_food_tabs > li:focus > a,\n    .best_food_tabs > li:hover > a,\n    .best_food_tabs > li > a.now {\n      background: #1fcbc7;\n      color: #fff; }\n\n.best_food_container {\n  padding-bottom: 45px; }\n  .best_food_container > .best_food_box_list {\n    display: none;\n    width: 960px;\n    margin-top: 25px;\n    margin-left: 10px; }\n    .best_food_container > .best_food_box_list > .best_food_box_wrap {\n      position: relative;\n      margin: 0 24px 10px 0;\n      color: #000;\n      background: #fff; }\n      .best_food_container > .best_food_box_list > .best_food_box_wrap:last-child {\n        margin: 0; }\n\n.food_img_hover {\n  display: none; }\n  .food_img_hover > ul {\n    position: relative;\n    top: 50%;\n    transform: translateY(-50%); }\n    .food_img_hover > ul > li {\n      margin: 0 15px 8px;\n      font-size: 20px;\n      color: #fff;\n      font-weight: bold;\n      text-align: center; }\n      .food_img_hover > ul > li > span {\n        display: inline-block;\n        padding: 13px 0 4px; }\n      .food_img_hover > ul > li:last-child > span {\n        background: url(https://cdn.bmf.kr/web/main/delivery_line.png) repeat-x 0 0; }\n\n.best_food_box > .badge_list, .prd_box > a > .badge_list {\n  height: 24px;\n  display: flex; }\n  .best_food_box > .badge_list > .badge, .prd_box > a > .badge_list > .badge {\n    padding: 4px 2px 5px;\n    margin-right: 3px;\n    color: #fff;\n    background: #a974bf;\n    width: 62px; }\n\n.best_food_box > .food_detail > .food_price, .prd_detail > .prd_price {\n  display: flex;\n  align-items: center; }\n  .best_food_box > .food_detail > .food_price > .old_price, .prd_detail > .prd_price > .old_price {\n    text-decoration: line-through;\n    font-size: 14px;\n    color: #888; }\n  .best_food_box > .food_detail > .food_price > .new_price, .prd_detail > .prd_price > .new_price {\n    font-family: 'Montserrat', sans-serif;\n    letter-spacing: -2px;\n    margin-left: 9px;\n    color: #2ac1bc;\n    font-size: 26px;\n    font-weight: bold;\n    vertical-align: middle; }\n    .best_food_box > .food_detail > .food_price > .new_price > .won, .prd_detail > .prd_price > .new_price > .won {\n      margin-left: -6px;\n      font-size: 15px;\n      font-weight: bold;\n      top: -3px; }\n\n.best_food_box:hover .food_img_hover,\n.best_food_box:focus .food_img_hover, .prd_box:hover .food_img_hover,\n.prd_box:focus .food_img_hover {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6); }\n\n.best_food_box {\n  width: 304px;\n  height: 429px; }\n  .best_food_box:hover .food_img_hover,\n  .best_food_box:focus .food_img_hover {\n    height: 304px; }\n  .best_food_box > .food_img > img {\n    max-width: 100%;\n    position: relative; }\n  .best_food_box > .badge_list {\n    position: absolute;\n    top: 273px;\n    justify-content: flex-start;\n    margin: 0 0 10px 10px; }\n  .best_food_box > .food_detail {\n    padding: 18px 20px 15px;\n    height: 90px;\n    text-align: left; }\n    .best_food_box > .food_detail > .food_title {\n      letter-spacing: -1.2px;\n      font-size: 17px;\n      margin-bottom: 6px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_description {\n      margin-bottom: 20px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .best_food_box > .food_detail > .food_price {\n      justify-content: flex-end; }\n\n.infinite_food {\n  text-align: center;\n  position: relative; }\n  .infinite_food > .infinite_food_content {\n    width: 980px;\n    height: 670px;\n    margin: 0 auto;\n    overflow: hidden; }\n    .infinite_food > .infinite_food_content > .infinite_food_title {\n      margin: 70px 0 37px; }\n    .infinite_food > .infinite_food_content > .infinite_food_container {\n      height: 346px;\n      overflow: hidden; }\n      .infinite_food > .infinite_food_content > .infinite_food_container > .infinite_food_box_list {\n        width: 1000%;\n        display: flex;\n        justify-content: flex-start; }\n    .infinite_food > .infinite_food_content .infinite_btn {\n      display: block;\n      margin: 38px auto;\n      padding: 15px 0 17px;\n      width: 980px;\n      text-align: center;\n      font-size: 15px;\n      color: #333;\n      border: 1px solid #d7d7d7; }\n      .infinite_food > .infinite_food_content .infinite_btn > span {\n        padding-right: 14px;\n        background: url(https://cdn.bmf.kr/web/main/btn_arr_more.png) no-repeat right; }\n\n.infinite_food_slides_navi > a {\n  position: absolute;\n  top: 257px;\n  width: 28px;\n  height: 52px;\n  background: url(https://cdn.bmf.kr/web/common/btn_prds_thumb_slides_navi.png) no-repeat center center; }\n\n.infinite_food_slides_navi > .slides_prev {\n  left: 50%;\n  margin-left: -558px;\n  background-position: left top; }\n  .infinite_food_slides_navi > .slides_prev:hover, .infinite_food_slides_navi > .slides_prev:focus {\n    background-position: left -52px; }\n\n.infinite_food_slides_navi > .slides_next {\n  right: 50%;\n  margin-right: -558px;\n  background-position: right top; }\n  .infinite_food_slides_navi > .slides_next:hover, .infinite_food_slides_navi > .slides_next:focus {\n    background-position: right -52px; }\n\n.side_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/171214/1513243712683_1e0a6312599e.jpg); }\n  .side_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.main_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170628/1498639751272_e6cadbda65b4.jpg); }\n  .main_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.course_food .infinite_food_banner {\n  background-image: url(https://cdn.bmf.kr/banner/main_event/170425/1493082744401_ba9831e4e2bb.png); }\n  .course_food .infinite_food_banner > a {\n    display: block;\n    width: 980px;\n    height: 140px;\n    margin: 0 auto; }\n\n.thumb_img {\n  position: relative;\n  height: 215px;\n  border-radius: 50%;\n  overflow: hidden; }\n  .thumb_img > p > img {\n    max-width: 100%; }\n  .thumb_img > .circle_mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: url(https://cdn.bmf.kr/web/common/circle_mask.png) no-repeat center center;\n    width: 215px;\n    height: 215px; }\n\n.prd_box {\n  position: relative;\n  width: 215px;\n  margin: 0px 15px 8px; }\n  .prd_box > a > .badge_list {\n    justify-content: center; }\n\n.prd_detail {\n  padding: 18px 10px 12px 10px; }\n  .prd_detail > .prd_title {\n    color: #000;\n    letter-spacing: -1.2px;\n    font-size: 16px;\n    margin-bottom: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_description {\n    font-size: 13px;\n    letter-spacing: -1.2px;\n    margin-bottom: 5px;\n    color: #666;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .prd_detail > .prd_price {\n    justify-content: center; }\n\n.scroller {\n  display: none;\n  position: fixed;\n  bottom: 70px;\n  left: 79%; }\n  .scroller > li > a {\n    display: block;\n    width: 50px;\n    height: 50px;\n    background: url(https://cdn.bmf.kr/web/common/btn_page_up_down_new.png) no-repeat; }\n  .scroller > .page_up > a {\n    background-position: 0 top; }\n    .scroller > .page_up > a:hover, .scroller > .page_up > a:focus {\n      background-position: -50px top; }\n  .scroller > .page_down > a {\n    background-position: 0 -50px; }\n    .scroller > .page_down > a:hover, .scroller > .page_down > a:focus {\n      background-position: -50px -50px; }\n", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODgwMDI4MTJkYmMyZTJkNDY2NWEiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9WaWV3LmpzIiwid2VicGFjazovLy8uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYmFkZ2UtdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZGVsaXZlcnlUeXBlLXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZS5zY3NzPzAxYTkiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L01haW5TbGlkZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sIiwid2VicGFjazovLy8uLi8uLi9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vdmlldy9CZXN0QmFuY2hhblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvZm9vZEJveC10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsIndlYnBhY2s6Ly8vLi92aWV3L0luZmluaXRlU2xpZGVWaWV3LmpzIiwid2VicGFjazovLy8uL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi92aWV3L0F1dG9Db21wbGV0ZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vdGVtcGxhdGUvYXV0b2NvbXBsZXRlLXRwbC5odG1sIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZWwiLCJuYW1lIiwic2xpY2UiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVudCIsImhhbmRsZXIiLCJ1c2VDYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJjYWxsYmFjayIsImxpc3RlbmVyRm4iLCJlIiwiZGVsZWdhdGVUYXJnZXQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2FsbCIsIm9uIiwiZGF0YSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZGlzcGF0Y2hFdmVudCIsInN0eWxlIiwiZGlzcGxheSIsImRlbGVnYXRlIiwicmVxdWVzdCIsInRocm90dGxlIiwiZ2V0TG9jYWxTdG9yYWdlIiwic2V0TG9jYWxTdG9yYWdlIiwiaXNWYWxpZCIsIm1vdmVTY3JvbGwiLCJfZGVsZWdhdGUiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImRlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJiaW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwib250aW1lb3V0Iiwic2VuZCIsImZ1bmMiLCJsaW1pdCIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZWFzZUluT3V0UXVhZCIsInQiLCJiIiwiYyIsImQiLCJlYXNlSW5RdWFkIiwia2V5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlY2VpdmVkVGltZSIsInRocmVzaG9sZEhvdXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJlbGFwc2VkVGltZSIsInRvIiwic3RhcnQiLCJzY3JvbGxZIiwiY2hhbmdlIiwiZHVyYXRpb24iLCJNYXRoIiwiYWJzIiwiaW5jcmVtZW50IiwiYW5pbWF0ZVNjcm9sbCIsIm5ld1kiLCJzY3JvbGxUbyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZldGNoSlNPTlAiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidW5pcXVlIiwibWF0Y2giLCJzcmMiLCJ3aW5kb3ciLCJqc29uIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXJsTGlzdCIsIm1haW5TbGlkZSIsImJlc3RCYW5jaGFuIiwic2lkZV9mb29kIiwibWFpbl9mb29kIiwiY291cnNlX2Zvb2QiLCJhdXRvQ29tcGxldGUiLCJtYWluU2xpZGVWaWV3IiwiYmVzdEJhbmNoYW5WaWV3Iiwic2Nyb2xsZXJWaWV3Iiwic2lkZUJhbmNoYW5WaWV3IiwibWFpbkJhbmNoYW5WaWV3IiwiY291cnNlQmFuY2hhblZpZXciLCJhdXRvbUNvbXBsZXRlVmlldyIsImNvbnRyb2xsZXIiLCJzZXRWaWV3IiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImNzcyIsImxvY2F0aW9uIiwiRXJyb3IiLCJiYXNlVXJsIiwicHJvdG9jb2wiLCJob3N0IiwiY3VycmVudERpciIsInBhdGhuYW1lIiwicmVwbGFjZSIsImZpeGVkQ3NzIiwiZnVsbE1hdGNoIiwib3JpZ1VybCIsInVucXVvdGVkT3JpZ1VybCIsInRyaW0iLCJvIiwiJDEiLCJ0ZXN0IiwibmV3VXJsIiwiaW5kZXhPZiIsImF1dG9Db21wbGV0ZVZpZXciLCJpbmZpbml0ZVZpZXdzIiwiZmV0Y2hNYWluU2xpZGUiLCJmZXRjaEJlc3RCYW5jaGFuIiwiZm9yRWFjaCIsImZldGNoSW5maW5pdGVCYW5jaGFuIiwiaW5maW5pdGVWaWV3IiwibW92ZVNjcm9sbGVyIiwiZGlyZWN0aW9uIiwicHJlc3NBdXRvQ29tcGxldGUiLCJzdWJtaXRLZXl3b3JkIiwia2V5d29yZCIsInNob3dIaXN0b3J5IiwicHJldmVudERlZmF1bHQiLCJzbGlkZUltZ3MiLCJjaGVja0xvY2FsU3RvcmFnZSIsInJlbmRlciIsInNlbGVjdFNsaWRlIiwiaW5kZXgiLCJtb3ZlU2xpZGUiLCJzbGlkZXNFbmQiLCJoaWRlQ3VycmVudFNsaWRlIiwic2V0SW5kZXgiLCJzaG93U2xpZGUiLCJjbGllbnRIZWlnaHQiLCJ0ZXJtIiwiaXNTZWxldGVkIiwiaXNVcCIsImlzZG93biIsImlzRVNDIiwiaXNFbnRlciIsImlzU3RyaW5nIiwidXBTZWwiLCJkb3duU2VsIiwiZW1wdHlBdXRvQ29tcGxldGUiLCJzZXRTZWFyY2hiYXIiLCJmZXRjaEF1dG9Db21wbGV0ZSIsInN1Z2dlc3Rpb25zIiwiaGlzdG9yeSIsIlNldCIsImFkZCIsImVtcHR5U2VhcmNoYmFyIiwicmV2ZXJzZSIsImZvb2REYXRhIiwidGFyZ2V0VmlldyIsInRocmVzaG9sZCIsIm1vdmVJbmZpbml0ZVNsaWRlcyIsInJlc2V0SW5maW5pdGVTbGlkZXMiLCJzaG93U2xpZGVzIiwiSW1tZWRpYXRlbHkiLCJ0aHJlc2hvbGRMZWZ0IiwidGhyZXNob2xkUmlnaHQiLCJpc0pTT05QIiwiY2FjaGUiLCJ0aW1lIiwiaGFzT3duUHJvcGVydHkiLCJzbGlkZXNQcmV2RWwiLCJxcyIsInNsaWRlc05leHRFbCIsInN0YXRlIiwiYmluZENtZCIsImJpbmRDb21tYW5kcyIsInNsaWRlc05hdmkiLCJlbWl0IiwiZGF0YXNldCIsInNsaWRlc0RvdHMiLCJ0ZXh0Q29udGVudCIsInZpZXdDbWQiLCJwYXJhbXMiLCJ2aWV3Q29tbWFuZHMiLCJyZW5kZXJNYWluU2xpZGUiLCJzbGlkZXNFbCIsInFzYSIsImRvdHNFbCIsIm1haW5TbGlkZVN0ciIsInNsaWRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiZyIsIkZ1bmN0aW9uIiwiZXZhbCIsImZvb2RUYWJFbCIsImZvb2RUYWIiLCJmcm9tIiwiZm9vZFRhYkxpc3RFbCIsInRhYiIsImZvb2RCb3hMaXN0RWwiLCJmb29kIiwiY2F0ZWdvcnlfaWQiLCJyZW5kZXJGb29kVGFiIiwicmVuZGVyRm9vZENvbnRhaW5lciIsInJlbmRlckZvb2RCb3hMaXN0IiwicmVuZGVyRm9vZEJveCIsInJlbmRlclNlbGVjdGVkRm9vZCIsImZsb29yIiwicmFuZG9tIiwiZm9vZENvbnRhaW5lckVsIiwiZm9vZENvbnRhaW5lciIsImZvb2RCb3hMaXN0IiwiaXRlbXMiLCJpbWFnZSIsImFsdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJvbGRfcHJpY2UiLCJuX3ByaWNlIiwibmV3X3ByaWNlIiwic19wcmljZSIsIndvbiIsImZvb2RCb3hFbCIsImxlbiIsImoiLCJiYWRnZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGVsaXZlcnlfdHlwZSIsImluaXROdW0iLCJjbGljayIsImhpZGUiLCJzaG93IiwidHJhbnNpdGlvbmVuZCIsImJhbmNoYW4iLCJyZW5kZXJGb29kQm94T3B0aW9uIiwicmVuZGVyU2xpZGVzIiwicHJkQm94IiwiU2xpZGVzIiwibGFzdFNsaWRlcyIsIlNsaWRlIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwibGFzdFNsaWRlIiwiY2hpbGROb2RlcyIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zZm9ybSIsInNlYXJjaEVsIiwic3VnZ2VzdGlvbnNFbCIsInNlYXJjaEJ1dHRvbkVsIiwicHJlc3MiLCJrZXlDb2RlIiwic2VsIiwic3VibWl0IiwiaXNPcGVuIiwiY2xpY2tTdWdnZXN0aW9uIiwic2V0U2VsIiwibm9uQ2xpY2siLCJob3ZlciIsImVtcHR5U2VsIiwicmVuZGVyQXV0b0NvbXBsZXRlIiwicmVuZGVyU2VhcmNoZXMiLCJSZWdFeHAiLCJzdWdnZXN0aW9uc0NvbXBvbmVudCIsInN1Z2dlc3Rpb24iLCJyZW5kZXJLZXl3b3JkIiwic2VhcmNoZXMiLCJoaXN0b3J5Q29tcG9uZW50IiwiY2xhc3MiLCJzZWFyY2giLCJwcmV2aW91c1NpYmxpbmciLCJsYXN0Q2hpbGQiLCJuZXh0U2libGluZyIsImZpcnN0Q2hpbGQiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBWTtBQUNQLE9BQ0g7QUFBRyxPQUNIO0FBQUcsT0FDSDtBQUFHLE9B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QUwsQ0FBbUIwQixTQUExQjtBQUNIOzs7Ozs7Ozs7Ozs7QUM5SEw7QUFDQSx5QkFBeUIsdURBQXVEO0FBQ2hGLGlFQUFpRTtBQUNqRSxxRkFBcUY7O0FBRXJGO0FBQ0EsOEtBQThLLHdCQUF3QixhQUFhO0FBQ25OO0FBQ0EsNEtBQTRLLDBCQUEwQixhQUFhO0FBQ25OO0FBQ0EsNExBQTRMLGdDQUFnQyxhQUFhO0FBQ3pPO0FBQ0EsQ0FBQyxnQkFBZ0IsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4ODAwMjgxMmRiYzJlMmQ0NjY1YSIsImNvbnN0IGVzY2FwZSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjeDI3OycsXG4gICdgJzogJyYjeDYwOycsXG4gICc9JzogJyYjeDNEOydcbn07XG5cbmNvbnN0IGJhZENoYXJzID0gL1smPD5cIidgPV0vZyxcbiAgICAgIHBvc3NpYmxlID0gL1smPD5cIidgPV0vO1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQob2JqLyogLCAuLi5zb3VyY2UgKi8pIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tpXSwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBsZXQgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLXN0eWxlICovXG5sZXQgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9O1xufVxuZXhwb3J0IHtpc0Z1bmN0aW9ufTtcbi8qIGVzbGludC1lbmFibGUgZnVuYy1zdHlsZSAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcblxuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVFeHByZXNzaW9uKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyAmJiBzdHJpbmcudG9IVE1MKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnRvSFRNTCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZztcbiAgfVxuXG4gIGlmICghcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnJhbWUob2JqZWN0KSB7XG4gIGxldCBmcmFtZSA9IGV4dGVuZCh7fSwgb2JqZWN0KTtcbiAgZnJhbWUuX3BhcmVudCA9IG9iamVjdDtcbiAgcmV0dXJuIGZyYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvdXRpbHMuanMiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgaWYgKCFlbCkgdGhyb3cgZWw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gZWwuc2xpY2UoMSk7XHJcbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHFzKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcXNhKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgb24oZXZlbnQsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGVnYXRlKHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyRm4gPSBlID0+IHtcclxuICAgICAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ICYmIGNhbGxiYWNrLmNhbGwodGhpcy5lbCwgZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXQoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICBjb25zdCBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQsIHtcclxuICAgICAgICAgICAgZGV0YWlsOiBkYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9WaWV3LmpzIiwiLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgcmVndWxhciBFbGVtZW50IHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcclxuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmJpbmQobnVsbCwgZG9jdW1lbnQpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIFNlbGVjdG9yLWJhc2VkIHVzYWdlXHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBSkFYIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkgP1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSkgOiByZWplY3QoeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9ICgpID0+IHJlamVjdCgndGltZW91dCcpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0LCB3aGVuIGludm9rZWQsIGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB0byB3cmFwLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGltaXQgTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IG11c3QgZWxhcHNlIGJldHdlZW4gYGZ1bmNgIGludm9jYXRpb25zLlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3cmFwcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIHBhc3NlZCBpbi5cclxuICovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbGltaXQpIHtcclxuICAgIGxldCB3YWl0ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghd2FpdCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgbGltaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhY2NlbGVyYXRpb24gdW50aWwgaGFsZndheSwgdGhlbiBkZWNlbGVyYXRpb25cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIHN0YXJ0IHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjIGNoYW5nZSBpbiB2YWx1ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG5ldyBzY3JvbGxZXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XHJcbiAgICB0IC89IGQgLyAyO1xyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbiAgICB0LS07XHJcbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGMgY2hhbmdlIGluIHZhbHVlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkIGR1cmF0aW9uXHJcbiAqIEByZXR1cm4ge051bWJlcn0gbmV3IHNjcm9sbFlcclxuICovXHJcblxyXG5mdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcclxuICAgIHQgLz0gZCAvIDI7XHJcbiAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2Uoa2V5KSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICByZXR1cm4gdmFsdWUuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQocmVjZWl2ZWRUaW1lLCB0aHJlc2hvbGRIb3VyKSB7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IChjdXJyZW50VGltZSAtIHJlY2VpdmVkVGltZSkgLyAxMDAwIC8gNjAgLyA2MDtcclxuICAgIHJldHVybiBlbGFwc2VkVGltZSA8IHRocmVzaG9sZEhvdXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlU2Nyb2xsKHRvKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHNjcm9sbFk7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmFicyhjaGFuZ2UgLyA0KTtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDIwO1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lICs9IGluY3JlbWVudDtcclxuICAgICAgICBsZXQgbmV3WSA9IGVhc2VJblF1YWQoY3VycmVudFRpbWUsIHN0YXJ0LCBjaGFuZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICBzY3JvbGxUbygwLCBuZXdZKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZVNjcm9sbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEpTT05QID0gKHVuaXF1ZSA9PiB1cmwgPT5cclxuICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBgX2pzb25wXyR7dW5pcXVlKyt9YDtcclxuICAgICAgICB1cmwgKz0gdXJsLm1hdGNoKC9cXD8vKSA/IGAmY2FsbGJhY2s9JHtuYW1lfWAgOiBgP2NhbGxiYWNrPSR7bmFtZX1gO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XHJcbiAgICAgICAgd2luZG93W25hbWVdID0ganNvbiA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoanNvbik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHdpbmRvd1tuYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH0pXHJcbikoMCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaGVscGVycy5qcyIsImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9iYXNlLmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcVGltXFxcXERvY3VtZW50c1xcXFxqYXZhc2NyaXB0LWZvb2RcXFxcbm9kZV9tb2R1bGVzXFxcXGhhbmRsZWJhcnNcXFxccnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiICAgIDxkaXYgY2xhc3M9J2JhZGdlJz5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvZGl2PlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwiYmFkZ2VfbGlzdFxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYmFkZ2UgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgIDxzcGFuPlwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKGRlcHRoMCwgZGVwdGgwKSlcbiAgICArIFwiPC9zcGFuPlxcclxcbiAgICAgICAgPC9saT5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2Zvb2RfaW1nX2hvdmVyJz5cXHJcXG4gICAgPHVsPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlbGl2ZXJ5X3R5cGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvdWw+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbmltcG9ydCBNYWluU2xpZGVWaWV3IGZyb20gJy4vdmlldy9NYWluU2xpZGVWaWV3JztcclxuaW1wb3J0IEJlc3RCYW5jaGFuVmlldyBmcm9tICcuL3ZpZXcvQmVzdEJhbmNoYW5WaWV3JztcclxuaW1wb3J0IFNjcm9sbGVyVmlldyBmcm9tICcuL3ZpZXcvU2Nyb2xsZXJWaWV3JztcclxuaW1wb3J0IEluZmluaXRlU2xpZGVWaWV3IGZyb20gJy4vdmlldy9JbmZpbml0ZVNsaWRlVmlldyc7XHJcbmltcG9ydCBBdXRvbUNvbXBsZXRlVmlldyBmcm9tICcuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldyc7XHJcblxyXG5jb25zdCB1cmxMaXN0ID0ge1xyXG4gICAgbWFpblNsaWRlOiAnaHR0cDovL2hvbWUuZG90b2wueHl6L3BocC90ZXN0X2FwaS5waHAnLFxyXG4gICAgYmVzdEJhbmNoYW46ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2EvYmVzdCcsXHJcbiAgICBzaWRlX2Zvb2Q6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2Evc2lkZScsXHJcbiAgICBtYWluX2Zvb2Q6ICdodHRwOi8vY3JvbmcuY29kZXNxdWFkLmtyOjgwODAvd29vd2EvbWFpbicsXHJcbiAgICBjb3Vyc2VfZm9vZDogJ2h0dHA6Ly9jcm9uZy5jb2Rlc3F1YWQua3I6ODA4MC93b293YS9zb3VwJyxcclxuICAgIGF1dG9Db21wbGV0ZTogJ2h0dHBzOi8va28ud2lraXBlZGlhLm9yZy93L2FwaS5waHA/YWN0aW9uPW9wZW5zZWFyY2gmc2VhcmNoPSdcclxufTtcclxuXHJcbmNvbnN0IG1haW5TbGlkZVZpZXcgPSBuZXcgTWFpblNsaWRlVmlldygnLm1haW5fc2xpZGUnKTtcclxuY29uc3QgYmVzdEJhbmNoYW5WaWV3ID0gbmV3IEJlc3RCYW5jaGFuVmlldygnLmJlc3RfZm9vZCcpO1xyXG5jb25zdCBzY3JvbGxlclZpZXcgPSBuZXcgU2Nyb2xsZXJWaWV3KCcuc2Nyb2xsZXInKTtcclxuY29uc3Qgc2lkZUJhbmNoYW5WaWV3ID0gbmV3IEluZmluaXRlU2xpZGVWaWV3KCcuc2lkZV9mb29kJyk7XHJcbmNvbnN0IG1haW5CYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnLm1haW5fZm9vZCcpO1xyXG5jb25zdCBjb3Vyc2VCYW5jaGFuVmlldyA9IG5ldyBJbmZpbml0ZVNsaWRlVmlldygnLmNvdXJzZV9mb29kJyk7XHJcbmNvbnN0IGF1dG9tQ29tcGxldGVWaWV3ID0gbmV3IEF1dG9tQ29tcGxldGVWaWV3KCcuc2VhcmNoYmFyJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtDb250cm9sbGVyfVxyXG4gKi9cclxuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHVybExpc3QsIG1haW5TbGlkZVZpZXcsIGJlc3RCYW5jaGFuVmlldywgc2Nyb2xsZXJWaWV3LCBhdXRvbUNvbXBsZXRlVmlldywgc2lkZUJhbmNoYW5WaWV3LCBtYWluQmFuY2hhblZpZXcsIGNvdXJzZUJhbmNoYW5WaWV3KTtcclxuXHJcbmNvbnN0IHNldFZpZXcgPSAoKSA9PiBjb250cm9sbGVyLnNldFZpZXcoKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXRWaWV3KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9uYW51bWdvdGhpYy5jc3MpO1wiLCBcIlwiXSk7XG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcmVzZXQgc3R5bGVzICovXFxuKixcXG4qOmFmdGVyLFxcbio6YmVmb3JlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgYmFja2dyb3VuZDogI2ZmZjsgfVxcblxcbmRpdixcXG5zcGFuLFxcbm9iamVjdCxcXG5pZnJhbWUsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxucCxcXG5ibG9ja3F1b3RlLFxcbnByZSxcXG5hYmJyLFxcbmFkZHJlc3MsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zYW1wLFxcbnNtYWxsLFxcbnN0cm9uZyxcXG52YXIsXFxuYixcXG5pLFxcbmRsLFxcbmR0LFxcbmRkLFxcbm9sLFxcbnVsLFxcbmxpLFxcbmZpZWxkc2V0LFxcbmZvcm0sXFxubGFiZWwsXFxubGVnZW5kLFxcbnRhYmxlLFxcbmNhcHRpb24sXFxudGJvZHksXFxudGZvb3QsXFxudGhlYWQsXFxudHIsXFxudGgsXFxudGQsXFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5jYW52YXMsXFxuZGV0YWlscyxcXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5mb290ZXIsXFxuaGVhZGVyLFxcbm1lbnUsXFxubmF2LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIG91dGxpbmU6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG5cXG5kdCB7XFxuICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbm9sLFxcbnVsLFxcbmRsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7IH1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcblxcbi8qIEZhZGluZyBhbmltYXRpb24gKi9cXG4uZmFkZWluIHtcXG4gIG9wYWNpdHk6IDE7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDJzOyB9XFxuXFxuLmZhZGVvdXQge1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMnM7IH1cXG5cXG4vKiBjb21wb25lbnRzIHN0eWxlcyAqL1xcbi5mb29kIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5sbmJfd3JhcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlOWU5ZTk7IH1cXG4gIC5sbmJfd3JhcCA+IC5sbmJfY29udGVudCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgaGVpZ2h0OiAzNnB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuMnB4O1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuICAgIC5sbmJfd3JhcCA+IC5sbmJfY29udGVudCBzcGFuLmljIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgem9vbTogMTtcXG4gICAgICB3aWR0aDogN3B4O1xcbiAgICAgIGhlaWdodDogMTFweDtcXG4gICAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vYnVsX2Fycl9kb3duLnBuZykgbm8tcmVwZWF0IGNlbnRlciAxcHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDRweDsgfVxcblxcbi5saW5rX2FwcCA+IGEge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwYWRkaW5nOiAxMHB4IDExcHggOXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM2NjY7IH1cXG4gIC5saW5rX2FwcCA+IGE6aG92ZXIge1xcbiAgICBjb2xvcjogIzJhYzFiYzsgfVxcblxcbi5sbmJfbGlzdCB7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuICAubG5iX2xpc3QgPiBsaSA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggOXB4IDEwcHg7XFxuICAgIGNvbG9yOiAjNjY2O1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vdXRpbF9iYXIuZ2lmKSBuby1yZXBlYXQgMCAxMnB4OyB9XFxuICAgIC5sbmJfbGlzdCA+IGxpID4gYTpob3ZlciB7XFxuICAgICAgY29sb3I6ICMyYWMxYmM7IH1cXG4gIC5sbmJfbGlzdCA+IGxpOmZpcnN0LWNoaWxkID4gYSB7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7IH1cXG4gIC5sbmJfbGlzdCA+IGxpOmxhc3QtY2hpbGQgPiBhIHtcXG4gICAgY29sb3I6ICMzMzM7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuXFxuLmhlYWRlcl93cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDk4cHg7XFxuICB3aWR0aDogOTgwcHg7XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcbiAgLmhlYWRlcl93cmFwID4gLmxvZ28ge1xcbiAgICBtYXJnaW46IDE2cHggMCAwIDVweDsgfVxcblxcbi5zZWFyY2hiYXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAzMHB4IDAgMCA0NnB4OyB9XFxuICAuc2VhcmNoYmFyID4gaW5wdXQge1xcbiAgICB3aWR0aDogMjEwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgY29sb3I6ICM4ODg4ODg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZmQwZDI7XFxuICAgIHBhZGRpbmc6IDBweCAzOHB4IDBweCAxNXB4OyB9XFxuICAuc2VhcmNoYmFyID4gYnV0dG9uIHtcXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL2ljX3NlYXJjaC5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgMDtcXG4gICAgd2lkdGg6IDM4cHg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDFweDtcXG4gICAgcmlnaHQ6IDFweDtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgLnNlYXJjaGJhciA+IGJ1dHRvbjpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIDEwMCU7IH1cXG5cXG4uYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb25zIHtcXG4gIHdpZHRoOiAyMTBweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB6LWluZGV4OiA5OTk5O1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IC0xcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMgPiAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHBhZGRpbmc6IDZweCAwIDNweCAyNXB4O1xcbiAgICBsaW5lLWhlaWdodDogMjNweDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxuICAgIGNvbG9yOiAjMzMzOyB9XFxuICAgIC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMgPiAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24gYiB7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgY29sb3I6ICNmZTFhMWE7IH1cXG4gICAgLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9ucyA+IC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbi5zZWxlY3RlZCB7XFxuICAgICAgYmFja2dyb3VuZDogI2YwZjBmMGJkOyB9XFxuICAgIC5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMgPiAuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24uc2VhcmNoZXMge1xcbiAgICAgIGNvbG9yOiAjNTIxODhjOyB9XFxuXFxuLmduYl90b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbjogMCA1cHggMCBhdXRvOyB9XFxuICAuZ25iX3RvcCA+IGxpID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW46IDI1cHggMCAyNXB4IDUwcHg7IH1cXG5cXG4ubmF2aV93cmFwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDE7XFxuICBiYWNrZ3JvdW5kOiAjNDgzZjM1OyB9XFxuICAubmF2aV93cmFwID4gLm5hdmlfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiA1MnB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5nbmIge1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgLmduYiA+IGxpIHtcXG4gICAgd2lkdGg6IDEyNHB4O1xcbiAgICBoZWlnaHQ6IDUycHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAuZ25iID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwYWRkaW5nOiA1cHggMCAwIDFweDsgfVxcbiAgICAgIC5nbmIgPiBsaSA+IGEgPiBzcGFuIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGhlaWdodDogNTJweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgICAgcGFkZGluZzogMTFweCAyNXB4IDBweDsgfVxcbiAgICAuZ25iID4gbGk6Zmlyc3QtY2hpbGQge1xcbiAgICAgIHdpZHRoOiAxMDBweDsgfVxcbiAgICAuZ25iID4gbGk6bnRoLWNoaWxkKDcpIHtcXG4gICAgICB3aWR0aDogMTIwcHg7IH1cXG4gICAgLmduYiA+IGxpOm50aC1jaGlsZCg4KSB7XFxuICAgICAgd2lkdGg6IDE0MHB4O1xcbiAgICAgIGJhY2tncm91bmQ6ICMzNjJkMjU7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5nbmIgPiBsaTpob3ZlciA+IGEgPiBzcGFuLCAuZ25iID4gbGk6Zm9jdXMgPiBhID4gc3BhbiB7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBjb2xvcjogIzJhYzFiYzsgfVxcbiAgICAuZ25iID4gbGk6aG92ZXIgPiB1bCwgLmduYiA+IGxpOmZvY3VzID4gdWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLnN1Yl9saXN0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMTYycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiA1MnB4O1xcbiAgcGFkZGluZzogMjBweCAwIDMxcHg7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg3MiwgNjMsIDUzLCAwLjYpO1xcbiAgYm9yZGVyLXRvcDogMDsgfVxcbiAgLnN1Yl9saXN0IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgIHBhZGRpbmc6IDZweCAwIDNweCAyNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIC5zdWJfbGlzdCBhOmhvdmVyID4gc3BhbixcXG4gICAgLnN1Yl9saXN0IGE6Zm9jdXMgPiBzcGFuIHtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgY29sb3I6ICMyYWMxYmM7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG5cXG4ubWFpbl9zbGlkZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXgtd2lkdGg6IDE5MjBweDsgfVxcblxcbi5tYWluX3NsaWRlc19saXN0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogNDIwcHg7IH1cXG4gIC5tYWluX3NsaWRlc19saXN0ID4gbGkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiBuby1yZXBlYXQgY2VudGVyIHRvcDsgfVxcbiAgICAubWFpbl9zbGlkZXNfbGlzdCA+IGxpID4gYSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2lkdGg6IDk4MHB4O1xcbiAgICAgIGhlaWdodDogNDIwcHg7XFxuICAgICAgbWFyZ2luOiAwIGF1dG87IH1cXG5cXG4uc2xpZGVzX25hdmkgPiBhIHtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA5MnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tdG9wOiAtNDZweDtcXG4gIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9tYWluX3NsaWRlc19uYXZpLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7IH1cXG5cXG4uc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXYge1xcbiAgcmlnaHQ6IDUwJTtcXG4gIG1hcmdpbi1yaWdodDogNTMwcHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IGNlbnRlcjsgfVxcblxcbi5zbGlkZXNfbmF2aSA+IC5zbGlkZXNfbmV4dCB7XFxuICBsZWZ0OiA1MCU7XFxuICBtYXJnaW4tbGVmdDogNTMwcHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7IH1cXG5cXG4uc2xpZGVzX2RvdHMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm90dG9tOiA0MHB4O1xcbiAgaGVpZ2h0OiAwOyB9XFxuICAuc2xpZGVzX2RvdHMgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gICAgcGFkZGluZzogMCA0cHg7IH1cXG4gICAgLnNsaWRlc19kb3RzID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTBweDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgcGFkZGluZy10b3A6IDEwcHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICAgIG9wYWNpdHk6IDAuNjsgfVxcbiAgICAgIC5zbGlkZXNfZG90cyA+IGxpID4gYS5ub3cge1xcbiAgICAgICAgb3BhY2l0eTogMTsgfVxcblxcbi5iZXN0X2Zvb2Qge1xcbiAgYmFja2dyb3VuZDogI2VlZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87IH1cXG4gICAgLmJlc3RfZm9vZCA+IC5iZXN0X2Zvb2RfY29udGVudCA+IC5iZXN0X2Zvb2RfdGl0bGUge1xcbiAgICAgIHBhZGRpbmc6IDQwcHggMCAzMHB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5iZXN0X2Zvb2RfdGFicyB7XFxuICBoZWlnaHQ6IDQ4cHg7IH1cXG4gIC5iZXN0X2Zvb2RfdGFicyA+IGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBoZWlnaHQ6IDQ4cHg7IH1cXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGkgPiBhIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTU5cHg7XFxuICAgICAgcGFkZGluZy10b3A6IDE3cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIGNvbG9yOiAjNzc3OyB9XFxuICAgIC5iZXN0X2Zvb2RfdGFicyA+IGxpOmZvY3VzID4gYSxcXG4gICAgLmJlc3RfZm9vZF90YWJzID4gbGk6aG92ZXIgPiBhLFxcbiAgICAuYmVzdF9mb29kX3RhYnMgPiBsaSA+IGEubm93IHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMWZjYmM3O1xcbiAgICAgIGNvbG9yOiAjZmZmOyB9XFxuXFxuLmJlc3RfZm9vZF9jb250YWluZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDQ1cHg7IH1cXG4gIC5iZXN0X2Zvb2RfY29udGFpbmVyID4gLmJlc3RfZm9vZF9ib3hfbGlzdCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHdpZHRoOiA5NjBweDtcXG4gICAgbWFyZ2luLXRvcDogMjVweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG4gICAgLmJlc3RfZm9vZF9jb250YWluZXIgPiAuYmVzdF9mb29kX2JveF9saXN0ID4gLmJlc3RfZm9vZF9ib3hfd3JhcCB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIG1hcmdpbjogMCAyNHB4IDEwcHggMDtcXG4gICAgICBjb2xvcjogIzAwMDtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAgICAgLmJlc3RfZm9vZF9jb250YWluZXIgPiAuYmVzdF9mb29kX2JveF9saXN0ID4gLmJlc3RfZm9vZF9ib3hfd3JhcDpsYXN0LWNoaWxkIHtcXG4gICAgICAgIG1hcmdpbjogMDsgfVxcblxcbi5mb29kX2ltZ19ob3ZlciB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICAuZm9vZF9pbWdfaG92ZXIgPiB1bCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTsgfVxcbiAgICAuZm9vZF9pbWdfaG92ZXIgPiB1bCA+IGxpIHtcXG4gICAgICBtYXJnaW46IDAgMTVweCA4cHg7XFxuICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIC5mb29kX2ltZ19ob3ZlciA+IHVsID4gbGkgPiBzcGFuIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDEzcHggMCA0cHg7IH1cXG4gICAgICAuZm9vZF9pbWdfaG92ZXIgPiB1bCA+IGxpOmxhc3QtY2hpbGQgPiBzcGFuIHtcXG4gICAgICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL21haW4vZGVsaXZlcnlfbGluZS5wbmcpIHJlcGVhdC14IDAgMDsgfVxcblxcbi5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3QsIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0IHtcXG4gIGhlaWdodDogMjRweDtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmJhZGdlX2xpc3QgPiAuYmFkZ2UsIC5wcmRfYm94ID4gYSA+IC5iYWRnZV9saXN0ID4gLmJhZGdlIHtcXG4gICAgcGFkZGluZzogNHB4IDJweCA1cHg7XFxuICAgIG1hcmdpbi1yaWdodDogM3B4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYmFja2dyb3VuZDogI2E5NzRiZjtcXG4gICAgd2lkdGg6IDYycHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAub2xkX3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAub2xkX3ByaWNlIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgY29sb3I6ICM4ODg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAubmV3X3ByaWNlLCAucHJkX2RldGFpbCA+IC5wcmRfcHJpY2UgPiAubmV3X3ByaWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IC0ycHg7XFxuICAgIG1hcmdpbi1sZWZ0OiA5cHg7XFxuICAgIGNvbG9yOiAjMmFjMWJjO1xcbiAgICBmb250LXNpemU6IDI2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2UgPiAubmV3X3ByaWNlID4gLndvbiwgLnByZF9kZXRhaWwgPiAucHJkX3ByaWNlID4gLm5ld19wcmljZSA+IC53b24ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNnB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0b3A6IC0zcHg7IH1cXG5cXG4uYmVzdF9mb29kX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLmJlc3RfZm9vZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyLCAucHJkX2JveDpob3ZlciAuZm9vZF9pbWdfaG92ZXIsXFxuLnByZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjYpOyB9XFxuXFxuLmJlc3RfZm9vZF9ib3gge1xcbiAgd2lkdGg6IDMwNHB4O1xcbiAgaGVpZ2h0OiA0MjlweDsgfVxcbiAgLmJlc3RfZm9vZF9ib3g6aG92ZXIgLmZvb2RfaW1nX2hvdmVyLFxcbiAgLmJlc3RfZm9vZF9ib3g6Zm9jdXMgLmZvb2RfaW1nX2hvdmVyIHtcXG4gICAgaGVpZ2h0OiAzMDRweDsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuZm9vZF9pbWcgPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmJlc3RfZm9vZF9ib3ggPiAuYmFkZ2VfbGlzdCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNzNweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBtYXJnaW46IDAgMCAxMHB4IDEwcHg7IH1cXG4gIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsIHtcXG4gICAgcGFkZGluZzogMThweCAyMHB4IDE1cHg7XFxuICAgIGhlaWdodDogOTBweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAuYmVzdF9mb29kX2JveCA+IC5mb29kX2RldGFpbCA+IC5mb29kX3RpdGxlIHtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogLTEuMnB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfZGVzY3JpcHRpb24ge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5iZXN0X2Zvb2RfYm94ID4gLmZvb2RfZGV0YWlsID4gLmZvb2RfcHJpY2Uge1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cXG5cXG4uaW5maW5pdGVfZm9vZCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCB7XFxuICAgIHdpZHRoOiA5ODBweDtcXG4gICAgaGVpZ2h0OiA2NzBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50ID4gLmluZmluaXRlX2Zvb2RfdGl0bGUge1xcbiAgICAgIG1hcmdpbjogNzBweCAwIDM3cHg7IH1cXG4gICAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50ID4gLmluZmluaXRlX2Zvb2RfY29udGFpbmVyIHtcXG4gICAgICBoZWlnaHQ6IDM0NnB4O1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgICAuaW5maW5pdGVfZm9vZCA+IC5pbmZpbml0ZV9mb29kX2NvbnRlbnQgPiAuaW5maW5pdGVfZm9vZF9jb250YWluZXIgPiAuaW5maW5pdGVfZm9vZF9ib3hfbGlzdCB7XFxuICAgICAgICB3aWR0aDogMTAwMCU7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XFxuICAgIC5pbmZpbml0ZV9mb29kID4gLmluZmluaXRlX2Zvb2RfY29udGVudCAuaW5maW5pdGVfYnRuIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBtYXJnaW46IDM4cHggYXV0bztcXG4gICAgICBwYWRkaW5nOiAxNXB4IDAgMTdweDtcXG4gICAgICB3aWR0aDogOTgwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBjb2xvcjogIzMzMztcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZDdkN2Q3OyB9XFxuICAgICAgLmluZmluaXRlX2Zvb2QgPiAuaW5maW5pdGVfZm9vZF9jb250ZW50IC5pbmZpbml0ZV9idG4gPiBzcGFuIHtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE0cHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9tYWluL2J0bl9hcnJfbW9yZS5wbmcpIG5vLXJlcGVhdCByaWdodDsgfVxcblxcbi5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gYSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDI1N3B4O1xcbiAgd2lkdGg6IDI4cHg7XFxuICBoZWlnaHQ6IDUycHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL3dlYi9jb21tb24vYnRuX3ByZHNfdGh1bWJfc2xpZGVzX25hdmkucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjsgfVxcblxcbi5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19wcmV2IHtcXG4gIGxlZnQ6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiAtNTU4cHg7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IHRvcDsgfVxcbiAgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX3ByZXY6aG92ZXIsIC5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19wcmV2OmZvY3VzIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCAtNTJweDsgfVxcblxcbi5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19uZXh0IHtcXG4gIHJpZ2h0OiA1MCU7XFxuICBtYXJnaW4tcmlnaHQ6IC01NThweDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IHRvcDsgfVxcbiAgLmluZmluaXRlX2Zvb2Rfc2xpZGVzX25hdmkgPiAuc2xpZGVzX25leHQ6aG92ZXIsIC5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gLnNsaWRlc19uZXh0OmZvY3VzIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgLTUycHg7IH1cXG5cXG4uc2lkZV9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL2Jhbm5lci9tYWluX2V2ZW50LzE3MTIxNC8xNTEzMjQzNzEyNjgzXzFlMGE2MzEyNTk5ZS5qcGcpOyB9XFxuICAuc2lkZV9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciA+IGEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDk4MHB4O1xcbiAgICBoZWlnaHQ6IDE0MHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi5tYWluX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5ibWYua3IvYmFubmVyL21haW5fZXZlbnQvMTcwNjI4LzE0OTg2Mzk3NTEyNzJfZTZjYWRiZGE2NWI0LmpwZyk7IH1cXG4gIC5tYWluX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIGhlaWdodDogMTQwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLmNvdXJzZV9mb29kIC5pbmZpbml0ZV9mb29kX2Jhbm5lciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cHM6Ly9jZG4uYm1mLmtyL2Jhbm5lci9tYWluX2V2ZW50LzE3MDQyNS8xNDkzMDgyNzQ0NDAxX2JhOTgzMWU0ZTJiYi5wbmcpOyB9XFxuICAuY291cnNlX2Zvb2QgLmluZmluaXRlX2Zvb2RfYmFubmVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogOTgwcHg7XFxuICAgIGhlaWdodDogMTQwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXFxuLnRodW1iX2ltZyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDIxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLnRodW1iX2ltZyA+IHAgPiBpbWcge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7IH1cXG4gIC50aHVtYl9pbWcgPiAuY2lyY2xlX21hc2sge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHBzOi8vY2RuLmJtZi5rci93ZWIvY29tbW9uL2NpcmNsZV9tYXNrLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7XFxuICAgIHdpZHRoOiAyMTVweDtcXG4gICAgaGVpZ2h0OiAyMTVweDsgfVxcblxcbi5wcmRfYm94IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAyMTVweDtcXG4gIG1hcmdpbjogMHB4IDE1cHggOHB4OyB9XFxuICAucHJkX2JveCA+IGEgPiAuYmFkZ2VfbGlzdCB7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXFxuLnByZF9kZXRhaWwge1xcbiAgcGFkZGluZzogMThweCAxMHB4IDEycHggMTBweDsgfVxcbiAgLnByZF9kZXRhaWwgPiAucHJkX3RpdGxlIHtcXG4gICAgY29sb3I6ICMwMDA7XFxuICAgIGxldHRlci1zcGFjaW5nOiAtMS4ycHg7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgLnByZF9kZXRhaWwgPiAucHJkX2Rlc2NyaXB0aW9uIHtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogLTEuMnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIGNvbG9yOiAjNjY2O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgLnByZF9kZXRhaWwgPiAucHJkX3ByaWNlIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4uc2Nyb2xsZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogNzBweDtcXG4gIGxlZnQ6IDc5JTsgfVxcbiAgLnNjcm9sbGVyID4gbGkgPiBhIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJhY2tncm91bmQ6IHVybChodHRwczovL2Nkbi5ibWYua3Ivd2ViL2NvbW1vbi9idG5fcGFnZV91cF9kb3duX25ldy5wbmcpIG5vLXJlcGVhdDsgfVxcbiAgLnNjcm9sbGVyID4gLnBhZ2VfdXAgPiBhIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCB0b3A7IH1cXG4gICAgLnNjcm9sbGVyID4gLnBhZ2VfdXAgPiBhOmhvdmVyLCAuc2Nyb2xsZXIgPiAucGFnZV91cCA+IGE6Zm9jdXMge1xcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC01MHB4IHRvcDsgfVxcbiAgLnNjcm9sbGVyID4gLnBhZ2VfZG93biA+IGEge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC01MHB4OyB9XFxuICAgIC5zY3JvbGxlciA+IC5wYWdlX2Rvd24gPiBhOmhvdmVyLCAuc2Nyb2xsZXIgPiAucGFnZV9kb3duID4gYTpmb2N1cyB7XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTUwcHggLTUwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJpbXBvcnQge1xyXG4gICAgcmVxdWVzdCxcclxuICAgIGRlbGVnYXRlLFxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgc2V0TG9jYWxTdG9yYWdlLFxyXG4gICAgaXNWYWxpZCxcclxuICAgIG1vdmVTY3JvbGwsXHJcbiAgICBmZXRjaEpTT05QXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybExpc3QsIG1haW5TbGlkZVZpZXcsIGJlc3RCYW5jaGFuVmlldywgc2Nyb2xsZXJWaWV3LCBhdXRvQ29tcGxldGVWaWV3LCAuLi5pbmZpbml0ZVZpZXdzKSB7XHJcbiAgICAgICAgdGhpcy51cmxMaXN0ID0gdXJsTGlzdDtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcgPSBtYWluU2xpZGVWaWV3O1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3ID0gYmVzdEJhbmNoYW5WaWV3O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsZXJWaWV3ID0gc2Nyb2xsZXJWaWV3O1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldyA9IGF1dG9Db21wbGV0ZVZpZXc7XHJcbiAgICAgICAgdGhpcy5pbmZpbml0ZVZpZXdzID0gaW5maW5pdGVWaWV3cztcclxuICAgIH1cclxuXHJcbiAgICBzZXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hNYWluU2xpZGUodGhpcy51cmxMaXN0Lm1haW5TbGlkZSk7XHJcbiAgICAgICAgdGhpcy5mZXRjaEJlc3RCYW5jaGFuKHRoaXMudXJsTGlzdC5iZXN0QmFuY2hhbik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVWaWV3cy5mb3JFYWNoKGluZmluaXRlVmlldyA9PlxyXG4gICAgICAgICAgICB0aGlzLmZldGNoSW5maW5pdGVCYW5jaGFuKGluZmluaXRlVmlldywgdGhpcy51cmxMaXN0W2luZmluaXRlVmlldy5uYW1lXSkpO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbGVyVmlldy5iaW5kKCdjbGljaycpLmJpbmQoJ2hpZGUnKVxyXG4gICAgICAgICAgICAub24oJ0Btb3ZlJywgZSA9PiB0aGlzLm1vdmVTY3JvbGxlcihlLmRldGFpbC5kaXJlY3Rpb24pKTtcclxuXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmJpbmQoJ3ByZXNzJykuYmluZCgnc3VibWl0JykuYmluZCgnaGlzdG9yeScpXHJcbiAgICAgICAgICAgIC5iaW5kKCdjbGlja1N1Z2dlc3Rpb24nKS5iaW5kKCdub25DbGljaycpLmJpbmQoJ2hvdmVyJylcclxuICAgICAgICAgICAgLm9uKCdAcHJlc3MnLCBlID0+IHRoaXMucHJlc3NBdXRvQ29tcGxldGUoZS5kZXRhaWwpKVxyXG4gICAgICAgICAgICAub24oJ0BzdWJtaXQnLCBlID0+IHRoaXMuc3VibWl0S2V5d29yZChlLmRldGFpbC5rZXl3b3JkKSlcclxuICAgICAgICAgICAgLm9uKCdAaGlzdG9yeScsICgpID0+IHRoaXMuc2hvd0hpc3RvcnkoKSk7XHJcblxyXG4gICAgICAgIGRlbGVnYXRlKCdib2R5JywgJ2EnLCAnY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmV0Y2hNYWluU2xpZGUodXJsKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZUltZ3MgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHVybCk7XHJcbiAgICAgICAgdGhpcy5tYWluU2xpZGVWaWV3LnJlbmRlcignbWFpblNsaWRlJywgdGhpcy5zbGlkZUltZ3MpXHJcbiAgICAgICAgICAgIC5iaW5kKCdzbGlkZXNOYXZpJykuYmluZCgnc2xpZGVzRG90cycpXHJcbiAgICAgICAgICAgIC5vbignQHNlbGVjdERvdCcsIGUgPT4gdGhpcy5zZWxlY3RTbGlkZShlLmRldGFpbC5pbmRleCkpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZVNsaWRlKGUuZGV0YWlsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVNsaWRlKHtcclxuICAgICAgICBpbmRleCxcclxuICAgICAgICBkaXJlY3Rpb25cclxuICAgIH0pIHtcclxuICAgICAgICBjb25zdCBzbGlkZXNFbmQgPSB0aGlzLnNsaWRlSW1ncy5sZW5ndGggLSAxO1xyXG4gICAgICAgIGluZGV4ICs9IGRpcmVjdGlvbjtcclxuICAgICAgICBpZiAoaW5kZXggPiBzbGlkZXNFbmQpIGluZGV4ID0gMDtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IHNsaWRlc0VuZDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RTbGlkZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0U2xpZGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1haW5TbGlkZVZpZXcuaGlkZUN1cnJlbnRTbGlkZSgpLnNldEluZGV4KGluZGV4KS5zaG93U2xpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlU2Nyb2xsZXIoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgZGlyZWN0aW9uID09PSAndXAnID8gbW92ZVNjcm9sbCgwKSA6IG1vdmVTY3JvbGwoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXNzQXV0b0NvbXBsZXRlKHtcclxuICAgICAgICB0ZXJtLFxyXG4gICAgICAgIGtleSxcclxuICAgICAgICBpc1NlbGV0ZWRcclxuICAgIH0pIHtcclxuICAgICAgICBjb25zdCBpc1VwID0gKGtleSkgPT4ga2V5ID09PSAzODtcclxuICAgICAgICBjb25zdCBpc2Rvd24gPSAoa2V5KSA9PiBrZXkgPT09IDQwO1xyXG4gICAgICAgIGNvbnN0IGlzRVNDID0gKGtleSkgPT4ga2V5ID09PSAyNztcclxuICAgICAgICBjb25zdCBpc0VudGVyID0gKGtleSkgPT4ga2V5ID09PSAxMztcclxuICAgICAgICBjb25zdCBpc1N0cmluZyA9IChrZXkpID0+IGtleSA8IDM1IHx8IGtleSA+IDQwO1xyXG5cclxuICAgICAgICBpZiAoaXNVcChrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlVmlldy51cFNlbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNkb3duKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmRvd25TZWwoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRVNDKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVWaWV3LmVtcHR5QXV0b0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0VudGVyKGtleSkpIHtcclxuICAgICAgICAgICAgaXNTZWxldGVkID8gdGhpcy5hdXRvQ29tcGxldGVWaWV3LnNldFNlYXJjaGJhcigpIDogdGhpcy5zdWJtaXRLZXl3b3JkKHRlcm0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoa2V5KSkge1xyXG4gICAgICAgICAgICB0ZXJtID8gdGhpcy5mZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSA6IHRoaXMuYXV0b0NvbXBsZXRlVmlldy5lbXB0eUF1dG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEF1dG9Db21wbGV0ZSh0ZXJtKSB7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhd2FpdCB0aGlzLmNoZWNrTG9jYWxTdG9yYWdlKHRoaXMudXJsTGlzdC5hdXRvQ29tcGxldGUgKyB0ZXJtLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5yZW5kZXIoJ2F1dG9Db21wbGV0ZScsIHRlcm0sIHN1Z2dlc3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXRLZXl3b3JkKGtleXdvcmQpIHtcclxuICAgICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gbmV3IFNldChnZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknKSk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYWRkKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBzZXRMb2NhbFN0b3JhZ2UoJ2hpc3RvcnknLCBbLi4uaGlzdG9yeV0pO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZVZpZXcuZW1wdHlBdXRvQ29tcGxldGUoKS5lbXB0eVNlYXJjaGJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzaG93SGlzdG9yeSgpIHtcclxuICAgICAgICBjb25zdCBoaXN0b3J5ID0gYXdhaXQgZ2V0TG9jYWxTdG9yYWdlKCdoaXN0b3J5Jyk7XHJcbiAgICAgICAgaGlzdG9yeSAmJiB0aGlzLmF1dG9Db21wbGV0ZVZpZXcucmVuZGVyKCdoaXN0b3J5JywgaGlzdG9yeS5zbGljZSgtNSkucmV2ZXJzZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmZXRjaEJlc3RCYW5jaGFuKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuYmVzdEJhbmNoYW5WaWV3LnJlbmRlcignYmVzdEJhbmNoYW4nLCBmb29kRGF0YSkuYmluZCgnZm9vZFRhYicpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZldGNoSW5maW5pdGVCYW5jaGFuKHRhcmdldFZpZXcsIHVybCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2REYXRhID0gYXdhaXQgdGhpcy5jaGVja0xvY2FsU3RvcmFnZSh1cmwpO1xyXG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGZvb2REYXRhLmxlbmd0aCAqIDIuNTtcclxuICAgICAgICB0YXJnZXRWaWV3LnJlbmRlcignYmFuY2hhbicsIGZvb2REYXRhKS5iaW5kKCd0cmFuc2l0aW9uZW5kJykuYmluZCgnc2xpZGVzTmF2aScpXHJcbiAgICAgICAgICAgIC5vbignQG1vdmUnLCBlID0+IHRoaXMubW92ZUluZmluaXRlU2xpZGVzLmNhbGwodGFyZ2V0VmlldywgZS5kZXRhaWwpKVxyXG4gICAgICAgICAgICAub24oJ0B0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAgICAgICAgIGUgPT4gdGhpcy5yZXNldEluZmluaXRlU2xpZGVzLmNhbGwodGFyZ2V0VmlldywgdGhyZXNob2xkLCBlLmRldGFpbC5pbmRleCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVJbmZpbml0ZVNsaWRlcyh7XHJcbiAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgZGlyZWN0aW9uXHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXRJbmRleChpbmRleCArPSBkaXJlY3Rpb24pLnNob3dTbGlkZXMoe1xyXG4gICAgICAgICAgICBJbW1lZGlhdGVseTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldEluZmluaXRlU2xpZGVzKHRocmVzaG9sZCwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBbdGhyZXNob2xkTGVmdCwgdGhyZXNob2xkUmlnaHRdID0gWy0yMCAtIHRocmVzaG9sZCwgLTIwICsgdGhyZXNob2xkXTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IHRocmVzaG9sZExlZnQgfHwgaW5kZXggPT09IHRocmVzaG9sZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoLTIwKS5zaG93U2xpZGVzKHtcclxuICAgICAgICAgICAgICAgIEltbWVkaWF0ZWx5OiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjaGVja0xvY2FsU3RvcmFnZShrZXksIGlzSlNPTlApIHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IGdldExvY2FsU3RvcmFnZShrZXkpO1xyXG4gICAgICAgIGlmIChjYWNoZSAmJiBpc1ZhbGlkKGNhY2hlLnRpbWUsIDYpKSByZXR1cm4gY2FjaGUuZGF0YTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogaXNKU09OUCA/IChhd2FpdCBmZXRjaEpTT05QKGtleSkpWzFdIDogYXdhaXQgcmVxdWVzdChrZXkpLFxyXG4gICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmFsdWUuZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSA/IGZhbHNlIDogc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbnRyb2xsZXIuanMiLCJpbXBvcnQgbWFpblNsaWRlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sJztcclxuaW1wb3J0IHtcclxuICAgIHRocm90dGxlXHJcbn0gZnJvbSAnLi4vaGVscGVycyc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXNQcmV2RWwgPSB0aGlzLnFzKCcuc2xpZGVzX3ByZXYnKTtcclxuICAgICAgICB0aGlzLnNsaWRlc05leHRFbCA9IHRoaXMucXMoJy5zbGlkZXNfbmV4dCcpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYmluZChiaW5kQ21kKSB7XHJcbiAgICAgICAgY29uc3QgYmluZENvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBzbGlkZXNOYXZpOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2xpZGVzX25hdmkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQG1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICtlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzRG90czogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLnNsaWRlc19kb3RzID4gbGkgPiBhJywgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsZShlID0+IHRoaXMuZW1pdCgnQHNlbGVjdERvdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6ICtlLmRlbGVnYXRlVGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDEwMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIG1haW5TbGlkZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluU2xpZGUoLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5TbGlkZShzbGlkZUltZ3MpIHtcclxuICAgICAgICB0aGlzLnJlbmRlck1haW5TbGlkZShzbGlkZUltZ3MpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWwgPSB0aGlzLnFzYSgnLm1haW5fc2xpZGVzX2xpc3QgPiBsaScpO1xyXG4gICAgICAgIHRoaXMuZG90c0VsID0gdGhpcy5xc2EoJy5zbGlkZXNfZG90cyA+IGxpID4gYScpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTWFpblNsaWRlKHNsaWRlSW1ncykge1xyXG4gICAgICAgIGNvbnN0IG1haW5TbGlkZVN0ciA9IG1haW5TbGlkZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgc2xpZGU6IHNsaWRlSW1nc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWFpblNsaWRlU3RyKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoaWRlQ3VycmVudFNsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVzRWxbdGhpcy5zdGF0ZS5pbmRleF0uY2xhc3NOYW1lID0gJ2ZhZGVvdXQnO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vdycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTbGlkZSgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlc0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTmFtZSA9ICdmYWRlaW4nO1xyXG4gICAgICAgIHRoaXMuZG90c0VsW3RoaXMuc3RhdGUuaW5kZXhdLmNsYXNzTmFtZSA9ICdub3cnO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvTWFpblNsaWRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICA8bGkgY2xhc3M9XFxcImZhZGVvdXRcXFwiIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoZGVwdGgwLCBkZXB0aDApKVxuICAgICsgXCIpJz5cXHJcXG4gICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPjwvYT5cXHJcXG4gICAgPC9saT5cXHJcXG5cIjtcbn0sXCIzXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIiAgICA8bGk+XFxyXFxuICAgICAgICA8YSBocmVmPVxcXCIjXFxcIj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbmRleCB8fCAoZGF0YSAmJiBkYXRhLmluZGV4KSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwiaW5kZXhcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9hPlxcclxcbiAgICA8L2xpPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pO1xuXG4gIHJldHVybiBcIjx1bCBjbGFzcz1cXFwibWFpbl9zbGlkZXNfbGlzdFxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoYWxpYXMxLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zbGlkZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L3VsPlxcclxcbjx1bCBjbGFzcz1cXFwic2xpZGVzX2RvdHNcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGFsaWFzMSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2xpZGUgOiBkZXB0aDApLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMywgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC91bD5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVtcGxhdGUvbWFpblNsaWRlLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vbGliL2hhbmRsZWJhcnMucnVudGltZS5qcyIsImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBjcmVhdGVGcmFtZSwgaXNBcnJheX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGxldCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBsZXQgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIG9wdGlvbnMgPSB7ZGF0YTogZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzQXJyYXksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICB9XG5cbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuLFxuICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmV0ID0gJycsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRleHRQYXRoO1xuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleGVjSXRlcmF0aW9uKGZpZWxkLCBpbmRleCwgbGFzdCkge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZGF0YS5rZXkgPSBmaWVsZDtcbiAgICAgICAgZGF0YS5pbmRleCA9IGluZGV4O1xuICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG4gICAgICAgIGRhdGEubGFzdCA9ICEhbGFzdDtcblxuICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGNvbnRleHQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHByaW9yS2V5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgLy8gV2UncmUgcnVubmluZyB0aGUgaXRlcmF0aW9ucyBvbmUgc3RlcCBvdXQgb2Ygc3luYyBzbyB3ZSBjYW4gZGV0ZWN0XG4gICAgICAgICAgICAvLyB0aGUgbGFzdCBpdGVyYXRpb24gd2l0aG91dCBoYXZlIHRvIHNjYW4gdGhlIG9iamVjdCB0d2ljZSBhbmQgY3JlYXRlXG4gICAgICAgICAgICAvLyBhbiBpdGVybWVkaWF0ZSBrZXlzIGFycmF5LlxuICAgICAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJpb3JLZXkgPSBrZXk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwiaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKC8qIFthcmdzLCBdb3B0aW9ucyAqLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0cnVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWlzc2luZyBoZWxwZXI6IFwiJyArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0ubmFtZSArICdcIicpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2lmLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gb2JqICYmIG9ialtmaWVsZF07XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIWlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRdLCBbZGF0YSAmJiBkYXRhLmNvbnRleHRQYXRoXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwiaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uKGZuLCBwcm9wcywgY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgbGV0IHJldCA9IGZuO1xuICAgIGlmICghcHJvcHMucGFydGlhbHMpIHtcbiAgICAgIHByb3BzLnBhcnRpYWxzID0ge307XG4gICAgICByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwYXJ0aWFscyBzdGFjayBmcmFtZSBwcmlvciB0byBleGVjLlxuICAgICAgICBsZXQgb3JpZ2luYWwgPSBjb250YWluZXIucGFydGlhbHM7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgbGV0IHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9sb2dnZXIuanMiLCIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBDT01QSUxFUl9SRVZJU0lPTiwgUkVWSVNJT05fQ0hBTkdFUywgY3JlYXRlRnJhbWUgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgY29uc3QgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mbyAmJiBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICBjb25zdCBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBydW50aW1lVmVyc2lvbnMgKyAnKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKCcgKyBjb21waWxlclZlcnNpb25zICsgJykuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBjb21waWxlckluZm9bMV0gKyAnKS4nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlJyk7XG4gIH1cbiAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgfVxuXG4gIHRlbXBsYXRlU3BlYy5tYWluLmRlY29yYXRvciA9IHRlbXBsYXRlU3BlYy5tYWluX2Q7XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICBvcHRpb25zLmlkc1swXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIGxldCByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJPcHRpb25zLCBlbnYpO1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuICAgICAgICBsZXQgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGUnKTtcbiAgICB9XG4gIH1cblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICBsZXQgY29udGFpbmVyID0ge1xuICAgIHN0cmljdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICBpZiAoIShuYW1lIGluIG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgY29uc3QgbGVuID0gZGVwdGhzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGRlcHRoc1tpXSAmJiBkZXB0aHNbaV1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBkZXB0aHNbaV1bbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxhbWJkYTogZnVuY3Rpb24oY3VycmVudCwgY29udGV4dCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICB9LFxuXG4gICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgIGZuOiBmdW5jdGlvbihpKSB7XG4gICAgICBsZXQgcmV0ID0gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBwcm9ncmFtczogW10sXG4gICAgcHJvZ3JhbTogZnVuY3Rpb24oaSwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgICAgbGV0IHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICBpZiAoZGF0YSB8fCBkZXB0aHMgfHwgYmxvY2tQYXJhbXMgfHwgZGVjbGFyZWRCbG9ja1BhcmFtcykge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9ncmFtV3JhcHBlcjtcbiAgICB9LFxuXG4gICAgZGF0YTogZnVuY3Rpb24odmFsdWUsIGRlcHRoKSB7XG4gICAgICB3aGlsZSAodmFsdWUgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgbGV0IG9iaiA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgb2JqID0gVXRpbHMuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIC8vIEFuIGVtcHR5IG9iamVjdCB0byB1c2UgYXMgcmVwbGFjZW1lbnQgZm9yIG51bGwtY29udGV4dHNcbiAgICBudWxsQ29udGV4dDogT2JqZWN0LnNlYWwoe30pLFxuXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJcbiAgfTtcblxuICBmdW5jdGlvbiByZXQoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgfVxuICAgIGxldCBkZXB0aHMsXG4gICAgICAgIGJsb2NrUGFyYW1zID0gdGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zID8gW10gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBjb250ZXh0ICE9IG9wdGlvbnMuZGVwdGhzWzBdID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBvcHRpb25zLmRlcHRocztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQvKiwgb3B0aW9ucyovKSB7XG4gICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIH1cbiAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcbiAgICByZXR1cm4gbWFpbihjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxuICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgJiYgIWJsb2NrUGFyYW1zKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgYmxvY2sgcGFyYW1zJyk7XG4gICAgfVxuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgZnVuY3Rpb24gcHJvZyhjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgY3VycmVudERlcHRocyA9IGRlcHRocztcbiAgICBpZiAoZGVwdGhzICYmIGNvbnRleHQgIT0gZGVwdGhzWzBdICYmICEoY29udGV4dCA9PT0gY29udGFpbmVyLm51bGxDb250ZXh0ICYmIGRlcHRoc1swXSA9PT0gbnVsbCkpIHtcbiAgICAgIGN1cnJlbnREZXB0aHMgPSBbY29udGV4dF0uY29uY2F0KGRlcHRocyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuKGNvbnRhaW5lcixcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscyxcbiAgICAgICAgb3B0aW9ucy5kYXRhIHx8IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zICYmIFtvcHRpb25zLmJsb2NrUGFyYW1zXS5jb25jYXQoYmxvY2tQYXJhbXMpLFxuICAgICAgICBjdXJyZW50RGVwdGhzKTtcbiAgfVxuXG4gIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBpZiAoIXBhcnRpYWwpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnQHBhcnRpYWwtYmxvY2snKSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuICAgIC8vIFRoaXMgaXMgYSBkeW5hbWljIHBhcnRpYWwgdGhhdCByZXR1cm5lZCBhIHN0cmluZ1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnRpYWw7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG4gIH1cbiAgcmV0dXJuIHBhcnRpYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgLy8gVXNlIHRoZSBjdXJyZW50IGNsb3N1cmUgY29udGV4dCB0byBzYXZlIHRoZSBwYXJ0aWFsLWJsb2NrIGlmIHRoaXMgcGFydGlhbFxuICBjb25zdCBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICBsZXQgcGFydGlhbEJsb2NrO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcbiAgICBwYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGZ1bmN0aW9uIHBhcnRpYWxCbG9ja1dyYXBwZXIoY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcbiAgICAgIC8vIGkuZS4gdGhlIHBhcnQgaW5zaWRlIHRoZSBibG9jayBvZiB0aGUgcGFydGlhbCBjYWxsLlxuICAgICAgb3B0aW9ucy5kYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIGlmIChmbi5wYXJ0aWFscykge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFscyA9IFV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucy5wYXJ0aWFscywgZm4ucGFydGlhbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQgJiYgcGFydGlhbEJsb2NrKSB7XG4gICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcbiAgfVxuXG4gIGlmIChwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuICcnOyB9XG5cbmZ1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpIHtcbiAgaWYgKGZuLmRlY29yYXRvcikge1xuICAgIGxldCBwcm9wcyA9IHt9O1xuICAgIHByb2cgPSBmbi5kZWNvcmF0b3IocHJvZywgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGhzICYmIGRlcHRoc1swXSwgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcbiAgfVxuICByZXR1cm4gcHJvZztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwiaW1wb3J0IGZvb2RCb3hUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94LXRwbC5odG1sJztcclxuaW1wb3J0IGZvb2RUYWJUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sJztcclxuaW1wb3J0IGNvbnRhaW5lclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbCc7XHJcbmltcG9ydCBiYWRnZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2JhZGdlLXRwbC5odG1sJztcclxuaW1wb3J0IGRlbGl2ZXJ5VHlwZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2RlbGl2ZXJ5VHlwZS10cGwuaHRtbCc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgICAgICBzdXBlcihlbCk7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiRWwgPSB0aGlzLnFzKCcuYmVzdF9mb29kX3RhYnMnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGZvb2RUYWI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJ2xpID4gYScsICdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5mb29kVGFiTGlzdEVsKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiID09PSBlLmRlbGVnYXRlVGFyZ2V0ID8gJ25vdycgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmZvb2RCb3hMaXN0RWwpLmZvckVhY2goZm9vZCA9PiBmb29kLnN0eWxlLmRpc3BsYXkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnlfaWQgPT09IGZvb2QuZGF0YXNldC5jYXRlZ29yeV9pZCA/ICdmbGV4JyA6ICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJpbmRDb21tYW5kc1tiaW5kQ21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih2aWV3Q21kLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCB2aWV3Q29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGJlc3RCYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3RCYW5jaGFuKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBiZXN0QmFuY2hhbihmb29kKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGb29kVGFiKGZvb2QpLnJlbmRlckZvb2RDb250YWluZXIoZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlckZvb2RCb3hMaXN0KGZvb2QpLnJlbmRlckZvb2RCb3goZm9vZClcclxuICAgICAgICAgICAgLnJlbmRlclNlbGVjdGVkRm9vZChmb29kLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZFRhYihmb29kKSB7XHJcbiAgICAgICAgY29uc3QgZm9vZFRhYiA9IGZvb2QubWFwKHZhbHVlID0+IGZvb2RUYWJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZCxcclxuICAgICAgICAgICAgbmFtZTogdmFsdWUubmFtZVxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICB0aGlzLmZvb2RUYWJFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBmb29kVGFiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQ29udGFpbmVyKGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQ29udGFpbmVyRWwgPSB0aGlzLnFzKCcuYmVzdF9mb29kX2NvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IGZvb2RDb250YWluZXIgPSBmb29kLm1hcCh2YWx1ZSA9PiBjb250YWluZXJUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2lkOiB2YWx1ZS5jYXRlZ29yeV9pZFxyXG4gICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBmb29kQ29udGFpbmVyRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZENvbnRhaW5lcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRm9vZEJveExpc3QoZm9vZCkge1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbCA9IHRoaXMucXNhKCcuYmVzdF9mb29kX2JveF9saXN0Jyk7XHJcbiAgICAgICAgZm9vZC5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IHZhbHVlLml0ZW1zLm1hcChpdGVtID0+XHJcbiAgICAgICAgICAgICAgICBmb29kQm94VGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsdDogaXRlbS5hbHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkX3ByaWNlOiBpdGVtLm5fcHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvbjogaXRlbS5zX3ByaWNlLnNsaWNlKC0xKVxyXG4gICAgICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZm9vZEJveExpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3goZm9vZCkge1xyXG4gICAgICAgIGNvbnN0IGZvb2RCb3hFbCA9IHRoaXMucXNhKCcuYmVzdF9mb29kX2JveCcpO1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGVuID0gdmFsdWUuaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YWx1ZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb29kQm94RWxbaSAqIGxlbiArIGpdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFkZ2VUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IGl0ZW0uYmFkZ2VcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIGZvb2RCb3hFbFtpICogbGVuICsgal0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNlbGVjdGVkRm9vZChmb29kLCBpbml0TnVtKSB7XHJcbiAgICAgICAgdGhpcy5mb29kVGFiTGlzdEVsID0gdGhpcy5xc2EoJy5iZXN0X2Zvb2RfdGFicyA+IGxpID4gYScpO1xyXG4gICAgICAgIHRoaXMuZm9vZFRhYkxpc3RFbFtpbml0TnVtXS5jbGFzc05hbWUgPSAnbm93JztcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWxbaW5pdE51bV0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L0Jlc3RCYW5jaGFuVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJlc3RfZm9vZF9ib3hfd3JhcFxcXCI+XFxyXFxuICAgIDxsaSBjbGFzcz1cXFwiYmVzdF9mb29kX2JveFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb29kX2ltZ1xcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pbWFnZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaW1hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImltYWdlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgYWx0PVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWx0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hbHQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFsdFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGwgY2xhc3M9XFxcImZvb2RfZGV0YWlsXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcImZvb2RfdGl0bGVcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZHQ+XFxyXFxuICAgICAgICAgICAgPGRkIGNsYXNzPVxcXCJmb29kX2Rlc2NyaXB0aW9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZGVzY3JpcHRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlc2NyaXB0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJkZXNjcmlwdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2RkPlxcclxcbiAgICAgICAgICAgIDxkZCBjbGFzcz1cXFwiZm9vZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9saT5cXHJcXG48L2E+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3gtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpPlxcclxcbiAgICA8YSBocmVmPVxcXCIjXFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY2F0ZWdvcnlfaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhdGVnb3J5X2lkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5uYW1lIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5uYW1lIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYT5cXHJcXG48L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9mb29kVGFiLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxUaW1cXFxcRG9jdW1lbnRzXFxcXGphdmFzY3JpcHQtZm9vZFxcXFxub2RlX21vZHVsZXNcXFxcaGFuZGxlYmFyc1xcXFxydW50aW1lLmpzXCIpO1xuZnVuY3Rpb24gX19kZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIChvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmopOyB9XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzW1wiZGVmYXVsdFwiXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIjx1bCBjbGFzcz1cXFwiYmVzdF9mb29kX2JveF9saXN0XFxcIiBkYXRhLWNhdGVnb3J5X2lkPVxcXCJcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jYXRlZ29yeV9pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2F0ZWdvcnlfaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJjYXRlZ29yeV9pZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiPjwvdWw+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2NvbnRhaW5lci10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuc2Nyb2xsZXIgPiBsaSA+IGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsIGUgPT4gdGhpcy5lbWl0KCdAbW92ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBlLmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJyxcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB3aW5kb3cuc2Nyb2xsWSA+IDkwID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3L1Njcm9sbGVyVmlldy5qcyIsImltcG9ydCBmb29kQm94SW5maW5pdGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9mb29kQm94SW5maW5pdGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQgYmFkZ2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9iYWRnZS10cGwuaHRtbCc7XHJcbmltcG9ydCBkZWxpdmVyeVR5cGVUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZS9kZWxpdmVyeVR5cGUtdHBsLmh0bWwnO1xyXG5pbXBvcnQge1xyXG4gICAgdGhyb3R0bGVcclxufSBmcm9tICcuLi9oZWxwZXJzJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbCkge1xyXG4gICAgICAgIHN1cGVyKGVsKTtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwgPSB0aGlzLnFzKCcuaW5maW5pdGVfZm9vZF9ib3hfbGlzdCcpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpbmRleDogLTIwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25lbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub24oJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB0aGlzLmVtaXQoJ0B0cmFuc2l0aW9uZW5kJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnN0YXRlLmluZGV4XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNsaWRlc05hdmk6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoJy5pbmZpbml0ZV9mb29kX3NsaWRlc19uYXZpID4gYScsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3R0bGUoZSA9PiB0aGlzLmVtaXQoJ0Btb3ZlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5zdGF0ZS5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiArZS5kZWxlZ2F0ZVRhcmdldC5kYXRhc2V0LmRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCAxMDAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiaW5kQ29tbWFuZHNbYmluZENtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodmlld0NtZCwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0NvbW1hbmRzID0ge1xyXG4gICAgICAgICAgICBiYW5jaGFuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmNoYW4oLi4ucGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZpZXdDb21tYW5kc1t2aWV3Q21kXSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGJhbmNoYW4oZm9vZCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyRm9vZEJveExpc3QodGhpcy5mb29kQm94TGlzdEVsLCBmb29kKVxyXG4gICAgICAgICAgICAucmVuZGVyRm9vZEJveE9wdGlvbihmb29kLCB0aGlzLnFzYSgnLnByZF9ib3g+YScpKVxyXG4gICAgICAgICAgICAucmVuZGVyU2xpZGVzKHRoaXMuZm9vZEJveExpc3RFbCwgdGhpcy5xc2EoJy5wcmRfYm94JykpXHJcbiAgICAgICAgICAgIC5zaG93U2xpZGVzKHtcclxuICAgICAgICAgICAgICAgIEltbWVkaWF0ZWx5OiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckZvb2RCb3hMaXN0KGVsZW1lbnQsIGZvb2QpIHtcclxuICAgICAgICBjb25zdCBmb29kQm94TGlzdCA9IGZvb2QubWFwKGl0ZW0gPT5cclxuICAgICAgICAgICAgZm9vZEJveEluZmluaXRlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGl0ZW0uaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBhbHQ6IGl0ZW0uYWx0LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIG9sZF9wcmljZTogaXRlbS5uX3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgbmV3X3ByaWNlOiBpdGVtLnNfcHJpY2Uuc2xpY2UoMCwgLTEpLFxyXG4gICAgICAgICAgICAgICAgd29uOiBpdGVtLnNfcHJpY2Uuc2xpY2UoLTEpXHJcbiAgICAgICAgICAgIH0pKS5qb2luKCcnKTtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGZvb2RCb3hMaXN0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJGb29kQm94T3B0aW9uKGZvb2QsIHByZEJveCkge1xyXG4gICAgICAgIGZvb2QuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBwcmRCb3hbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWRnZVRlbXBsYXRlKHtcclxuICAgICAgICAgICAgICAgIGJhZGdlOiBpdGVtLmJhZGdlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcHJkQm94W2ldLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZGVsaXZlcnlUeXBlVGVtcGxhdGUoe1xyXG4gICAgICAgICAgICAgICAgZGVsaXZlcnlfdHlwZTogaXRlbS5kZWxpdmVyeV90eXBlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTbGlkZXMoZWxlbWVudCwgU2xpZGVzKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlcyA9IEFycmF5LmZyb20oU2xpZGVzKS5zbGljZSgtNCk7XHJcblxyXG4gICAgICAgIFNsaWRlcy5mb3JFYWNoKFNsaWRlID0+XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoU2xpZGUuY2xvbmVOb2RlKHRydWUpKSk7XHJcbiAgICAgICAgbGFzdFNsaWRlcy5yZXZlcnNlKCkuZm9yRWFjaChsYXN0U2xpZGUgPT5cclxuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobGFzdFNsaWRlLmNsb25lTm9kZSh0cnVlKSwgZWxlbWVudC5jaGlsZE5vZGVzWzBdKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NsaWRlcyh7XHJcbiAgICAgICAgSW1tZWRpYXRlbHlcclxuICAgIH0pIHtcclxuICAgICAgICB0aGlzLmZvb2RCb3hMaXN0RWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gSW1tZWRpYXRlbHkgPyAnMHMnIDogJzAuNXMnO1xyXG4gICAgICAgIHRoaXMuZm9vZEJveExpc3RFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3RoaXMuc3RhdGUuaW5kZXh9JSlgO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlldy9JbmZpbml0ZVNsaWRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGxpIGNsYXNzPVxcXCJwcmRfYm94XFxcIj5cXHJcXG4gICAgPGEgaHJlZj1cXFwiI1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYl9pbWdcXFwiPlxcclxcbiAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmltYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pbWFnZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiaW1hZ2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIiBhbHQ9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5hbHQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmFsdCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiYWx0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNpcmNsZV9tYXNrXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRsIGNsYXNzPVxcXCJwcmRfZGV0YWlsXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZHQgY2xhc3M9XFxcInByZF90aXRsZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kdD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcInByZF9kZXNjcmlwdGlvblxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmRlc2NyaXB0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZXNjcmlwdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiZGVzY3JpcHRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9kZD5cXHJcXG4gICAgICAgICAgICA8ZGQgY2xhc3M9XFxcInByZF9wcmljZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJvbGRfcHJpY2VcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5vbGRfcHJpY2UgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm9sZF9wcmljZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwib2xkX3ByaWNlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm5ld19wcmljZVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5ld19wcmljZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmV3X3ByaWNlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJuZXdfcHJpY2VcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid29uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud29uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcIndvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPC9kbD5cXHJcXG4gICAgPC9hPlxcclxcbjwvbGk+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RlbXBsYXRlL2Zvb2RCb3hJbmZpbml0ZS10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF1dG9jb21wbGV0ZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlL2F1dG9jb21wbGV0ZS10cGwuaHRtbCc7XHJcbmltcG9ydCB7XHJcbiAgICBkZWxlZ2F0ZVxyXG59IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsKSB7XHJcbiAgICAgICAgc3VwZXIoZWwpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwgPSB0aGlzLnFzKCcjc2VhcmNoX3N0cicpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbCA9IHRoaXMucXMoJy5hdXRvY29tcGxldGVfc3VnZ2VzdGlvbnMnKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEJ1dHRvbkVsID0gdGhpcy5xcygnLnNlYXJjaF9idG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kKGJpbmRDbWQpIHtcclxuICAgICAgICBjb25zdCBiaW5kQ29tbWFuZHMgPSB7XHJcbiAgICAgICAgICAgIHByZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uKCdrZXl1cCcsIGUgPT4gdGhpcy5lbWl0KCdAcHJlc3MnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVybTogZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBlLmtleUNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxldGVkOiAhIXRoaXMuc2VsXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Ym1pdDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLnNlYXJjaF9idG4nLCAnY2xpY2snLCAoKSA9PiB0aGlzLmVtaXQoJ0BzdWJtaXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZDogdGhpcy5zZWFyY2hFbC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaXN0b3J5OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcjc2VhcmNoX3N0cicsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuc2VhcmNoRWwudmFsdWUgJiYgdGhpcy5lbWl0KCdAaGlzdG9yeScpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2tTdWdnZXN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIGUgPT4gdGhpcy5zZXRTZWwoZS5kZWxlZ2F0ZVRhcmdldCkuc2V0U2VhcmNoYmFyKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub25DbGljazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUoJ2JvZHknLCAnKicsICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZSA9PiBlLnRhcmdldCAhPT0gdGhpcy5zZWFyY2hFbCAmJiB0aGlzLmVtcHR5QXV0b0NvbXBsZXRlKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBob3ZlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSgnLmF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uJywgJ21vdXNlb3ZlcicsIGUgPT4gdGhpcy5zZXRTZWwoZS5kZWxlZ2F0ZVRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRlbGVnYXRlKCcuYXV0b2NvbXBsZXRlX3N1Z2dlc3Rpb24nLCAnbW91c2VvdXQnLCAoKSA9PiB0aGlzLmVtcHR5U2VsKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmluZENvbW1hbmRzW2JpbmRDbWRdKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHZpZXdDbWQsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb21tYW5kcyA9IHtcclxuICAgICAgICAgICAgYXV0b0NvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckF1dG9Db21wbGV0ZSguLi5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaXN0b3J5OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlYXJjaGVzKC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBdXRvQ29tcGxldGUodGVybSwgc3VnZ2VzdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgUmVnRXhwKHRlcm0sICdpJyk7XHJcbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnNDb21wb25lbnQgPSBzdWdnZXN0aW9ucy5tYXAoc3VnZ2VzdGlvbiA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBzdWdnZXN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyS2V5d29yZDogc3VnZ2VzdGlvbi5yZXBsYWNlKHRhcmdldCwgYDxiPiR7dGVybX08L2I+YClcclxuICAgICAgICAgICAgfSkpLmpvaW4oJycpO1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBzdWdnZXN0aW9uc0NvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2VhcmNoZXMoc2VhcmNoZXMpIHtcclxuICAgICAgICBjb25zdCBoaXN0b3J5Q29tcG9uZW50ID0gc2VhcmNoZXMubWFwKHNlYXJjaCA9PlxyXG4gICAgICAgICAgICBhdXRvY29tcGxldGVUZW1wbGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXJjaGVzJyxcclxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHNlYXJjaCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcktleXdvcmQ6IHNlYXJjaFxyXG4gICAgICAgICAgICB9KSkuam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGhpc3RvcnlDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlYXJjaGJhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gdGhpcy5zZWwuZGF0YXNldC52YWx1ZTtcclxuICAgICAgICB0aGlzLmVtcHR5U2VsKCkuZW1wdHlBdXRvQ29tcGxldGUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB1cFNlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNlbCA/IHRoaXMuc2VsLnByZXZpb3VzU2libGluZyA6IHRoaXMuc3VnZ2VzdGlvbnNFbC5sYXN0Q2hpbGQ7XHJcbiAgICAgICAgdGhpcy5lbXB0eVNlbCgpLnNldFNlbCh0YXJnZXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd25TZWwoKXtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNlbCA/IHRoaXMuc2VsLm5leHRTaWJsaW5nIDogdGhpcy5zdWdnZXN0aW9uc0VsLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgdGhpcy5lbXB0eVNlbCgpLnNldFNlbCh0YXJnZXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlbCh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnNlbCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLnNlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5U2VsKCkge1xyXG4gICAgICAgIHRoaXMuc2VsICYmIHRoaXMuc2VsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5zZWwgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtcHR5QXV0b0NvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbXB0eVNlYXJjaGJhcigpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLnZhbHVlID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1Z2dlc3Rpb25zRWwuaW5uZXJIVE1MO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXcvQXV0b0NvbXBsZXRlVmlldy5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXFRpbVxcXFxEb2N1bWVudHNcXFxcamF2YXNjcmlwdC1mb29kXFxcXG5vZGVfbW9kdWxlc1xcXFxoYW5kbGViYXJzXFxcXHJ1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8bGkgY2xhc3M9XFxcImF1dG9jb21wbGV0ZV9zdWdnZXN0aW9uIFwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVyc1tcImNsYXNzXCJdIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMFtcImNsYXNzXCJdIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjbGFzc1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtdmFsdWU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5rZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5rZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJrZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XCJcbiAgICArICgoc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5yZW5kZXJLZXl3b3JkIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZW5kZXJLZXl3b3JkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJyZW5kZXJLZXl3b3JkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI8L2xpPlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90ZW1wbGF0ZS9hdXRvY29tcGxldGUtdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=