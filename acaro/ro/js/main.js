/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
$(document).ready(function () {
  initBadgeSlider();
  initObserve();
  initQuantity();
  initSection7Swiper();
  initSection8Swiper();
  initAccordion();
  initStickyBlock();
});
function initBadgeSlider() {
  const swiperBadgeSlider = new Swiper('.badge__slider', {
    direction: 'vertical',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
}
function initObserve() {
  const options = {
    threshold: 0.5
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, options);
  document.querySelectorAll("[data-observe]").forEach(el => {
    observer.observe(el);
  });
}
function initQuantity() {
  const options = {
    threshold: 0.5
  };
  const animateCounter = function (el, target) {
    let duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;
    let startValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let startTime = null;
    const step = timestamp => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(startValue + (target - startValue) * progress);
      el.textContent = value.toLocaleString("en-US"); // 👉 завжди 10,000 формат
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        entry.target.querySelectorAll("[data-quantity]").forEach(el => {
          const target = parseInt(el.getAttribute("data-quantity").replace(/,/g, ""), 10);
          const span = el.querySelector("span") || el;
          const startValue = parseInt(span.textContent.replace(/,/g, ""), 10) || 0;
          animateCounter(span, target, 1500, startValue);
        });
        observer.unobserve(entry.target);
      }
    });
  }, options);
  document.querySelectorAll("[data-observe]").forEach(el => {
    observer.observe(el);
  });
}
function initSection7Swiper() {
  const section7Swiper = new Swiper('.section7__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000
    },
    grabCursor: true
  });
}
function initSection8Swiper() {
  const section8Swiper = new Swiper('.section8__swiper', {
    effect: "flip",
    loop: true,
    grabCursor: true,
    autoHeight: true,
    flipEffect: {
      slideShadows: false,
      limitRotation: false
    }
  });
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
function initStickyBlock() {
  const section3 = document.querySelector("#section3");
  const stickyBlock = document.querySelector(".sticky-block");
  const section3Top = section3.offsetTop + section3.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY < section3Top) {
      stickyBlock.classList.add("fixed");
    } else {
      stickyBlock.classList.remove("fixed");
    }
  });
}
/******/ })()
;
//# sourceMappingURL=main.js.map