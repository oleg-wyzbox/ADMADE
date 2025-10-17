$(function () {
      
    // Handle form and bonus product logic
    
    localStorage.setItem('currency', currency);


    const formQty = $('form');
    
    function findQtyInput() {
        return formQty.find("input[name=quantity]");
    }
    function findAddressInput() {
        return formQty.find("input[name=address]");
    }
         if ((findQtyInput()).length === 0) {
      $(formQty).append('<input  style="display: none;" type="radio" hidden checked name="quantity" value="">');
        };
    // If street/google maps it is not in the form it will not create address input
    if($('input#location-input').length > 0) {
         if ((findAddressInput()).length === 0) {
        $(formQty).append('<input style="display: none;" type="text" hidden  name="address" value="">');
        };
    }
    
    let inputQuantityChecked = findQtyInput();
    console.log(inputQuantityChecked);
        
    let inputAddress =findAddressInput();
    
    
        const offerEl =  $('[data-qty_invoice]');

        $( offerEl ).click(function () { 
            $(offerEl).removeClass('active'); 
            $(this).addClass('active');
            price = $(this).find('.price-invoice').first().text();
            console.log($(this));
            console.log(price);
            $(inputQuantityChecked).val($(this).data('qty_invoice')); 

            comment = $(this).data('add_comment');
                });
                

    

window.escapeHTML = function (str) {
  return String(str || '')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

    

  window.updateAddress = function () {
    administrative_area = escapeHTML($('input[name=administrative_area]').val());
    userLocality = escapeHTML($('input[name=locality]').val());
    userZip = escapeHTML($('input[name=postal_code]').val());
    userStreet = escapeHTML($('input[name=street]').val());
    NR = escapeHTML($('input[name=NR]').val());
    BL = escapeHTML($('input[name=BL]').val());
    SC = escapeHTML($('input[name=SC]').val());
    AP = escapeHTML($('input[name=AP]').val());
    userEmail = escapeHTML($('input[name=email]').val());

    const parts = [];
        if (administrative_area) parts.push(administrative_area);
        if (userLocality)       parts.push(userLocality);
        if (userZip)            parts.push(userZip);
        if (userStreet)         parts.push(userStreet);
        if (NR)                 parts.push(NR);
        if (BL)                 parts.push(BL);
        if (SC)                 parts.push(SC);
        if (AP)                 parts.push(AP);
        let address = parts.join(', ');
        
        inputAddress.val(address);

    }
    
    

    $(formQty).change(updateAddress);
    $(formQty).find('[type=submit]').click(updateAddress);
    
    
    
    // Price parser — removes currency symbols, commas, spaces
    window.parsePrice = function (htmlString) {
        let text = htmlString.replace(/<[^>]+>/g, "");
        text = text.replace(/\s+/g, "");
        text = text.replace(",", ".");
        text = text.replace(/[^0-9.]/g, "");
        return parseFloat(text);
    };

    // Get bonus product data
    const bonus1price = parsePrice($("[data-bonusprice]").text());

    let orderNum;
    let orderNumTs;
    const TTL = 9 * 60 * 1000; // 9 minutes
    if (orderNumTs && Date.now() - orderNumTs < TTL) {
        console.log("Using cached order number from localStorage");
      orderNum = localStorage.getItem("orderNum");
    } else {
        console.log("Order number expired or not found in localStorage");
        orderNum = null;
        localStorage.removeItem("orderNum");
        localStorage.removeItem("orderNumTs");
    }
        
        if (orderNum) {
            console.log("Order number found in localStorage:", orderNum);
              $('.popap, .overlay').addClass('active').fadeIn(500);
                  $('body').addClass('lock');
            // Show upsell popup immediately
            
                $('.userName').text(localStorage.getItem("userName")); // Insert name into UI
        } else {
    
            // Handle form submit
            $(formQty).on('submit', function (event) {
                event.preventDefault();
    
                const userName = $('input[name=name]').val().trim().split(' ')[0];
                $('.userName').text(userName); // Insert name into UI
                localStorage.setItem("userName", userName); // Save name
    
              if (phone.replace(/[^0-9+\-\s()]/g, '').length > 8) {
                    
                    // Show upsell popup
                  $('.popap, .overlay').addClass('active').fadeIn(500);
                  $('body').addClass('lock');
                  
                }
    
                // Wait until lwOrderID is available
                waitForOrderID();
            });
    
            // Wait for lwOrderID to appear and store order-related data
            function waitForOrderID() {
                if (typeof lwOrderID === 'undefined') {
                    setTimeout(waitForOrderID, 500);
                    return;
                }
                
                orderNum = lwOrderID;
                
                localStorage.setItem("prod1", JSON.stringify({
                    name: prod1,
                    price: price,
                    id: product, //main.js product ID
                    qty: inputQuantityChecked.val() || 1
                }));


                localStorage.setItem("orderNum", lwOrderID); // Save order ID
                localStorage.setItem("orderNumTs", Date.now()); // Save order ID t9ime stamp
                // localStorage.setItem("orderNumTs", performance.now()); // Save order ID time stamp
            }
            
        }

    // Handle upsell "YES" click
    $(document).on("click", ".upsale-yes", function (event) {
      event.preventDefault();

      if (!orderNum) {
        console.error("Order number is not set.");
        setTimeout(() => {
          $('.upsale-yes').click(); // Retry
        }, 3000);
        return;
      }

      // Store bonus info
      // localStorage.setItem("bonus1", bonus1);
      // localStorage.setItem("bonus1price", bonus1price);
      // localStorage.setItem("bonus1ID", bonus1ID);
            // localStorage.setItem("bonus1qty", bonus1qty);
            
            localStorage.setItem("bonus1", JSON.stringify({
                name: bonus1,
                price: bonus1price,
                id: bonus1ID,
                qty: bonus1qty
            }));


      // Send upsell product to backend
      $.post(
        `https://fitexpress.space/api/orders/${orderNum}`,
        {
          product_id: bonus1ID,
          cost: bonus1price,
          quantity: bonus1qty,
          comment: `+ ${bonus1} ${bonus1price} ${currency}`,
        },
        function (data) {
          console.log("Upsell added:", data);
          nextPage("yes"); // Redirect after success
        },
        "json"
      );
    });

    // Handle upsell decline or popup close
    $(document).on("click", ".popap__close, .upsale-no, .next-li", function (e) {
      e.preventDefault();
      nextPage("no"); // Redirect without upsell
    });


    // Redirect to success page with form data + keep all current URL params
    function nextPage(type = "no") {
        
        const $finish = $('.finish-block');
        if ($finish.length) {
            orderNum = localStorage.getItem("orderNum");
            $('.order_num').text(orderNum);
            
        $finish.removeClass('active');
        void $finish[0].offsetWidth;
        $finish.addClass('active');
        }

        const form = document.querySelector("form");

        // 1) Serialize the form into a plain object
        const data = Object.fromEntries(new FormData(form).entries());

        // 2) Persist a snapshot for the success page UI (not sent to CRM)
        localStorage.setItem("orderFormData", JSON.stringify(data));

        // 3) Read all existing query params from the current URL
        const current = new URL(window.location.href);
        const params = new URLSearchParams(current.search);

        // 4) Set/override the `upsale` param
        params.set("upsale", type);

      // 5) Build the destination URL relative to <base> (if present)
        const dest = new URL("success/", document.baseURI);
        dest.search = params.toString();


        console.log("Redirecting to", dest.toString());



        $finish.one('animationend transitionend', function () {
        console.log('anim finished')
        window.location.replace(dest.toString());
        });

    }


});


   