
function originalPrice(price) {
    if (!price) return '';
    return `<p class="original_price">${price}</p>`
}

function salePrice(price) {
    return `<p class="sale_price">${price}</p>`;
}

function itemTitle(title) {
    return `<dt class='item_title'>${title}</dt>`
}

function itemDescription(description) {
    return `<dd class='item_description'>${description}</dd>`
}

function itemPrice(n_price, s_price) {
    return `<dd class="item_price">${salePrice(s_price.slice(0, -1))}<p class='unit'>원</p>${originalPrice(n_price)}</dd>`;
}

function delivery(delivery_type){
    return delivery_type.reduce( (prev,curr) => prev + `<p>${curr}</p>`,'');
}

function foodImg(image, alt, delivery_type){
    return `<div class="food_img">
                <img src="${image}" alt="${alt}">
                <div class="dark_background"></div>
                <div class="delivery">
                    ${delivery(delivery_type)}
                </div>
            </div>`
}

function badgeTpl(badge){
    return badge.reduce((prev,curr) =>prev + `<div class="event"><span>${curr}</span></div>`,'');
}

function itemsTpl({ image, alt, delivery_type, title, description, n_price, s_price, badge }) {
    badge = badge || "";
    return `
    ${foodImg(image, alt, delivery_type)}
    <dl>
        ${itemTitle(title)}
        ${itemDescription(description)}
        <dd class="item_review"></dd>
        ${itemPrice(n_price, s_price)}
    </dl>
    <div class="badge_area">${badge && badgeTpl(badge)}</div>
    `;
}

export function itemListTpl({ items }) {
    return items.reduce((prev, curr) => prev + `<li class="items"><a href="#">${itemsTpl(curr)}</a></li>`, '');
}