import {
  getFirestore,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ResumeModel } from "../../components/LivePreviewerComponents/ResumeModel";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { sanitiseResumeData } from "./utils";

export const useGetResumes = () => {
  const { firebase } = useFirebaseApp();
  const [resumeQueryResult, isLoading, error] = useCollection(
    collection(getFirestore(firebase), "resumes")
  );
  const hasFetchError = !isLoading && error;

  const resumes: ResumeModel[] = useMemo(
    () =>
      resumeQueryResult
        ? resumeQueryResult.docs
            .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
              ...(doc.data() as ResumeModel),
              id: doc.id,
            }))
            .map(sanitiseResumeData)
            .filter((resume) => resume.personalia.lastName)
        : [],
    [resumeQueryResult]
  );

  return {
    resumes,
    hasFetchError,
  };
};
