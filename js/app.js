import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown.js";
import DropdownBox from "./components/Shared/DropdownBox.js";
import Tab from "./components/Shared/Tab.js";
import AjaxHelper from "./helper/AjaxHelper.js";
import { renderDataList } from "./render/renderDataList.js";

const ajaxComponents = {
  tab: new Tab(".tab-button-list", ".tab-card-section"),
};

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));

  const ajaxHelper = new AjaxHelper(ajaxComponents);

  const appDownDropdown = new Dropdown("#dropdown-download", "#dropdown-download-trigger");
  const myPageDropdown = new Dropdown("#dropdown-my-page", "#dropdown-my-page-trigger");
  const clientCenterDropdown = new Dropdown("#dropdown-client-center", "#dropdown-client-center-trigger");
  const dropdownController = new DropdownBox("ul[id*=dropdown]", "a[id*=-trigger]");
});
