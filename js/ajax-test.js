
const bestSideDishContainer = document.querySelector('.best_food_container');

function request (url, data, callback) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', () => {
      this.ajaxData = JSON.parse(oReq.responseText);

      const foodDatas = this.processingData(this.ajaxData);

    //   bestSideDishContainer.insertAdjacentElement

      this.createBestDishContainer(foodDatas);

    });
    oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
    oReq.send();
};

function processingData(data) {

    const foodDatas = [];

    data.forEach(element => {
        element.items.forEach(item => {
            foodDatas.push({
                'price': this.processingFoodPriceData(item.s_price),
                'title': item.title,
                'description': item.description,
                'imgUrl': item.image,
            })
        });
    });

    return foodDatas;
};

function processingFoodPriceData(price) {
    const onlyNumber = price.replace(/[^0-9]/g,'');
    return onlyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createBestDishContainer(obj) {

    const originElement = document.querySelector('.best_food_container');
    let parentElement;
    let foodElement;

    for (let i=0; i<obj.length; i++) {

        if (parentElement && i%3 === 0) {
            originElement.insertAdjacentElement('beforeEnd', parentElement);
        }

        if (i % 3 === 0) {
            parentElement = document.createElement('UL');
            parentElement.classList.add('best_food_list');
            parentElement.classList.add('hide');
        }

        foodElement = ((i+1) % 3 === 0) ? 
            this.createBestDishLiElement(obj[i], 'food-box-last') :
            this.createBestDishLiElement(obj[i]);

        parentElement.insertAdjacentHTML('beforeEnd', foodElement);
    }
}

function createBestDishLiElement(data, opt) {

    if (!opt) opt = "";

    const parentElement = `
    <li class="food_box ${opt}">
        <div class="food_image">
            <img src=${data.imgUrl} alt="">
        </div>
        <dl class="food_description">
            <dt>${data.title}</dt>
            <dd>${data.description}</dd>
            <dd>
                <span class="star_score_bg">
                    <span class="start_score" style="width: 86%;"></span>
                </span>
                <span class="review_count">2630</span>
            </dd>
            <dd>
                <p class="selling_price">
                    ${data.price}
                    <span class="sales_unit">원</span>
                </p>
            </dd>
        </dl>
    </li>
    `

    return parentElement;
}

this.request();

