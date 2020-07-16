'use strict';

(function () {
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

  var MIN_HASHTAG_LENGTH = 1;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS = 5;
  var DEFAULT_EFFECT_VALUE = 100;

  var photos = [];

  var makeAvatar = function () {
    return 'img/avatar-' + window.util.getRandomNumber(AVATAR_NAME_MIN, AVATAR_NAME_MAX) + '.svg';
  };

  var makeUrl = function () {
    return 'photos/' + window.util.getRandomNumber(URL_NAME_MIN, URL_NAME_MAX) + '.jpg';
  };

  var getCommentName = function () {
    return NAMES[(window.util.getRandomNumber(0, NAMES.length - 1))];
  };

  var getMessage = function () {
    return MESSAGES[(window.util.getRandomNumber(0, MESSAGES.length - 1))];
  };

  var createComments = function () {
    var commentsNumber = window.util.getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
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
      description: DESCRIPTIONS[(window.util.getRandomNumber(0, DESCRIPTIONS.length - 1))],
      likes: window.util.getRandomNumber(LIKES_MIN, LIKES_MAX),
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

  window.data = {
    createPhotos: createPhotos,
    DEFAULT_EFFECT_VALUE: DEFAULT_EFFECT_VALUE,
    MAX_HASHTAGS: MAX_HASHTAGS,
    MIN_HASHTAG_LENGTH: MIN_HASHTAG_LENGTH,
    MAX_HASHTAG_LENGTH: MAX_HASHTAG_LENGTH
  };
})();
