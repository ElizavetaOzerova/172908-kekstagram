'use strict';

var pictures = [];

window.__jsonpCallback = function(data) {
  pictures = data;
};

function createScript(url, callbackFunction) {
  var script = document.createElement('script');
  script.src = url + '/?callback=' + callbackFunction;
  document.body.appendChild(script);
}

createScript('http://localhost:1506/api/pictures', '__jsonpCallback');
