/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
$(document).ready(function () {
  $('.order-form__select-item').click(function () {
    if (!$(this).hasClass('active')) {
      $('.order-form__select-item').removeClass('active');
      $(this).addClass('active');
      activatedOffers();
    }
  });
  $('.order-form__payment-item').click(function () {
    if (!$(this).hasClass('active')) {
      $('.order-form__payment-item').removeClass('active');
      $(this).addClass('active');
    }
  });
  $('.order-form__delivery').click(function () {
    $(this).toggleClass('active');
  });
  $('.order-form__select-item-bottom-option-item').on('click', function () {
    $(this).closest('.order-form__select-item-bottom-option').find('.order-form__select-item-bottom-option-item').removeClass('active');
    $(this).addClass('active');
    activatedOffers();
  });
  let mainOffer = '';
  let secondOffer = '';
  let activeOffers = '';
  function activatedOffers() {
    mainOffer = $('.order-form__select-item.active').data('value') ?? '';
    mainOffer = mainOffer !== null && mainOffer.length > 0 ? mainOffer + ', ' : '';
    secondOffer = $(".order-form__select-item.active .order-form__select-item-bottom-option-item.active").map(function () {
      return $(this).attr("data-color");
    }).get();
    secondOffer = secondOffer !== null && secondOffer.length > 0 ? secondOffer + ', ' : '';
    activeOffers = mainOffer + secondOffer;
    sendComment();
  }
  $('form').change(sendComment);
  function sendComment() {
    price = parseInt($('.active .order-form__select-price-new').text());
    $('[name=quantity]').val($('[data-qty_invoice].active').data('qty_invoice'));
    comment = activeOffers;
    console.log(comment);
  }

  $('form').submit(function(){
    $('.order-status__lb').addClass('order-status__lb--active');
  });

});
/******/ })()
;
//# sourceMappingURL=main.js.map