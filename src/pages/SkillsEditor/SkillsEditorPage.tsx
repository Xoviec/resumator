import { Link } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridRowId,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useFirebaseApp } from "../../context/FirebaseContext/FirebaseContext";
import Alert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SkillHeader } from "./SkillHeader";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

const columns: GridColDef[] = [
  {
    field: "skillName",
    headerName: "Skill Name",
    width: 150,
    editable: true,
  },
];

const filterModeDefault: GridFilterModel = {
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
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { skillList, updateSkillList } = useSkillsContext();
  const [rowsToDelete, setRowsToDelete] = useState<GridRowId[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isSkillUnique, setIsSkillUnique] = useState(true);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [filterModel, setFilterModel] = useState(filterModeDefault);

  useEffect(() => {
    const skillsWithIDs = skillList.map((skill, index) => ({
      id: `${index}-${skill}`,
      skillName: skill,
    }));
    setRows(skillsWithIDs);
  }, [skillList]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const checkDOM =
        document?.querySelector(".MuiDataGrid-overlay")?.textContent ===
        "No results found.";
      setIsSkillUnique(checkDOM);
      return checkDOM;
    }, 0);
    return () => {
      clearTimeout(timeOut);
    };
  }, [filterModel]);

  function handleDelete() {
    const rowsToKeep = rows.filter(
      (row) => !rowsToDelete.find((rowToDelete) => rowToDelete === row.id)
    );
    setRows(rowsToKeep);
    setRowsToDelete([]);
  }

  function handleNewSkill(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newSkill = event.target.value;
    setNewSkill(newSkill);
    setFilterModel({
      ...filterModel,
      items: [{ ...filterModel.items[0], value: newSkill }],
    });
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSkillUnique) {
      return setSnackbar({ children: "Skill already exists", severity: "error" });
    }
    setRows(rows.concat({ id: `${rows.length}-${newSkill}`, skillName: newSkill }));
    setSnackbar({
      children: `Skill "${newSkill}" has been added successfully`,
      severity: "success",
    });
    clearSearch();
  }

  function clearSearch() {
    setNewSkill("");
    setFilterModel(filterModeDefault);
  }

  return (
    <MainLayout>
      {userRecord?.isManager ? (
        <>
          <SkillHeader
            isBtnDisabled={!newSkill || !isSkillUnique}
            saveNewSkill={handleSave}
            newSkill={newSkill}
            editCount={rowsToDelete.length}
            saveEditedSkills={handleDelete}
            handleNewSkill={handleNewSkill}
          />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight
            checkboxSelection
            onSelectionModelChange={(selectionModel) =>
              setRowsToDelete(selectionModel)
            }
            loading={skillList.length === 0}
            components={{
              Toolbar: GridToolbar,
            }}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
          />
        </>
      ) : (
        <Alert severity="info">
          You are not authorized to manage skills. Go back to the{" "}
          <Link to="/">home page</Link>.
        </Alert>
      )}

      {snackbar && (
        <Snackbar open onClose={() => setSnackbar(null)} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </MainLayout>
  );
};
