/**
 * VIGILUX Custom JavaScript
 * Handles form submission, user data persistence, and order processing
 */

$(function () {
  // Persist currency if provided globally
  if (typeof currency !== "undefined") {
    localStorage.setItem("currency", currency);
  }

  // Restore userName from localStorage on page load
  const storedUserName = localStorage.getItem("userName");
  if (
    storedUserName &&
    storedUserName !== "unknown" &&
    storedUserName.trim() !== ""
  ) {
    const nameInput = $("input[name=name]");
    if (
      nameInput.length &&
      (!nameInput.val() || nameInput.val() === "unknown")
    ) {
      nameInput.val(storedUserName);
    }
  }

  // Also check after Leadwyz scripts have loaded (delayed check)
  setTimeout(() => {
    const storedUserName = localStorage.getItem("userName");
    if (
      storedUserName &&
      storedUserName !== "unknown" &&
      storedUserName.trim() !== ""
    ) {
      const nameInput = $("input[name=name]");
      if (
        nameInput.length &&
        (nameInput.val() === "unknown" || !nameInput.val())
      ) {
        nameInput.val(storedUserName);
      }
    }
  }, 2000);

  // Additional protection: Monitor for "unknown" values and clear them
  const nameInput = $("input[name=name]");
  if (nameInput.length) {
    nameInput.on("input change", function () {
      if ($(this).val() === "unknown") {
        $(this).val("");
      }
    });

    // Use MutationObserver to catch programmatic changes
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "value"
        ) {
          const target = mutation.target;
          if (target.value === "unknown") {
            target.value = "";
          }
        }
      });
    });

    observer.observe(nameInput[0], {
      attributes: true,
      attributeFilter: ["value"],
    });
  }

  const $form = $("form");

  function findQtyInput() {
    return $form.find("input[name=quantity]");
  }

  function findAddressInput() {
    return $form.find("input[name=address]");
  }

  // Ensure hidden inputs exist
  if (findQtyInput().length === 0) {
    $form.append(
      '<input style="display: none;" type="radio" hidden checked name="quantity" value="">'
    );
  }

  if ($("input#location-input").length > 0 && findAddressInput().length === 0) {
    $form.append(
      '<input style="display: none;" type="text" hidden name="address" value="">'
    );
  }

  const $qtyInput = findQtyInput();
  const $addressInput = findAddressInput();
  const $offers = $("[data-qty_invoice]");

  // Offer selection
  $offers.on("click", function () {
    $offers.removeClass("active");
    $(this).addClass("active");
    price = $(this).find(".price-invoice").first().text();
    $qtyInput.val($(this).data("qty_invoice"));
    comment = $(this).data("add_comment");
  });

  // Utils on window (referenced elsewhere)
  window.escapeHTML = function (str) {
    return String(str || "")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  window.updateAddress = function () {
    const administrative_area = escapeHTML(
      $("input[name=administrative_area]").val()
    );
    const userLocality = escapeHTML($("input[name=locality]").val());
    const userZip = escapeHTML($("input[name=postal_code]").val());
    const userStreet = escapeHTML($("input[name=street]").val());
    const NR = escapeHTML($("input[name=NR]").val());
    const BL = escapeHTML($("input[name=BL]").val());
    const SC = escapeHTML($("input[name=SC]").val());
    const AP = escapeHTML($("input[name=AP]").val());
    const userEmail = escapeHTML($("input[name=email]").val());

    const parts = [];
    if (administrative_area) parts.push(administrative_area);
    if (userLocality) parts.push(userLocality);
    if (userZip) parts.push(userZip);
    if (userStreet) parts.push(userStreet);
    if (NR) parts.push(NR);
    if (BL) parts.push(BL);
    if (SC) parts.push(SC);
    if (AP) parts.push(AP);

    const address = parts.join(", ");
    if ($addressInput && $addressInput.length) {
      $addressInput.val(address);
    }
  };

  $form.on("change", updateAddress);
  $form.find("[type=submit]").on("click", updateAddress);

  // Price parser — removes tags, spaces, commas, currency symbols
  window.parsePrice = function (htmlString) {
    let text = String(htmlString || "").replace(/<[^>]+>/g, "");
    text = text
      .replace(/\s+/g, "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");
    return parseFloat(text);
  };

  // Submit handling
  $form.on("submit", function (event) {
    event.preventDefault();

    // Hide form elements and show confirmation banner
    const submitButton = document.getElementById("submit-button");
    const confirmationComponent = document.querySelector("order-confirmation");
    const formTitle = document.getElementById("form-title");
    const formSubtitle = document.getElementById("form-subtitle");
    const formTime = document.getElementById("form-time");
    const formInputs = document.getElementById("form-inputs");
    const paymentText = document.getElementById("payment-text");
    const formSelect = document.querySelector(".form__select");
    const formBanner = document.querySelector(".form__banner");
    const formTitleLine = document.querySelector(".title--line");

    // Hide form elements
    if (submitButton) {
      submitButton.style.display = "none";
      submitButton.style.visibility = "hidden";
    }

    if (formTitle) {
      formTitle.style.display = "none";
    }

    if (formSubtitle) {
      formSubtitle.style.display = "none";
    }

    if (formTime) {
      formTime.style.display = "none";
    }

    if (formInputs) {
      formInputs.style.display = "none";
    }

    if (paymentText) {
      paymentText.style.display = "none";
    }

    if (formSelect) {
      formSelect.style.display = "none";
    }

    if (formBanner) {
      formBanner.style.display = "none";
    }

    if (formTitleLine) {
      formTitleLine.style.display = "none";
    }

    // Generate order number
    const orderNumber = "fs_" + Date.now();

    // Show confirmation banner
    if (confirmationComponent) {
      confirmationComponent.show(orderNumber);

      // Scroll to confirmation banner
      setTimeout(() => {
        confirmationComponent.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }

    // Store order data
    const userName = String($("input[name=name]").val() || "")
      .trim()
      .split(" ")[0];

    // Only store userName if it's not "unknown" and not empty
    if (userName && userName !== "unknown" && userName.trim() !== "") {
      localStorage.setItem("userName", userName);
    }

    localStorage.setItem("orderNum", orderNumber);
    localStorage.setItem("orderNumTs", Date.now());

    // Store product data for sending
    const selectedOffer = $("[data-qty_invoice].active");
    const productQuantity = selectedOffer.data("qty_invoice") || 1;
    const productPrice =
      parsePrice(selectedOffer.find(".price-invoice").first().text()) || 99;
    const productId = 2800; // From main1.js
    const productName = "Фонарик VIGILUX";

    localStorage.setItem(
      "prod1",
      JSON.stringify({
        name: productName,
        price: productPrice,
        id: productId,
        quantity: productQuantity,
      })
    );

    // Send initial product to backend
    setTimeout(() => {
      $.post(
        `https://fitexpress.space/api/orders/${orderNumber}`,
        {
          product_id: productId,
          cost: productPrice,
          quantity: productQuantity,
          comment: `${productName} x${productQuantity} - ${productPrice} RON`,
        },
        function (data) {
          // Success callback - could be used for analytics
        },
        "json"
      ).fail(function (xhr, status, error) {
        // Error handling - could be used for error tracking
        console.error("Failed to send initial product:", error);
      });
    }, 500);

    // Prevent any other form processing
    event.stopPropagation();
    event.stopImmediatePropagation();
  });

  // Override browser dialogs to prevent blocking
  const originalAlert = window.alert;
  const originalConfirm = window.confirm;
  const originalPrompt = window.prompt;

  window.alert = function (message) {
    // Suppress browser alerts to prevent blocking
    return;
  };

  window.confirm = function (message) {
    // Always return true to prevent blocking
    return true;
  };

  window.prompt = function (message, defaultText) {
    // Return default text to prevent blocking
    return defaultText || "";
  };
});
