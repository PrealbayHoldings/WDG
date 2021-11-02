console.log("Contact Us Sri Lanka Page JS file loaded")
$("#contactUs-submit-button").click(() => {
  let name = $("#input-field-name").val();
  let email = $("#input-field-email").val();
  let phone = $("#input-field-phone").val();
  let message = $("#input-field-message").val();

  let payload = {
    name: name,
    email: email,
    phone: phone,
    message: message,
    country: "AUSTRALIA",
  };

  fetch(
    "https://us-central1-wediditwebsite.cloudfunctions.net/addContactUsRequest",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin" : "no-cors" // ONLY FOR TESTING REMOVE IN PRODUCTION
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("Request Successfull");
        $("contactUs-submit-button").css("background-color", "#007A52");
        $("#contactUs-submit-button").val("Request Sent ");
      } else {
        console.log("Request Failed");
        $("#contactUs-submit-button").val(
          "Couldnt Send Your Request Please contact (+94) 113 619 765 "
        );
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Request Failed");
      $("#signupform-submit-button").val(
        "Couldnt Send Your Request Please contact (+94) 113 619 765 "
      );
    });
});
