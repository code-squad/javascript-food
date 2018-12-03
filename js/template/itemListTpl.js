
function originalPrice(price) {
    if (!price) return '';
    return `<p class="original-price">${price}</p>`
}

function salePrice(price) {
    return `<p class="sale-price">${price}</p>`;
}

function itemTitle(title) {
    return `<dt class='item-title'>${title}</dt>`
}

function itemDescription(description) {
    return `<dd class='item-description'>${description}</dd>`
}

function itemPrice(n_price, s_price) {
    return `<dd class="item-price">${salePrice(s_price.slice(0, -1))}<p class='unit'>원</p>${originalPrice(n_price)}</dd>`;
}

function delivery(delivery_type) {
    return delivery_type.reduce((prev, curr) => prev + `<p>${curr}</p>`, '');
}

function foodImg(image, alt, delivery_type) {
    return `<div class="food-img">
                <img src="${image}" alt="${alt}">
                <div class="dark-background"></div>
                <div class="delivery">
                    ${delivery(delivery_type)}
                </div>
            </div>`
}

function badgeTpl(badge) {
    return badge.reduce((prev, curr) => prev + `<div class="event"><span>${curr}</span></div>`, '');
}

function itemsTpl({ image, alt, delivery_type, title, description, n_price, s_price, badge }) {
    badge = badge || "";
    return `
    ${foodImg(image, alt, delivery_type)}
    <dl>
        ${itemTitle(title)}
        ${itemDescription(description)}
        <dd class="item-review"></dd>
        ${itemPrice(n_price, s_price)}
    </dl>
    <div class="badge-area">${badge && badgeTpl(badge)}</div>
    `;
}

function tabTpl({ category_id, name }) {
    return `<li category_no=${category_id}>${name}</li>`
}

export function tabListTpl(items) {
    return items.reduce((prev, curr) => prev + tabTpl(curr), "")
}

export function itemListTpl(itemsData) {
    itemsData = Object.prototype.toString.call(itemsData) === "[object Object]" ? itemsData.items : itemsData;
    return itemsData.reduce((prev, curr) => prev + `<li class="items"><a href="#">${itemsTpl(curr)}</a></li>`, '');
}