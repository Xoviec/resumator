import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../FirebaseContext";

export const SkillsContext: React.Context<{
  skillList: string[];
  updateSkillList: (arg: string[]) => void;
  docId: string;
}> = React.createContext({
  skillList: [""],
  updateSkillList: (arg: string[]) => {},
  docId: "",
});

export const SkillsContextProvider: FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { firebase } = useContext(FirebaseAppContext) as any;

  const [skillList, setSkillList] = useState<string[]>([]);
  const [docId, setDocId] = useState<string>("");
  const [val] = useCollection(firebase.firestore().collection("allSkills"));

  useEffect(() => {
    if (val) {
      setDocId(val.docs[0].id);
      setSkillList(val.docs[0].data().skills);
    }
  }, [val]);

  return (
    <SkillsContext.Provider
      value={{
        skillList: skillList,
        updateSkillList: () => setSkillList(skillList),
        docId: docId,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
