import Alert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import {
  DataGrid,
  GridState,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridRowId,
  GridFilterModel,
} from "@mui/x-data-grid";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Page } from "../../components/layout";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";
import { MainLayout } from "../../layouts/MainLayout";
import { SkillHeader } from "./SkillHeader";

const columns: GridColDef[] = [
  {
    field: "skillName",
    headerName: "Skill Name",
    width: 150,
  },
];

const filterModelDefault: GridFilterModel = {
  items: [
    {
      columnField: "skillName",
      operatorValue: "contains",
      value: "",
    },
  ],
};

export const SkillsEditorPage: FC = () => {
  const { userRecord } = useFirebaseApp();
  const { skillList, updateSkillList } = useSkillsContext();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsToDelete, setRowsToDelete] = useState<GridRowId[]>([]);
  const [rowsBackup, setRowsBackup] = useState<GridRowsProp>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isSkillUnique, setIsSkillUnique] = useState(true);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [filterModel, setFilterModel] = useState(filterModelDefault);

  useEffect(() => {
    const skillsWithIDs = skillList.map((skill, index) => ({
      id: `${index}-${skill}`,
      skillName: skill,
    }));
    setRows(skillsWithIDs);
  }, [skillList]);

  async function handleDeleteBtn() {
    setRowsBackup(rows);
    const rowsToKeep = rows.filter(
      (row) => !rowsToDelete.find((rowToDelete) => rowToDelete === row.id)
    );
    try {
      await updateSkillList(rowsToKeep.map((row) => row.skillName));
      setRows(rowsToKeep);
      setSnackbar({
        children: `Skills "${rowsToDelete.join(
          ", "
        )}" has been deleted successfully`,
        severity: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setSnackbar({
        children: `Server Error: ${e.message}`,
        severity: "error",
      });
    }
  }

  function handleNewSkill(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    handleSnackbarClose();
    setNewSkill(value);
    setFilterModel({
      ...filterModel,
      items: [{ ...filterModel.items[0], value }],
    });
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSkillUnique) {
      return setSnackbar({ children: "Skill already exists", severity: "error" });
    }
    const newRows = rows.concat({
      id: `${rows.length}-${newSkill}`,
      skillName: newSkill,
    });
    setRowsBackup(rows);
    try {
      await updateSkillList(newRows.map((row) => row.skillName));
      setRows(newRows);
      setSnackbar({
        children: `Skill "${newSkill}" has been added successfully`,
        severity: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setSnackbar({
        children: `Server Error: ${e.message}`,
        severity: "error",
      });
    }
  }

  function handleStateChange(state: GridState) {
    const { pagination, filter } = state;
    setNewSkill(filter.filterModel.items[0].value);
    const isSearchRowCount = pagination.rowCount === 0;
    if (isSearchRowCount) return setIsSkillUnique(true);
    return setIsSkillUnique(false);
  }

  async function handleUndoChanges() {
    if (rowsBackup.length > 0) {
      try {
        await updateSkillList(rowsBackup.map((row) => row.skillName));
        setRows(rowsBackup);
        handleSnackbarClose();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setSnackbar({
          children: `Server Error: ${e.message}`,
          severity: "error",
        });
      }
    }
  }

  function handleSnackbarClose() {
    if (snackbar) {
      setSnackbar(null);
      setRowsBackup([]);
      setRowsToDelete([]);
    }
  }

  return (
    <Page title="Manage Skills">
      <MainLayout>
        {userRecord?.isManager ? (
          <>
            <SkillHeader
              isBtnDisabled={!newSkill || !isSkillUnique}
              newSkill={newSkill}
              editCount={rowsToDelete.length}
              saveNewSkill={handleSave}
              saveEditedSkills={handleDeleteBtn}
              handleNewSkill={handleNewSkill}
            />
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              autoHeight
              checkboxSelection
              loading={rows.length === 0}
              filterModel={filterModel}
              density="compact"
              components={{
                Toolbar: GridToolbar,
              }}
              onSelectionModelChange={(selectionModel) => {
                handleSnackbarClose();
                setRowsToDelete(selectionModel);
              }}
              onStateChange={handleStateChange}
              onFilterModelChange={(filterModel) =>
                setTimeout(() => setFilterModel(filterModel), 0)
              }
            />
          </>
        ) : (
          <Alert severity="info">
            You are not authorized to manage skills. Go back to the{" "}
            <Link to="/">home page</Link>.
          </Alert>
        )}
        {snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleSnackbarClose}
            autoHideDuration={6000}
          >
            <Alert
              {...snackbar}
              onClose={handleSnackbarClose}
              action={
                <>
                  {snackbar.severity !== "error" && (
                    <Button onClick={handleUndoChanges}>Undo changes</Button>
                  )}
                </>
              }
            />
          </Snackbar>
        )}
      </MainLayout>
    </Page>
  );
};
