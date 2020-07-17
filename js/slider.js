
'use strict';

(function () {
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var effectPin = uploadOverlay.querySelector('.effect-level__pin');
  var barInput = uploadOverlay.querySelector('.effect-level__value');
  var effectDepth = uploadOverlay.querySelector('.effect-level__depth');
  var ratio;

  var sliderMoveHandler = function (evt) {
    var startX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startX - moveEvt.clientX;

      startX = moveEvt.clientX;
      var position = effectPin.offsetLeft - shift;
      var parentWidth = evt.target.parentNode.offsetWidth;

      if (position < 0) {
        position = 0;
      }

      if (position > parentWidth) {
        position = parentWidth;
      }

      ratio = Math.round(position / parentWidth * 100);
      effectPin.style.left = position + 'px';
      effectDepth.style.width = ratio + '%';
      barInput.value = ratio;
      window.slider = ratio;
      window.form.effectChangeHandler();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  effectPin.addEventListener('mousedown', sliderMoveHandler);

})();
