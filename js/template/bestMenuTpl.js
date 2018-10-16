
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

function itemImage(image, alt) {
    return `<img src='${image}' alt='${alt}'>`
}

function bestItem({ image, alt, title, description, n_price, s_price }) {
    return `${itemImage(image, alt)}<dl>${itemTitle(title)}${itemDescription(description)}
        <dd class="item_review"></dd>${itemPrice(n_price, s_price)}</dl>`;
}
export function bestMenuTpl({ items }) {
    return items.reduce((prev, curr) => prev + `<li class="best_items"><a href="#">${bestItem(curr)}</a></li>`, '')
}