export class MainModel {
  constructor(menuList) {
    this.menuList = menuList;
  }
  getMenuList() {
    return this.menuList;
  }
  getBestMenuFromAPI() {
    // const xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", ({ target }) => {});
    // xhr.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
    // xhr.send();
    // return xhr;
  }
}
