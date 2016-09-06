'use strict';

var picturesContainer = document.querySelector('.pictures');
var filters = document.querySelector('.filters');
var footer = document.querySelector('footer');

var PICTURES_LOAD_URL = 'http://localhost:1506/api/pictures';
var PAGE_SIZE = 12;
var GAP = 100;
var THROTTLE_TIMEOUT = 100;
var pageNumber = 0;

var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};

var activeFilter = Filter.POPULAR;

// Подключение модуля для работы с данными по сети.
var load = require('./load');

// Подключние модуля показа фото в полноэкранном режиме при нажатии на фото из списка.
var gallery = require('./gallery');

// Подключние модуля c конструктором Picture.
var Picture = require('./picture');


var renderPictures = function(loadedPictures) {
  loadedPictures.forEach(function(picture, indexPicture) {
    var newPicture = new Picture(picture, picturesContainer, indexPicture);
    newPicture.showGallery();
  });

  // Передача в объект галереи фотографии.
  gallery.setPictures(loadedPictures);
};

var loadPictures = function(filter, currentPageNumber) {
  load(PICTURES_LOAD_URL, {
    from: currentPageNumber * PAGE_SIZE,
    to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
    filter: filter
  }, renderPictures);
};

var changeFilter = function(filterID) {
  picturesContainer.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  loadPictures(filterID, pageNumber);
};

filters.addEventListener('click', function(evt) {
  changeFilter(evt.target.id);
});

// Добавляем обработчик события scroll, который по достижении низа страницы
// вызывает отрисовку следующего блока фото.
var lastCall = Date.now();

window.addEventListener('scroll', function() {
  // Проверка обработчика будет срабатывать не чаще, чем раз в 100 мсек.
  if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
    // Если виден футер, отрисовываем следующую страницу.
    if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
      loadPictures(activeFilter, pageNumber++);
    }

    lastCall = Date.now();
  }
});

changeFilter(activeFilter);
