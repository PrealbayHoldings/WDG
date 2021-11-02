console.log("Sign Up Form JS Loaded");

//document.getElementById("myForm").submit();

$("#signupform-submit-button").click(() => {
  console.log("Submit Button Clicked");
  console.log("Request Processing...");

  $('#signupform-submit-button').val("Sending Request please wait...")


  let fullName = $("#signUpForm-inputField-fullName").val();
  let contactNumber = $("#signUpForm-inputField-contactNumber").val();
  let email = $("#signUpForm-inputField-email").val();
  let description = $("#signUpForm-inputField-description").val();

  console.log("Full Name => ", fullName);
  console.log("Contact Number => ", contactNumber);
  console.log("Email => ", email);
  console.log("Description => ", description);

  let artistType = ``;

  artistType = `${artistType} ${
    $("#signUpForm-inputField-artistType-author").is(":checked")
      ? "Author "
      : ``
  }`;
  artistType = `${artistType} ${
    $("#signUpForm-inputField-artistType-composer").is(":checked")
      ? "Composer "
      : ``
  }`;
  artistType = `${artistType} ${
    $("#signUpForm-inputField-artistType-melodyWriter").is(":checked")
      ? "Melody Writer "
      : ``
  }`;

  console.log("Artist Type ==> ", artistType);

  if (
    fullName === "" ||
    fullName === undefined ||
    fullName === null ||
    contactNumber === "" ||
    contactNumber === undefined ||
    contactNumber === null
  ) {
    console.log("Form Is Invalid");
    alert("Please Enter Contact Number and Name ");
  } else {
    let payload = {
      fullName: fullName,
      type: artistType,
      contactNumber: contactNumber,
      email: email,
      description: description,
    };

    fetch(
      "https://us-central1-wediditwebsite.cloudfunctions.net/addMemeberRequest",
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
          console.log(res)
            if(res.status === 200){
                console.log("Request Successfull")
                $('#signupform-submit-button').css('background-color', '#007A52')
                $('#signupform-submit-button').val('Request Sent ')

            }else{
                console.log("Request Failed")
                $('#signupform-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
            }

        })
      .catch((err) => {
        console.log(err);
        console.log("Request Failed")
        $('#signupform-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
      });
  }
});
