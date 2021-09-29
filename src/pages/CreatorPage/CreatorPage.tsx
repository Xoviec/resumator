import styled from "@emotion/styled";
import { VoidFunctionComponent } from "react";
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";
import { initialResumeData } from "../../config/initialData";
import { MainLayout } from "../../layouts/MainLayout";

export const CreatorPage: VoidFunctionComponent = () => {
  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewContainer>
          <LivePreviewerTemplate data={{ ...initialResumeData }} />
        </LivePreviewContainer>
      </OverviewDrawer>
    </MainLayout>
  );
};

const LivePreviewContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
`;
