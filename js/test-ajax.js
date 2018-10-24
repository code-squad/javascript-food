

function AJAX(foodElementMaker) {

  this.ajaxData;
  this.foodElementMaker = foodElementMaker;

}

AJAX.prototype = {

  request: function(url, data, callback) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', () => {
      this.ajaxData = JSON.parse(oReq.responseText);
      this.processingData(this.ajaxData);
    });
    oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
    oReq.send();
  },

  getAjaxData: function() {
    return this.ajaxData;
  },

  processingData: function(data) {

    data.forEach((element) => {

      const foodData = {
        'prie': element.items[0].s_price,
        'title': element.items[0].title,
        'description': element.items[0].description,
        'imgUrl': element.items[0].image,
      }

      console.log(foodData);

      // const price = element.items.s_price;
      // const title = element.items.title;
      // const description = element.items.description;
      // const imageUrl = element.items.image;
    });
  },

}

function CreateBestDishElement() {

  this.element = docuemnt.createElement('UL');
  this.element.classList.add('best_food_list');

}

CreateFoodElement.prototype = {

  createPriceElement: function(price) {
    const dd = document.createElement('dd');
    const priceTag = `<p class="selling_price>` + price + `<span class="sales_unit">원</span>`;

    dd.innerHTML = priceTag;

    return dd;
  },

  createStarElement: function() {
    const dd = document.createElement('dd');
    const startSpanElement = `
      <span class="star_score_bg">
      <span class="start_score" style="width: 86%;"></span>
      </span>
      <span class="review_count">636</span>    
    `;
    dd.insertAdjacentElement('beforeend', startSpanElement);

    return dd;
  },

  createDescriptionSubject: function(subjectData) {
    const dt = document.createElement('dt');
    dt.innerText = subjectData;

    return dt;
  },

  createDesciptionSubText: function(text) {
    const dd = document.createElement('dd');
    dd.innerText = text;

    return dd;
  },

  createFoodDlElement: function() {
    const dl = document.createElement('dl');
    dl.classList.add('food_description');
    return dl;
  },

  createFoodImageDivElement: function() {
    const div = document.createElement('div');
    div.classList.add('food_image');
    return div;
  },
  
  createImgElement: function(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
  },

  createFoodBoxLiElement: function() {
    const li = document.createElement('li');
    li.classList.add("food_box");
    li.classList.add("food-box-last");
    return li;
  },

}



function BestSideDishManager(element) {
  
  this.element = element;
  
}

BestSideDishManager.prototype = {

  init: function() {
    this.element.addEventListener('click', (evt) => {
      console.log(evt.target);
    });
  }, 

  createBestDishElement: function() {
    const bestDishContainer = docuemnt.createElement('UL');
    bestDishContainer.classList.add('best_food_list');

    const foodBoxLiElement = `<li class="food_box"></li>`;
    const dishImageDivElement = `<div class="food_image"></div>`;
    const foodDescriptionDlElement = `<dl class="food_description"></dl>`;
    
    const dtElement = `<dt></dt>`;
    const subjectDdElement = `<dd></dd>`;
    const descriptionDdElement = `<dd></dd>`;
    
    const spanElement = `<span></span>`;
    const startElement = `<span></span>`;

    const rateElement = `<span></span>`;

    const priceDdElement = `<dd></dd>`;
    const pricePElement = `<p></p>`;
    
  },

}

const bestDishMenuElement = document.querySelector('.food_tab_list');

const bestSideDishManager = new BestSideDishManager(bestDishMenuElement);

const foodElementMaker = new CreateFoodElement();

const ajax = new AJAX(foodElementMaker);
ajax.request();

console.log("OK, TEST-AJAX JS *_*");

