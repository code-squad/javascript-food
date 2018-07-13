import { qs } from '../../../helper/helper.js';

export default class Dropdown {
  constructor(selector) {
    this.dropdwonEl = qs(selector);
    this.showState = false;
    this.setDisplay();
  }

  render(template, data) {
    this.dropdwonEl.innerHTML = template(data);
  }
  toggleShowState(){
    this.showState = !this.showState;
    this.setDisplay()
  }
  setDisplay(){
    if(this.showState) this.dropdwonEl.style.display = "block"
    else this.dropdwonEl.style.display = "none"
  }

}
