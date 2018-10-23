export class Engine {
  constructor(header, headerModel, bestMenu, mainModel, promotion, apiUrl) {
    this.header = header;
    this.bestMenu = bestMenu;
    this.promotion = promotion;

    this.headerModel = headerModel;
    this.mainModel = mainModel;

    this.apiUrl = apiUrl;
  }
  start() {
    this.header.initialize(this.headerModel.getNavItemList());
    this.bestMenu.initialize({ url: this.apiUrl });
    this.promotion.initialize();
  }
}
