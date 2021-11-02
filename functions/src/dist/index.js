"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.addCopyrightInfringementReport = exports.addCopyrightLicenseRequest = exports.onNewMemberRequestCreated = exports.addMemeberRequest = exports.addContactUsRequest = exports.emailTest = exports.parameterCheck = exports.helloWorld = void 0;
var firebase_functions_1 = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
var admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
var cors = require('cors')({ origin: true });
exports.helloWorld = firebase_functions_1.https.onRequest(function (request, response) {
    firebase_functions_1.logger.info("Hello logs!", { structuredData: true });
    admin.firestore().doc("TestCollection/testdoc")
        .get()
        .then(function (snapshot) {
        response.send(snapshot.data());
    })["catch"](function (err) {
        console.log(err);
        response.status(500).send("Could not retireve the needed data");
    });
});
exports.parameterCheck = firebase_functions_1.https.onRequest(function (request, response) {
    // logger.info("Hello logs!", {structuredData: true});
    var requestParameters = request.body;
    admin.firestore().doc("TestCollection/testdoc")
        .get()
        .then(function (snapshot) {
        response.json(requestParameters);
    })["catch"](function (err) {
        console.log(err);
        response.status(500).send("Could not retireve the needed data");
    });
});
exports.emailTest = firebase_functions_1.https.onRequest(function (request, response) {
    // logger.info("Hello logs!", {structuredData: true});
    // let requestParameters = request.body;
    var sendGridKey = firebase_functions_1.config().sendgrid;
    var sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(sendGridKey.key);
    var msg = {
        to: "pearlbayfirebase@gmail.com",
        from: "az@pearlbay.com",
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    sgMail
        .send(msg)
        .then(function () {
        // console.log('Email sent')
        response.status(200).send("Sent Email");
    })["catch"](function (error) {
        firebase_functions_1.logger.error(error);
        response.status(500).send("Couldnt Send the email");
    });
});
exports.addContactUsRequest = firebase_functions_1.https.onRequest(function (request, response) {
    // logger.info("Hello logs!", {structuredData: true});
    cors(request, response, function () {
        var _a = request.body, name = _a.name, email = _a.email, phone = _a.phone, message = _a.message, country = _a.country;
        var saveData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            country: country
        };
        var db = admin.firestore();
        // let docId = `${fullName}_${new Date().toLocaleString()}`
        var sendToEmail = "info@wediditglobal.com";
        if (country === "AUSTRALIA") {
            sendToEmail = "admin@wediditglobal.com.au";
        }
        else {
            sendToEmail = "info@wediditglobal.com";
        }
        db.collection("ContactUsRequest").add(saveData).then(function () {
            var sendGridKey = firebase_functions_1.config().sendgrid;
            var sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(sendGridKey.key);
            var date = new Date();
            var msg = {
                to: sendToEmail,
                from: "tech@wediditglobal.com",
                templateId: "d-69a437d925ac4c7a85860ff4a8f8ca68",
                substitutionWrappers: ["{{", "}}"],
                dynamic_template_data: {
                    date: date.toLocaleString(),
                    subject: "Contact Us Request by " + name,
                    preheader: "for country " + country + " from " + email,
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    country: country
                }
            };
            sgMail
                .send(msg)
                .then(function () {
                // console.log('Email sent')
                firebase_functions_1.logger.info("Contact Us Request Email sent");
                response.status(200).send("Sent Email");
            })["catch"](function (error) {
                // console.error(error)
                firebase_functions_1.logger.warn("Contact us  Request email  Failed");
                firebase_functions_1.logger.warn(error.response.body);
                response.status(500).send("Couldnt Send the email");
            });
        })["catch"](function (error) {
            firebase_functions_1.logger.error(error, { structuredData: true });
            response.status(500).send("Couldnt Save Contact us request");
        });
    });
});
exports.addMemeberRequest = firebase_functions_1.https.onRequest(function (request, response) {
    // logger.info("Hello logs!", {structuredData: true});
    cors(request, response, function () {
        var _a = request.body, fullName = _a.fullName, type = _a.type, contactNumber = _a.contactNumber, email = _a.email, description = _a.description;
        var saveData = {
            fullName: fullName,
            type: type,
            contactNumber: contactNumber,
            email: email,
            description: description
        };
        var db = admin.firestore();
        // let docId = `${fullName}_${new Date().toLocaleString()}`
        db.collection("MemberRequest").add(saveData).then(function (data) { return response.status(200).send("Member Request Successfully"); })["catch"](function (error) {
            firebase_functions_1.logger.error(error, { structuredData: true });
            response.status(500).send("Couldnt Add memeber request");
        });
    });
});
exports.onNewMemberRequestCreated = firebase_functions_1.firestore.document("MemberRequest/{id}").onCreate(function (change, context) { return __awaiter(void 0, void 0, void 0, function () {
    var memberRequestSnap, member, sendGridKey, sgMail, date, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, admin.firestore().collection("MemberRequest").doc(context.params.id).get()];
            case 1:
                memberRequestSnap = _a.sent();
                firebase_functions_1.logger.info("Member Request Triggered id " + context.params.id);
                member = memberRequestSnap.data() || {};
                sendGridKey = firebase_functions_1.config().sendgrid;
                sgMail = require("@sendgrid/mail");
                sgMail.setApiKey(sendGridKey.key);
                date = new Date();
                msg = {
                    to: "membership@wediditglobal.com",
                    from: "tech@wediditglobal.com",
                    templateId: "d-9d0807cfb21d40bab267b7b413ce2fde",
                    substitutionWrappers: ["{{", "}}"],
                    dynamic_template_data: {
                        fullName: member.fullName,
                        type: member.type,
                        email: member.email,
                        description: member.description,
                        contactNumber: member.contactNumber,
                        date: "" + date.toLocaleString(),
                        subject: "New Member Request " + member.fullName
                    }
                };
                sgMail
                    .send(msg)
                    .then(function () {
                    // console.log('Email sent')
                    // response.status(200).send("Sent Email")
                    firebase_functions_1.logger.info("Member Request Email sent");
                })["catch"](function (error) {
                    // console.error(error)
                    firebase_functions_1.logger.warn("Member Request Failed");
                    firebase_functions_1.logger.warn(error.response.body);
                    // response.status(500).send("Couldnt Send the email")
                });
                return [2 /*return*/];
        }
    });
}); });
exports.addCopyrightLicenseRequest = firebase_functions_1.https.onRequest(function (request, response) {
    firebase_functions_1.logger.info("addCopyrightLicenseRequest " + JSON.stringify(request.body), { structuredData: true });
    cors(request, response, function () {
        var _a = request.body, fullName = _a.fullName, company = _a.company, contactNumber = _a.contactNumber, email = _a.email, mediaType = _a.mediaType, song = _a.song, artist = _a.artist, productionName = _a.productionName, licenceDuration = _a.licenceDuration, territory = _a.territory, additionalDetails = _a.additionalDetails, date = _a.date;
        var saveData = {
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
            date: date
        };
        var db = admin.firestore();
        // let docId = `${fullName}_${new Date().toLocaleString()}`
        db.collection("CopywriteLicenceRequest").add(saveData).then(function (data) {
            // response.status(200).send("Member Request Successfully")
            var sendGridKey = firebase_functions_1.config().sendgrid;
            var sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(sendGridKey.key);
            var date = new Date();
            var msg = {
                to: "licence@wediditglobal.com",
                from: "tech@wediditglobal.com",
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
                    subject: "Copyright Licence Request for " + song + " by " + fullName,
                    preheader: fullName + " from " + company
                }
            };
            sgMail
                .send(msg)
                .then(function () {
                // console.log('Email sent')
                firebase_functions_1.logger.info("Copyright Licence Request Email sent");
                response.status(200).send("Sent Email");
            })["catch"](function (error) {
                // console.error(error)
                firebase_functions_1.logger.warn("Member Request Failed");
                firebase_functions_1.logger.warn(error.response.body);
                response.status(500).send("Couldnt Send the email");
            });
        })["catch"](function (error) {
            firebase_functions_1.logger.error(error, { structuredData: true });
            response.status(500).send("Couldnt Add memeber request");
        });
    });
});
exports.addCopyrightInfringementReport = firebase_functions_1.https.onRequest(function (request, response) {
    // logger.info("Hello logs!", {structuredData: true});
    cors(request, response, function () {
        var _a = request.body, email = _a.email, contentName = _a.contentName, mediaType = _a.mediaType, additionalDetails = _a.additionalDetails, url = _a.url;
        var saveData = {
            email: email,
            contentName: contentName,
            mediaType: mediaType,
            additionalDetails: additionalDetails,
            url: url
        };
        var db = admin.firestore();
        // let docId = `${fullName}_${new Date().toLocaleString()}`
        db.collection("CopyriteInfringementReportRequests").add(saveData).then(function (data) {
            // response.status(200).send("Member Request Successfully")
            var sendGridKey = firebase_functions_1.config().sendgrid;
            var sgMail = require("@sendgrid/mail");
            sgMail.setApiKey(sendGridKey.key);
            var date = new Date();
            var msg = {
                to: "reporting@wediditglobal.com",
                from: "tech@wediditglobal.com",
                templateId: "d-51afa955580a4e3fa83a5c877ee313fa",
                substitutionWrappers: ["{{", "}}"],
                dynamic_template_data: {
                    email: email,
                    contentName: contentName,
                    mediaType: mediaType,
                    additionalDetails: additionalDetails,
                    url: url,
                    date: date.toLocaleString(),
                    subject: "Copyright Infringement Report for " + contentName,
                    preheader: "for " + contentName + " from " + email
                }
            };
            sgMail
                .send(msg)
                .then(function () {
                // console.log('Email sent')
                firebase_functions_1.logger.info("Copyright Infringement Report Email sent");
                response.status(200).send("Sent Email");
            })["catch"](function (error) {
                // console.error(error)
                firebase_functions_1.logger.warn("Copyright Infringement Report Request Failed");
                firebase_functions_1.logger.warn(error.response.body);
                response.status(500).send("Couldnt Send the email");
            });
        })["catch"](function (error) {
            firebase_functions_1.logger.error(error, { structuredData: true });
            response.status(500).send("Couldnt Add memeber request");
        });
    });
});
