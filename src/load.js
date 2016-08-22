'use strict';

(function() {
  module.exports = function(url, callbackName) {
    var script = document.createElement('script');
    script.src = url + '/?callback=' + callbackName;
    document.body.appendChild(script);
  };
})();
