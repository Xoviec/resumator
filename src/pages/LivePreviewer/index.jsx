import React from "react";
import useResume from "../../utils/useResume";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import Skeleton from "@material-ui/lab/Skeleton";

const LivePreviewer = (props) => {
  const [data, loading, error] = useResume(props.match.params.id);

  if (data) {
    return (
      <LivePreviewContainer>
        <LivePreviewerTemplate data={{ ...data, id: props.match.params.id }} />
      </LivePreviewContainer>
    );
  }

  return (
    <div>
      <StyledSkeleton animation="wave" variant="rect" width={1440} height={50} />
      <StyledSkeleton animation="wave" variant="rect" width={1440} height={200} />
      <StyledSkeleton animation="wave" variant="rect" width={1440} height={200} />

      <StyledSkeleton animation="wave" variant="rect" width={1440} height={300} />

      <StyledSkeleton animation="wave" variant="rect" width={1440} height={500} />
      <StyledSkeleton animation="wave" variant="rect" width={1440} height={500} />
    </div>
  );
};
const StyledSkeleton = styled(Skeleton)`
  margin: 8px auto;
`;

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;

export default LivePreviewer;
