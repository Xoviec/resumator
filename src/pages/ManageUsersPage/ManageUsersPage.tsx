import Alert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColumns,
  GridRowsProp,
  GridToolbar,
  GridCellParams,
} from "@mui/x-data-grid";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { FC, useCallback, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Page } from "../../components/layout";
import { FirebaseUserRecord } from "../../context/FirebaseContext/FirebaseContext";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { MainLayout } from "../../layouts/MainLayout";

const columns: GridColumns = [
  { field: "id", headerName: "ID", width: 290 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "email",
    headerName: "Email Address",
    width: 250,
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 90,
  },
  {
    field: "isManager",
    headerName: "Is Manager?",
    type: "boolean",
    width: 150,
    editable: true,
  },
];

export const ManageUsersPage: FC = () => {
  const { userRecord } = useFirebaseApp();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const mutateRow = useCallback(async (user: Partial<FirebaseUserRecord>) => {
    const { id } = user;
    if (!id) {
      throw new Error("User record is missing an ID");
    }

    const db = firebase.firestore();
    const userRef = db.collection("users").doc(id);

    await userRef.update(user);
    return user;
  }, []);

  const handleCellEditCommit = useCallback(
    async (params: GridCellEditCommitParams) => {
      const { id, value, field } = params;
      const rowIndexToBeUpdated = rows.findIndex((row) => row.id === id);
      const isValueChanged = value !== rows[rowIndexToBeUpdated][field];
      if (!isValueChanged) return;
      try {
        if (id === userRecord?.id) {
          throw new Error("You cannot edit your own user record");
        }
        // Make the HTTP request to save in the backend
        const response = await mutateRow({
          id: `${id}`,
          [field]: value,
        });
        setSnackbar({
          children: `UserID: "${response?.id}" has been updated successfully`,
          severity: "success",
        });
        setRows((prev) =>
          prev.map((row) => (row.id === id ? { ...row, ...response } : row))
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSnackbar({ children: `${error?.message}`, severity: "error" });
        // Restore the row in case of error
        setRows((prev) => [...prev]);
      }
    },
    [mutateRow, rows, userRecord?.id]
  );

  useEffect(() => {
    if (!userRecord?.isManager) return;
    async function fetchData() {
      try {
        const usersRec = await firebase.firestore().collection("users").get();
        const usersWithIDs = usersRec.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRows(usersWithIDs);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSnackbar({ children: `${error?.message}`, severity: "error" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      setRows([]);
    };
  }, [userRecord]);

  return (
    <Page title="Manage Users">
      <MainLayout>
        {userRecord?.isManager ? (
          <>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={4}
            >
              <Typography variant="h3" component="h1">
                Manage Users &nbsp;
              </Typography>

              <Button color="primary" variant="contained" component={NavLink} to="/">
                Go to overview
              </Button>
            </Box>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              loading={isLoading}
              onCellEditCommit={handleCellEditCommit}
              components={{
                Toolbar: GridToolbar,
              }}
              isCellEditable={(params: GridCellParams) =>
                params.row.rule !== "Admin"
              }
              autoHeight
            />
          </>
        ) : (
          <Alert severity="info">
            You are not authorized to manage users. Go back to the{" "}
            <Link to="/">home page</Link>.
          </Alert>
        )}
        {snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setSnackbar(null)}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={() => setSnackbar(null)} />
          </Snackbar>
        )}
      </MainLayout>
    </Page>
  );
};
