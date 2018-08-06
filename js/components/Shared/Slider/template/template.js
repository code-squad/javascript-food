export const mainSlideTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
    <li>
      <a href="#">
        <img src="${c.imgSrc}" alt="${c.alt}">
      </a>
    </li>`),
    '',
  );

export const slidEButtonTemplate = `
<ul class="slide-button-list">
<li>
  <a class="left-button"></a>
</li>
<li>
  <a class="right-button"></a>
</li>
</ul>
`;



export const badgeTemplate = badge =>
badge
  ? `<span>${badge}</span>`
  : ``;

export const deliveryTemplate = data =>
data.reduce(
  (ac, c) =>
    (ac += `
<li><span>${c}</span></li>
`),
  ``
);

export const cardTemplate = data =>
data.reduce(
  (ac, c) =>
    (ac += `
<li class="list-card left">
<a href="#">
  <div>
    <div class="list-card-thumbnail">
      <img src="${c.image}" alt="${c.alt}" class="mock">
      <div class="delivery-type-box">
        <ul class="delivery-type-list">
          ${deliveryTemplate(c.delivery_type)}
        </ul>
      </div>
    </div>
    <div class="list-card__content-box">
      <h3 class="list-card-title">${c.title}</h3>
      <p class="description">${c.description}</p>
      <div class="start-rating-box">
        <span></span>
      </div>
      <div class="price-box">
        <span class="selling-price">${c.s_price}</span>
      </div>
    </div>
    <div class="badge-box">
      ${badgeTemplate(c.badge)}
    </div>
  </div>
</a>
</li>`),
  ""
);

export const listSliderTemplate =  data =>
data.reduce(
  (ac, c) =>
    (ac += `
  <li>
    <a href="#">
      <img src="${c.image}" alt="${c.alt}">
    </a>
  </li>`),
  '',
);