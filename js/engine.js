/*
  Page의 Model과 View를 연결하는 Controller역할을 담당
  여러 뷰 컴포넌트에 데이터를 주입시켜 initialize한다
*/
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
