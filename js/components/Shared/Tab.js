import { qs } from "../../helper/helper.js";

const tabCardTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
<li class="tab-card left">
  <a href="#">
    <div>
      <img class="tab-card-img" src="${c.image}" alt="${c.alt}">
      <div class="delivery-type">${c.delivery_type}</div>
      <div class="tab-card__content-box">
        <h3 class="title">${c.title}</h3>
        <p class="description">${c.description}</p>
        <div class="start-rating-box">
          <span>35</span>
        </div>
        <div class="badge-box">
          <span>${c.badge}</span>
        </div>
        <div class="price-box">
          <span>${c.s_price}</span>
        </div>
      </div>
    </div>
  </a>
  </li>`),
    ""
  );

export default class Tab {
  constructor(btnSelector, cardListSelector) {
    this.tabButtonsEl = qs(btnSelector);
    this.tabCardListEl = qs(cardListSelector);
    this.randomNumber = null;
    this.activeId = null;
    this.bindEvents();
  }
  getData(data) {
    // console.log(data.map(data => data.name));
    console.dir(data);
    this.renderTabs(data);
  }
  renderTabs(data) {
    this.randomNumber = Math.floor(Math.random() * data.length);
    this.tabButtonsEl.innerHTML = this.tabButtonTemplate(data);
    this.tabCardListEl.innerHTML = this.tabCardsTemplate(data.map(v => ({ items: v.items, id: v.category_id })));
  }
  handleActiveButtons(deactiveButton, e) {
    deactiveButton.classList.remove("active");
    const activeButton = e.target.closest(".list-item");
    activeButton.classList.add("active");
  }
  bindEvents() {
    this.tabButtonsEl.addEventListener("click", this.handleTabBtnClicked.bind(this));
  }
  handleShowTabCard(hideId, showId) {
    const hideCards = qs(`#cards-${hideId}`, this.tabCardListEl);
    hideCards.classList.add("hide");

    const activedCards = qs(`#cards-${showId}`, this.tabCardListEl);
    activedCards.classList.remove("hide");
  }
  handleTabBtnClicked(e) {
    const activedButton = qs(".active", this.tabButtonsEl);
    const hideId = activedButton.firstElementChild.dataset.id;
    const showId = e.target.dataset.id;
    this.handleActiveButtons(activedButton, e);
    this.handleShowTabCard(hideId, showId);
  }
  tabButtonTemplate(data) {
    const isActiveLi = idx =>
      idx === this.randomNumber ? '<li class="list-item left active">' : '<li class="list-item left">';
    return data.reduce(
      (ac, c, ci) =>
        (ac += `${isActiveLi(ci)}
      <a className="tab-button"  data-id=${c.category_id}>${c.name}</a>
    </li>`),
      ""
    );
  }
  tabCardsTemplate(data) {
    const isActiveClass = idx => (idx === this.randomNumber ? "tab-card-list" : "tab-card-list hide");
    const tabContes = data.reduce(
      (ac, c, ci) => (ac += `<ul id="cards-${c.id}" class="${isActiveClass(ci)}">${tabCardTemplate(c.items)}</ul>`),
      ""
    );
    return tabContes;
  }
}
