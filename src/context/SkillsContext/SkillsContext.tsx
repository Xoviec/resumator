import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFirebaseApp } from "../FirebaseContext/FirebaseContext";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

type SkillsContextType = {
  skillList: string[];
  updateSkillList: (arg: string[]) => Promise<void>;
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const useSkillsContext = (): SkillsContextType => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("Skills context is used before initialization");
  }

  return context;
};

export const SkillsContextProvider: FunctionComponent = ({ children }) => {
  const { firebase } = useFirebaseApp();

  const [skillList, setSkillList] = useState<string[]>([]);
  const [docId, setDocId] = useState<string>("");
  const [allSkillsResult] = useCollection(
    collection(getFirestore(firebase), "allSkills")
  );

  useEffect(() => {
    if (allSkillsResult) {
      setDocId(allSkillsResult.docs[0].id);

      const uniqueSkillList = [
        ...Array.from(new Set(allSkillsResult.docs[0].data().skills)),
      ] as string[];

      setSkillList(uniqueSkillList);
    }
  }, [allSkillsResult]);

  const updateSkillList: SkillsContextType["updateSkillList"] = useMemo(() => {
    return async (newSkillList) => {
      const uniqueNewSkillList = [...Array.from(new Set(newSkillList))];

      await firebase
        .firestore()
        .collection("allSkills")
        .doc(docId)
        .update({ skills: uniqueNewSkillList });

      setSkillList(uniqueNewSkillList);
    };
  }, [docId, firebase]);

  const skillsContext: SkillsContextType = useMemo(
    () => ({
      skillList,
      updateSkillList,
    }),
    [skillList, updateSkillList]
  );

  return (
    <SkillsContext.Provider value={skillsContext}>{children}</SkillsContext.Provider>
  );
};
