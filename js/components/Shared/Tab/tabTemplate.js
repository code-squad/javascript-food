
export const handleBadgeTemplate = badge =>
badge
  ? `${badgeTemplate(badge)}`
  : ``;

export const badgeTemplate = data => 
data.reduce(
  (ac, c) =>
    (ac += `<span>${c}</span>
`),
  ``
);

export const deliveryTemplate = data =>
data.reduce(
  (ac, c) =>
    (ac += `
<li><span>${c}</span></li>
`),
  ``
);
export const handleUndefined = data => data ? data : ""

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
      <div class="badge-box">
        ${handleBadgeTemplate(c.badge)}
      </div>
    </div>
    <div class="tab-card__content-box">
      <h3 class="title">${c.title}</h3>
      <p class="description">${c.description}</p>
      <div class="start-rating-box">
        <span></span>
      </div>
      <div class="price-box">
        <span class="special-price">${c.s_price}</span>
        <span class="normal-price">${handleUndefined(c.n_price)}</span>
      </div>
    </div>
  </div>
</a>
</li>`),
  ""
);


// alt"[소중한식사] 경상도 한상차림"
// badge ["이벤트특가"]
// delivery_type
// :
// (2) ["새벽배송", "전국택배"]
// description
// :
// "경상도 명물 요리 세 가지를 한 상에!"
// detail_hash
// :
// "H9881"
// image
// :
// "https://cdn.bmf.kr/_data/product/H9881/f2a7b4df359c850b1a9eb57e17ddf6fc.jpg"
// n_price
// :
// "39,000"
// s_price
// :
// "31,200원"
// title
// :
// "[소중한식사] 경상도 한상차림"