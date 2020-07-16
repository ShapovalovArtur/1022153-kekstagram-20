'use strict';
(function () {
  var uploadOpen = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadOverlay.querySelector('.img-upload__cancel');
  var effectPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectPinValue = uploadOverlay.querySelector('.effect-level__value').value;
  var body = document.querySelector('body');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var effectsList = uploadOverlay.querySelector('.effects__list');
  var currentEffect = '';
  var sliderBar = uploadOverlay.querySelector('.img-upload__effect-level');
  var hashtags = [];
  var hashtagsInput = uploadOverlay.querySelector('.text__hashtags');

  var getGrayscale = function (currentEffectPinValue) {
    return 'grayscale(' + 0.01 * currentEffectPinValue + ')';
  };

  var getSepia = function (currentEffectPinValue) {
    return 'sepia(' + 0.01 * currentEffectPinValue + ')';
  };

  var getInvert = function (currentEffectPinValue) {
    return 'invert(' + currentEffectPinValue + '%)';
  };

  var getBlur = function (currentEffectPinValue) {
    return 'blur(' + currentEffectPinValue * 0.03 + 'px)';
  };

  var getBrightness = function (currentEffectPinValue) {
    return 'brightness(' + 0.03 * currentEffectPinValue + ')';
  };

  var effect = {
    chrome: getGrayscale,
    sepia: getSepia,
    marvin: getInvert,
    phobos: getBlur,
    heat: getBrightness
  };

  var checkHashtag = function (str) {
    var reg = /#[\w\dА-я]+$/;
    return reg.test(str);
  };

  var saveEffectValue = function () {
    uploadOverlay.querySelector('.effect-level__value').value = effectPinValue;
  };

  var popupEscHandler = function (evt) {
    if (hashtagsInput === document.activeElement) {
      return;
    }
    if (evt.key === window.util.ESC_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', popupEscHandler);
    body.classList.add('modal-open');
    sliderBar.style.display = 'none';
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', popupEscHandler);
    uploadOpen.value = null;
    body.classList.remove('modal-open');
  };

  var filterChangeHandler = function (evt) {
    uploadPreview.style.filter = '';
    effectPinValue = window.data.DEFAULT_EFFECT_VALUE;
    saveEffectValue();
    uploadPreview.classList.remove('effects__preview--' + currentEffect);
    currentEffect = evt.target.value;
    uploadPreview.classList.add('effects__preview--' + currentEffect);
    sliderBar.style.display = '';
    if (currentEffect === 'none') {
      sliderBar.style.display = 'none';
    }
  };

  var getEffect = function () {
    var currentEffectValue = effect[currentEffect](effectPinValue);
    uploadPreview.style.filter = currentEffectValue;
  };

  var effectChangeHandler = function () {
    effectPinValue = window.util.getRandomNumber(0, 100);
    getEffect(currentEffect);
    saveEffectValue();
  };

  var hashtagsValidateHandler = function () {
    hashtags = hashtagsInput.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '') {
        hashtags.splice(i, 1);
        i--;
      }
    }
    hashtags.forEach(function (element) {
      if (hashtags.length > window.data.MAX_HASHTAGS) {
        hashtagsInput.setCustomValidity('Максимум ' + window.data.MAX_HASHTAGS + ' хэштегов');
      } else if (element && element.charAt(0) !== '#') {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
      } else if (element.length === window.data.MIN_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Надо что-то написать после решетки');
      } else if (!checkHashtag(element)) {
        hashtagsInput.setCustomValidity('После решетки можно использовать только буквы и цифры');
      } else if (element.length > window.data.MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Не более ' + window.data.MAX_HASHTAG_LENGTH + ' символов на хэштег');
      } else if (hashtags.indexOf(element) !== hashtags.lastIndexOf(element)) {
        hashtagsInput.setCustomValidity('Хэштеги не должны повторяться!');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    });

  };

  uploadOpen.addEventListener('change', function () {
    openPopup();
  });

  uploadClose.addEventListener('click', function () {
    closePopup();
  });

  effectsList.addEventListener('change', filterChangeHandler);
  effectPin.addEventListener('mouseup', effectChangeHandler);
  hashtagsInput.addEventListener('input', hashtagsValidateHandler);
})();
