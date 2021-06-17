import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../FirebaseContext";

export const SkillsContext: React.Context<{
  skillList: string[];
}> = React.createContext({
  skillList: [""],
});

export const SkillsContextProvider: FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { firebase } = useContext(FirebaseAppContext) as any;

  const [skillList, setSkillList] = useState<string[]>([]);
  const [val] = useCollection(firebase.firestore().collection("allSkills"));

  useEffect(() => {
    console.log("vlad getting skillList", val);
    if (val) {
      setSkillList(val.docs[0].data().skills);
    }
  }, [val]);

  return (
    <SkillsContext.Provider
      value={{
        skillList: skillList,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
