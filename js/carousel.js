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
    this.container.addEventListener("click", ({
      target
    }) => {
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
    const items = this.itemContainer.children;
    const prevIndex = this.currentIndex;

    this.animations[this.animationType].run.call(
      this,
      items,
      nextIndex,
      direction
    );

    if (this.usingIndicator) {
      const dots = this.indicatorContainer.children;
      dots[prevIndex].classList.remove(this.classNames.dotActivated);
      dots[this.currentIndex].classList.add(this.classNames.dotActivated);
    }
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
      run(items, nextIndex, direction) {
        const itemCount = this.itemContainer.children.length;

        if (direction === "prev" && nextIndex < 0) {
          nextIndex = itemCount + nextIndex;
        }

        if (direction === "next") {
          nextIndex = nextIndex % itemCount;
        }

        items[this.currentIndex].classList.remove(this.animationType);
        items[nextIndex].classList.add(this.animationType);

        this.currentIndex = nextIndex;
      }
    },
    slide: {
      init() {
        if (this.infinityLoop) {
          this.currentIndex = this.step;
          const wrapItems = this.itemContainer.parentNode;

          const width =
            this.currentIndex / this.visibleItems * wrapItems.clientWidth;
          this.itemContainer.style.transform = `translateX(-${width}px)`;

          this.addClonedElements();

          this.itemContainer.addEventListener("transitionend", function (e) {
            const len = this.itemContainer.children.length;
            const wrapItems = this.itemContainer.parentNode;

            if (this.currentIndex === 0) {
              this.currentIndex = len - 2 * this.step;

              position =
                this.currentIndex /
                this.visibleItems *
                wrapItems.clientWidth;

              this.itemContainer.style.transitionDuration = "";
              this.itemContainer.style.transform = `translateX(-${position}px)`;
            } else if (this.currentIndex === len - this.step) {
              this.currentIndex = this.step;

              position =
                this.currentIndex /
                this.visibleItems *
                wrapItems.clientWidth;

              this.itemContainer.style.transitionDuration = "";
              this.itemContainer.style.transform = `translateX(-${position}px)`;
            }
          }.bind(this), true);

        } else {
          this.itemContainer.style.transitionDuration = this.animationSpeed;
        }
      },
      run(items, nextIndex, direction) {
        const wrapItems = this.itemContainer.parentNode;
        const len = this.itemContainer.children.length;

        if (direction && this.infinityLoop) {
          this.itemContainer.style.transitionDuration = this.animationSpeed;

          if (nextIndex > (len - this.step) && nextIndex < len) {
            nextIndex = len - this.step;
          }

          if (nextIndex < 0) {
            nextIndex = 0;
          }

          let position =
            nextIndex /
            this.visibleItems *
            wrapItems.clientWidth;

          this.currentIndex = nextIndex;
          this.itemContainer.style.transform = `translateX(-${position}px)`;
          return;
        }

        const itemCount = this.itemContainer.children.length;

        if (direction === "prev" && nextIndex < 0) {
          nextIndex = itemCount + nextIndex;
        }

        if (direction === "next") {
          nextIndex = nextIndex % itemCount;
        }

        this.currentIndex = nextIndex;

        const width = nextIndex / this.visibleItems * wrapItems.clientWidth;
        this.itemContainer.style.transform = `translateX(-${width}px)`;
      }
    }
  },
  addClonedElements() {
    const items = Array.from(this.itemContainer.children);

    const firstItems = items.slice(0, this.visibleItems).map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add("cloned");
      return clone;
    });

    const lastItems = items
      .slice(items.length - this.visibleItems, items.length)
      .reverse()
      .map(item => {
        const clone = item.cloneNode(true);
        clone.classList.add("cloned");
        return clone;
      });

    lastItems.forEach(item =>
      this.itemContainer.insertBefore(item, this.itemContainer.firstChild)
    );

    firstItems.forEach(item => this.itemContainer.appendChild(item));
  }
};