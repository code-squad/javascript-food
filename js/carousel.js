function Carousel({
  itemType,
  itemTemplate,
  itemPadding,
  visibleItems,
  step,
  selector,
  usingPagination,
  positionOfPagination,
  dotSize,
  effect,
  speed
  }) {

  this.visibleItems = visibleItems || 1;
  this.step= step || this.visibleItems;
  this.usingPagination = (usingPagination === undefined) ? true : usingPagination;
  this.positionOfPagination = positionOfPagination || 'bottom';
  this.dotSize = dotSize || 'small';
  this.effect = effect || 'slide'; 
  this.speed = speed || '500ms';
  this.itemPadding = itemPadding;

  this.itemTemplate = itemTemplate;

  this.classNames = {
    buttonPrev: 'carousel__btn--prev',
    buttonNext: 'carousel__btn--next',
    wrapItems: 'carousel__wrap-items',
    itemContainer: 'carousel__items',
    pagination: 'carousel__pagination',
    dot: 'pagination__dot',
    dotActivated: 'pagination__dot--active'
  }

  this.container = document.querySelector(selector);
  this.itemContainer = this.container.querySelector(`.${this.classNames.itemContainer}`);
  this.pagination = null;
}

Carousel.prototype = {
  constructor: Carousel,

  init(itemData) {
    if (itemData) {
      this.renderItems(JSON.parse(itemData));
    }

    if (this.usingPagination) {
      this.renderPagination();
      this.bindPaginationEvent();
      this.pagination.children[0].classList.add(this.dotActivated);
    }

    this.setItemsSize();
    this.bindButtonEvent();
    this.effects[this.effect].init.call(this);
  },
  renderItems(items) {
    items.forEach((item, index) => {
      const itemDOM = this.getItemDOM(item);
      this.itemContainer.insertAdjacentHTML('beforeend', itemDOM);
    });
  },
  setItemsSize() {
    const wrap = this.container.querySelector(`.${this.classNames.wrapItems}`);
    const width = wrap.clientWidth / this.visibleItems;

    Array.prototype.forEach.call(this.itemContainer.children, (item) => {
      item.style.width = `${width}px`;
      item.style.height = '100%';
      item.style.paddingLeft = this.itemPadding;
      item.style.paddingRight = this.itemPadding;
    });
  },
  renderPagination() {
    const itemCount = this.itemContainer.children.length;
    const paginationHTML = `<ol class="${this.classNames.pagination} ${this.classNames.pagination}--${this.positionOfPagination}"></ol>`;

    this.container.insertAdjacentHTML('beforeend', paginationHTML);
    this.pagination = this.container.querySelector(`.${this.classNames.pagination}`);

    for (let index = 0; index < itemCount; index++) {
      const dotHTML = this.getDotHTML({
        index,
        classes: `${this.classNames.dot} ${this.classNames.dot}--${this.dotSize}`
      });

      this.pagination.insertAdjacentHTML('beforeend', dotHTML);
    }
  },
  getItemDOM(item) {
    return TabMenu.prototype.getThumbnailHTML(this.itemTemplate, item);
  },
  getDotHTML({ classes, index }) {
    return `<li class="${classes}" data-index="${index}"></li>`;
  },
  bindButtonEvent() {
    const buttonPrev = this.container.querySelector(`.${this.classNames.buttonPrev}`);
    const buttonNext = this.container.querySelector(`.${this.classNames.buttonNext}`);

    buttonPrev.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const itemCounts = this.itemContainer.children.length;

      const distance = (currentIndex - this.step);
      const nextIndex = distance >= 0 ? distance : itemCounts + distance;

      this.showItem(nextIndex);
    });

    buttonNext.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const itemCounts = this.itemContainer.children.length;
      const nextIndex = (currentIndex + this.step) % itemCounts;

      this.showItem(nextIndex);
    });
  },
  bindPaginationEvent() {
    this.pagination.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.classNames.dot) === false) {
        return;
      }
      
      this.showItem(target.dataset.index);
    });
  },
  showItem(nextIndex) {
    const currentIndex = this.itemContainer.dataset.currentIndex;
    const items = this.itemContainer.children;

    this.effects[this.effect].run.call(this, items, currentIndex, nextIndex);

    if (this.usingPagination) {
      const dots = this.pagination.children;
      dots[currentIndex].classList.remove(this.classNames.dotActivated);
      dots[nextIndex].classList.add(this.classNames.dotActivated);
    }

    this.itemContainer.dataset.currentIndex = nextIndex;
  },
  effects: {
    fade: {
      init() {
        Array.prototype.forEach.call(this.itemContainer.children, (item, index) => {
          if (index === 0) {
            item.classList.add(this.effect);
          }

          item.classList.add(`${this.effect}-ready`);
        });
      },
      run(items, currentIndex, nextIndex) {
        const width = this.itemContainer.parentNode.clientWidth;

        this.itemContainer.style.marginLeft = `-${nextIndex * width}px`;
        items[currentIndex].classList.remove(this.effect);
        items[nextIndex].classList.add(this.effect);
      }
    },
    slide: {
      init() {
        this.itemContainer.style.transitionDuration = this.speed;
      },
      run(items, currentIndex, nextIndex) {
        const wrapItems = this.itemContainer.parentNode;
        const itemCount = this.itemContainer.children.length;
        const width = (nextIndex / this.visibleItems) * wrapItems.clientWidth;

        this.itemContainer.style.transform = `translateX(-${width}px)`;
      }
    }
  }
}
