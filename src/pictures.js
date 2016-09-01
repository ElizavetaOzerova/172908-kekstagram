'use strict';

var pictures = [];
var picturesContainer = document.querySelector('.pictures');

// Подключение модуля для работы с данными по сети.
var load = require('./load');

// Подключние модуля показа фото в полноэкранном режиме при нажатии на фото из списка.
var gallery = require('./gallery');

// Подключние модуля c конструктор Picture.
var Picture = require('./picture');

var callback = function(data) {
  pictures = data;
  pictures.forEach(function(picture, indexPicture) {
    var newPicture = new Picture(picture, picturesContainer, indexPicture);
    newPicture.showGallery();
  });

  // Передача в объект галереи фотографии.
  gallery.setPictures(pictures);
};

load('http://localhost:1506/api/pictures', callback);
