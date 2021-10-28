import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebaseApp } from "../FirebaseContext";

type SkillsContextType = {
  skillList: string[];
  updateSkillList: (arg: string[]) => Promise<void>;
};

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const useSkillsContext = (): SkillsContextType => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("Firebase context is used before initialization");
  }

  return context;
};

export const SkillsContextProvider: FunctionComponent = ({ children }) => {
  const { firebase } = useFirebaseApp();

  const [skillList, setSkillList] = useState<string[]>([]);
  const [docId, setDocId] = useState<string>("");
  const [val] = useCollection(firebase.firestore().collection("allSkills"));

  useEffect(() => {
    if (val) {
      setDocId(val.docs[0].id);

      const uniqueSkillList = [
        ...Array.from(new Set(val.docs[0].data().skills)),
      ] as string[];

      setSkillList(uniqueSkillList);
    }
  }, [val]);

  const updateSkillList: SkillsContextType["updateSkillList"] = useMemo(() => {
    return async (newSkillList) => {
      const uniqueNewSkillList = [...Array.from(new Set(newSkillList))];

      // it is very likely for the firebase update to be successful, so it covers most of the cases
      // so we ensure faster user experience for majority of users
      // in the unlikely scenario, it will be updated from firebase anyway
      setSkillList(uniqueNewSkillList);

      await firebase
        .firestore()
        .collection("allSkills")
        .doc(docId)
        .update({ skills: uniqueNewSkillList });
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
