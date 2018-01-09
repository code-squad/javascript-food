const food = {
  method: {
    refreshDetail(targetNumber) {
      const { items } = food.bestSideDish[targetNumber];

      Array.from(document.querySelectorAll(`.tabui__content-media`)).forEach(
        (v, i) => {
          const { alt, image, description, title, n_price, s_price } = items[i];
          const { nextElementSibling: siblingNode } = v;
          const result = { title, description, n_price, s_price };

          v.src = image;
          v.alt = alt;

          siblingNode.innerHTML = food.template.contentDetail.index(result);
        }
      );
    },

    emitRefresh(target) {
      const tabui__list_item = document.querySelectorAll(`.tabui__list-item`);
      let targetNumber = null;

      if (target.className === "tabui__list-item") {
        targetNumber = parseInt(target.dataset.key);
      } else {
        food.bestSideDish.some(({ name }, i) => {
          if (target.innerHTML === name) {
            targetNumber = i;
            return true;
          }
        });
      }

      Array.from(tabui__list_item).some((v, i) => {
        if (v.classList.contains(`tabui__list-item--selected`)) {
          v.classList.remove(`tabui__list-item--selected`);
          return true;
        }
      });

      this.assignEffect(targetNumber);
      this.refreshDetail(targetNumber);
    },

    insertName() {
      const tabui__header = document.querySelectorAll(`.tabui__header`);

      food.bestSideDish.forEach(({ name }, i) => {
        tabui__header[i].innerHTML = name;
      });
    },

    assignEffect(targetNumber) {
      document
        .querySelector(`.tabui__list`)
        .querySelectorAll(`.tabui__list-item`)
        [targetNumber].classList.add(`tabui__list-item--selected`);
    },

    afterFetch(jsonData) {
      food.bestSideDish = jsonData;

      let targetNumber = Math.floor(Math.random() * jsonData.length);

      this.insertName();
      this.assignEffect(targetNumber);
      this.refreshDetail(targetNumber);

      document
        .querySelector(`.tabui__list`)
        .addEventListener(`click`, ({ target }) => {
          this.emitRefresh(target);
        });
    }
  },

  template: {
    contentDetail: {
      title(title) {
        return `<h3 class="tabui__content-detail-title">${title}</h3>`;
      },

      description(description) {
        return `
          <p class="tabui__content-detail-description">
            ${description}
          </p>
        `;
      },

      price(n_price, s_price) {
        let result = null;

        if (n_price) {
          result = `
            <p class="tabui__content-detail-price">
              <span class="tabui__content-detail-n_price">
                ${n_price}
              </span>
              <span class="tabui__content-detail-s_price">
                ${s_price}
              </span>
            </p>
          `;
        } else {
          result = `
            <p class="tabui__content-detail-price">
              <span class="tabui__content-detail-s_price">${s_price}</span>
            </p>
          `;
        }

        return result;
      },

      index({ title, description, n_price, s_price }) {
        const {
          title: titleText,
          description: descriptionText,
          price: priceText
        } = this;
        const result =
          titleText(title) +
          descriptionText(description) +
          priceText(n_price, s_price);

        return result;
      }
    }
  }
};

document.addEventListener(`DOMContentLoaded`, _ => {
  fetch(`http://crong.codesquad.kr:8080/woowa/best`).then(response => {
    response.json().then(jsonData => food.method.afterFetch(jsonData));
  });
});
