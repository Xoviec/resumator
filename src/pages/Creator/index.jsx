import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import initialData from "../../config/initialData";

const Creator = () => {
  return (
    <LivePreviewContainer>
      <LivePreviewerTemplate data={{ ...initialData }} />
    </LivePreviewContainer>
  );
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;

export default Creator;
