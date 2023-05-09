var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("./assets/firebase-adminsdk.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "inscribly-84809.appspot.com/",
});

const storageBucket = firebaseAdmin.storage().bucket();

module.exports = { storageBucket };
