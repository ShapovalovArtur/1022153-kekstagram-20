'use strict';

var COMMENTS_MIN = 2;
var COMMENTS_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var URL_NAME_MIN = 1;
var URL_NAME_MAX = 25;
var AVATAR_NAME_MIN = 1;
var AVATAR_NAME_MAX = 6;
var PHOTOS_NUMBER = 25;
var NAMES = ['Андрей', 'Артем', 'Александр', 'Антон', 'Анатолий'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Какой чудесный день!',
  'Какой чудесный пень!',
  'Какой чудесный я!',
  'И песенка моя!',
  'Потрясающе!',
  'Отвратительно!'
];

var photos = [];

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
};

var makeAvatar = function () {
  return 'img/avatar-' + getRandomNumber(AVATAR_NAME_MIN, AVATAR_NAME_MAX) + '.svg';
};

var makeUrl = function () {
  return 'photos/' + getRandomNumber(URL_NAME_MIN, URL_NAME_MAX) + '.jpg';
};

var getCommentName = function () {
  return NAMES[(getRandomNumber(0, NAMES.length - 1))];
};

var getMessage = function () {
  return MESSAGES[(getRandomNumber(0, MESSAGES.length - 1))];
};

var createComments = function () {
  var commentsNumber = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  var comments = [];
  for (var i = 0; i < commentsNumber; i++) {
    comments[i] = {
      avatar: makeAvatar(),
      message: getMessage(),
      name: getCommentName()
    };
  }
  return comments;
};

var createPhoto = function () {
  var photo = {
    url: makeUrl(),
    description: DESCRIPTIONS[(getRandomNumber(0, DESCRIPTIONS.length - 1))],
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: createComments()
  };
  return photo;
};

var createPhotos = function () {
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos.push(createPhoto());
  }
  return photos;
};

var picturesArr = createPhotos();
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

for (var i = 0; i < picturesArr.length; i++) {
  picturesList.appendChild(renderPicture(i));
}
