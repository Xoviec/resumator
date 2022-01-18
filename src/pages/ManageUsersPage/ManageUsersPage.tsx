import { FC, useCallback, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColumns,
  GridRowId,
  GridRowsProp,
  GridCellParams,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
// import { getAuth } from "firebase/auth";
import Alert, { AlertProps } from "@mui/material/Alert";

interface User {
  name: string;
  registered: boolean;
  id: string | GridRowId;
  isManager: boolean;
  email: string;
}

const useFakeMutation = () => {
  return useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>((resolve) =>
        setTimeout(() => {
          resolve(user);
        }, 200)
      ),
    []
  );
};

// const useListAllUsers = (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   getAuth()
//     .listUsers(1000, nextPageToken)
//     .then((listUsersResult) => {
//       listUsersResult.users.forEach((userRecord) => {
//         console.log("user", userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch((error) => {
//       console.log("Error listing users:", error);
//     });
// };

const columns: GridColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "emailAddress",
    headerName: "Email Address",
    width: 250,
  },
  {
    field: "rule",
    headerName: "Rule",
    type: "string",
    width: 90,
    editable: true,
  },
];

const INITIAL_ROWS: GridRowsProp = [
  {
    id: 1,
    name: "Rodney Kemp",
    emailAddress: "rodney.kemp@frontmen.nl",
    rule: "Admin",
  },
  {
    id: 2,
    name: "Sander de Jong",
    emailAddress: "sander@frontmen.nl",
    rule: "Manager",
  },
  {
    id: 3,
    name: "Daniel Frey",
    emailAddress: "daniel.frey@frontmen.nl",
    rule: "User",
  },
  {
    id: 4,
    name: "Arman Sarkisov",
    emailAddress: "Arman.Sarkisov@frontmen.nl",
    rule: "User",
  },
  {
    id: 5,
    name: "Boluwatife Fakorede",
    emailAddress: "Boluwatife.Fakorede@frontmen.nl",
    rule: "User",
  },
  {
    id: 6,
    name: "Suwigya Rathore",
    emailAddress: "Suwigya.Rathore@frontmen.nl",
    rule: "User",
  },
];

export const ManageUsersPage: FC = () => {
  const mutateRow = useFakeMutation();
  const [rows, setRows] = useState(INITIAL_ROWS);

  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCellEditCommit = useCallback(
    async (params: GridCellEditCommitParams) => {
      try {
        // Make the HTTP request to save in the backend
        const response = await mutateRow({
          id: params.id,
          [params.field]: params.value,
        });
        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });
        setRows((prev) =>
          prev.map((row) => (row.id === params.id ? { ...row, ...response } : row))
        );
      } catch (error) {
        setSnackbar({ children: "Error while saving user", severity: "error" });
        // Restore the row in case of error
        setRows((prev) => [...prev]);
      }
    },
    [mutateRow]
  );

  function handleCellEditable(params: GridCellParams, details?: any) {
    return params.row.rule !== "Admin";
  }

  return (
    <MainLayout>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
          onCellEditCommit={handleCellEditCommit}
          isCellEditable={handleCellEditable}
          autoHeight
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </MainLayout>
  );
};
