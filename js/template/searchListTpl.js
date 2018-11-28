function highlightElmentTpl(value){
    return `<b>${value}</b>`;
}

function relatedQueryTpl(inputvalue, relatedValue){
    return `<li class="relatedValue">${relatedValue}</li>`.replace(RegExp(inputvalue,'g'), highlightElmentTpl(inputvalue))
}

function searchListTpl(searchListData){
    const [ inputValue,relatedValues ] = searchListData;
    return relatedValues.reduce((prev,curr) => prev.concat(relatedQueryTpl(inputValue,curr)),'');
}

export { searchListTpl }