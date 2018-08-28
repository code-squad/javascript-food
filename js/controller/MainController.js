export default class MainController {
  constructor({ views, model }) {
    this.views = views;
    this.model = model;
    Object.keys(views).forEach(key => {
      views[key].bindGetData(this.getData.bind(this));
      views[key].notifyGetData = this.notifyGetData.bind(this);
    });
  }
  getData(keyword, getDataObj) {
    return this.model.handleDataProcess(keyword, getDataObj);
  }
  notifyGetData(keyword, data) {
    this.model.saveCacheKeyWords(keyword, data);
  }
}
