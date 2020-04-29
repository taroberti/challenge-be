const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');
const serviceAccountUrl = require('../config/serviceAccountUrl.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccountUrl.URL
});

let db = admin.firestore();

module.exports = db;