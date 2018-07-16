export const dropdownTemplate = (data) => {
  const templateResult = data.reduce((ac, c) => ac +=
  `<li class="${c.className}"><a href="${c.url}">${c.text}</a></li>`, '');
  return templateResult;
};