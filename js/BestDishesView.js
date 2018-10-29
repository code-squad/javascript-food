class BestDishesView {
    constructor() {

    }

    request(url, data, callback) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener('load', () => {
          this.ajaxData = JSON.parse(oReq.responseText);
          const foodDatas = this.processingData(this.ajaxData);
          this.createBestDishContainer(foodDatas);
        });
        oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
        oReq.send();
    };

    addClickEvent() {
        document.querySelector('.food_tab_list').addEventListener('click', (evt) => {
            const lastElementIndex = 1;
            
            this.removeTabMenuStyle();
            evt.target.style.backgroundColor = '#5FC8C6';
            evt.target.style.color = 'WHITE';
            evt.target.style.fontWeight = 'BOLD';
        
            this.hideAllBestDishesContainer();
            const targetId = evt.target.id;
            document.querySelectorAll(`#${targetId}`)[lastElementIndex].style.display = 'BLOCK';
        });
    }

    processingData(data) {

        const foodDatas = [];
    
        data.forEach(element => {
            element.items.forEach(item => {
                foodDatas.push({
                    'price': this.processingFoodPriceData(item.s_price),
                    'title': this.modifyOverStringToDot(item.title, 20),
                    'description': this.modifyOverStringToDot(item.description, 26),
                    'imgUrl': item.image,
                })
            });
        });
    
        return foodDatas;
    };
    
    modifyOverStringToDot(data, standard) {
        if (data.length <= standard)
            return data;
    
        let result = data.substring(0, standard-1);
        result += '...';
        return result;
    }
    
    processingFoodPriceData(price) {
        const onlyNumber = price.replace(/[^0-9]/g,'');
        return onlyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    createBestDishContainer(obj) {
    
        const originElement = document.querySelector('.best_food_container');
        let parentElement;
        let foodElement;
        let idCount = 0;
    
        for (let i=0; i<obj.length; i++) {
    
            if (parentElement && i%3 === 0 || i === obj.length-1) {
                originElement.insertAdjacentElement('beforeEnd', parentElement);
            }
    
            if (i % 3 === 0) {
                parentElement = document.createElement('UL');
                parentElement.classList.add('best_food_list');
                parentElement.classList.add('hide');
                parentElement.id = `BEST-SIDE-DISH-${idCount}`;
                idCount++;
            }
    
            foodElement = ((i+1) % 3 === 0) ?
                this.createBestDishLiElement(obj[i], 'food-box-last') :
                this.createBestDishLiElement(obj[i]);
    
            parentElement.insertAdjacentHTML('beforeEnd', foodElement);
        }

        this.setFoodTabListID();
        this.selectRandom();
    }
    
    selectRandom() {
        const bestSideDishesList = document.querySelectorAll('.food_tab_list > li');
        let randomN = Math.random()*6;
        randomN = Math.floor(randomN);
        
        const bestSideDishId = bestSideDishesList[randomN].id;
        const selectedBestSideDishNodeList = document.querySelectorAll(`#${bestSideDishId}`);
        
        const button = selectedBestSideDishNodeList[0];
        const container = selectedBestSideDishNodeList[1];
        
        button.style.backgroundColor = '#5FC8C6';
        button.style.color = 'WHITE';
        button.style.fontWeight = 'BOLD';
        
        container.style.display = 'BLOCK';
    }
    
    createBestDishLiElement(data, opt) {
    
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

    setFoodTabListID() {
        const foodTabMenuElements = document.querySelectorAll('.food_tab_list > li');

        for (let i=0; i<foodTabMenuElements.length; i++) {
            foodTabMenuElements[i].id = `BEST-SIDE-DISH-${i}`;
        }
    }

    removeTabMenuStyle() {
        const foodTabListElements = document.querySelectorAll('.food_tab_list > li');
        
        foodTabListElements.forEach((element) => {
            element.style.backgroundColor = 'WHITE';
            element.style.fontWeight = 'NORMAL';
            element.style.color = '#777';
        });
    }
    
    hideAllBestDishesContainer() {
        const bestSideDishesElements = document.querySelectorAll('.best_food_list');
    
        bestSideDishesElements.forEach(element => {
            element.style.display = 'NONE';
        });
    }
    
}

export { BestDishesView }