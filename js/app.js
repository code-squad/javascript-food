import { $on, qs, renderer, qsAll } from "./helper/helper.js";

import { userMenuLinkText, mainMenuLinkText, specialMenuLinkText } from "../assets/data/menuLinkText.js";
import { appDownLoad } from "../assets/data/dropdownText.js";
import { tabBtnText } from "../assets/data/tabBtnText.js";
import Dropdown from "./components/Shared/Dropdown.js";
import DropdownBox from "./components/Shared/DropdownBox.js";
import Tab from "./components/Shared/Tab.js";

import {
  userMenuTemplate,
  specialMenuTemplate,
  mainMenuTemplate,
  dropdownTemplate,
  tabBtnTemplate,
} from "../template/linkListTemplate.js";

const renderDataList = [
  {
    selector: ".drop-down-donwload-box",
    template: dropdownTemplate,
    data: appDownLoad,
  },
  {
    selector: ".header__user-menu-list",
    template: userMenuTemplate,
    data: userMenuLinkText,
  },
  {
    selector: ".header__main-menu-list",
    template: mainMenuTemplate,
    data: mainMenuLinkText,
  },
  {
    selector: ".header__body-special-menu",
    template: specialMenuTemplate,
    data: specialMenuLinkText,
  },
  {
    selector: ".tab-button-list",
    template: tabBtnTemplate,
    data: tabBtnText,
  },
];

const HideHelper = qsAll('[id*="dropdown"]');

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  // Class??

  const appDownDropdown = new Dropdown("#dropdown-download", "#dropdown-download-trigger");
  const myPageDropdown = new Dropdown("#dropdown-my-page", "#dropdown-my-page-trigger");
  const clientCenterDropdown = new Dropdown("#dropdown-client-center", "#dropdown-client-center-trigger");
  const dropdownController = new DropdownBox("ul[id*=dropdown]", "a[id*=-trigger]");
  const bestTab = new Tab(".tab-button-list");
});

// appDownLoadEl.render(dropdownTemplate, appDownLoad);
