import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type AppStateContextType = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};

export const AppStateContextProvider: FunctionComponent = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const contextState = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
    }),
    [isDrawerOpen, setIsDrawerOpen]
  );

  return (
    <AppStateContext.Provider value={contextState}>
      {children}
    </AppStateContext.Provider>
  );
};
