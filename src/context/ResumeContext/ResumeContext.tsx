import rootFirebase from "firebase/compat/app";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { initialResumeData } from "../../config/initialData";
import { castDatesInObject } from "../../lib";
import { useFirebaseApp } from "../FirebaseContext/FirebaseContext";

interface IResumeContext {
  resume: ResumeModel | null;
  getPersonalResume: (email?: string) => void;
  getResumeById: (id?: string) => void;
  loading: boolean;
  error: string | undefined;
  resumeId: string | null;
  getResumePromise: (
    email?: string | undefined
  ) => Promise<
    [
      rootFirebase.firestore.QuerySnapshot<rootFirebase.firestore.DocumentData>,
      rootFirebase.firestore.QuerySnapshot<rootFirebase.firestore.DocumentData>
    ]
  >;
}

const ResumeContext = createContext<IResumeContext | null>(null);

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const { firebase, userRecord } = useFirebaseApp();
  const [resume, setResume] = useState<ResumeModel | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getResumePromise = useCallback(
    (email?: string) => {
      const _email = email || userRecord?.email;
      if (!_email) throw new Error("No email found to search a resume for");

      const parts = _email.split("@");
      const collectionRef = firebase.firestore().collection("resumes");
      const q1 = collectionRef
        .where("personalia.email", "==", `${parts[0]}@frontmen.nl`)
        .get();
      const q2 = collectionRef
        .where("personalia.email", "==", `${parts[0]}@iodigital.com`)
        .get();
      return Promise.all([q1, q2]);
    },
    [firebase, userRecord]
  );

  const getPersonalResume = useCallback(
    (email?: string) => {
      setLoading(true);
      setResume(null);
      getResumePromise(email)
        .then((results) => {
          const result = results[0].docs?.[0]?.id ? results[0] : results[1];
          const id = result.docs?.[0].id;
          const docData = result.docs?.[0].data();
          setLoading(false);
          if (!docData) return;
          setResumeId(id);
          return setResume((prev) => {
            return {
              ...initialResumeData,
              ...castDatesInObject(docData),
            };
          });
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    },
    [getResumePromise]
  );

  const getResumeById = useCallback(
    (id?: string) => {
      setLoading(true);
      setResume(null);
      firebase
        .firestore()
        .collection("resumes")
        .doc(id)
        .get()
        .then((doc) => {
          const docData = doc.data();
          setLoading(false);
          if (!docData) return;
          setResumeId(doc.id);
          return setResume(() => ({
            ...initialResumeData,
            ...castDatesInObject(docData),
          }));
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    },
    [firebase]
  );

  const context = useMemo(
    () => ({
      loading,
      resume,
      error,
      getPersonalResume,
      getResumeById,
      resumeId,
      getResumePromise,
    }),
    [
      error,
      getPersonalResume,
      getResumeById,
      getResumePromise,
      loading,
      resume,
      resumeId,
    ]
  );

  return <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>;
};

const useResumeContext = () => {
  const context = useContext(ResumeContext);

  if (context === null) {
    throw new Error(
      `useResume hook is called outside of the Resume context Provider`
    );
  }

  return context;
};

export { ResumeProvider, useResumeContext };
