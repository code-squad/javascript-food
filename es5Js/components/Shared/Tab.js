'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tab = function () {
  function Tab(selector) {
    _classCallCheck(this, Tab);

    this.TabButtonsEl = (0, _helper.qs)(selector);
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render(template, data) {
      this.TabButtonsEl.innerHTML = template(data);
    }
  }]);

  return Tab;
}();

exports.default = Tab;