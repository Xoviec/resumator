import { useEffect } from "react";
import { useFirebaseApp } from "../context/FirebaseContext/FirebaseContext";
import { useResumeContext } from "../context/ResumeContext/ResumeContext";

const useResume = (id?: string) => {
  const { userRecord } = useFirebaseApp();
  const { resume, loading, error, getPersonalResume, getResumeById, resumeId } =
    useResumeContext();

  useEffect(() => {
    userRecord?.isManager ? getResumeById(id) : getPersonalResume();
  }, [getPersonalResume, getResumeById, id, userRecord]);

  return {
    resume,
    loading,
    error,
    resumeId,
  };
};

export { useResume };
