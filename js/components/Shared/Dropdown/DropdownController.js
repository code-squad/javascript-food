export default class DropdownController {
  constructor(){
    this.activeDropdown = null;
  }
  subscribe(dropdwonEl){    
    if(!this.activeDropdown || this.activeDropdown === dropdwonEl) return this.activeDropdown = dropdwonEl;
    else this.activeDropdown.style.display = 'none';
    this.activeDropdown = dropdwonEl
  }
}
