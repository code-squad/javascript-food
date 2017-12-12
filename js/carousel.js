function Carousel({
  container,
  itemTemplate,
  getItemHTML,
  visibleItems = 1,
  step = visibleItems,
  usingIndicator = true,
  positionOfIndicator = 'bottom',
  dotSize = 'small',
  animationType = 'slide',
  itemPadding,
  animationSpeed = '500ms'
  }) {

  Object.assign(this, {
    visibleItems,
    step,
    usingIndicator,
    positionOfIndicator,
    dotSize,
    animationType,
    animationSpeed,
    itemPadding,
    itemTemplate,
    getItemHTML
  });

  this.classNames = {
    buttonPrev: 'carousel__btn--prev',
    buttonNext: 'carousel__btn--next',
    wrapItems: 'carousel__wrap-items',
    itemContainer: 'carousel__items',
    indicator: 'carousel__indicator',
    dot: 'indicator__dot',
    dotActivated: 'indicator__dot--active'
  }

  this.container = container;
  this.itemContainer = this.container.querySelector(`.${this.classNames.itemContainer}`);
  this.indicatorContainer = null;
}

Carousel.prototype = {
  constructor: Carousel,

  init(itemData) {
    if (itemData) {
      this.renderItems(JSON.parse(itemData));
    }

    if (this.usingIndicator) {
      this.renderIndicator();
      this.bindIndicatorEvent();

      const firstItem = this.indicatorContainer.children[0];
      firstItem.classList.add(this.classNames.dotActivated);
    }

    this.setItemsSize();
    this.bindButtonEvent();
    this.animations[this.animationType].init.call(this);
  },
  renderItems(items) {
    items.forEach((item, index) => {
      const itemHTML = this.getItemHTML(this.itemTemplate, item);
      this.itemContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
  },
  setItemsSize() {
    const wrap = this.container.querySelector(`.${this.classNames.wrapItems}`);
    const width = wrap.clientWidth / this.visibleItems;

    this.itemContainer.children.forEach(item => {
      item.style.width = `${width}px`;
      item.style.height = '100%';
      item.style.paddingLeft = this.itemPadding;
      item.style.paddingRight = this.itemPadding;
    });
  },
  renderIndicator() {
    const itemCount = this.itemContainer.children.length;
    const indicatorHTML = `<ol class="${this.classNames.indicator} ${this.classNames.indicator}--${this.positionOfIndicator}"></ol>`;

    this.container.insertAdjacentHTML('beforeend', indicatorHTML);
    this.indicatorContainer = this.container.querySelector(`.${this.classNames.indicator}`);

    for (let index = 0; index < itemCount; index++) {
      const classString = `${this.classNames.dot} ${this.classNames.dot}--${this.dotSize}`;
      const dotHTML = `<li class="${classString}" data-index="${index}"></li>`;
      this.indicatorContainer.insertAdjacentHTML('beforeend', dotHTML);
    }
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
  bindIndicatorEvent() {
    this.indicatorContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.classNames.dot) === false) {
        return;
      }
      
      this.showItem(target.dataset.index);
    });
  },
  showItem(nextIndex) {
    const currentIndex = this.itemContainer.dataset.currentIndex;
    const items = this.itemContainer.children;

    this.animations[this.animationType].run.call(this, items, currentIndex, nextIndex);

    if (this.usingIndicator) {
      const dots = this.indicatorContainer.children;
      dots[currentIndex].classList.remove(this.classNames.dotActivated);
      dots[nextIndex].classList.add(this.classNames.dotActivated);
    }

    this.itemContainer.dataset.currentIndex = nextIndex;
  },
  animations: {
    fade: {
      init() {
        this.itemContainer.children.forEach((item, index) => {
          if (index === 0) {
            item.classList.add(this.animationType);
          }

          item.classList.add(`${this.animationType}-ready`);
        });
      },
      run(items, currentIndex, nextIndex) {
        const width = this.itemContainer.parentNode.clientWidth;

        this.itemContainer.style.marginLeft = `-${nextIndex * width}px`;
        items[currentIndex].classList.remove(this.animationType);
        items[nextIndex].classList.add(this.animationType);
      }
    },
    slide: {
      init() {
        this.itemContainer.style.transitionDuration = this.animationSpeed;
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
