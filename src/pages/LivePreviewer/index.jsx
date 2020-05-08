import React from "react";
import useResume from "../../utils/useResume";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";

const LivePreviewer = (props) => {
  const [data, loading, error] = useResume(props.match.params.id);

  if (data) {
    return (
      <LivePreviewContainer>
        <LivePreviewerTemplate data={{ ...data, id: props.match.params.id }} />
      </LivePreviewContainer>
    );
  }

  return null;
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;

export default LivePreviewer;
