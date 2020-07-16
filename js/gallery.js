'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesArr = window.data.createPhotos();

  var renderPicture = function (i) {
    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureLikes = picture.querySelector('.picture__likes');
    var pictureComments = picture.querySelector('.picture__comments');
    pictureImg.src = picturesArr[i].url;
    pictureLikes.textContent = picturesArr[i].likes;
    pictureComments.textContent = picturesArr[i].comments.length;
    return picture;
  };

  picturesArr.forEach(function (element, i) {
    picturesList.appendChild(renderPicture(i));
  });
})();
