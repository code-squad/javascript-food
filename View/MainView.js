const vm = new MainViewModel(Model);

const mainNaviList = document.querySelector('.main_navi_list');
const mainNaviListChildNodes = mainNaviList.childNodes;

mainNaviListChildNodes.forEach((element) => {
    if (element.nodeName === 'LI') {
        vm.registerHoverEvent(element);
    }
});

console.log("Success Load MainView.js");