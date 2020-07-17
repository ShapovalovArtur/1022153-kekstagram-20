'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var body = document.querySelector('body');
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

  var openBigPicturePopup = function () {
    bigPicturePopup.classList.remove('hidden');
    bigPictureClose.addEventListener('click', closePopupButtonHandler);
    document.addEventListener('keydown', escKeyHandler);
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  };

  var renderBigPicture = function (i, picturesArr) {
    bigPictureImage.src = picturesArr[i].url;
    socialHeader.textContent = picturesArr[i].description;
    likesCount.textContent = picturesArr[i].likes;
    commentsCount.textContent = picturesArr[i].comments.length;
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

  var previewClickHandler = function (picture, i, picturesArr) {
    renderBigPicture(i, picturesArr);
    openBigPicturePopup();
  };

  window.preview = {
    previewClickHandler: previewClickHandler
  };
})();
