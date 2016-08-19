'use strict';

var pictures = [];

// Создание функции, с помощью которой выполняются JSONP запросы.
window.__jsonpCallback = function(data) {
  pictures = data;
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};

function createScript(url, callbackFunction) {
  var script = document.createElement('script');
  script.src = url + '/?callback=' + callbackFunction;
  document.body.appendChild(script);
}

createScript('http://localhost:1506/api/pictures', '__jsonpCallback');


// Прячем блок с фильтрами.
var filtersBlock = document.querySelector('.filters');
filtersBlock.classList.add('hidden');

// Генерация списка фотографий на главной странице.
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('#picture-template');
var elementToClone;
var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var IMAGE_LOAD_TIMEOUT = 10000;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);

  var backgroundImage = new Image();
  var imgElement = element.querySelector('img');
  var backgroundLoadTimeout;

  backgroundImage.onload = function(event) {
    clearTimeout(backgroundLoadTimeout);
    imgElement.src = event.target.src;
    imgElement.width = IMAGE_WIDTH;
    imgElement.height = IMAGE_HEIGHT;
  };

  backgroundImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  backgroundLoadTimeout = setTimeout(function() {
    imgElement.src = '';
    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  backgroundImage.src = data.url;
  return element;
};

// Отображаем блок с фильтрами.
filtersBlock.classList.remove('hidden');
