import React from "react";
import { FormContext, useForm } from "react-hook-form";
import TopSection from "./Topsection";
import Introduction from "./Introduction";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import validationSchema from "../../config/validation";
import styled from "@emotion/styled";
import { Button } from "rebass";
import { useHistory } from "react-router-dom";

const LivePreviewerTemplate = ({ data }) => {
  const history = useHistory();

  const goTo = (path) => history.push(path);

  const methods = useForm({
    defaultValues: { ...data },
    validationSchema,
  });
  console.log(data);
  return (
    <LivePreviewerTemplateContainer>
      <TopSide>
        <div>
          <StyledButton
            onClick={() => goTo(`/overview`)}
            variant="secondary"
            type="button"
          >
            Back to overview
          </StyledButton>
        </div>

        <div>
          <StyledButton variant="secondary" type="button">
            Download
          </StyledButton>
          <StyledButton
            onClick={() => goTo(`/previewer/${data.id}`)}
            variant="secondary"
            type="button"
          >
            Preview
          </StyledButton>

          <StyledButton variant="secondary" type="button">
            Share
          </StyledButton>
          <StyledButton variant="primary" type="button">
            Save
          </StyledButton>
        </div>
      </TopSide>
      <Content>
        <FormContext {...methods}>
          {data.personalia && <TopSection personalia={data.personalia} />}
          {data.introduction && <Introduction introduction={data.introduction} />}
          {data.skills && <Skills skills={data.skills} />}
          {data.education && <Education education={data.education} />}
          {data.projects && (
            <Experience type="Projects" experience={data.projects} />
          )}
          <Experience type="Work Experience" experience={data.experience} />
        </FormContext>
      </Content>
    </LivePreviewerTemplateContainer>
  );
};

const TopSide = styled.div`
  display: flex;
  grid-gap: 8px;
  padding: 16px;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin: 0 8px;
`;

const Content = styled.div``;

const LivePreviewerTemplateContainer = styled.div`
  background-color: white;
`;
export default LivePreviewerTemplate;
