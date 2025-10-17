var JACKET_PRODUCT_ID = 2163;
var SET_PRODUCT_ID = 2801;

(function () {
  function getList(source) {
    if (Array.isArray(source)) {
      return source;
    }
    if (Array.isArray(window.cartItems)) {
      return window.cartItems;
    }
    return [];
  }

  function pickProductId(items) {
    return getList(items).some(function (item) {
      return item && String(item.type || '').toLowerCase() === 'set';
    })
      ? SET_PRODUCT_ID
      : JACKET_PRODUCT_ID;
  }

  function syncProduct(items) {
    var nextId = pickProductId(items);
    if (window.product !== nextId) {
      window.product = nextId;
    }
  }

  if (window.jQuery && window.jQuery(document).on) {
    window.jQuery(document).on('cart:updated', function (_event, items) {
      syncProduct(items);
    });
  }

  if (window.addEventListener) {
    window.addEventListener('cart:updated', function (event) {
      syncProduct(event && event.detail);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      syncProduct();
    });
  } else {
    syncProduct();
  }
})();

$(function () {
  var CART_KEY = 'cartItems';
  var COUNT_KEY = 'cartCount';
  var $cartBox = $('.t706__cartwin');
  var $cartList = $('.t706__cartwin-products');
  var $cartCount = $('.js-carticon-counter');
  var $cartIcon = $('.t706__carticon');
  var showClass = 't706__cartwin_showed';
  var cartList = [];
  var hasStorage = typeof sessionStorage !== 'undefined';

  window.getCartItems = function () {
    return cartList.map(function (item) {
      return Object.assign({}, item);
    });
  };

  function formatNumber(value) {
    return String(value || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function readCart() {
    if (!hasStorage) {
      return;
    }
    try {
      var stored = sessionStorage.getItem(CART_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        cartList = Array.isArray(parsed) ? parsed : [];
      }
    } catch (err) {
      cartList = [];
    }
  }

  function makeComment(copy) {
    var useful = copy.filter(function (item) {
      return item && item.quantity > 0;
    });
    if (!useful.length) {
      window.comment = '';
      window.price = 0;
      return;
    }

    var total = 0;
    var rows = useful.map(function (item) {
      var parts = [];
      var typeLabel = (item.type || '').toString().toLowerCase() === 'set' ? 'Costum' : 'Jacket';
      parts.push(typeLabel);

      var colorLabel = (item.color || '').toString().trim();
      if (colorLabel) {
        parts.push(colorLabel.charAt(0).toUpperCase() + colorLabel.slice(1));
      }

      var amount = item.price * item.quantity;
      total += amount;
      var priceText = formatNumber(amount);
      if (item.currency) {
        priceText += ' ' + item.currency;
      }
      parts.push(priceText);

      if (item.quantity) {
        parts.push(String(item.quantity));
        $('[name=quantity]').val(item.quantity);
      }

      return parts.join(' / ');
    });

    var currencyItem = useful.find(function (entry) {
      return entry && entry.currency;
    });
    rows.push(
      'Total: ' +
        formatNumber(total) +
        (currencyItem && currencyItem.currency ? ' ' + currencyItem.currency : '')
    );

    var activeSize = $('.product-size-selector_form .product-size-option.is-active').first().text().trim();
    if (activeSize) {
      rows.push(activeSize);
    }

    window.comment = rows.join(' , ');
    window.price = total;

    console.log('Cart comment:', window.comment);
  }

  function buildRow(item, index) {
    var $row = $(
      '<div class="t706__product" data-product-id="' +
        item.id +
        '" data-cart-product-i="' +
        index +
        '">' +
        '<div class="t706__product-thumb"><div class="t706__product-imgdiv"></div></div>' +
        '<div>' +
        '<div class="t706__product-title t-descr t-descr_sm"></div>' +
        '<div class="t706__product-plusminus t-descr t-descr_sm">' +
        '<img src="img/arrows_circle_minus.svg" class="t706__product-minus" role="button" alt="-" aria-label="Reduce quantity">' +
        '<span class="t706__product-quantity"></span>' +
        '<img src="img/arrows_circle_plus.svg" class="t706__product-plus" role="button" alt="+" aria-label="Increase quantity">' +
        '</div>' +
        '</div>' +
        '<div class="t706__product-amount t-descr t-descr_sm">' +
        '<div class="t706__cartwin-prodamount-price"></div>' +
        '<div class="t706__cartwin-prodamount-currency"></div>' +
        '</div>' +
        '<div class="t706__product-del-wrapper"><img src="img/arrows_circle_remove.svg" class="t706__product-del" role="button" ></div>' +
        '</div>'
    );

    $row.find('.t706__product-imgdiv').css('background-image', "url('" + item.image + "')");
    $row.find('.t706__product-title').text(item.title);
    $row.find('.t706__product-quantity').text(item.quantity);
    $row.find('.t706__cartwin-prodamount-price').text(formatNumber(item.price * item.quantity));
    $row.find('.t706__cartwin-prodamount-currency').text(item.currency || '');
    if (item.handle) {
      $row.attr('data-product-handle', item.handle);
    }
    if (item.type) {
      $row.attr('data-product-type', item.type);
    }
    if (item.color) {
      $row.attr('data-product-color', item.color);
    }
    return $row;
  }

  function writeCart() {
    var copy = window.getCartItems();
    makeComment(copy);
    window.cartItems = copy;

    $cartList.empty();
    var totalCount = 0;
    var totalPrice = 0;

    copy.forEach(function (item, index) {
      totalCount += item.quantity;
      totalPrice += item.price * item.quantity;
      $cartList.append(buildRow(item, index));
    });

    $cartCount.text(totalCount || '0');
    $('.t706__cartwin-prodamount-label').text(totalCount ? 'Total:' : '');
    $('.t706__cartwin-prodamount').text(totalPrice ? formatNumber(totalPrice) + ' RON' : '');
    $cartIcon.toggle(totalCount > 0);

    if (hasStorage) {
      try {
        sessionStorage.setItem(CART_KEY, JSON.stringify(cartList));
        sessionStorage.setItem(COUNT_KEY, totalCount);
      } catch (err) {
        console.warn('Cart storage failed', err);
      }
    }

    var snapshot = copy;
    $(document).trigger('cart:updated', [snapshot]);
    if (typeof window.CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: snapshot }));
    }
  }

  function toggleCart(force) {
    var shouldShow = typeof force === 'boolean' ? force : !$cartBox.hasClass(showClass);
    if (shouldShow) {
      $cartBox.stop(true, true).fadeIn().addClass(showClass);
    } else {
      $cartBox.stop(true, true).fadeOut().removeClass(showClass);
    }
    setTimeout(function() {
      $('body').toggleClass('lock', shouldShow);
  }, 400);
  }

  function getProductData($button) {
    var $product = $button.closest('.t762__container');
    var baseId =
      $product.data('productHandle') ||
      $product.data('productGenUid') ||
      $product.attr('id') ||
      String(Date.now());
    var title = ($product.find('.js-product-name').text() || '').trim();
    var priceText = ($product.find('.js-store-prod-price-val').first().text() || '').trim();
    var price = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
    var currency = ($product.find('.js-product-price-currency').first().text() || 'RON').trim();
    var bgStyle = $product.find('.t-slds__bgimg').first().attr('style') || '';
    var imageMatch = bgStyle.match(/url\(['"]?([^'")]+)['"]?\)/i);
    var id = baseId;

    return {
      id: id,
      title: title,
      price: price,
      currency: currency,
      image: imageMatch ? imageMatch[1] : '',
      quantity: 1,
      handle: $product.data('productHandle') || null,
      type: $product.data('productType') || null,
      color: $product.data('productColor') || null
    };
  }

  function addProduct(item) {
    var existing = cartList.find(function (entry) {
      return entry.id === item.id;
    });
    if (existing) {
      existing.quantity += 1;
    } else {
      cartList.push(item);
    }
    writeCart();
  }

  function changeQuantity(id, step) {
    var target = cartList.find(function (entry) {
      return entry.id === id;
    });
    if (!target) {
      return;
    }
    target.quantity += step;
    if (target.quantity <= 0) {
      cartList = cartList.filter(function (entry) {
        return entry.id !== id;
      });
    }
    writeCart();
  }

  function removeProduct(id) {
    cartList = cartList.filter(function (entry) {
      return entry.id !== id;
    });
    writeCart();
  }

  readCart();
  writeCart();

  if (!$cartCount.text()) {
    var savedCount = '0';
    if (hasStorage) {
      try {
        savedCount = sessionStorage.getItem(COUNT_KEY) || '0';
      } catch (err) {
        console.warn('Cart counter read failed', err);
      }
    }
    $cartCount.text(savedCount || '0');
  }

  $('.t762__btn').on('click', function (event) {
    event.preventDefault();
    var item = getProductData($(this));
    if (!item.title || !item.price) {
      console.warn('Product data missing', item);
      return;
    }
    addProduct(item);
    toggleCart(true);
    var targetId = $(this).attr('href');
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      var $target = $(targetId);
      if ($target.length) {
        $target[0].scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  $('.product-size-selector_form .product-size-option').on('click', function () {
    var $options = $('.product-size-selector_form .product-size-option');
    var $input = $('.product-size-selector_form .js-size-input');
    $options.removeClass('is-active');
    $(this).addClass('is-active');
    var value = $(this).data('size') || $(this).text().trim();
    if ($input.length) {
      $input.val(value).trigger('change');
    }
    makeComment(window.getCartItems());
  });

  $('.t706__carticon-wrapper, .js-carticon-counter').on('click', function () {
    toggleCart();
    
    var copy = window.getCartItems();
    makeComment(copy);
  });

  $('.t706__close-button, .t706__cartwin-close').on('click', function () {
    toggleCart(false);
  });

  $cartList.on('click', '.t706__product-plus', function () {
    var id = $(this).closest('.t706__product').data('product-id');
    changeQuantity(id, 1);
  });

  $cartList.on('click', '.t706__product-minus', function () {
    var id = $(this).closest('.t706__product').data('product-id');
    changeQuantity(id, -1);
  });

  $cartList.on('click', '.t706__product-del', function () {
    var id = $(this).closest('.t706__product').data('product-id');
    removeProduct(id);
  });

  $('form').on('change', function () {
    var copy = window.getCartItems();
    makeComment(copy);
    window.cartItems = copy;
  });
});



$('.t182__buttons a').click(function() {{
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
    return false;
}});
