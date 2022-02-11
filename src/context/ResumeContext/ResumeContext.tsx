import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { initialResumeData } from "../../config/initialData";
import { castDatesInObject } from "../../lib";
import { useFirebaseApp } from "../FirebaseContext/FirebaseContext";

interface IResumeContext {
  resume: ResumeModel | null;
  getPersonalResume: () => void;
  getResumeById: (id: string) => void;
  loading: boolean;
  error: string | undefined;
  resumeId: string | null;
}

const ResumeContext = createContext<IResumeContext | null>(null);

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const { firebase, userRecord } = useFirebaseApp();
  const [resume, setResume] = useState<ResumeModel | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getPersonalResume = useCallback(() => {
    setLoading(true);
    setResume(null);
    firebase
      .firestore()
      .collection("resumes")
      .where("personalia.email", "==", userRecord?.email)
      .get()
      .then((doc) => {
        const id = doc.docs?.[0].id;
        const docData = doc.docs?.[0].data();
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
  }, [firebase, userRecord]);

  const getResumeById = useCallback(
    (id: string) => {
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
    }),
    [error, getPersonalResume, getResumeById, loading, resume, resumeId]
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
