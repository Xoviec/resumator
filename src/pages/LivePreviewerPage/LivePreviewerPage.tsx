import { VoidFunctionComponent } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import styled from "@emotion/styled";
import Skeleton from "@mui/material/Skeleton";
import { Card, Box, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

// hooks
import { useResume } from "../../hooks/useResume";

// components
import LivePreviewerTemplate from "../../components/LivePreviewerComponents/LivePreviewerTemplate";
import { MainLayout } from "../../layouts/MainLayout";
import { OverviewDrawer } from "../../components/OverviewDrawer/OverviewDrawer";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

type LivePreviewerProps = RouteComponentProps<{ id: string }>;

const LivePreviewer: VoidFunctionComponent<LivePreviewerProps> = (props) => {
  const classes = useStyles();
  const { resume, loading, error } = useResume(props.match.params.id);

  if (!props.match.params.id) {
    return (
      <LivePreviewContainer>
        <Card>
          <h2 style={{ textAlign: "center" }}>No resume selected</h2>
          <Box component="div" display="flex" justifyContent="center" sx={{ p: 2 }}>
            <Link to="/new" className={classes.link}>
              <Button variant="contained">Add New Resume</Button>
            </Link>
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
        <LivePreviewerTemplate data={{ ...resume, id: props.match.params.id }} />
      </LivePreviewContainer>
    );
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
