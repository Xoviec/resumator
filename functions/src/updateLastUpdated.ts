import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const updateLastUpdated = functions.firestore
  .document(`resumes/{id}`)
  .onUpdate(async (snap, context) => {
    const previousData = snap.before.data();
    const newData = snap.after.data();
    const shouldUpdateLastUpdated = previousData.lastUpdated === newData.lastUpdated;

    if (shouldUpdateLastUpdated) {
      await admin.firestore().doc(`resumes/${context.params.id}`).update({
        lastUpdated: Date.now(),
      });
    }
  });
