import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown/Dropdown.js";
import DropdownController from './components/Shared/Dropdown/DropdownController.js';
import Tab from "./components/Shared/Tab/Tab.js";
import PagiNation from './components/Shared/PagiNation/PagiNation.js';
import Slider from './components/Shared/Slider/Slider.js';
import ListSlider from './components/Shared/Slider/ListSlider.js';
import ScrollButton from './components/Shared/ScrollButton/ScrollButton.js';
import SearchForm from './components/Shared/SearchForm/SearchForm.js';
import SearchFormModel from './components/Shared/SearchForm/Model/SearchFormModel.js';
import SearchFormController from './components/Shared/SearchForm/Controller/SearchFormController.js';
import AjaxHelper from "./helper/AjaxHelper.js";


import { renderDataList } from "./render/renderDataList.js";



const mainDomain = `http://crong.codesquad.kr:8080`
const woowaDomain = `${mainDomain}/woowa`
const tabUrl = `${woowaDomain}/best`;
const main_slideListUrl = `${woowaDomain}/main`;
const course_slideListUrl = `${woowaDomain}/course`;
const soup_slideListUrl = `${woowaDomain}/soup`;
const side_slideListUrl = `${woowaDomain}/side`;
const searchUrl = `${mainDomain}/ac`




$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  const slide = new Slider({
    slideSelector: '.main__banner-slider', 
    pagiNation: new PagiNation('.main__banner-slider-pagination')
  });
  
  const tabAjaxHelper = new AjaxHelper();
  const tab = new Tab({
    btnSelector: ".tab-button-list", 
    cardListSelector: ".tab-card-section", 
    dataHelper: tabAjaxHelper, 
    tabUrl,
  })

  // _ls listSlider
  const recommend_lsAjaxHelper = new AjaxHelper();
  const side_lsAjaxHelper = new AjaxHelper();
  const soup_lsAjaxHelper = new AjaxHelper();
  const course_lsAjaxHelper = new AjaxHelper();
  
  const searchForm_AjaxHelper = new AjaxHelper();

  const recommend_listSlider = new ListSlider({
    slideSelector: '#list-slide-recommend',
    dataHelper: recommend_lsAjaxHelper, 
    url: main_slideListUrl,
  });
  const side_listSlider = new ListSlider({
    slideSelector: '#list-slide-sidedish',
    dataHelper: side_lsAjaxHelper, 
    url: side_slideListUrl,
  });
  const soup_listSlider = new ListSlider({
    slideSelector: '#list-slide-soup',
    dataHelper: soup_lsAjaxHelper, 
    url: soup_slideListUrl,
  });
  const course_listSlider = new ListSlider({
    slideSelector: '#list-slide-course',
    dataHelper: course_lsAjaxHelper, 
    url: course_slideListUrl,
  });

  const dropdownController = new DropdownController();

  const appDownDropdown = new Dropdown({
    dropdownSelector:'#dropdown-download',
    triggerSelector: '#dropdown-download-trigger',
    dropdownController,
  });

  const myPageDropdown = new Dropdown({
    dropdownSelector:'#dropdown-my-page',
    triggerSelector: '#dropdown-my-page-trigger',
    dropdownController,
  });
  const clientCenterDropdown = new Dropdown({
    dropdownSelector:'#dropdown-client-center',
    triggerSelector: '#dropdown-client-center-trigger',
    dropdownController,
  });

  const scrollButton = new ScrollButton('.scroll-button-list')

  const searchFormView = new SearchForm({
    searchFormSelector: '.search-form', 
    dataHelper: searchForm_AjaxHelper,
    url: searchUrl
  });
  const searchFormModel = new SearchFormModel();
  const searchFormController  = new SearchFormController({view: searchFormView, model: searchFormModel})

});
