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

var activeFilter = localStorage.getItem('defaultFilter') || Filter.POPULAR;

if (localStorage.getItem('checkedFilter') === 'true') {
  filters[activeFilter].setAttribute('checked', 'checked');
} else {
  filters[activeFilter].removeAttribute('checked');
}


// Подключение модуля для работы с данными по сети.
var load = require('./load');

// Подключние модуля показа фото в полноэкранном режиме при нажатии на фото из списка.
var gallery = require('./gallery');

// Подключние модуля c конструктором Picture.
var Picture = require('./picture');

/** @return {boolean} */
var isFooterVisible = function() {
  return footer.getBoundingClientRect().top - window.innerHeight <= GAP;
};

var renderPictures = function(loadedPictures) {
  if (loadedPictures.length === 0) {
    return;
  }

  loadedPictures.forEach(function(picture, indexPicture) {
    var newPicture = new Picture(picture, picturesContainer, indexPicture);
    newPicture.showGallery();
  });

  // Передача в объект галереи фотографии.
  gallery.setPictures(loadedPictures);

  if (isFooterVisible()) {
    loadPictures(activeFilter, ++pageNumber);
  }
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
  if (evt.target.classList.contains('filters-radio')) {
    changeFilter(evt.target.id);
    // Сохранение последнего примененного фильтра в localStorage
    localStorage.setItem('defaultFilter', evt.target.id);
    localStorage.setItem('checkedFilter', evt.target.checked);
  }
});

// Добавляем обработчик события scroll, который по достижении низа страницы
// вызывает отрисовку следующего блока фото.
var lastCall = Date.now();

window.addEventListener('scroll', function() {
  // Проверка обработчика будет срабатывать не чаще, чем раз в 100 мсек.
  if (Date.now() - lastCall >= THROTTLE_TIMEOUT) {
    // Если виден футер, отрисовываем следующую страницу.
    if (isFooterVisible()) {
      loadPictures(activeFilter, ++pageNumber);
    }

    lastCall = Date.now();
  }
});

changeFilter(activeFilter);
