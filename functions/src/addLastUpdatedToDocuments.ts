import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const addLastUpdatedToDocuments = functions.https.onRequest(
  async (_req, res) => {
    const allResumes = await admin.firestore().collection("resumes").get();
    allResumes.forEach(async (doc) => {
      const resume = doc.data();
      if (resume.lastUpdated) return;
      await doc.ref.update({ lastUpdated: Date.now() });
    });
    res.send(200);
  }
);
