'use strict';

module.exports = function(url, callbackFunction) {
  var script = document.createElement('script');
  window.__jsonpCallback = callbackFunction;
  script.src = url + '/?callback=' + '__jsonpCallback';
  document.body.appendChild(script);
};
