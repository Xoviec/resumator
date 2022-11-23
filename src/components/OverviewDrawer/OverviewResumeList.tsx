import { List } from "@mui/material/";
import Fuse from "fuse.js";
import { VoidFunctionComponent } from "react";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { ResumeItem } from "./OverviewResumeItem";

interface Props {
  onDelete: (resume: ResumeModel) => void;
  resumes: Fuse.FuseResult<ResumeModel>[];
  testId?: string;
}

export const OverviewResumeList: VoidFunctionComponent<Props> = ({
  onDelete,
  resumes,
  testId = "",
}) => {
  return (
    <List dense={true} data-testid={testId}>
      {resumes.map(({ item: resume, matches }) => (
        <ResumeItem
          key={resume.id}
          resume={{ ...resume }}
          matches={matches}
          onDelete={() => onDelete(resume)}
        />
      ))}
    </List>
  );
};
