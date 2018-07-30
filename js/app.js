import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown.js";
import DropdownBox from "./components/Shared/DropdownBox.js";
import DropdownController from './components/Shared/DropdownController.js';
import Tab from "./components/Shared/Tab.js";
import AjaxHelper from "./helper/AjaxHelper.js";
import { renderDataList } from "./render/renderDataList.js";

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  // const tabEl = new Tab(".tab-button-list", ".tab-card-section")
  // const ajaxHelper = new AjaxHelper();

  const dropdownController = new DropdownController();

  const appDownDropdown = new Dropdown("#dropdown-download", "#dropdown-download-trigger", dropdownController);
  const myPageDropdown = new Dropdown("#dropdown-my-page", "#dropdown-my-page-trigger", dropdownController);
  const clientCenterDropdown = new Dropdown("#dropdown-client-center", "#dropdown-client-center-trigger", dropdownController);
});
