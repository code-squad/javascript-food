function TabMenu(selector) {
  this.buttonsContainer = document.querySelector(selector.buttons);
  this.contentsContainer = document.querySelector(selector.contents);
  this.buttonElements = this.buttonsContainer.children;
  this.contentElements = this.contentsContainer.children;
  this.buttonData = [];
  this.contentData = [];
}

TabMenu.prototype = {
  constructor: TabMenu,
  init: function(jsonStr) {
    const data = JSON.parse(jsonStr);

    this.setData(data);
    this.makeButtons();
    this.makeContents();
    this.bindClickEvent();
  },
  setData(jsonData) {
    jsonData.forEach((menu) => {
      this.buttonData.push({
        id: menu.category_id,
        text: menu.name
      });

      this.contentData.push(menu.items);
    });
  },
  makeButtons() {
    this.buttonData.forEach((data, index) => {
      const button = this.buttonElements[index];
      button.textContent = data.text;
    });
  },
  makeContents() {
    const thumbnailTemplate = document.querySelector('#bestItemTemplate');

    this.contentData.forEach((contents, index) => {
      const thumbnailList = this.contentElements[index];

      contents.forEach(thumbnail => {
        thumbnailList.innerHTML += this.getThumbnailHTML(thumbnailTemplate, thumbnail);
      });
    });
  },
  getThumbnailHTML(template, data) {
    let htmlStr = util.getHTMLFromTemplate(template, data);
    htmlStr = htmlStr.replace('{{n_price}}', '');

    const tempNode = document.createElement('div');
    tempNode.innerHTML = htmlStr;

    const deliveryInfo = tempNode.querySelector('.wrap-delivery-info');
    const tags = tempNode.querySelector('.thumbnail__tags');

    //delivery types
    data.delivery_type.forEach((type, index) => {
      if (index !== 0) {
        const separator = document.createElement('hr');
        deliveryInfo.appendChild(separator);
      }

      const info = document.createElement('sapn');
      info.textContent = type;
      
      deliveryInfo.appendChild(info);
    });

    //tag
    if (data.badge) {
      data.badge.forEach((tagName, index) => {
        const tag = document.createElement('li');
        tag.textContent = tagName;
        tags.appendChild(tag);
      });
    }

    return tempNode.innerHTML;
  },
  bindClickEvent: function() {
    this.buttonsContainer.addEventListener('click', ({target}) => {
      const currentIndex = this.buttonsContainer.dataset.currentIndex;
      const selectedIndex = target.dataset.index;

      // button active toggle
      this.buttonElements[currentIndex].classList.remove('active');
      target.classList.add('active');

      // ul display toggle
      this.contentElements[currentIndex].style = 'display: none;';
      this.contentElements[selectedIndex].style = 'display: block;';

      this.buttonsContainer.dataset.currentIndex = selectedIndex;
    });
  }
}
