import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import { initialResumeData } from "../../config/initialData";

const Creator = () => {
  return (
    <LivePreviewContainer>
      <LivePreviewerTemplate data={{ ...initialResumeData }} />
    </LivePreviewContainer>
  );
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;

export default Creator;
