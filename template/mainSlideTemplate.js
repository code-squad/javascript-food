export const mainSlideTemplate = data =>
  data.reduce(
    (ac, c) =>
      (ac += `
    <li>
      <a href="#">
        <img src="${c.imgSrc}" alt="${c.alt}">
      </a>
    </li>`),
    '',
  );

export const slidEButtonTemplate = `
<ul class="slide-button-list">
<li>
  <a class="left-button"></a>
</li>
<li>
  <a class="right-button"></a>
</li>
</ul>
`;
