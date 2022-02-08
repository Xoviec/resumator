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

export const useResume = (): ResumeResult => {
  const { firebase, userRecord } = useFirebaseApp();
  const [resume, setResume] = useState<ResumeModel>(initialResumeData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getResume = React.useCallback(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("resumes")
      .where("personalia.email", "==", userRecord?.email)
      .get()
      .then((doc) => {
        setLoading(false);
        return setResume((prev) => ({
          ...prev,
          ...castDatesInObject(doc?.docs?.[0]?.data()),
        }));
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [firebase, userRecord]);

  React.useEffect(() => {
    getResume();
  }, [getResume]);

  return { resume, loading, error };
};
