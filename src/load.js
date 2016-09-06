'use strict';

var load = function(urlRequest, params, getPictures) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    // Функция-коллбэк, которая вызывается по успешному завершению загрузки.
    getPictures(loadedData);
  };

  xhr.open('GET', urlRequest +
      '?from=' + (params.from || 0) +
      '&to=' + (params.to || Infinity) +
      '&filter=' + (params.filter || 'default'));

  // Отправляем запрос на сервер
  xhr.send();
};

module.exports = load;
