import { qs } from "../../helper/helper.js";

const badgeTemplate = badge =>
  badge
    ? `<div class="badge-box">
<span>${badge}</span>
</div>`
    : ``;

const deliveryTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
  <li><span>${c}</span></li>
`),
    ``
  );

const tabCardTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
<li class="tab-card left">
  <a href="#">
    <div>
      <div class="tab-card-thumbnail">
        <img class="tab-card-img" src="${c.image}" alt="${c.alt}">
        <div class="delivery-type-box">
          <ul class="delivery-type-list">
            ${deliveryTemplate(c.delivery_type)}
          </ul>
        </div>
      </div>
      <div class="tab-card__content-box">
        <h3 class="title">${c.title}</h3>
        <p class="description">${c.description}</p>
        <div class="start-rating-box">
          <span></span>
        </div>
        ${badgeTemplate(c.badge)}
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
    this.activedButton = null;
    this.bindEvents();
  }
  getData(data) {
    this.renderTabs(data);
  }
  renderTabs(data) {
    this.randomNumber = Math.floor(Math.random() * data.length);
    this.tabButtonsEl.innerHTML = this.tabButtonTemplate(data);
    this.tabCardListEl.innerHTML = this.tabCardsTemplate(
      data.map(v => ({
        items: v.items,
        id: v.category_id,
      }))
    );
    this.activedButton = qs(".active", this.tabButtonsEl);
  }
  tabButtonTemplate(data) {
    const isActiveButton = idx => (idx === this.randomNumber ? "tab-button active" : "tab-button");
    return data.reduce(
      (ac, c, ci) =>
        (ac += `<li>
      <a class="${isActiveButton(ci)}"  data-id=${c.category_id}>${c.name}</a>
    </li>`),
      ""
    );
  }
  tabCardsTemplate(data) {
    console.dir(data);
    const isActiveClass = idx => (idx === this.randomNumber ? "tab-card-list" : "tab-card-list hide");
    const tabContes = data.reduce(
      (ac, c, ci) => (ac += `<ul id="cards-${c.id}" class="${isActiveClass(ci)}">${tabCardTemplate(c.items)}</ul>`),
      ""
    );
    return tabContes;
  }
  bindEvents() {
    this.tabButtonsEl.addEventListener("click", this.handleTabBtnClicked.bind(this));
  }
  handleActiveButtons(e) {
    this.activedButton.classList.remove("active");
    this.activedButton = e.target;
    this.activedButton.classList.add("active");
  }
  handleShowTabCard(hideId, showId) {
    const hideCards = qs(`#cards-${hideId}`, this.tabCardListEl);
    hideCards.classList.add("hide");

    const activedCards = qs(`#cards-${showId}`, this.tabCardListEl);
    activedCards.classList.remove("hide");
  }
  handleTabBtnClicked(e) {
    if (e.target.className !== "tab-button") return;

    const hideId = this.activedButton.dataset.id;
    const showId = e.target.dataset.id;

    this.handleActiveButtons(e);
    this.handleShowTabCard(hideId, showId);
  }
}
