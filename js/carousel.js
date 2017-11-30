function Carousel(params) {
  this.images = params.images;
  this.imageType = params.imageType;
  this.dotStyle = params.dotStyle;
  this.container = document.querySelector(params.selector);
  this.itemContainer = this.container.querySelector('.carousel__items');
  this.pagination = this.container.querySelector('.carousel__pagination');
  this.buttonPrev = this.container.querySelector('.carousel__btn--prev');
  this.buttonNext = this.container.querySelector('.carousel__btn--next');
}

Carousel.prototype = {
  constructor: Carousel,

  init: function() {
    this.renderItems();
    this.renderPagination();
    this.bindButtonEvent();
    this.bindPaginationEvent();

    this.itemContainer.children[0].classList.add('fade-in');
    this.pagination.children[0].classList.add('pagination__dot--active');
  },
  renderItems: function() {
    this.images.forEach(item => {
      const newItem = document.createElement('li');
      const imageElement = document.createElement('img');

      if (this.imageType === 'background') {
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

      newItem.classList.add('pagination__dot');
      newItem.classList.add(`pagination__dot--${this.dotStyle}`);

      this.pagination.appendChild(newItem);
    }
  },
  bindButtonEvent: function() {
    this.buttonPrev.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const nextIndex = (currentIndex === 0)
        ? this.images.length - 1
        : currentIndex - 1;

      this.showItem(nextIndex);
    });

    this.buttonNext.addEventListener('click', (evt) => {
      const currentIndex = parseInt(this.itemContainer.dataset.currentIndex);
      const nextIndex = (currentIndex + 1) % this.images.length;

      this.showItem(nextIndex);
    });
  },
  bindPaginationEvent: function() {
    this.pagination.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('pagination__dot')) return;

      this.showItem(evt.target.dataset.index);
    });
  },
  showItem: function(nextIndex) {
    const currentIndex = this.itemContainer.dataset.currentIndex;

    this.itemContainer.children[currentIndex].classList.remove('fade-in');
    this.itemContainer.children[nextIndex].classList.add('fade-in');

    this.pagination.children[currentIndex].classList.remove('pagination__dot--active');
    this.pagination.children[nextIndex].classList.add('pagination__dot--active');

    this.itemContainer.dataset.currentIndex = nextIndex;
  }
}
