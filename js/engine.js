export class Engine {
  constructor(header, headerModel, bestMenu, mainModel, apiUrl) {
    this.header = header;
    this.bestMenu = bestMenu;

    this.headerModel = headerModel;
    this.mainModel = mainModel;

    this.apiUrl = apiUrl;
  }
  start() {
    this.header.initialize(this.headerModel.getNavItemList());
    this.bestMenu.initialize({ url: this.apiUrl });
  }
}
