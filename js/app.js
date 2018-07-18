import { $on, qs, renderer } from "./helper/helper.js";

import { userMenuLinkText, mainMenuLinkText, specialMenuLinkText } from "../assets/data/menuLinkText.js";
import { appDownLoad } from "../assets/data/dropdownText.js";

import { userMenuTemplate, specialMenuTemplate, mainMenuTemplate } from "../template/linkListTemplate.js";
import { dropdownTemplate } from "../template/dropdownTemplate.js";

import Dropdown from "../js/components/Shared/Dropdown.js";

// dropdown
const appDownLoadData = {
  dropdownSelector: ".dropdown-download",
  triggerSelector: "#dropdown-download-trigger",
  dropdownTemplate,
  templateData: appDownLoad,
};

const appDownLoadEl = new Dropdown(appDownLoadData);

const renderDataList = [
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
];

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
});
