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
      url: this.apiUrl
    });
  }
  clickTab(selectedDOM) {
    const id = selectedDOM.dataset.id;
    this.bestMenu.renderBestMenu(this.apiUrl, id);
  }
}
