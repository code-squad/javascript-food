import { $on, qs, renderer, qsAll } from "./helper/helper.js";
import Dropdown from "./components/Shared/Dropdown/Dropdown.js";
import DropdownController from './components/Shared/Dropdown/DropdownController.js';
import Tab from "./components/Shared/Tab/Tab.js";
import PagiNation from './components/Shared/PagiNation/PagiNation.js';
import Slider from './components/Shared/Slider/Slider.js';
import ListSlider from './components/Shared/Slider/ListSlider.js';
import ScrollButton from './components/Shared/ScrollButton/ScrollButton.js';
import SearchForm from './components/Shared/SearchForm/SearchForm.js';
import AjaxHelper from "./helper/AjaxHelper.js";
import { renderDataList } from "./render/renderDataList.js";



const mainDomain = `http://crong.codesquad.kr:8080`
const woowaDomain = `${mainDomain}/woowa`
const tabURL = `${woowaDomain}/best`;
const main_slideListUrl = `${woowaDomain}/main`;
const course_slideListUrl = `${woowaDomain}/course`;
const soup_slideListUrl = `${woowaDomain}/soup`;
const side_slideListUrl = `${woowaDomain}/side`;
const searchUrl = `${mainDomain}/ac`

$on(document, "DOMContentLoaded", () => {
  renderDataList.forEach(v => renderer(v));
  const slide = new Slider('.main__banner-slider', new PagiNation('.main__banner-slider-pagination'));
  
  const tabAjaxHelper = new AjaxHelper();
  const tab = new Tab(".tab-button-list", ".tab-card-section", tabAjaxHelper, tabURL)

  // _ls listSlider
  const recommend_lsAjaxHelper = new AjaxHelper();
  const side_lsAjaxHelper = new AjaxHelper();
  const soup_lsAjaxHelper = new AjaxHelper();
  const course_lsAjaxHelper = new AjaxHelper();
  
  const searchForm_AjaxHelper = new AjaxHelper();


  const recommend_listSlider = new ListSlider('#list-slide-recommend', recommend_lsAjaxHelper,  main_slideListUrl);
  const side_listSlider = new ListSlider('#list-slide-sidedish', side_lsAjaxHelper, side_slideListUrl);
  const soup_listSlider = new ListSlider('#list-slide-soup', soup_lsAjaxHelper, soup_slideListUrl);
  const course_listSlider = new ListSlider('#list-slide-course', course_lsAjaxHelper, course_slideListUrl);

  const dropdownController = new DropdownController();

  const appDownDropdown = new Dropdown("#dropdown-download", "#dropdown-download-trigger", dropdownController);
  const myPageDropdown = new Dropdown("#dropdown-my-page", "#dropdown-my-page-trigger", dropdownController);
  const clientCenterDropdown = new Dropdown("#dropdown-client-center", "#dropdown-client-center-trigger", dropdownController);

  const scrollButton = new ScrollButton('.scroll-button-list')

  const searchForm = new SearchForm('.search-form', searchForm_AjaxHelper,searchUrl);
});
