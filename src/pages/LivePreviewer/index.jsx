import React from "react";
import useResume from "../../hooks/useResume";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import Skeleton from "@material-ui/lab/Skeleton";

const LivePreviewer = (props) => {
  const [data, loading, error] = useResume(props.match.params.id);
  if (!props.match.params.id) return <h2>No resume selected</h2>;

  if (loading) {
    return (
      <div>
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={50} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={200} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={200} />

        <StyledSkeleton animation="wave" variant="rect" width={1200} height={300} />

        <StyledSkeleton animation="wave" variant="rect" width={1200} height={500} />
        <StyledSkeleton animation="wave" variant="rect" width={1200} height={500} />
      </div>
    );
  }
  if (data) {
    return (
      <LivePreviewContainer>
        <LivePreviewerTemplate data={{ ...data, id: props.match.params.id }} />
      </LivePreviewContainer>
    );
  }
  if (error) {
    return <LivePreviewContainer>Something went wrong</LivePreviewContainer>;
  }
  return null;
};
const StyledSkeleton = styled(Skeleton)`
  margin: 8px auto;
`;

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
`;

export default LivePreviewer;
