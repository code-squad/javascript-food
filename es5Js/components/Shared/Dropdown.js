'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
  function Dropdown(selector, triggerSelector) {
    _classCallCheck(this, Dropdown);

    this.dropdwonEl = (0, _helper.qs)(selector);
    this.showState = false;
    this.setDisplay();
    if (triggerSelector) {
      this.bindEvents((0, _helper.qs)(triggerSelector));
    }
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render(template, data) {
      this.dropdwonEl.innerHTML = template(data);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents(el) {
      (0, _helper.$on)(el, 'click', this.toggleShowState.bind(this));
    }
  }, {
    key: 'toggleShowState',
    value: function toggleShowState() {
      this.showState = !this.showState;
      this.setDisplay();
    }
  }, {
    key: 'setDisplay',
    value: function setDisplay() {
      if (this.showState) this.dropdwonEl.style.display = "block";else this.dropdwonEl.style.display = "none";
    }
  }]);

  return Dropdown;
}();

exports.default = Dropdown;