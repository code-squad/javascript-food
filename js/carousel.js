function Carousel({ images, selector, dotSize, effect, positionOfPagination }) {
  this.images = images;

  this.options = {
    dotSize: dotSize || 'small',
    effect: effect || 'fade-in',
    positionOfPagination: positionOfPagination || 'bottom'
  }

  this.classNames = {
    buttonPrev: 'carousel__btn--prev',
    buttonNext: 'carousel__btn--next',
    itemContainer: 'carousel__items',
    pagination: 'carousel__pagination',
    dot: 'pagination__dot',
    dotActivated: 'pagination__dot--active'
  }

  this.container = document.querySelector(selector);
  this.itemContainer = this.container.querySelector(`.${this.classNames.itemContainer}`);
  this.pagination = this.container.querySelector(`.${this.classNames.pagination}`);
}

Carousel.prototype = {
  constructor: Carousel,

  init: function() {
    this.renderPagination();
    this.bindButtonEvent();
    this.bindPaginationEvent();

    this.itemContainer.children[0].classList.add(this.options.effect);
    this.pagination.children[0].classList.add(this.classNames.dotActivated);
  },
  renderPagination: function() {
    const itemCount = this.itemContainer.children.length;
    const paginationHTML = `<ol class="${this.classNames.pagination} ${this.classNames.pagination}--${this.options.positionOfPagination}"></ol>`;

    this.container.insertAdjacentHTML('beforeend', paginationHTML);
    this.pagination = this.container.querySelector(`.${this.classNames.pagination}`);

    for (let index = 0; index < itemCount; index++) {
      const dotHTML = this.getDotHTML({
        index,
        classes: `${this.classNames.dot} ${this.classNames.dot}--${this.options.dotSize}`
      });

      this.pagination.insertAdjacentHTML('beforeend', dotHTML);
    }
  },
  getDotHTML: function({ classes, index }) {
    return `<li class="${classes}" data-index="${index}"></li>`;
  },
  bindButtonEvent: function() {
    const buttonPrev = this.container.querySelector(`.${this.classNames.buttonPrev}`);
    const buttonNext = this.container.querySelector(`.${this.classNames.buttonNext}`);

    buttonPrev.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const nextIndex = (currentIndex === 0)
        ? this.images.length - 1
        : currentIndex - 1;

      this.showItem(nextIndex);
    });

    buttonNext.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const nextIndex = (currentIndex + 1) % this.images.length;

      this.showItem(nextIndex);
    });
  },
  bindPaginationEvent: function() {
    this.pagination.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.classNames.dot) === false) {
        return;
      }
      
      this.showItem(target.dataset.index);
    });
  },
  showItem: function(nextIndex) {
    const currentIndex = this.itemContainer.dataset.currentIndex;
    const items = this.itemContainer.children;
    const dots = this.pagination.children;

    items[currentIndex].classList.remove(this.options.effect);
    items[nextIndex].classList.add(this.options.effect);

    dots[currentIndex].classList.remove(this.classNames.dotActivated);
    dots[nextIndex].classList.add(this.classNames.dotActivated);

    this.itemContainer.dataset.currentIndex = nextIndex;
  }
}
