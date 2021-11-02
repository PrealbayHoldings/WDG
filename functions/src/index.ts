import { https, logger, config, firestore } from "firebase-functions";


// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";



admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const cors = require('cors')({ origin: true });

export const helloWorld = https.onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });

  admin.firestore().doc("TestCollection/testdoc")
    .get()
    .then(
      (snapshot) => {
        response.send(snapshot.data());
      }
    )
    .catch(
      (err) => {
        console.log(err);
        response.status(500).send("Could not retireve the needed data");
      }
    );
});

export const parameterCheck = https.onRequest((request, response) => {
  // logger.info("Hello logs!", {structuredData: true});

  const requestParameters = request.body;

  admin.firestore().doc("TestCollection/testdoc")
    .get()
    .then(
      (snapshot) => {
        response.json(requestParameters);
      }
    )
    .catch(
      (err) => {
        console.log(err);
        response.status(500).send("Could not retireve the needed data");
      }
    );
});

export const emailTest = https.onRequest((request, response) => {
  // logger.info("Hello logs!", {structuredData: true});

  // let requestParameters = request.body;
  const sendGridKey = config().sendgrid;

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(sendGridKey.key);
  const msg = {
    to: "pearlbayfirebase@gmail.com", // Change to your recipient
    from: "az@pearlbay.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      // console.log('Email sent')
      response.status(200).send("Sent Email");
    })
    .catch((error: any) => {
      logger.error(error)
      response.status(500).send("Couldnt Send the email");
    });
});


export const addContactUsRequest = https.onRequest((request, response) => {
  // logger.info("Hello logs!", {structuredData: true});
  cors(request, response, () => {
    const { name, email, phone, message, country } = request.body;

    const saveData = {
      name,
      email,
      phone,
      message,
      country,
    };

    const db = admin.firestore();

    // let docId = `${fullName}_${new Date().toLocaleString()}`

    let sendToEmail = "info@wediditglobal.com";

    if (country === "AUSTRALIA") {
      sendToEmail = "admin@wediditglobal.com.au";
    } else {
      sendToEmail = "info@wediditglobal.com";
    }

    db.collection("ContactUsRequest").add(saveData).then(
      () => {
        const sendGridKey = config().sendgrid;

        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(sendGridKey.key);
        const date = new Date();


        const msg = {
          to: sendToEmail, // Change to your recipient
          from: "tech@wediditglobal.com", // Change to your verified sender
          templateId: "d-69a437d925ac4c7a85860ff4a8f8ca68",
          substitutionWrappers: ["{{", "}}"],
          dynamic_template_data: {

            date: date.toLocaleString(),
            subject: `Contact Us Request by ${name}`,
            preheader: `for country ${country} from ${email}`,
            name: name,
            email: email,
            phone: phone,
            message: message,
            country: country,
          },
        };
        sgMail
          .send(msg)
          .then(() => {
            // console.log('Email sent')
            logger.info("Contact Us Request Email sent");

            response.status(200).send("Sent Email");
          })
          .catch((error: any) => {
            // console.error(error)
            logger.warn("Contact us  Request email  Failed");
            logger.warn(error.response.body);

            response.status(500).send("Couldnt Send the email");
          });
      }
    ).catch(
      (error) => {
        logger.error(error, { structuredData: true });
        response.status(500).send("Couldnt Save Contact us request");
      }
    );
  })

});


export const addMemeberRequest = https.onRequest((request, response) => {
  // logger.info("Hello logs!", {structuredData: true});

  cors(request, response, () => {
    const { fullName, type, contactNumber, email, description } = request.body;

    const saveData = {
      fullName,
      type,
      contactNumber,
      email,
      description,
    };

    const db = admin.firestore();

    // let docId = `${fullName}_${new Date().toLocaleString()}`

    db.collection("MemberRequest").add(saveData).then(
      (data) => response.status(200).send("Member Request Successfully")
    ).catch(
      (error) => {
        logger.error(error, { structuredData: true });
        response.status(500).send("Couldnt Add memeber request");
      }
    );
  })


});


export const onNewMemberRequestCreated = firestore.document("MemberRequest/{id}").onCreate(
  async (change, context) => {
    const memberRequestSnap = await admin.firestore().collection("MemberRequest").doc(context.params.id).get();

    logger.info(`Member Request Triggered id ${context.params.id}`);

    const member = memberRequestSnap.data() || {};

    const sendGridKey = config().sendgrid;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(sendGridKey.key);

    const date = new Date();

    const msg = {
      to: "membership@wediditglobal.com", // Change to your recipient
      from: "tech@wediditglobal.com", // Change to your verified sender
      templateId: "d-9d0807cfb21d40bab267b7b413ce2fde",
      substitutionWrappers: ["{{", "}}"],
      dynamic_template_data: {
        fullName: member.fullName,
        type: member.type,
        email: member.email,
        description: member.description,
        contactNumber: member.contactNumber,
        date: `${date.toLocaleString()}`,
        subject: `New Member Request ${member.fullName}`,
      },
    };
    sgMail
      .send(msg)
      .then(() => {
        // console.log('Email sent')
        // response.status(200).send("Sent Email")
        logger.info("Member Request Email sent");
      })
      .catch((error: any) => {
        // console.error(error)
        logger.warn("Member Request Failed");
        logger.warn(error.response.body);
        // response.status(500).send("Couldnt Send the email")
      });
  }
);


