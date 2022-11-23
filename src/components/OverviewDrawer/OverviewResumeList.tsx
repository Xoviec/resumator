import { VoidFunctionComponent } from "react";
import { List } from "@mui/material/";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import ResumeItem from "./OverviewResumeItem";
import Fuse from "fuse.js";

interface Props {
  onDelete: (resume: ResumeModel) => void;
  resumes: Fuse.FuseResult<ResumeModel>[];
  testId?: string;
}

const OverviewResumeList: VoidFunctionComponent<Props> = ({
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

export default OverviewResumeList;
