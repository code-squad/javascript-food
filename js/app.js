import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown/Dropdown.js";
import DropdownController from './components/Shared/Dropdown/DropdownController.js';
import Tab from "./components/Shared/Tab/Tab.js";
import Slider from './components/Shared/Slider/Slider.js';
import AjaxHelper from "./helper/AjaxHelper.js";
import { renderDataList } from "./render/renderDataList.js";

const tabURL = `http://crong.codesquad.kr:8080/woowa/best`;

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  
  const tabEl = new Tab(".tab-button-list", ".tab-card-section")
  const SlideEl = new Slider('.main__banner-slider')

  const tabAjaxHelper = new AjaxHelper(tabEl);
  tabAjaxHelper.sendReq('GET', tabURL);
  
  const dropdownController = new DropdownController();

  const appDownDropdown = new Dropdown("#dropdown-download", "#dropdown-download-trigger", dropdownController);
  const myPageDropdown = new Dropdown("#dropdown-my-page", "#dropdown-my-page-trigger", dropdownController);
  const clientCenterDropdown = new Dropdown("#dropdown-client-center", "#dropdown-client-center-trigger", dropdownController);
});
