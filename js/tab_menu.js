function TabMenu(selector) {
  this.buttonsContainer = document.querySelector(selector.buttons);
  this.contentsContainer = document.querySelector(selector.contents);
  this.thumbnailLists = null;
  this.buttons = [];
  this.contents = [];
}

TabMenu.prototype = {
  constructor: TabMenu,
  init: function(jsonStr) {
    const data = JSON.parse(jsonStr);

    this.setData(data);
    this.makeButtons();
    this.bindClickEvent();
    this.makeContents();

    //initialize
    this.buttonsContainer.children[0].classList.add('active');
    this.thumbnailLists = document.querySelectorAll('.thumbnails');
    this.thumbnailLists.forEach((thumb) => thumb.style = 'display: none;');
    this.thumbnailLists[0].style = 'display: block;';

  },
  setData: function(data) {
    data.forEach((menu) => {
      this.buttons.push({
        id: menu.category_id,
        text: menu.name
      });

      this.contents.push(menu.items);
    });
  },
  makeButtons: function() {
    this.buttons.forEach(((button, index) => {
      const button = document.createElement('li');
      button.dataset.index = index;
      button.textContent = button.text;

      this.buttonsContainer.appendChild(button);
    }));
  },
  makeContents: function() {
    const thumbnailTemplate = document.querySelector('#bestItemTemplate');

    this.contents.forEach((contentItems) => {
      const list = document.createElement('ul');
      list.classList.add('thumbnails');

      contentItems.forEach((item) => {
        list.innerHTML += this.getThumbnailHTML(thumbnailTemplate, item);
      });

      this.contentsContainer.appendChild(list);
    });
  },
  getThumbnailHTML: function(template, data) {
    const keys = Object.keys(data);
    let htmlStr = template.innerHTML;

    keys.forEach((key) => {
        htmlStr = htmlStr.replace(`{{${key}}}`, data[key]);
    });

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
    this.buttonsContainer.addEventListener('click', (evt) => {
      const currentIndex = this.buttonsContainer.dataset.currentIndex;
      const selectedIndex = evt.target.dataset.index;

      // button active toggle
      this.buttonsContainer.children[currentIndex].classList.remove('active');
      evt.target.classList.add('active');

      // ul display toggle
      this.thumbnailLists[currentIndex].style = 'display: none;';
      this.thumbnailLists[selectedIndex].style = 'display: block;';

      this.buttonsContainer.dataset.currentIndex = selectedIndex;
    });
  }
}
