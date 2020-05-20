import React from "react";
import styled from "@emotion/styled";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";

const Creator = () => {
  const initialData = {
    avatar: "1",
    education: [],
    experience: [],
    introduction: "test",
    personalia: {},
    projects: [],
    skills: [],
  };
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
