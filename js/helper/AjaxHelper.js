
import { $on } from './helper.js';

const AjaxHelper = (function (){
  
 const init = function(){
  if (window.XMLHttpRequest) return new XMLHttpRequest();
  else return ActiveXObject('Microsoft.XMLHTTP');
 } 
  
  const reqListener = function(httpRequest){
    return JSON.parse(httpRequest.responseText)
  }
  
  const sendReq = function({method, url, successCallback}){
    const httpRequest = init();
    $on(httpRequest, 'load', ()=>successCallback(reqListener(httpRequest)));
    httpRequest.open(method, url);
    httpRequest.send();
  }

  return {
    sendReq,
  }
  

})();

export default AjaxHelper;

