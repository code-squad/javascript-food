function Carousel({
  container,
  itemTemplate,
  getItemHTML,
  visibleItems = 1,
  step = visibleItems,
  currentIndex = 0,
  usingIndicator = true,
  positionOfIndicator = "bottom",
  dotSize = "small",
  animationType = "slide",
  infinityLoop = false,
  itemPadding,
  animationSpeed = "500ms"
}) {
  Object.assign(this, {
    visibleItems,
    currentIndex,
    step,
    usingIndicator,
    positionOfIndicator,
    dotSize,
    animationType,
    animationSpeed,
    infinityLoop,
    itemPadding,
    itemTemplate,
    getItemHTML
  });

  this.classNames = {
    button: "carousel__btn",
    buttonPrev: "carousel__btn--prev",
    buttonNext: "carousel__btn--next",
    wrapItems: "carousel__wrap-items",
    itemContainer: "carousel__items",
    indicator: "carousel__indicator",
    dot: "indicator__dot",
    dotActivated: "indicator__dot--active"
  };

  this.container = container;
  this.itemContainer = this.container.querySelector(
    `.${this.classNames.itemContainer}`
  );
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
      this.activateDot(0);
    }

    this.setItemsSize();
    this.bindButtonEvent();
    this.animations[this.animationType].init.call(this);
  },
  renderItems(items) {
    items.forEach((item, index) => {
      const itemHTML = this.getItemHTML(this.itemTemplate, item);
      this.itemContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
  },
  setItemsSize() {
    const wrap = this.container.querySelector(`.${this.classNames.wrapItems}`);
    const width = wrap.clientWidth / this.visibleItems;

    this.itemContainer.children.forEach(item => {
      item.style.width = `${width}px`;
      item.style.height = "100%";
      item.style.paddingLeft = this.itemPadding;
      item.style.paddingRight = this.itemPadding;
    });
  },
  renderIndicator() {
    const itemCount = this.itemContainer.children.length;
    const indicatorHTML = `<ol class="${this.classNames.indicator} ${
      this.classNames.indicator
    }--${this.positionOfIndicator}"></ol>`;

    this.container.insertAdjacentHTML("beforeend", indicatorHTML);
    this.indicatorContainer = this.container.querySelector(
      `.${this.classNames.indicator}`
    );

    for (let index = 0; index < itemCount; index++) {
      const classString = `${this.classNames.dot} ${this.classNames.dot}--${
        this.dotSize
      }`;
      const dotHTML = `<li class="${classString}" data-index="${index}"></li>`;
      this.indicatorContainer.insertAdjacentHTML("beforeend", dotHTML);
    }
  },
  bindButtonEvent() {
    this.container.addEventListener("click", ({ target }) => {
      if (target.parentNode.matches(`.${this.classNames.button}`)) {
        target = target.parentNode;
      } else if (!target.matches(`.${this.classNames.button}`)) {
        return;
      }

      let direction = undefined;
      let nextIndex = 0;

      if (util.hasClass(target, this.classNames.buttonPrev)) {
        nextIndex = this.currentIndex - this.step;
        direction = "prev";
      }

      if (util.hasClass(target, this.classNames.buttonNext)) {
        nextIndex = this.currentIndex + this.step;
        direction = "next";
      }

      this.showItem(nextIndex, direction);
    });
  },
  bindIndicatorEvent() {
    this.indicatorContainer.addEventListener("click", event => {
      if (!event.target.classList.contains(this.classNames.dot)) {
        return;
      }

      this.showItem(event.target.dataset.index);
      event.stopPropagation();
    });
  },
  showItem(nextIndex, direction) {
    this.animations[this.animationType].run.call(this,
      {
        nextIndex,
        direction,
        callback: () => {
          if (this.usingIndicator) {
            this.activateDot(this.currentIndex);
          }
        }
      }
    );    
  },
  activateDot(index) {
    const dots = this.indicatorContainer.children;
    dots.forEach(dot => dot.classList.remove(this.classNames.dotActivated));
    dots[index].classList.add(this.classNames.dotActivated);
  },
  animations: {
    fade: {
      init() {
        this.itemContainer.children.forEach((item, index) => {
          if (index === 0) {
            item.classList.add(this.animationType);
          }

          item.style.position = "absolute";
          item.classList.add(`${this.animationType}-ready`);
        });
      },
      run({ nextIndex, direction, callback }) {
        const items = this.itemContainer.children;
        const itemCount = items.length;

        nextIndex = this.getAdjustedIndex(nextIndex, direction);

        items[this.currentIndex].classList.remove(this.animationType);
        items[nextIndex].classList.add(this.animationType);

        this.currentIndex = nextIndex;
        callback();
      }
    },
    slide: {
      init() {
        if (this.infinityLoop) {
          this.currentIndex = this.step;

          this.addClonedElements();
          this.slideEffect(this.currentIndex);
          
          this.itemContainer.addEventListener("transitionend", e => {
            this.adjustPosition();
            this.eventThrottling = false;
          });
        }
      },
      run({ nextIndex, direction, callback }) {
        if (this.eventThrottling) {
          return;
        }

        if (this.infinityLoop) {
          this.eventThrottling = true;
        }

        this.itemContainer.style.transitionDuration = this.animationSpeed;
        nextIndex = this.getAdjustedIndex(nextIndex, direction);
        
        this.slideEffect(nextIndex);
        this.currentIndex = nextIndex;
        callback();
      }
    }
  },
  getAdjustedIndex(index, direction) {
    const items = this.itemContainer.children;
    const len = items.length;
    const itemCount = items.length;
    let adjustedIndex = index;

    if (direction === "prev" && index < 0) {
      adjustedIndex = itemCount + index;
    } else if (direction === "next" && index >= len) {
      adjustedIndex = 0;
    }

    if (direction && this.infinityLoop) {
      if (index > (len - this.step) && index < len) {
        adjustedIndex = len - this.step;
      }

      if (index < 0) {
        adjustedIndex = 0;
      }
    }

    return adjustedIndex;
  },
  adjustPosition() {
    const len = this.itemContainer.children.length;

    if (this.currentIndex === 0) {
      this.currentIndex = len - 2 * this.step;
    } else if (this.currentIndex === len - this.step) {
      this.currentIndex = this.step;
    } else {
      return;
    }

    this.itemContainer.style.transitionDuration = "";
    this.slideEffect(this.currentIndex);
  },
  addClonedElements() {
    const items = Array.from(this.itemContainer.children);
    const makeClone = item => {
      const clone = item.cloneNode(true);
      clone.classList.add('cloned');
      return clone;
    };

    // clone and insert first items
    items
      .slice(0, this.visibleItems)
      .map(makeClone)
      .forEach(item => this.itemContainer.appendChild(item));

    // clone and insert last itmes
    items
      .slice(items.length - this.visibleItems, items.length)
      .reverse()
      .map(makeClone)
      .forEach(item =>
        this.itemContainer.insertBefore(item, this.itemContainer.firstChild)
      );
  },
  slideEffect(index) {
    const wrapItems = this.itemContainer.parentNode;
    const position = index / this.visibleItems * wrapItems.clientWidth;
    this.itemContainer.style.transform = `translateX(-${position}px)`;
  }
};