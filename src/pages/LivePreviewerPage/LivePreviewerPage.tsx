import { useCallback, useEffect, VoidFunctionComponent } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { styled } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Card, Box, Button } from "@mui/material";

// hooks
import { useResume } from "../../hooks";

// components
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import { MainLayout } from "../../layouts/MainLayout";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

type paramsId = {
  id: string;
};

const LivePreviewer: VoidFunctionComponent<paramsId> = ({ id }) => {
  const { userRecord } = useFirebaseApp();
  const { resume, loading, error, resumeId } = useResume(id);
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!userRecord?.isManager) {
      history.push(`/resume/${resumeId}`);
    }
  }, [history, resumeId, userRecord]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  if (!id) {
    return (
      <LivePreviewContainer>
        <Card>
          <h2 style={{ textAlign: "center" }}>No resume selected</h2>
          <Box component="div" display="flex" justifyContent="center" sx={{ p: 2 }}>
            <StyledLink to="/new">
              <Button variant="contained">Add New Resume</Button>
            </StyledLink>
          </Box>
        </Card>
      </LivePreviewContainer>
    );
  }

  if (error) {
    return <LivePreviewContainer>Something went wrong</LivePreviewContainer>;
  }

  if (loading) {
    const SKELETON_HEIGHT = [50, 200, 200, 300, 500, 500];
    return (
      <div>
        {SKELETON_HEIGHT.map((height, index) => (
          <StyledSkeleton
            animation="wave"
            variant="rectangular"
            height={height}
            key={`${height}-${index}`}
          />
        ))}
      </div>
    );
  }

  if (resume) {
    return (
      <LivePreviewContainer>
        <LivePreviewerTemplate data={{ ...resume, id }} />
      </LivePreviewContainer>
    );
  }

  return null;
};
const StyledSkeleton = styled(Skeleton)`
  margin: 8px auto;
  @media (max-width: 600px): {
    max-width: 315px,
  },
  @media (min-width: 601px): {
    max-width: 1200px,
  },
`;

const LivePreviewContainer = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  margin: "0 auto",
  "@media (max-width: 600px)": {
    maxWidth: 315,
  },
  "@media (min-width: 601px)": {
    maxWidth: 1200,
  },
}));

export const LivePreviewerPage: VoidFunctionComponent = () => {
  const params = useParams<paramsId>();

  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewer {...params} />
      </OverviewDrawer>
    </MainLayout>
  );
};
