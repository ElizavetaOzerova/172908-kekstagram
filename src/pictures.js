'use strict';

var pictures = [];
var picturesContainer = document.querySelector('.pictures');

// Подключение модуля для работы с данными по сети.
// Подключение модуля отрисовки одной фотографии.
var load = require('./load');
var getPictureElement = require('./picture');

load('http://localhost:1506/api/pictures', '__jsonpCallback');

window.__jsonpCallback = function(data) {
  pictures = data;
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};
