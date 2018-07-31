import { qs } from "../../../helper/helper.js";

export default class Slider {
 constructor(slideSelector){
  this.slideEl = qs(slideSelector);
 }
 render(){
  this.slideEl.innerHTML = ``;
 }
}
