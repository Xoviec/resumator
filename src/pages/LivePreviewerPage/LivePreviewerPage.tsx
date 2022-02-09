import { VoidFunctionComponent } from "react";
import { RouteComponentProps, Link, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Card, Box, Button } from "@mui/material";

// hooks
import { useResume } from "../../hooks/useResume";

// components
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import { MainLayout } from "../../layouts/MainLayout";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

type LivePreviewerProps = RouteComponentProps<{ id: string }>;

type paramsId = {
  id: string;
};

const LivePreviewer: VoidFunctionComponent<LivePreviewerProps> = () => {
  const { id } = useParams<paramsId>();
  const { resume, loading, error } = useResume({ id });

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
    return (
      <div>
        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={50}
        />
        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={200}
        />
        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={200}
        />

        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={300}
        />

        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={500}
        />
        <StyledSkeleton
          animation="wave"
          variant="rectangular"
          width={1200}
          height={500}
        />
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
`;

const LivePreviewContainer = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  margin: "0 auto",
  maxWidth: 1200,
}));

export const LivePreviewerPage: VoidFunctionComponent<LivePreviewerProps> = (
  props
) => {
  return (
    <MainLayout>
      <OverviewDrawer>
        <LivePreviewer {...props} />
      </OverviewDrawer>
    </MainLayout>
  );
};
