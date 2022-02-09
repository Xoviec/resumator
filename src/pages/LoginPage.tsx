import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  FirebaseUserRecord,
  useFirebaseApp,
} from "../context/FirebaseContext/FirebaseContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LoginLayout } from "../layouts/LoginLayout";
import { VoidFunctionComponent } from "react";

const RESUME_COLLECTION = "resumes";

export const LoginPage: VoidFunctionComponent<RouteComponentProps> = () => {
  const history = useHistory();
  const { firebase, authProvider, userRecord, setUserRecord, isLoading } =
    useFirebaseApp();
  const [loading, setLoading] = React.useState(false);
  const [userResumeId, setUserResumeId] = React.useState<string | null>(null);

  const getResume = React.useCallback(
    (user: FirebaseUserRecord) => {
      const existingResume = firebase
        .firestore()
        .collection("resumes")
        .where("personalia.email", "==", user?.email)
        .get()
        .then((doc) => doc?.docs?.[0]?.id);

      return existingResume;
    },
    [firebase]
  );

  /**
   * This is only to run once as an initial check for a signed-in user
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!userRecord) return;
    setLoading(true);
    getResume(userRecord).then((doc) => {
      setLoading(false);
      setUserResumeId(doc);
    });
  });

  React.useEffect(() => {
    if (!userResumeId || !userRecord) return;

    history.push(`/resume/${userResumeId}`);
  }, [history, userRecord, userResumeId]);

  const createResume = async (user: FirebaseUserRecord) => {
    try {
      const resumeCollection = firebase.firestore().collection(RESUME_COLLECTION);

      const nameSplit = user.name?.split(" ");
      const resume = {
        personalia: {
          email: user.email,
          firstName: nameSplit?.[0],
          lastName: nameSplit?.[1],
        },
      };
      const resumePromise = await resumeCollection.doc().set(resume);

      return resumePromise;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }

      return false;
    }
  };

  const login = async () => {
    const userRecord = await firebase.auth().signInWithPopup(authProvider);

    if (!userRecord) return;

    const userRecordData = {
      name: userRecord.user?.displayName ?? "",
      registered: userRecord.user?.emailVerified,
      email: userRecord.user?.email ?? "",
    } as unknown as FirebaseUserRecord;

    setUserRecord(userRecordData);

    const resumeId = await getResume(userRecordData);

    if (resumeId) return setUserResumeId(resumeId);

    await createResume(userRecordData);

    const newResumeId = await getResume(userRecordData);

    return setUserResumeId(newResumeId);
  };

  if (isLoading || loading) return <div />;

  return (
    <LoginLayout>
      <Box width="100%" color="white" bgcolor="white" textAlign="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          style={{ fontSize: "40px" }}
        >
          Login
        </Typography>
        <Typography component="p" color="primary" paragraph>
          Login to use the CV creator tool
        </Typography>
        <Button variant="contained" color="secondary" onClick={login}>
          Login
        </Button>
      </Box>
    </LoginLayout>
  );
};
