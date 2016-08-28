'use strict';

var IMAGE_WIDTH = 182;
var IMAGE_HEIGHT = 182;
var IMAGE_LOAD_TIMEOUT = 10000;

var templateElement = document.querySelector('#picture-template');
var filtersBlock = document.querySelector('.filters');
var elementToClone;

// Прячем блок с фильтрами.
filtersBlock.classList.add('hidden');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

module.exports = function(data, container) {
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
