import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import { ResumeModel } from "../components/LivePreviewerComponents/ResumeModel";
import { initialResumeData } from "../config/initialData";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";
import { castDatesInObject } from "../lib/date";

interface ResumeResult {
  resume?: ResumeModel;
  loading: boolean;
  error?: Error;
}
export const useResume = (id: string): ResumeResult => {
  const { replace } = useHistory();
  const { firebase } = useFirebaseApp();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`resumes/${id}`)
  );

  const [resume, setResume] = useState<ResumeModel>();

  useEffect(() => {
    if (value?.exists) {
      setResume({ ...initialResumeData, ...castDatesInObject(value.data()) });
      return;
    }

    // ! value can be undefined but we need to redirect only when value object exist will be false
    if (value?.exists === false) {
      replace("/");
    }
  }, [value]);

  return { resume, loading, error };
};
