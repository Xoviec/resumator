import { useEffect } from "react";
import { DEFAULT_PAGE_TITLE } from "../components/constants";
import { capitalize } from "../utils";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const pageTitle = capitalize(`${title} - ${DEFAULT_PAGE_TITLE}`);
    document.title = pageTitle;
    return () => {
      document.title = "";
    };
  }, [title]);
};
