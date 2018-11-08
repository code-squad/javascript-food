/*
  Page의 Model과 View를 연결하는 Controller역할을 담당
  여러 뷰 컴포넌트에 데이터를 주입시켜 initialize한다
*/

export class Engine {
  constructor(header, navModel, bestMenu, promotion, sideMenuSlide, mainMenuSlide, courseMenuSlide, apiUrl) {
    this.header = header;
    this.bestMenu = bestMenu;
    this.promotion = promotion;
    this.sideMenuSlide = sideMenuSlide;
    this.mainMenuSlide = mainMenuSlide;
    this.courseMenuSlide = courseMenuSlide;

    this.navModel = navModel;
    this.apiUrl = apiUrl;

    this.sliderCount = 0;
  }
  start() {
    this.header.initialize(this.navModel.getNavItemList());
    this.bestMenu.initialize();
    this.promotion.initialize();
    this.sideMenuSlide.initialize();
    this.mainMenuSlide.initialize();
    this.courseMenuSlide.initialize();
  }
  inputSlideCount() {
    return this.sliderCount++;
  }
}
