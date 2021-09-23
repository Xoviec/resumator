export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export default async function (): Promise<FirebaseConfig> {
  if (
    !process.env.REACT_APP_FIREBASE_API_KEY?.length ||
    !process?.env?.REACT_APP_FIREBASE_AUTH_DOMAIN?.length ||
    !process?.env?.REACT_APP_FIREBASE_DATABASE_URL?.length ||
    !process?.env?.REACT_APP_FIREBASE_PROJECT_ID?.length ||
    !process?.env?.REACT_APP_FIREBASE_STORAGE_BUCKET?.length ||
    !process?.env?.REACT_APP_FIREBASE_MESSAGING_SENDER_ID?.length
  ) {
    throw new Error("Missing Firebase config");
  }

  return {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  };
}
