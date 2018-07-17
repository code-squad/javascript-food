export const textLinkTemplate = (data) => {
  const templateResult = data.reduce((ac, c) => ac +=
   `<li class="list-item">
        <a href="${c.url}">
            <span>${c.text}</span>
        </a>
    </li>`, '');
  return templateResult;
};

const mainSubMenuTemplate = (data)=>{
  return data.reduce((ac, c) => ac +=
   `<li class="sub-list-item">
      <a href="${c.url}">
        <span>${c.text}</span>
        </a>
    </li>`, '');
}

export const mainMenuTemplate = (data) => {
  const templateResult = data.reduce((ac, {url, text, subMenuList}) => {
    const subMenuTemplate = mainSubMenuTemplate(subMenuList)
    return ac +=`<li class="list-item">
            <a class="main-menu" href="${url}">
              <span >${text}</span>
            </a>
          <ul class="sub-menu-list">${subMenuTemplate}</ul>
        </li>`}, '');
  return templateResult;
};

export const specialMenuTemplate = (data) => {
  const templateResult = data.reduce((ac, c) => ac +=
   `<li class="link-item left">
      <a href="${c.url}">
          <img src="${c.imgUrl}" alt="${c.alt}">
      </a>
    </li>`, '');
  return templateResult;
};

// template문자열만 바꾸면 같은 함수 !