import { useMemo } from "react";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { getFilteredSearchResults, sortByName } from "./utils";

export const useSearch = (resumes: ResumeModel[], searchTerms: string) => {
  const { archivedResumes, unarchivedResumes } = useMemo(() => {
    const filteredResumes = getFilteredSearchResults(searchTerms, resumes);

    const archivedResumes = filteredResumes
      .filter((resume) => resume.item.isArchived)
      .sort(sortByName);

    const unarchivedResumes = filteredResumes
      .filter((resume) => !resume.item.isArchived)
      .sort(sortByName);

    return {
      unarchivedResumes,
      archivedResumes,
    };
  }, [resumes, searchTerms]);

  return {
    archivedResumes,
    unarchivedResumes,
  };
};
