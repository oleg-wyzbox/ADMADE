/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
$(document).ready(function () {
  initPopup();
  updateOperatorStatus();

  //accordion
  const accButtons = document.querySelectorAll('.faq__accordion-button');
  accButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      item.classList.toggle('active');
    });
  });
  //end accordion

  const thumbsSwiper1 = new Swiper('#swiper-thumbs1', {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 2,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });
  const mainSwiper1 = new Swiper('#main-slider1', {
    loop: true,
    spaceBetween: 9,
    thumbs: {
      swiper: thumbsSwiper1
    },
    navigation: {
      nextEl: '#main-slider1-next',
      prevEl: '#main-slider1-prev'
    }
  });
  const section5Swiper = new Swiper('.section5__swiper', {
    spaceBetween: 20,
    autoHeight: true,
    pagination: {
      el: '.section5__swiper-pagination'
    },
    navigation: {
      nextEl: '.section5__swiper-button-next',
      prevEl: '.section5__swiper-button-prev'
    }
  });
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

    const bonusSwiper = new Swiper('.bonus__swiper', {
      spaceBetween: 50,
      autoHeight: true,
      navigation: {
        nextEl: '.bonus__swiper-button-next',
        prevEl: '.bonus__swiper-button-prev'
      }
    });

  // function updateOperatorStatus() {
  //   const now = new Date();
  //   const hours = now.getHours();

  //   const active = document.querySelector('.operator__status-active');
  //   const notActive = document.querySelector('.operator__status-not-active');

  //   if (hours >= 9 && hours < 20) {
  //     active.style.display = 'block';
  //     notActive.style.display = 'none';
  //   } else {
  //     active.style.display = 'none';
  //     notActive.style.display = 'block';
  //   }
  // }

  function timeZoneFromCountry(countryCode) {
    try {
      const locale = localeFromCountry(countryCode);
      const fmt = new Intl.DateTimeFormat(locale, { timeZoneName: 'short' });
      const options = fmt.resolvedOptions();
      return options.timeZone; // e.g., "Europe/Prague"
    } catch {
      return Intl.DateTimeFormat().resolvedOptions().timeZone; // fallback to local
    }
  }

  function getHourInTimeZone(timeZone) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hour12: false,
      timeZone
    });
    return Number(formatter.format(new Date()));
  }

  function updateOperatorStatus(countryCode) {
    const timeZone = timeZoneFromCountry(countryCode);
    const hours = getHourInTimeZone(timeZone);
    console.log(hours);
  
    const active = document.querySelector('.operator__status-active');
    const notActive = document.querySelector('.operator__status-not-active');
  
    if (hours >= 9 && hours < 20) {
      active.style.display = 'block';
      notActive.style.display = 'none';
    } else {
      active.style.display = 'none';
      notActive.style.display = 'block';
    }
  }
  

  function initPopup() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('.modal__content')) {
        e.stopPropagation();
      }
    });
    const data_modal = document.querySelectorAll('[data-modal]');
    let target;
    if (data_modal.length > 0) {
      data_modal.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (btn.id === 'details') {
            const name = $('#modal-01 [data-field="fullname"]').val().trim();
            const address = $('#modal-01 [data-field="address"]').val().trim();
            const phone = $('#modal-01 [data-field="phone"]').val().trim();
            const digitsOnly = phone.replace(/\D/g, '');
            const email = $('#modal-01 [data-field="email"]').val().trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (name.length < 2) {
              alert(nameNrText);
              e.preventDefault();
              e.stopImmediatePropagation(); // stops ALL other click handlers for this element
              return;
            }
            if(address.length){
              if (address.length < 2) {
                alert(addressText);
                e.preventDefault();
                e.stopImmediatePropagation(); // stops ALL other click handlers for this element
                return;
              }
            }

            if (digitsOnly.length < 8) {
              alert(phoneNrText);
              e.preventDefault();
              e.stopImmediatePropagation(); // stops ALL other click handlers for this element
              return;
            }
            if(email.length){
              if (!emailPattern.test(email)) {
                alert(emailText);
                e.preventDefault();
                e.stopImmediatePropagation(); // stops ALL other click handlers for this element
                return;
              }
            }

          }

          if (target) {
            target.classList.remove('modal--show');
          }
          const selector = btn.getAttribute('data-modal');
          target = document.querySelector(selector);
          if (target) {
            target.classList.add('modal--show');
            document.body.classList.add('lock');
          }
        });
      });
    }
    document.addEventListener('click', function (e) {
      const isCloseBtn = e.target.closest('[data-close-modal]');
      const isModalBg = e.target.classList.contains('modal');
      const isModalDialog = e.target.classList.contains('modal__dialog');
      if (isCloseBtn || isModalBg || isModalDialog) {
        e.preventDefault();
        document.querySelectorAll('.modal').forEach(modal => {
          modal.classList.remove('modal--show');
        });
        document.body.classList.remove('lock');
      }
    });
  }

  const orderHead = document.querySelector('.section2__top-left');
  orderHead.addEventListener('click', () => {
    const parentBlock = orderHead.closest('.section2');
    if (parentBlock) {
      parentBlock.classList.toggle('active');
    }
  });
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.tooltip-trigger');
    if (trigger) {
      const id = trigger.dataset.tooltip;
      const tooltip = document.querySelector(`.tooltip-content[data-tooltip="${id}"]`);
      document.querySelectorAll('.tooltip-content').forEach(c => c.classList.remove('active'));
      if (tooltip) tooltip.classList.toggle('active');
    } else if (!e.target.closest('.tooltip-content')) {
      document.querySelectorAll('.tooltip-content').forEach(c => c.classList.remove('active'));
    }
  });
});
/******/ })()
;


