export class Engine {
  constructor(header, headerModel, bestMenu, mainModel, apiUrl) {
    this.header = header;
    this.bestMenu = bestMenu;

    this.headerModel = headerModel;
    this.mainModel = mainModel;

    this.apiUrl = apiUrl;
  }
  start() {
    this._render();
    this._initializeConnection();
    this.bestMenu.initialize();
  }

  _initializeConnection() {
    this.bestMenu.clickTab = this.clickTab.bind(this);
  }

  _render() {
    this.header.renderNav(this.headerModel.getNavItemList());
    this.bestMenu.render({
      url: this.apiUrl,
      ajax: ajax
    });
  }
  clickTab(selectedDOM) {
    const id = selectedDOM.dataset.id;
    ajax(this.apiUrl, this.bestMenu.renderBestMenu, id);
  }
}
function ajax(url, handler, idx) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const requestData = JSON.parse(xhr.response);
    handler(requestData, idx);
  });
  xhr.open("GET", url);
  xhr.send();
}
