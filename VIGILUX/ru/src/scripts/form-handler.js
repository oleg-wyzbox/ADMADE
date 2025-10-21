/**
 * Form Handler for VIGILUX Order Processing
 * Handles form submission, order ID extraction, and confirmation display
 */

class FormHandler {
  constructor() {
    this.orderId = null;
    this.activeOffers = ""; // Store active offers (same as Acaro)

    this.init();
  }

  init() {
    this.setupAlertOverride();
    this.setupFormInteractions();
    this.setupFormSubmission();
  }

  setupAlertOverride() {
    // Override Leadwyz alerts to prevent popup and extract order ID
    window.alert = (message) => {
      console.log("Leadwyz Alert (overridden):", message);

      if (message?.includes("OrderID")) {
        this.orderId = message.replace("OrderID ", "");
        console.log("Extracted order ID:", this.orderId);
      }
    };
  }

  setupFormInteractions() {
    // Handle product selection
    $(".form__select-item").on("click", (e) => {
      if (!$(e.currentTarget).hasClass("active")) {
        $(".form__select-item").removeClass("active");
        $(e.currentTarget).addClass("active");
        this.updateSelectedOffers();
      }
    });

    // Handle payment method selection
    $(".form__payment-item").on("click", (e) => {
      if (!$(e.currentTarget).hasClass("active")) {
        $(".form__payment-item").removeClass("active");
        $(e.currentTarget).addClass("active");
      }
    });

    // Handle delivery option toggle
    $(".form__delivery").on("click", (e) => {
      $(e.currentTarget).toggleClass("active");
    });

    // Handle additional product options
    $(".form__select-item-bottom-option-item").on("click", (e) => {
      const $container = $(e.currentTarget).closest(
        ".form__select-item-bottom-option"
      );
      $container
        .find(".form__select-item-bottom-option-item")
        .removeClass("active");
      $(e.currentTarget).addClass("active");
      this.updateSelectedOffers();
    });

    // Update offers when form changes
    $("form").on("change", () => this.updateSelectedOffers());
  }

  updateSelectedOffers() {
    // Same logic as Acaro's activatedOffers()
    const mainOffer = $(".form__select-item.active").data("value") ?? "";
    const mainOfferFormatted =
      mainOffer !== null && mainOffer.length > 0 ? mainOffer + ", " : "";

    const secondOffer = $(
      ".form__select-item.active .form__select-item-bottom-option-item.active"
    )
      .map(function () {
        return $(this).attr("data-color");
      })
      .get();
    const secondOfferFormatted =
      secondOffer !== null && secondOffer.length > 0 ? secondOffer + ", " : "";

    this.activeOffers = mainOfferFormatted + secondOfferFormatted;
    this.sendComment();
  }

  sendComment() {
    // Get selected option
    const selectedOption = $(".form__select-item.active");
    const selectedQuantity = selectedOption.data("qty_invoice") || 1;

    // Extract price from price-invoice span
    const priceText = selectedOption.find(".price-invoice").text();
    price = parseInt(priceText) || 89; // Fallback to 89 if parsing fails

    // Set quantity form field
    $("[name=quantity]").val(selectedQuantity);

    quantity = selectedQuantity;

    // Set comment to activeOffers
    comment = this.activeOffers;

    // Set email from form field
    const email = $("[name=email]").val();
    if (email) {
      // Set the email to the global email variable for form submission
      window.email = email;
    }

    console.log(
      "Selected option:",
      selectedQuantity === 1 ? "1x фонарик" : "2x фонарик",
      "Price from DOM:",
      priceText,
      "Parsed price:",
      price,
      "Quantity:",
      quantity,
      "Email:",
      email,
      "Comment:",
      comment
    );
  }

  setupFormSubmission() {
    $("form").on("submit", (e) => {
      e.preventDefault();

      // Ensure email is captured before form submission
      this.captureFormData();
    });

    // Add order status update like Acaro
    $("form").on("submit", () => {
      $(".order-status__lb").addClass("order-status__lb--active");
      this.scrollToSuccessComponent();
    });
  }

  captureFormData() {
    // Capture email from form
    const email = $("[name=email]").val();
    if (email) {
      window.email = email;
      console.log("Email captured for submission:", email);
    }

    // Capture phone if exists
    const phone = $("[name=phone]").val();
    if (phone) {
      window.phone = phone;
      console.log("Phone captured for submission:", phone);
    }

    // Capture name if exists
    const name = $("[name=name]").val();
    if (name) {
      window.name = name;
      console.log("Name captured for submission:", name);
    }
  }

  hideForm() {
    $("#form").hide();
    console.log("Form hidden");
  }

  scrollToSuccessComponent() {
    // Function to check for success component and scroll to it
    const checkAndScrollToSuccess = (attempts = 0) => {
      const maxAttempts = 10;

      if ($(".succes").length) {
        const successElement = $(".succes").first();
        $("html, body").animate(
          {
            scrollTop: successElement.offset().top - 50,
          },
          1000
        );
        console.log("Scrolled to success component");
      } else if (attempts < maxAttempts) {
        setTimeout(() => {
          checkAndScrollToSuccess(attempts + 1);
        }, 1000);
      }
    };

    // Start checking for the success component
    checkAndScrollToSuccess();
  }
}

// Initialize form handler when DOM is ready
$(document).ready(() => {
  new FormHandler();
});
