
export const badgeTemplate = badge =>
badge
  ? `<div class="badge-box">
<span>${badge}</span>
</div>`
  : ``;

export const deliveryTemplate = data =>
data.reduce(
  (ac, c) =>
    (ac += `
<li><span>${c}</span></li>
`),
  ``
);

export const tabCardTemplate = data =>
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
      ${badgeTemplate(c.badge)}
    </div>
    <div class="tab-card__content-box">
      <h3 class="title">${c.title}</h3>
      <p class="description">${c.description}</p>
      <div class="start-rating-box">
        <span></span>
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