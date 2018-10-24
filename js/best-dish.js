function request (url, data, callback) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', () => {
      this.ajaxData = JSON.parse(oReq.responseText);
      this.processingData(this.ajaxData);
      run2(this.ajaxData);

    });
    oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
    oReq.send();
};

function run(data) {
    const foodData = processingData(data);

    const priceData = this.processingFoodPriceData(foodData.price);
    const priceElement = this.createPriceElement(priceData);

    const h1 = document.querySelector('h1');
    h1.insertAdjacentElement('beforeend', priceElement);

    const starElement = this.createStarElement();
}

function run2(data) {
    const foodData = processingData(data);

}

function processingFoodPriceData(price) {
    const onlyNumber = price.replace(/[^0-9]/g,'');
    return onlyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function processingData(data) {
    const foodData = {
        'price': data[0].items[0].s_price,
        'title': data[0].items[0].title,
        'description': data[0].items[0].description,
        'imgUrl': data[0].items[0].image,
    }
    return foodData;
};

function createPriceElement(price) {
    const dd = document.createElement('dd');
    const priceTag = `<p class="selling_price">` + price + `<span class="sales_unit">원</span>`;

    dd.innerHTML = priceTag;

    return dd;
};

function createStarElement() {
    const dd = document.createElement('dd');
    const startSpanElement = `<span class="star_score_bg">
    <span class="start_score" style="width: 86%;"></span>
    </span>
    <span class="review_count">636</span>    
    `;

    debugger;

    dd.insertAdjacentElement('beforeend', startSpanElement);

    return dd;
};

function createDescriptionSubject(subjectData) {
    const dt = document.createElement('dt');
    dt.innerText = subjectData;

    return dt;
};

function createDesciptionSubText(text) {
    const dd = document.createElement('dd');
    dd.innerText = text;

    return dd;
};

function createFoodDlElement() {
    const dl = document.createElement('dl');
    dl.classList.add('food_description');
    return dl;
};

function createFoodImageDivElement() {
    const div = document.createElement('div');
    div.classList.add('food_image');
    return div;
};

function createImgElement(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
};

function createFoodBoxLiElement() {
    const li = document.createElement('li');
    li.classList.add("food_box");
    li.classList.add("food-box-last");
    return li;
};

console.log("OK, BEST-DISH JS LOADED!!");
this.request();