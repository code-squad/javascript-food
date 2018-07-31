export const paginationTemplate = data =>
  data.reduce(
    (ac, c, ci) =>
      (ac += `
      <li  class="page-btn" >
        <a data-id="page-${ci}" href="#">
        ${c}
        </a>
      </li>
    `),
    ""
  );