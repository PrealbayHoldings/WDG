console.log("Report Form Loaded")


$("#reportForm-submit-button").click(
    () => {
        $('#reportForm-submit-button').val("Sending Request please wait...")

        let email = $("#inputfield-email").val();
        let contentName = $("#inputfield-contentName").val();
        let mediaType = $("#inputfield-mediaType").val();
        let details = $("#inputfield-details").val();
        let url = $("#inputfield-url").val();

        console.log(email, contentName, mediaType, details, url)

        let payload = {
            email : email,
            contentName : contentName,
            mediaType : mediaType,
            additionalDetails : details,
            url : url
        }

        fetch(
            "https://us-central1-wediditwebsite.cloudfunctions.net/addCopyrightInfringementReport",
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
                      $('#reportForm-submit-button').css('background-color', '#007A52')
                      $('#reportForm-submit-button').val('Request Sent ')
      
                  }else{
                      console.log("Request Failed")
                      $('#reportForm-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
                  }
      
              })
            .catch((err) => {
              console.log(err);
              console.log("Request Failed")
              $('#reportForm-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ")
            });
    }
)