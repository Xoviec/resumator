import { useState } from "react";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";

export const useDeleteResume = () => {
  const { firebase } = useFirebaseApp();

  const [resumeToDelete, setResumeToDelete] = useState<ResumeModel | null>(null);
  const deleteResume = (resume: ResumeModel | null) => {
    if (!resume || !resume?.id) return;

    firebase
      .firestore()
      .collection("resumes")
      .doc(resume.id)
      .delete()
      .then(() => setResumeToDelete(null))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error removing document: ", error);
      });
  };

  return { deleteResume, setResumeToDelete, resumeToDelete };
};
