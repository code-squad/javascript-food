import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";
import {Template} from './template.js';

let template = new Template();

let model = new Model({
  menuLayerData: {
    '밑반찬': ['무침','나물무침','볶음','조림','김치','전','장아찌·피클','젓갈·장·소스','세트'],
    '국,찌개': ['국','찌개','탕','전골','세트'],
    '메인반찬': ['고기반찬','해산물반찬','생선반찬','덮밥','튀김','면','양식','아시아식','분식','죽','세트'],
    '아이반찬': ['이유식 초기/중기','이유식 후기/완료기','아이반찬','어린이반찬','간식·음료'],
    '정기식단': ['1~2인','3~4인','아이반찬'],
    '간편식': ['간편반찬','간편국찌개','간편식품'],
    '간식': ['베이커리','과일','주스','스무디','유제품·커피','기타간식'],
    '브랜드관': ['베이커리','과일','주스','스무디','유제품·커피','기타간식']
  }
});

let menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: template
})

let controller = new Controller({
  model: model,
  view: menuNavigation
})