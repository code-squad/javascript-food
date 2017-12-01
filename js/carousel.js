function Carousel({ images, selector, imageType, dotStyle }) {
  this.images = images;
  
  this.options = {
    imageType,
    dotStyle: dotStyle || 'small',
    effect: effect || 'fade-in'
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
    this.renderItems();
    this.renderPagination();
    this.bindButtonEvent();
    this.bindPaginationEvent();

    this.itemContainer.children[0].classList.add(this.options.effect);
    this.pagination.children[0].classList.add(this.options.dotActivated);
  },
  renderItems: function() {
    this.images.forEach(item => {
      const newItem = document.createElement('li');
      const imageElement = document.createElement('img');

      if (this.options.imageType === 'background') {
        newItem.style = `background-image: url('${item}');`;
      } else {
        imageElement.setAttribute('src', item);
        newItem.appendChild(imageElement);
      }

      this.itemContainer.appendChild(newItem);
    });
  },
  renderPagination: function() {
    for (let i = 0; i < this.images.length; i++) {
      const newItem = document.createElement('li');
      newItem.dataset.index = i;

      newItem.classList.add(this.classNames.dot);
      newItem.classList.add(`${this.classNames.dot}--${this.dotStyle}`);

      this.pagination.appendChild(newItem);
    }
  },
  bindButtonEvent: function() {
    const buttonPrev = this.container.querySelector(btnPrev);
    const buttonNext = this.container.querySelector(btnNext);

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
      if (!target.classList.contains(this.classNames.dot)) return;

      this.showItem(target.dataset.index);
    });
  },
  showItem: function(nextIndex) {
    const currentIndex = this.itemContainer.dataset.currentIndex;
    const items = this.itemContainer.children;
    const dots = this.pagination.children;

    items[currentIndex].classList.remove(this.options.effect);
    items[nextIndex].classList.add(this.options.effect);

    dots[currentIndex].classList.remove(this.options.dotActivated);
    dots[nextIndex].classList.add(this.options.dotActivated);

    this.itemContainer.dataset.currentIndex = nextIndex;
  }
}
