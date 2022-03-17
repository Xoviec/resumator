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

const RESUME_COLLECTION = "resumes";

export const LoginPage: VoidFunctionComponent = () => {
  const navigate = useNavigate();
  const { firebase, authProvider, userRecord, setUserRecord, isLoading } =
    useFirebaseApp();
  const [loading, setLoading] = React.useState(false);
  const [userResumeId, setUserResumeId] = React.useState<string | null>(null);

  const getResume = React.useCallback(
    async (user: FirebaseUserRecord) => {
      const parts = user.email.split("@");
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

      if (user.name) {
        firstName = user.name.split(" ")[0];
        lastName = user.name.substring(firstName.length).trim();
      }

      const resume = {
        personalia: {
          ...initialResumeData.personalia,
          email: user.email,
          firstName,
          lastName,
        },
        userId: user.userId,
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
