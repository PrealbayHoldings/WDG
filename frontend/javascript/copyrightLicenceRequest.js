console.log("Copyright Licence Request Form Loaded")

$("#copyrightLicenceRequest-submit-button").click(
    () => {
        $("#copyrightLicenceRequest-submit-button").val("Sending Request Please Wait...")

        let fullName = $("#inputfield-fullName").val();
        let company = $("#inputfield-company").val();
        let contactNumber = $("#inputfield-contactNumber").val();
        let email = $("#inputfield-email").val();
        let mediaType = $("#inputfield-mediaType").val();
        let songTitle = $("#inputfield-songTitle").val();
        let songWriter = $("#inputfield-artist").val();
        let productionName = $("#inputfield-productionName").val();
        let licenceDuration = $("#inputfield-licenceDuration").val();
        let territory = $("input[name=inputfield-territory]").val();
        let details = $("#inputfield-details").val();

        console.log(fullName,company,contactNumber,email,mediaType,songTitle,songWriter,licenceDuration,territory,details)


        let payload = {
            fullName: fullName,
            company: company,
            contactNumber: contactNumber,
            email: email,
            mediaType: mediaType,
            song: songTitle,
            artist: songWriter,
            productionName: productionName,
            licenceDuration: licenceDuration,
            territory: territory,
            additionalDetails: details,
            date : new Date().toLocaleString()
        }

        fetch(
            "https://us-central1-wediditwebsite.cloudfunctions.net/addCopyrightLicenseRequest",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "no-cors" // ONLY FOR TESTING REMOVE IN PRODUCTION
              },
              body: JSON.stringify(payload),
            }
          )
            .then((res) => {
                console.log(res)
                  if(res.status === 200){
                      console.log("Request Successfull")
                      $('#copyrightLicenceRequest-submit-button').css('background-color', '#007A52')
                      $('#copyrightLicenceRequest-submit-button').val('Request Sent ')
      
                  }else{
                      console.log("Request Failed" , res)
                      $('#copyrightLicenceRequest-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
                  }
      
              })
            .catch((err) => {
              console.log(err);
              console.log("Request Failed")
              $('#copyrightLicenceRequest-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
            });

    }
)