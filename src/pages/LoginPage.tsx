import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FirebaseUserRecord,
  useFirebaseApp,
} from "../context/FirebaseContext/FirebaseContext";
import rootFirebase from "firebase/compat/app";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LoginLayout } from "../layouts/LoginLayout";
import { VoidFunctionComponent } from "react";
import { initialResumeData } from "../config/initialData";
import { Page } from "../components/layout";
import { styled } from "@mui/material/styles";

const RESUME_COLLECTION = "resumes";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 500,
  color: theme.palette.common.black,
}));

const Body = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 500,
  color: theme.palette.common.black,
}));

export const LoginPage: VoidFunctionComponent = () => {
  const navigate = useNavigate();
  const { firebase, authProvider, userRecord, setUserRecord, isLoading } =
    useFirebaseApp();
  const [loading, setLoading] = React.useState(false);
  const [userResumeId, setUserResumeId] = React.useState<string | null>(null);

  const getResume = React.useCallback(
    async (user: FirebaseUserRecord) => {
      const _user = user.userRecord ?? user;
      const parts = _user.email.split("@");
      const collectionRef = firebase.firestore().collection("resumes");
      const q1 = collectionRef
        .where("personalia.email", "==", `${parts[0]}@frontmen.nl`)
        .get()
        .then((doc) => doc?.docs?.[0]?.id);
      const q2 = collectionRef
        .where("personalia.email", "==", `${parts[0]}@iodigital.com`)
        .get()
        .then((doc) => doc?.docs?.[0]?.id);
      const allPromises = await Promise.all([q1, q2]);
      const resumeId = allPromises[0] || allPromises[1];
      return resumeId;
    },
    [firebase]
  );

  /**
   * This is only to run once as an initial check for a signed-in user
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!userRecord) return;

    if (userRecord?.isManager) {
      return navigate("/");
    }

    setLoading(true);
    getResume(userRecord).then((id: string) => {
      setLoading(false);
      setUserResumeId(id);
    });
  });

  React.useEffect(() => {
    if (!userResumeId || !userRecord) return;

    navigate(`/resume/${userResumeId}`);
  }, [navigate, userRecord, userResumeId]);

  const createResume = async (user: FirebaseUserRecord) => {
    try {
      const resumeCollection = firebase.firestore().collection(RESUME_COLLECTION);
      let firstName = "";
      let lastName = "";

      const _user = user.userRecord ?? user;
      if (_user.name) {
        firstName = _user.name.split(" ")[0];
        lastName = _user.name.substring(firstName.length).trim();
      }

      const resume = {
        personalia: {
          ...initialResumeData.personalia,
          email: _user.email,
          firstName,
          lastName,
        },
        userId: _user.userId,
      };

      const resumePromise = await resumeCollection
        .doc()
        .set({ ...initialResumeData, ...resume });

      return resumePromise;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }

      return false;
    }
  };

  const constructDisplayName = (userRecord: rootFirebase.auth.UserCredential) => {
    const additionalInfo = userRecord.additionalUserInfo?.profile;
    if (!additionalInfo) return;
    const displayKey = Object.keys(additionalInfo).find((info) =>
      info.includes("name")
    );

    if (!displayKey) return;

    const joinedDisplayName = (additionalInfo as any)[displayKey];

    if (!joinedDisplayName) return;

    const [first, last] = joinedDisplayName.split(".");

    return `${first} ${last}`;
  };

  const login = async () => {
    const userRecord = await firebase.auth().signInWithPopup(authProvider);

    if (!userRecord) return;

    const userRecordData = {
      name: constructDisplayName(userRecord) ?? "",
      registered: userRecord.user?.emailVerified,
      email: userRecord.user?.email ?? "",
      userId: userRecord.user?.uid,
    } as unknown as FirebaseUserRecord;

    setUserRecord(userRecordData);

    let resumeId = await getResume(userRecordData);
    if (!resumeId) {
      await createResume(userRecordData);
      resumeId = await getResume(userRecordData);
    }

    setUserResumeId(resumeId);
  };

  if (isLoading || loading) return <div />;

  return (
    <Page title="login">
      <LoginLayout>
        <Box width="100%" color="white" textAlign="center">
          <Title variant="h1" gutterBottom>
            Consultancy Resumes
          </Title>
          <Body variant="body1" gutterBottom>
            Login to use the CV creator tool
          </Body>
          <Button disableElevation variant="contained" onClick={login}>
            Login
          </Button>
        </Box>
      </LoginLayout>
    </Page>
  );
};
