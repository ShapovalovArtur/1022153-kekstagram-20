'use strict';

(function () {

  var ESC_KEY = 'Escape';

  var picturesArr = [];
  var body = document.querySelector('body');
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicturePopup = document.querySelector('.big-picture');
  var bigPictureImage = bigPicturePopup.querySelector('img');
  var bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');
  var social = bigPicturePopup.querySelector('.big-picture__social');
  var socialHeader = social.querySelector('.social__caption');
  var likesCount = social.querySelector('.likes-count');
  var commentsCount = social.querySelector('.comments-count');
  var socialCommentsCount = social.querySelector('.social__comment-count');
  var commentsLoader = social.querySelector('.comments-loader');
  var commentInput = social.querySelector('.social__footer-text');

  var successLoadHandler = function (pictures) {
    picturesArr = pictures;
    picturesArr.forEach(function (element, i) {
      picturesList.appendChild(renderPicture(i));
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var closeBigPicturePopup = function () {
    bigPicturePopup.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  var closePopupButtonHandler = function () {
    document.removeEventListener('keydown', escKeyHandler);
    closeBigPicturePopup();
  };

  var escKeyHandler = function (evt) {

    if (commentInput === document.activeElement) {
      return;
    }
    if (evt.key === ESC_KEY) {
      document.removeEventListener('keydown', escKeyHandler);
      closeBigPicturePopup();
    }
  };


  var renderPicture = function (i) {
    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureLikes = picture.querySelector('.picture__likes');
    var pictureComments = picture.querySelector('.picture__comments');
    pictureImg.src = picturesArr[i].url;
    pictureLikes.textContent = picturesArr[i].likes;
    pictureComments.textContent = picturesArr[i].comments.length;
    picture.addEventListener('click', function () {
      renderBigPicture(i);
    });
    return picture;
  };

  var renderBigPicture = function (i) {
    bigPicturePopup.classList.remove('hidden');
    bigPictureClose.addEventListener('click', closePopupButtonHandler);
    document.addEventListener('keydown', escKeyHandler);
    bigPictureImage.src = picturesArr[i].url;
    socialHeader.textContent = picturesArr[i].description;
    likesCount.textContent = picturesArr[i].likes;
    commentsCount.textContent = picturesArr[i].comments.length;
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  };

  window.backend.load(successLoadHandler, errorHandler);


})();
