function highlightElmentTpl(value) {
    return `<b>${value}</b>`;
}

function relatedQueryTpl(inputvalue, relatedValue) {
    return `<li class="relatedValue">${relatedValue}</li>`.replace(RegExp(inputvalue, 'g'), highlightElmentTpl(inputvalue))
}

function searchListTpl(searchListData) {
    const maxContentCount = 10;
    let [inputValue, relatedValues] = searchListData;
    relatedValues = relatedValues.length > maxContentCount ? relatedValues.slice(0, maxContentCount) : relatedValues;
    return relatedValues.reduce((prev, curr) => prev.concat(relatedQueryTpl(inputValue, curr)), '');
}

export { searchListTpl }