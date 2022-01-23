import { Link } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import {
  DataGrid,
  GridState,
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

  function handleDeleteBtn() {
    const rowsToKeep = rows.filter(
      (row) => !rowsToDelete.find((rowToDelete) => rowToDelete === row.id)
    );
    setRows(rowsToKeep);
    setRowsToDelete([]);
  }

  function handleNewSkill(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    setNewSkill(value);
    setFilterModel({
      ...filterModel,
      items: [{ ...filterModel.items[0], value }],
    });
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSkillUnique) {
      return setSnackbar({ children: "Skill already exists", severity: "error" });
    }
    setRows(rows.concat({ id: `${rows.length}-${newSkill}`, skillName: newSkill }));
    //TODO: save new skill to firestore
    setSnackbar({
      children: `Skill "${newSkill}" has been added successfully`,
      severity: "success",
    });
    clearSearch();
  }

  function handleStateChange(state: GridState) {
    const { pagination, filter } = state;
    setNewSkill(filter.filterModel.items[0].value);
    const isSearchRowCount = pagination.rowCount === 0;
    if (isSearchRowCount) return setIsSkillUnique(true);
    return setIsSkillUnique(false);
  }

  function clearSearch() {
    setNewSkill("");
    setFilterModel(filterModelDefault);
  }

  return (
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
            onSelectionModelChange={setRowsToDelete}
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
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </MainLayout>
  );
};