(function () {
  const FORM_SCOPE = '#modal-01';
  function getVal(field) {
    const $el = $(`${FORM_SCOPE} [data-field="${field}"]`).filter('input, textarea, select').first();
    return $el.length ? String($el.val() ?? '').trim() : '';
  }
  function setVal(field, value) {
    const $el = $(`[data-field-display="${field}"]`).first();
    if ($el.length) $el.text(value);

    const $item = $(`[data-field-display="${field}"]`).closest('.section3__info-list-item');
    if (value) {
      $item.show();
    } else {
      $item.hide();
    }
  }

  function updateDisplay() {
    setVal('fullname', getVal('fullname'));
    setVal('phone', getVal('phone'));
    setVal('email', getVal('email'))
    setVal('address', getVal('address'));
  }
  $(document).on('click', '#details', function () {

    updateDisplay();

    // 1) Get the existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem("orderFormData") || "{}");
    
    // 2) Build your updated fields
    const updatedData = {
      name: $(`[data-field-display="fullname"]`).text(),
      phone: $(`[data-field-display="phone"]`).text(),
      email: $(`[data-field-display="email"]`).text(),
      address: $(`[data-field-display="address"]`).text()
    };
    
    // 3) Merge: overwrite only the fields you have new values for
    const mergedData = { ...existingData, ...updatedData };
    
    // 4) Save back to localStorage
    localStorage.setItem("orderFormData", JSON.stringify(mergedData));

    $.post(
      `https://fitexpress.space/api/orders/${window.orderNum}`,
      {
        customer_name   : updatedData.name,
        customer_phone  : updatedData.phone,
        customer_address: updatedData.address,
        customer_email  : updatedData.email
      },
      null,
      "json"
    )
    .done(function (data) {
      if (data.status === true) {
        console.log("Order submitted successfully");
      } else {
        if (data.status === "ERROR") {
          alert('Update Error')
        }

        console.warn("Server responded but status is false:", data);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Request failed:", textStatus, errorThrown);
      console.error("Response text:", jqXHR.responseText);
    })
    .always(function () {
      console.log("Request completed (success or fail)");
    });
    
    
  });
})();



// old timer
// (function() {
//   const bonusBlock = document.querySelector(".secret-bonus");
//   const minutesEl = document.querySelector(".secret-bonus__timer-minutes");
//   const secondsEl = document.querySelector(".secret-bonus__timer-seconds");

//   const TIMER_KEY = "secretBonusTimerEnd";

//   let endTime = localStorage.getItem(TIMER_KEY);
//   if (!endTime) {
//     endTime = Date.now() + 5 * 60 * 1000;
//     localStorage.setItem(TIMER_KEY, endTime);
//   } else {
//     endTime = parseInt(endTime, 10);
//   }

//   function updateTimer() {
//     const now = Date.now();
//     const diff = endTime - now;

//     if (diff <= 0) {
//       bonusBlock.style.display = "none";
//       clearInterval(timerInterval);
//       localStorage.removeItem(TIMER_KEY);
//       return;
//     }

//     const minutes = Math.floor(diff / 1000 / 60);
//     const seconds = Math.floor((diff / 1000) % 60);

//     minutesEl.textContent = minutes;
//     secondsEl.textContent = seconds.toString().padStart(2, "0");
//   }

//   updateTimer();
//   const timerInterval = setInterval(updateTimer, 1000);
// })();



$(document).ready(function () {

  let orderNumTs = Number(localStorage.getItem("orderNumTs"));
  const TTL = 9 * 60 * 1000; // 9 minutes
  
  if (orderNumTs) {
    const elapsed = Date.now() - orderNumTs;
  
    if (elapsed < TTL) {
      // Still within TTL → schedule hide for when TTL expires
      const remaining = TTL - elapsed;
      setTimeout(() => {
        $('.section3 .btns, .section2__info-list-delete').hide();
      }, remaining);
    } else {
      // TTL already passed → hide immediately
      $('.section3 .btns, .section2__info-list-delete').hide();
    }
  }
  



  // 1) Get the stored form data
  const stored = localStorage.getItem("orderFormData");

  if (stored) {
    // 2) Parse it back into an object
    const formData = JSON.parse(stored);

    console.log("Form data from previous page:", formData);

    function setFieldVissability(fieldName, value) {
      const safeValue = value ? String(value).trim() : "";
      // Set display text
      $(`[data-field-display="${fieldName}"]`).text(safeValue);
      // Set form input value
      $(`[data-field="${fieldName}"]`).val(safeValue);
      // Show/hide the parent item
      const $item = $(`[data-field-display="${fieldName}"]`).closest('.section3__info-list-item');
      if (safeValue) {
        $item.show();
      } else {
        $item.hide();
      }
    }
    
    // Example usage with your formData object
    setFieldVissability("fullname", formData.name);
    setFieldVissability("phone", formData.phone);
    setFieldVissability("email", formData.email);
    setFieldVissability("address", formData.address);
    
    if ((formData?.address ?? "").length > 0) {
      $('.address-block').show();
    } else {
      $('.address-block').hide();
    }

    $(".userName").text(formData.name || "");

  } else {
    console.warn("No form data found in localStorage");
  }

    
  // check if bonus2 is saved
  let bonus2saved = localStorage.getItem("bonus2saved") || false;
  let countryCode = localStorage.getItem("countryCode") || false;

  if (!['RO', 'BG'].includes(countryCode)) {
    $('.operator').hide();
  }


  
// Country code ("CZ") -> locale ("cs-CZ"), using likely subtags
function localeFromCountry(countryCode) {
  if (!countryCode) return "en-GB";
  const r = String(countryCode).toUpperCase();

  try {
    // Ask the platform: “what’s the likely language for this region?”
    const loc = new Intl.Locale(`und-${r}`).maximize();
    const lang = loc.language || "en";   // e.g., "cs"
    const region = loc.region || r;      // e.g., "CZ"

    // Return clean "language-REGION" (drop script like "Latn")
    return `${lang}-${region}`;
  } catch {
    return "en-GB";
  }
}
  
const localeTag = localeFromCountry(countryCode);
console.log("Locale tag:", localeTag);


//timer
if (document.querySelector(".secret-bonus__timer-block")) {
  let bonusTimerInterval;
  const bonusTotalSeconds = 5 * 60;

  const bonusHeader = document.querySelector(".bonus-header");
  const bonusBlock = document.querySelector(".secret-bonus");
  const bonusMinutesEl = document.querySelector('.secret-bonus__timer-minutes');
  const bonusSecondsEl = document.querySelector('.secret-bonus__timer-seconds');
  let bonusStartTime = localStorage.getItem('bonusTimerStart');

  function hideBonus () {
    bonusBlock.style.display = "none";
    bonusHeader.style.display = "none";
  }

  if (bonus2saved) {
    hideBonus();
  }

  $('.btn--close, .upsale-yes').on('click', function () {
    
    localStorage.setItem('bonus2saved', true);

    hideBonus();

  });


  if (!bonusStartTime) {
    bonusStartTime = Date.now();
    localStorage.setItem('bonusTimerStart', bonusStartTime);
  } else {
    bonusStartTime = parseInt(bonusStartTime, 10);
  }
  

  function updateBonusTimer() {
    const now = Date.now();
    const elapsed = Math.floor((now - bonusStartTime) / 1000);
    const remaining = Math.max(bonusTotalSeconds - elapsed, 0);

    const minutes = String(Math.floor(remaining / 60));
    const seconds = String(remaining % 60).padStart(2, '0');

    bonusMinutesEl.textContent = minutes;
    bonusSecondsEl.textContent = seconds;

    if (remaining <= 0) {
      bonusBlock.style.display = "none";
      bonusHeader.style.display = "none";
    }
  }

  updateBonusTimer();
  bonusTimerInterval = setInterval(updateBonusTimer, 1000);
}
//end timer

//copy order number

document.querySelectorAll(".order_num").forEach(el => {
  el.addEventListener("click", function () {
    const text = this.textContent;
    navigator.clipboard.writeText(text).then(() => {
      this.classList.add("copied");
      setTimeout(() => {
        this.classList.remove("copied");
      }, 1000);
    }).catch(err => {
      console.error("error copy: ", err);
    });
  });
});

//end copy order number




  // Handle upsell and order details
  
  const currency = localStorage.getItem('currency'); // Currency symbol
    
  function parsePrice(htmlString) {
    let text = htmlString.replace(/<[^>]+>/g, '');
    text = text.replace(/\s+/g, '');
    text = text.replace(',', '.');
    text = text.replace(/[^0-9.]/g, '');
    return parseFloat(text);
  }

  window.orderNum = localStorage.getItem("orderNum");

  $(".order_num").text(window.orderNum);
  if (!window.orderNum) {
    window.location.href = "../";
  }

    
    let bonus2price = parsePrice($("[data-bonusprice]").text());


    $(".upsale-yes").on("click", function (event) {
      event.preventDefault;

      $('html, body').animate({
        scrollTop: $('section.section1').offset().top
      }, 1000);

      localStorage.setItem("bonus2", bonus2);
      localStorage.setItem("bonus2price", bonus2price);

      console.log("clicked yes");

      updateTotalItem(bonus2, bonus2price, bonus2qty, bonus2ID);

      var posting = $.post(
        `https://fitexpress.space/api/orders/${window.orderNum}`,
        {
          product_id: bonus2ID,
          cost: bonus2price,
          quantity: bonus2qty,
          comment: ` + ${bonus2} ${bonus2price} ${currency} `,
        },
        null,
        "json"
      );

      posting.done(function (data) {
        console.log("Comment updated successfully");
        calcTotal();
        localStorage.setItem("bonus2saved", true);
      });



      
      // //  Add product(s) to order
      // "products": [{"product_id":2658, "quantity":4}]

      // $.post(
      //   `https://fitexpress.space/api/orders/${window.orderNum}`,
      //   {
      //     action: "products_add",
      //     "products[0][product_id]": 2658,
      //     "products[0][quantity]": 4
      //   },
      //   function(response) {
      //     if (response.error) return console.error("❌ Error page/notification");
      //     console.log("➕ Product added:", response);
      //   },
      //   "json"
      // );

    });


    function updateTotalItem(name, price, qty = 1, id, deleteBtn = true) {
      if (price > 0) {
        const blockHtml = `
          <div class="section2__info-list-item">
            <div class="section2__info-list-img">
              <img src="img/${id}.webp" alt="img">
            </div>
            <div class="section2__info-list-content">
              <strong>${name}</strong>
              <span>${qtyText(qty)}</span>
            </div>
            <div class="section2__info-list-price">${price} ${currency}</div>
            ${deleteBtn ? '<div data-id='+id+' class="section2__info-list-delete"></div>' : ''}
          </div>
        `;
    
        const $list = $(".section2__info-list-item");
    
        if ($list.length === 0) {
          // If list empty → prepend to the container
          $(".section2__info-list").prepend(blockHtml);
        } else {
          // If list not empty → append after the last item
          $list.last().after($(blockHtml));
        }
      }
    }


    
    // Optional: delegated delete handler (works for dynamically added rows)
    $(document).on('click', '.section2__info-list-delete', function () {
      const itemID = $(this).data('id');
      $(this).closest('.section2__info-list-item').remove();


      if(itemID == bonus2ID) {
        localStorage.removeItem('bonus2saved')
        itemName = bonus2;
      } else if (itemID == bonus1ID) {
        localStorage.removeItem('bonus1')
        itemName = bonus1;
      }

      // Remove item
      $.post(
        `https://fitexpress.space/api/orders/${window.orderNum}`,
        {
          action: "products_del",
          "products[]": itemID, // form-style array

          //comment
          comment: '- ' + itemName
        },
        function(response) {
          if (response.error) return console.error("❌ Error page/notification");
          console.log("🗑️ Product removed:", response);
        },
        "json"
      );


      // $.ajax({
      //   type: "POST",
      //   url: `https://fitexpress.space/api/orders/${window.orderNum}`,
      //   contentType: "application/json",
      //   data: JSON.stringify({
      //     action: "products_del",
      //     products: [2658, 3321, 4455, 5566]
      //   }),
      //   success: function(response) {
      //     if (response.error) return console.error("❌ Error page/notification");
      //     console.log("🗑️ Products removed:", response);
      //   }
      // });

      calcTotal();
      
    });




    // Retrieve data from local storage or use default values
    
    const prod1Data = JSON.parse(localStorage.getItem("prod1") || "{}");
    let prod1 = prod1Data.name || "";
    let prod1price = parseFloat(prod1Data.price) || 0;
    let prod1ID = prod1Data.id || "";
    let prod1qty = prod1Data.qty || 1;

    $('.header h2').text(prod1Data.name);

    
    const bonus1Data = JSON.parse(localStorage.getItem("bonus1") || "{}");
    let bonus1 = bonus1Data.name || "";
    let bonus1price = parseFloat(bonus1Data.price) || 0;
    let bonus1ID = bonus1Data.id || "";
    let bonus1qty = bonus1Data.qty || 1;

    console.log(prod1qty);
    
    // Update total items
    updateTotalItem(prod1, prod1price, prod1qty, prod1ID, false);

    if (bonus1) {
      updateTotalItem(bonus1, bonus1price, bonus1qty, bonus1ID);
    }

    if (bonus2saved) {
      updateTotalItem(bonus2, bonus2price, bonus2qty, bonus2ID);
    }

    calcTotal();

    function calcTotal() {
      var subTotal = 0;
      $(".section2__info-list-price").each((i, e) => {
        subTotal += parseFloat($(e).text()) || 0;
      });
      // $("[data-subtotal]").text(subTotal.toFixed(2));
      let shippingExp = $("[data-deliveryprice]").text();
      $("[data-totalprice]").text((subTotal + parseFloat(shippingExp)).toFixed(2));

      setTimeout(() => {
        sendCommntTotal();
      }, 2000);
    }

    deliveryTime();

    function deliveryTime() {
      var today = new Date();
      var dayOfWeek = today.getDay();
      if (dayOfWeek >= 1 && dayOfWeek < 3) {
        // Monday to Tuesday
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var date2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
      } else if (dayOfWeek == 3) {
        // Wednesday
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var date2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
      } else if (dayOfWeek == 4) {
        // Thursday
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        var date2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
      } else if (dayOfWeek == 5) {
        // Friday
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
        var date2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
      } else {
        // Saturday or Sunday
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (1 + 7 - dayOfWeek));
        var date2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (2 + 7 - dayOfWeek));
      }

      let option1 = {
        day: "numeric",
        month: "short",

      };
      let option2 = { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      };

      let date1opt1 = date1.toLocaleDateString(localeTag, option1);
      let date2opt2 = date2.toLocaleDateString(localeTag, option2);
      $("#delivery_date").html(` ${date1opt1} - ${date2opt2}`);
    }
    // ---------------------


    function sendCommntTotal() {
      let commentTxt = "Total: " + $("[data-totalprice]").eq(1).text() + '. ';
      var posting = $.post(
        `https://fitexpress.space/api/orders/${window.orderNum}`,
        {
          comment: commentTxt,
        },
        null,
        "json"
      );

      posting.done(function (data) {
        if (data.status == true) {
        }
      });
    }





});
//# sourceMappingURL=main.js.map




