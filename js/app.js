import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown/Dropdown.js";
import DropdownController from "./components/Shared/Dropdown/DropdownController.js";
import Tab from "./components/Shared/Tab/Tab.js";
import PagiNation from "./components/Shared/PagiNation/PagiNation.js";
import Slider from "./components/Shared/Slider/Slider.js";
import ListSlider from "./components/Shared/Slider/ListSlider.js";
import ScrollButton from "./components/Shared/ScrollButton/ScrollButton.js";
import SearchForm from "./components/Shared/SearchForm/SearchForm.js";
import SearchFormModel from "./components/Shared/SearchForm/Model/SearchFormModel.js";
import SearchFormController from "./components/Shared/SearchForm/Controller/SearchFormController.js";
import AjaxHelper from "./helper/AjaxHelper.js";
import URL from "./constants/URL.js";

import { renderDataList } from "./render/renderDataList.js";

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  const slide = new Slider({
    slideSelector: ".main__banner-slider",
    pagiNation: new PagiNation(".main__banner-slider-pagination"),
  });

  // const tabAjaxHelper = new AjaxHelper();
  const tab = new Tab({
    btnSelector: ".tab-button-list",
    cardListSelector: ".tab-card-section",
    dataHelper: AjaxHelper,
    tabUrl: URL.TABURL,
    cacheHelper: SearchFormModel.prototype,
  });

  const recommend_listSlider = new ListSlider({
    slideSelector: "#list-slide-recommend",
    dataHelper: AjaxHelper,
    url: URL.MAIN_SLIDELISTURL,
  });
  const side_listSlider = new ListSlider({
    slideSelector: "#list-slide-sidedish",
    dataHelper: AjaxHelper,
    url: URL.SIDE_SLIDELISTURL,
  });
  const soup_listSlider = new ListSlider({
    slideSelector: "#list-slide-soup",
    dataHelper: AjaxHelper,
    url: URL.SOUP_SLIDELISTURL,
  });
  const course_listSlider = new ListSlider({
    slideSelector: "#list-slide-course",
    dataHelper: AjaxHelper,
    url: URL.COURSE_SLIDELISTURL,
  });

  const dropdownController = new DropdownController();

  const appDownDropdown = new Dropdown({
    dropdownSelector: "#dropdown-download",
    triggerSelector: "#dropdown-download-trigger",
    dropdownController,
  });

  const myPageDropdown = new Dropdown({
    dropdownSelector: "#dropdown-my-page",
    triggerSelector: "#dropdown-my-page-trigger",
    dropdownController,
  });
  const clientCenterDropdown = new Dropdown({
    dropdownSelector: "#dropdown-client-center",
    triggerSelector: "#dropdown-client-center-trigger",
    dropdownController,
  });

  const scrollButton = new ScrollButton(".scroll-button-list");

  const searchFormView = new SearchForm({
    searchFormSelector: ".search-form",
    dataHelper: AjaxHelper,
    url: URL.SEARCHURL,
  });
  const searchFormModel = new SearchFormModel();
  const searchFormController = new SearchFormController({ view: searchFormView, model: searchFormModel });
});
