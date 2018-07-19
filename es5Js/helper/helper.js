"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var qs = exports.qs = function qs(selector) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return scope.querySelector(selector);
};

var $on = exports.$on = function $on(target, type, callback) {
  var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return target.addEventListener(type, callback, !!capture);
};

var renderer = exports.renderer = function renderer(_ref) {
  var selector = _ref.selector,
      template = _ref.template,
      data = _ref.data;
  return qs(selector).innerHTML = template(data);
};