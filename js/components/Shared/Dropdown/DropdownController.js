export default class DropdownController {
  constructor() {
    this.activeDropdown = null;
  }
  subscribe(dropdwonEl) {    
    if (!this.activeDropdown || this.activeDropdown === dropdwonEl) return this.activeDropdown = dropdwonEl;
    this.activeDropdown.classList.remove('show');
    this.activeDropdown = dropdwonEl;
  }
}
