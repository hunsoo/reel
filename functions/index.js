// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Cors = require("cors");
const express = require("express");
const fileUploadMiddleware = require("./middleware");

const api = express().use(Cors({ origin: true }));
fileUploadMiddleware("/images", api);

admin.initializeApp(functions.config().firebase);

api.post("/images", function (req, response, next) {
  uploadImageToStorage(req.files.file[0])
    .then(metadata => {
      response.status(200).json(metadata[0]);
      next();
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error });
      next();
    });
});

exports.api = functions.https.onRequest(api);

const uploadImageToStorage = file => {
  const storage = admin.storage();
  return new Promise((resolve, reject) => {
    const fileUpload = storage.bucket().file(file.originalname);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: "image/jpg"
      }
    });

    blobStream.on("error", error => reject(error));

    blobStream.on("finish", () => {
      fileUpload.getMetadata()
        .then(metadata => resolve(metadata))
        .catch(error => reject(error));
    });

    blobStream.end(file.buffer);
  });
}
