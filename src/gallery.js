'use strict';

// Создание конструктора Gallery (отвечает за показ фотографий).
var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;

  this.galleryElement = document.querySelector('.gallery-overlay');
  this.closeButton = document.querySelector('.gallery-overlay-close');
  this.pictureElement = document.querySelector('.gallery-overlay-image');
  this.likes = document.querySelector('.likes-count');
  this.comments = document.querySelector('.comments-count');

  // Привязка контекста обработки событий к объекту Gallery.
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onPictureClick = this.onPictureClick.bind(this);
};

// Описание методов объекта в прототипе конструктора Gallery.

// Получение списка фотографий для объекта Gallery.
Gallery.prototype.setPictures = function(pictures) {
  this.pictures = pictures;
};

// Показ галереи.
Gallery.prototype.show = function(indexPicture) {
  this.closeButton.addEventListener('click', this.onCloseClick);
  this.pictureElement.addEventListener('click', this.onPictureClick);

  this.galleryElement.classList.remove('invisible');

  this.setActivePicture(indexPicture);
};

// Скрытие галереи и удаление обработчиков ее событий.
Gallery.prototype.hide = function() {
  this.galleryElement.classList.add('invisible');

  this.closeButton.removeEventListener('click', this.onCloseClick);
  this.pictureElement.removeEventListener('click', this.onPictureClick);
};

// Установка текущей фотографии по ее индексу в массиве pictures,
// получение количества лайков и комментариев для показанной фотографии.
Gallery.prototype.setActivePicture = function(indexPicture) {
  this.activePicture = indexPicture;
  this.pictureElement.src = this.pictures[indexPicture].url;
  this.likes.textContent = this.pictures[indexPicture].likes;
  this.comments.textContent = this.pictures[indexPicture].comments;
};

Gallery.prototype.onCloseClick = function() {
  this.hide();
};

Gallery.prototype.onPictureClick = function() {
  var nextIndexPicture = this.activePicture < this.pictures.length - 1 ? this.activePicture + 1 : 0;
  this.setActivePicture(nextIndexPicture);
};

module.exports = new Gallery();
