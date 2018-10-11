export default class Template {
    originalPrice(price) {
        if (!price) return '';
        return `<p class="original_price">${price}</p>`
    }

    salePrice(price) {
        return `<p class="sale_price">${price}</p>`;
    }

    itemTitle(title) {
        return `<dt class='item_title'>${title}</dt>`
    }

    itemDescription(description) {
        return `<dd class='item_description'>${description}</dd>`
    }

    itemPrice(n_price, s_price) {
        return `<dd class="item_price">${this.salePrice(s_price.slice(0,-1))}<p class='unit'>원</p>${this.originalPrice(n_price)}</dd>`;
    }

    itemImage(image, alt) {
        return `<img src='${image}' alt='${alt}'>`
    }

    bestItem({image,alt,title,description,n_price,s_price}) {
        return `${this.itemImage(image,alt)}<dl>${this.itemTitle(title)}${this.itemDescription(description)}
        <dd class="item_review"></dd>${this.itemPrice(n_price,s_price)}</dl>`;
    }
    bestItemList({items}) {
        return items.reduce((prev,curr)=>prev+`<li class="best_items"><a href="#">${this.bestItem(curr)}</a></li>`,'')
    }
}
