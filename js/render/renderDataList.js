import { userMenuLinkText,  mainMenuLinkText, specialMenuLinkText, appDownLoad } from "../../assets/data/menuLinkText.js";
import { userMenuTemplate, specialMenuTemplate, mainMenuTemplate, dropdownTemplate } from "../../template/template.js";

export const renderDataList = [
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
];
