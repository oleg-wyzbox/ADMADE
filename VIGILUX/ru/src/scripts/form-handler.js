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
    // Extract price and quantity like Acaro
    price = parseInt($(".active .form__select-price-new").text());
    const selectedQuantity =
      $("[data-qty_invoice].active").data("qty_invoice") || 1;

    // Set quantity form field
    $("[name=quantity]").val(selectedQuantity);

    // Calculate cost as price * quantity (VIGILUX specific)
    cost = price * selectedQuantity;
    quantity = selectedQuantity;

    // Set comment to activeOffers (same as Acaro)
    comment = this.activeOffers;

    // Set email from form field
    const email = $("[name=email]").val();
    if (email) {
      $("[name=email]").val(email);
    }

    console.log(
      "Price:",
      price,
      "Cost:",
      cost,
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
      this.handleFormSubmission();
    });

    // Add order status update like Acaro
    $("form").on("submit", () => {
      $(".order-status__lb").addClass("order-status__lb--active");
    });
  }

  handleFormSubmission() {
    console.log("Form submitted!");

    // Hide the form immediately
    this.hideForm();

    // Show confirmation immediately
    this.showConfirmation();
  }

  hideForm() {
    $("#form").hide();
    console.log("Form hidden");
  }

  showConfirmation() {
    const $confirmationComponent = document.querySelector("order-confirmation");

    if (!$confirmationComponent) {
      console.error("OrderConfirmation component not found!");
      return;
    }

    // Show the confirmation component immediately
    $confirmationComponent.show(this.orderId);

    // Scroll to confirmation immediately
    this.scrollToConfirmation($confirmationComponent);
  }

  scrollToConfirmation(component) {
    $("html, body").animate(
      {
        scrollTop: component.offsetTop - 50,
      },
      1000
    );
  }
}

// Initialize form handler when DOM is ready
$(document).ready(() => {
  new FormHandler();
});
