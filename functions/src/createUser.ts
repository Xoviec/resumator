import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const USER_COLLECTION = "users";

export const createUser = functions.firestore
  .document("resumes/{resumeId}")
  .onCreate(async (snap) => {
    const {
      personalia: { email, firstName, lastName },
      userId,
    } = snap.data();
    try {
      const userCollection = admin.firestore().collection(USER_COLLECTION);

      const userSnapshot = await userCollection.where("email", "==", email).get();

      let userData: {} = { registered: true };
      let userPromise;

      // Write new user if none exist
      if (userSnapshot.empty) {
        userData = {
          name: `${firstName} ${lastName}`,
          email: email,
          ...userData,
        };
      } else {
        let userDoc = {};

        userSnapshot.forEach((doc) => {
          userDoc = doc.data();
          doc.ref.delete().catch(() => {
            console.log("error deleting reference ");
          });
        });

        userData = {
          ...userDoc,
          ...userData,
        };
      }

      userPromise = userCollection.doc(userId).set(userData);
      return userPromise;
    } catch (err) {
      if (err instanceof Error) {
        throw new functions.https.HttpsError("failed-precondition", err.message);
      }

      return false;
    }
  });
