'use strict';

var pictures = [];

var __jsonpCallback = function(data) {
  pictures = data;
};

function createScript(url, callbackFunction) {
  var script = document.createElement('script');
  script.src = url;
  document.appendChild('script');
}

createScript('http://localhost:1506/api/pictures?callback=<__jsonpCallback>', __jsonpCallback);