export const addCopyrightLicenseRequest = https.onRequest((request, response) => {
   
  
  logger.info(`addCopyrightLicenseRequest ${JSON.stringify(request.body)}` , {structuredData: true});

  

  cors(request, response, () => {
    const {
      fullName,
      company,
      contactNumber,
      email,
      mediaType,
      song,
      artist,
      productionName,
      licenceDuration,
      territory,
      additionalDetails,
      date,

    } = request.body;

    const saveData = {
      fullName,
      company,
      contactNumber,
      email,
      mediaType,
      song,
      artist,
      productionName,
      licenceDuration,
      territory,
      additionalDetails,
      date,
    };

    const db = admin.firestore();

    // let docId = `${fullName}_${new Date().toLocaleString()}`

    db.collection("CopywriteLicenceRequest").add(saveData).then(
      (data) => {
        // response.status(200).send("Member Request Successfully")
        const sendGridKey = config().sendgrid;

        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(sendGridKey.key);
        const date = new Date();

        const msg = {
          to: "licence@wediditglobal.com", // Change to your recipient
          from: "tech@wediditglobal.com", // Change to your verified sender
          templateId: "d-822c507a22f14f74bf2f969d8adfdc1d",
          substitutionWrappers: ["{{", "}}"],
          dynamic_template_data: {
            fullName: fullName,
            company: company,
            contactNumber: contactNumber,
            email: email,
            mediaType: mediaType,
            song: song,
            artist: artist,
            productionName: productionName,
            licenceDuration: licenceDuration,
            territory: territory,
            additionalDetails: additionalDetails,
            date: date.toLocaleString(),
            subject: `Copyright Licence Request for ${song} by ${fullName}`,
            preheader: `${fullName} from ${company}`,
          },
        };
        sgMail
          .send(msg)
          .then(() => {
            // console.log('Email sent')
            logger.info("Copyright Licence Request Email sent");

            response.status(200).send("Sent Email");
          })
          .catch((error: any) => {
            // console.error(error)
            logger.warn("Member Request Failed");
            logger.warn(error.response.body);

            response.status(500).send("Couldnt Send the email");
          });
      }

    ).catch(
      (error) => {
        logger.error(error, { structuredData: true });
        response.status(500).send("Couldnt Add memeber request");
      }
    );
  })


});

export const addCopyrightInfringementReport = https.onRequest((request, response) => {
  // logger.info("Hello logs!", {structuredData: true});

  cors(request, response, () => {
    const {
      email,
      contentName,
      mediaType,
      additionalDetails,
      url,
    } = request.body;


    const saveData = {
      email,
      contentName,
      mediaType,
      additionalDetails,
      url,
    };

    const db = admin.firestore();

    // let docId = `${fullName}_${new Date().toLocaleString()}`

    db.collection("CopyriteInfringementReportRequests").add(saveData).then(
      (data) => {
        // response.status(200).send("Member Request Successfully")
        const sendGridKey = config().sendgrid;

        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(sendGridKey.key);
        const date = new Date();

        const msg = {
          to: "reporting@wediditglobal.com", // Change to your recipient
          from: "tech@wediditglobal.com", // Change to your verified sender
          templateId: "d-51afa955580a4e3fa83a5c877ee313fa",
          substitutionWrappers: ["{{", "}}"],
          dynamic_template_data: {
            email: email,
            contentName: contentName,
            mediaType: mediaType,
            additionalDetails: additionalDetails,
            url: url,
            date: date.toLocaleString(),
            subject: `Copyright Infringement Report for ${contentName}`,
            preheader: `for ${contentName} from ${email}`,
          },
        };
        sgMail
          .send(msg)
          .then(() => {
            // console.log('Email sent')
            logger.info("Copyright Infringement Report Email sent");

            response.status(200).send("Sent Email");
          })
          .catch((error: any) => {
            // console.error(error)
            logger.warn("Copyright Infringement Report Request Failed");
            logger.warn(error.response.body);

            response.status(500).send("Couldnt Send the email");
          });
      }

    ).catch(
      (error) => {
        logger.error(error, { structuredData: true });
        response.status(500).send("Couldnt Add memeber request");
      }
    );
  })
});







