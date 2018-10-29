/*
  Page의 Model과 View를 연결하는 Controller역할을 담당
  여러 뷰 컴포넌트에 데이터를 주입시켜 initialize한다
*/
export class Engine {
  constructor(header, headerModel, bestMenu, promotion, sideMenu, apiUrl) {
    this.header = header;
    this.bestMenu = bestMenu;
    this.promotion = promotion;
    this.sideMenu = sideMenu;

    this.headerModel = headerModel;
    this.apiUrl = apiUrl;
  }
  start() {
    this.header.initialize(this.headerModel.getNavItemList());
    this.bestMenu.initialize({ url: this.apiUrl.bestMenu });
    this.promotion.initialize();
    this.sideMenu.initialize({ url: this.apiUrl.sideMenu });
  }
}
