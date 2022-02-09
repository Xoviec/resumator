import React, { useState } from "react";
import { ResumeModel } from "../components/LivePreviewerComponents/ResumeModel";
import { initialResumeData } from "../config/initialData";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";
import { castDatesInObject } from "../lib/date";

interface ResumeResult {
  resume?: ResumeModel;
  loading: boolean;
  error?: Error;
}

export const useResume = ({ id }: { id: string }): ResumeResult => {
  const { firebase, userRecord } = useFirebaseApp();
  const [resume, setResume] = useState<ResumeModel>(initialResumeData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getPersonalResume = React.useCallback(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("resumes")
      .where("personalia.email", "==", userRecord?.email)
      .get()
      .then((doc) => {
        const docData = doc.docs?.[0].data();
        setLoading(false);
        if (!docData) return;
        return setResume((prev) => ({
          ...prev,
          ...castDatesInObject(docData),
        }));
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [firebase, userRecord]);

  const getCollectiveResume = React.useCallback(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("resumes")
      .doc(id)
      .get()
      .then((doc) => {
        const docData = doc.data();
        setLoading(false);
        if (!docData) return;
        return setResume((prev) => ({
          ...prev,
          ...castDatesInObject(docData),
        }));
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [firebase, userRecord, id]);

  React.useEffect(() => {
    userRecord?.isManager ? getCollectiveResume() : getPersonalResume();
  }, [getPersonalResume, getCollectiveResume]);

  return { resume, loading, error };
};
