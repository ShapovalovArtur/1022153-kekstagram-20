'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var getRandomNumber = function (minValue, maxValue) {
    return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    getRandomNumber: getRandomNumber
  };
})();
