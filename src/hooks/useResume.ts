import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { ResumeModel } from "../components/LivePreviewerComponents/ResumeModel";
import { initialResumeData } from "../config/initialData";
import { useFirebaseApp } from "../context/FirebaseContext";
import { castDatesInObject } from "../lib/date";

interface ResumeResult {
  resume?: ResumeModel;
  loading: boolean;
  error?: Error;
}
export const useResume = (id: string): ResumeResult => {
  const { firebase } = useFirebaseApp();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${id}`)
  );

  const [resume, setResume] = useState<ResumeModel>();

  useEffect(() => {
    if (value) {
      setResume({ ...initialResumeData, ...castDatesInObject(value.data()) });
    }
  }, [value]);

  return { resume, loading, error };
};
