const functions = require("firebase-functions");

/* user */

// { disabled: false,
// displayName: 'Sebas',
// email: 'Sebas@frontmen.nl',
// emailVerified: false,
// metadata: {creationTime: null, lastSignInTime: null},
// photoURL: null,
// providerData: ['google.com'],
// uid: '123' }

exports.createUser = functions.auth.user().onCreate((user) => {
  console.log(user);
});
