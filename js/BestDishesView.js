class BestDishesView {
  constructor() {}

  request(url, data, callback) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", () => {
      this.ajaxData = JSON.parse(oReq.responseText);
      const foodDatas = this.processingData(this.ajaxData);
      this.createBestDishContainer(foodDatas);
    });
    oReq.open("GET", url);
    oReq.send();
  }

  addClickEvent() {
    document.querySelector(".food_tab_list").addEventListener("click", evt => {
      const lastElementIndex = 1;

      this.removeTabMenuStyle();
      evt.target.classList.add("btn-highlight");

      this.hideAllBestDishesContainer();
      const targetId = evt.target.id;
      const targetElement = document.querySelectorAll(`#${targetId}`)[
        lastElementIndex
      ];
      targetElement.classList.add("show");
    });
  }

  processingData(data) {
    const foodDatas = [];

    // omg.. higher order function T.T
    data.forEach(element => {
      element.items.forEach(item => {
        foodDatas.push({
          price: this.processingFoodPriceData(item.s_price),
          title: this.modifyOverStringToDot(item.title, 20),
          description: this.modifyOverStringToDot(item.description, 26),
          imgUrl: item.image
        });
      });
    });

    return foodDatas;
  }

  modifyOverStringToDot(data, standard) {
    if (data.length <= standard) return data;

    let result = data.substring(0, standard - 1);
    result += "...";
    return result;
  }

  processingFoodPriceData(price) {
    const onlyNumber = price.replace(/[^0-9]/g, "");
    return onlyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * AJAX로 받아온 데이터를 기반으로 베스트 반찬 컨테이너를 만드는 작업을 한다
   * 한가지 일만 하는가?
   *
   * @param {*} obj
   */
  createBestDishContainer(obj) {
    const originElement = document.querySelector(".best_food_container");
    let parentElement;
    let foodElement;
    let idCount = 0;
    const isThirdIdx = function(idx) {
      return idx % 3 === 0;
    };
    const isLastIdx = function(idx) {
      return idx === obj.length - 1;
    };

    for (let i = 0; i < obj.length; i++) {
      if ((parentElement && isThirdIdx(i)) || isLastIdx(i)) {
        originElement.insertAdjacentElement("beforeEnd", parentElement);
      }

      if (isThirdIdx(i)) {
        parentElement = this.createBestDishParentElement(idCount);
        idCount++; // 안 좋다는것을 알고있지만...
      }

      foodElement = isThirdIdx(i + 1)
        ? this.createBestDishLiElement(obj[i], "food-box-last")
        : this.createBestDishLiElement(obj[i]);

      parentElement.insertAdjacentHTML("beforeEnd", foodElement);
    }

    this.setFoodTabListID();
    this.selectRandom();
  }

  createBestDishParentElement(count) {
    let parentElement;
    parentElement = document.createElement("UL");
    parentElement.classList.add("best_food_list");
    parentElement.classList.add("hide");
    parentElement.id = `BEST-SIDE-DISH-${count}`;

    return parentElement;
  }

  selectRandom() {
    const bestSideDishesList = document.querySelectorAll(".food_tab_list > li");
    let randomN = Math.random() * 6;
    randomN = Math.floor(randomN);

    const bestSideDishId = bestSideDishesList[randomN].id;
    const selectedBestSideDishNodeList = document.querySelectorAll(
      `#${bestSideDishId}`
    );

    const button = selectedBestSideDishNodeList[0];
    const container = selectedBestSideDishNodeList[1];

    button.classList.add("btn-highlight");
    container.classList.add("show");
  }

  createBestDishLiElement(data, opt = "") {
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
        `;

    return parentElement;
  }

  setFoodTabListID() {
    const foodTabMenuElements = document.querySelectorAll(
      ".food_tab_list > li"
    );

    for (let i = 0; i < foodTabMenuElements.length; i++) {
      foodTabMenuElements[i].id = `BEST-SIDE-DISH-${i}`;
    }
  }

  removeTabMenuStyle() {
    const foodTabListElements = document.querySelectorAll(
      ".food_tab_list > li"
    );

    foodTabListElements.forEach(element => {
      element.classList.remove("btn-highlight");
    });
  }

  hideAllBestDishesContainer() {
    const showingElement = document.querySelector(".show");
    showingElement.classList.remove("show");
  }
}

export { BestDishesView };