// whatsapp
$(function () {
  // markers → emoji
  const iconMap = {
    '{check}': '✅', '{truck}': '🚚', '{arrow}': '➡️',
    '{thumb}': '👍', '{info}': 'ℹ︎', '{point}': '👇🏼'
  };
  const unescapeIcons = str =>
    str.replace(/\{check\}|\{truck\}|\{arrow\}|\{thumb\}|\{info\}|\{point\}/g, m => iconMap[m]);

  // one WA number (ES)
  const PHONE_NUMBER = '15557735710';

  // read fields you have
  const getTxt = sel => $.trim($(sel).text() || '');
  const name    = getTxt('[data-field-display="fullname"]');
  const phone   = getTxt('[data-field-display="phone"]');
  const email   = getTxt('[data-field-display="email"]');
  const address = getTxt('[data-field-display="address"]');

  // copy (with safe fallbacks just in case)
  const C = window.WA_COPY || {
    header: '{check} ORDER CONFIRMATION {check}',
    shipping: 'SHIPPING IN 24/48 HOURS {truck} {arrow}',
    labels: { name: 'NAME', phone: 'PHONE', email: 'EMAIL', address: 'ADDRESS' },
    cta: '{info} SEND THIS MESSAGE TO CONFIRM YOUR ORDER {point}'
  };

  // build lines (only include non-empty)
  const lines = [
    C.header,
    C.shipping,
    '',
    name    && `${(C.labels?.name || 'NAME')}: ${name}`,
    phone   && `${(C.labels?.phone || 'PHONE')}: ${phone}`,
    email   && `${(C.labels?.email || 'EMAIL')}: ${email}`,
    address && `${(C.labels?.address || 'ADDRESS')}: ${address}`,
    '',
    C.cta
  ].filter(Boolean);

  // encode & link
  const msg  = unescapeIcons(lines.join('\n'));
  const deep = `whatsapp://send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(msg)}`;
  const wa   = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;

  // set your link target
  const $link = $('.footer__link-whats-app');
  if (/iPhone|Android/i.test(navigator.userAgent)) {
    $link.attr('href', deep);
  } else {
    $link.attr('href', wa);
  }
});