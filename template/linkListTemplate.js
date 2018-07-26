const singleLinkTextTemplate = data => `<a href="${data.url}"><span>${data.text}</span></a>`;

const dropdownListTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
    <li class="dropdown-list-item ${c.className}">
      <a href="${c.url}">
        <span>${c.text}</span>
      </a>
    </li>`),
    ""
  );

export const dropdownTemplate = data =>
  `<a class="dropdown-trigger" id="${data.triggerId}">
  ${data.triggerText}<span class="ic-dropdown">&nbsp;</span>
  </a>
  <ul class="dropdown" id="${data.dropdownId}">
  ${dropdownListTemplate(data.dropdown)}
  </ul>
  `;

const templates = {
  link: singleLinkTextTemplate,
  dropdown: dropdownTemplate,
};

export const userMenuTemplate = data => {
  const templateResult = data.reduce(
    (ac, c) =>
      (ac += `<li class="list-item left">
     ${templates[c.type](c)}
    </li>`),
    ""
  );
  return templateResult;
};

const mainSubMenuTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `<li class="sub-list-item">
      <a href="${c.url}">
        <span>${c.text}</span>
        </a>
    </li>`),
    ""
  );

export const mainMenuTemplate = data => {
  const templateResult = data.reduce((ac, { url, text, subMenuList }) => {
    const subMenuTemplate = mainSubMenuTemplate(subMenuList);
    return (ac += `<li class="list-item">
            <a class="main-menu" href="${url}">
              <span >${text}</span>
            </a>
          <ul class="sub-menu-list">${subMenuTemplate}</ul>
        </li>`);
  }, "");
  return templateResult;
};

export const specialMenuTemplate = data => {
  const templateResult = data.reduce(
    (ac, c) =>
      (ac += `<li class="link-item left">
      <a href="${c.url}">
          <img src="${c.imgUrl}" alt="${c.alt}">
      </a>
    </li>`),
    ""
  );
  return templateResult;
};

export const tabBtnTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `<li class="list-item">
    <a href="${c.url}">${c.text} </a>
  </li>`),
    ""
  );
