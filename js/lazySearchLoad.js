import SearchForm from "./components/Shared/SearchForm/SearchForm.js";
import SearchFormController from "./components/Shared/SearchForm/Controller/SearchFormController.js";
import SearchModel from "./components/Shared/SearchForm/Model/SearchModel.js";
import URL from "./constants/URL.js";
import AjaxHelper from "./helper/AjaxHelper.js";

console.log("loaded");

const searchFormView = new SearchForm({
  searchFormSelector: ".search-form",
  url: URL.SEARCHURL,
});

const searchFormModel = new SearchModel(AjaxHelper);
const searchFormController = new SearchFormController({ view: searchFormView, model: searchFormModel });
