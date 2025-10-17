/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
$(document).ready(function () {
  initAccordion();
  initSection1Swiper();
  initSection3Swiper();
  initSection6Swiper();
  initSection11Swiper();
  initStickyBlock();
  initForm();
  initAnchor();
});
function initAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
function initForm() {
  $('.form__select-item').click(function () {
    if (!$(this).hasClass('active')) {
      $('.form__select-item').removeClass('active');
      $(this).addClass('active');
      activatedOffers();
    }
  });
  let mainOffer = '';
  let activeOffers = '';
  function activatedOffers() {
    mainOffer = $('.form__select-item.active').data('value') ?? '';
    mainOffer = mainOffer !== null && mainOffer.length > 0 ? mainOffer + ', ' : '';
    activeOffers = mainOffer;
  }
}
function initAccordion() {
  const accButtons = document.querySelectorAll('.faq__accordion-button');
  accButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      item.classList.toggle('active');
    });
  });
}
function initSection1Swiper() {
  const section1Swiper = new Swiper(".section1__swiper", {
    spaceBetween: 9,
    centeredSlides: false,
    loop: true,
    pagination: {
      el: ".section1__swiper-pagination",
      clickable: true
    }
  });
}
function initSection11Swiper() {
  const sectio11Swiper = new Swiper('.section11__swiper', {
    spaceBetween: 50,
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.section11__swiper-pagination'
    },
    navigation: {
      nextEl: '.section11__swiper-button-next',
      prevEl: '.section11__swiper-button-prev'
    }
  });
}
function initSection3Swiper() {
  const section3Swiper = new Swiper('.section3__swiper', {
    autoHeight: true,
    spaceBetween: 50,
    loop: true,
    speed: 600,
    pagination: {
      el: '.section3__swiper-pagination'
    }
  });
}
function initSection6Swiper() {
  const section6Swiper = new Swiper('.section6__swiper', {
    autoHeight: true,
    spaceBetween: 50,
    pagination: {
      el: '.section6__swiper-pagination'
    },
    navigation: {
      nextEl: '.section6__swiper-button-next',
      prevEl: '.section6__swiper-button-prev'
    }
  });
}
function initStickyBlock() {
  const scrollBtn = document.querySelector('.sticky-block');
  const targetBlock = document.getElementById('form');
  window.addEventListener('scroll', checkVisibility);
  function checkVisibility() {
    const rect = targetBlock.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      scrollBtn.style.display = 'none';
    } else {
      scrollBtn.style.display = 'flex';
    }
  }
}
/******/ })()
;
//# sourceMappingURL=main.js.map