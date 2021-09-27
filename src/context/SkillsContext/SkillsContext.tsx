import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebaseApp } from "../FirebaseContext";

type SkillsContextType = {
  skillList: string[];
  updateSkillList: (arg: string[]) => void;
};

const SkillsContext = React.createContext<SkillsContextType | undefined>(undefined);

export const useSkillsContext = (): SkillsContextType => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("Firebase context is used before initialization");
  }

  return context;
};

export const SkillsContextProvider: React.VFC<
  React.PropsWithChildren<Record<string, never>>
> = ({ children }) => {
  const { firebase } = useFirebaseApp();

  const [skillList, setSkillList] = useState<string[]>([]);
  const [docId, setDocId] = useState<string>("");
  const [val] = useCollection(firebase.firestore().collection("allSkills"));

  useEffect(() => {
    if (val) {
      setDocId(val.docs[0].id);
      setSkillList(val.docs[0].data().skills);
    }
  }, [val]);

  const updateSkillList: SkillsContextType["updateSkillList"] = async (
    newSkillList
  ) => {
    const ref = await firebase.firestore().collection("allSkills").doc(docId);
    ref.update({ skills: newSkillList });
    setSkillList(newSkillList);
  };

  return (
    <SkillsContext.Provider
      value={{
        skillList,
        updateSkillList,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
