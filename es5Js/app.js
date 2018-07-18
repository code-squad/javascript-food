'use strict';

var _helper = require('./helper/helper.js');

var _menuLinkText = require('../assets/data/menuLinkText.js');

var _dropdownText = require('../assets/data/dropdownText.js');

var _linkListTemplate = require('../template/linkListTemplate.js');

var _dropdownTemplate = require('../template/dropdownTemplate.js');

var _Dropdown = require('../js/components/Shared/Dropdown.js');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dropdown
var appDownLoadEl = new _Dropdown2.default('.dropdown-download', '#dropdown-download-trigger');

var renderDataList = [{
  selector: '.header__user-menu-list',
  template: _linkListTemplate.userMenuTemplate,
  data: _menuLinkText.userMenuLinkText
}, {
  selector: '.header__main-menu-list',
  template: _linkListTemplate.mainMenuTemplate,
  data: _menuLinkText.mainMenuLinkText
}, {
  selector: '.header__body-special-menu',
  template: _linkListTemplate.specialMenuTemplate,
  data: _menuLinkText.specialMenuLinkText
}];

(0, _helper.$on)(document, 'DOMContentLoaded', function () {
  renderDataList.forEach(function (v) {
    return (0, _helper.renderer)(v);
  });
  appDownLoadEl.render(_dropdownTemplate.dropdownTemplate, _dropdownText.appDownLoad);
});